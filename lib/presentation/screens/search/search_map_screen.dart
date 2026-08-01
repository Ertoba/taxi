import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:google_places_flutter/google_places_flutter.dart';
import 'package:google_places_flutter/model/prediction.dart';
import 'package:ride_on/core/utils/translate.dart';
import '../../../core/services/native_places_service.dart';
import '../../../core/services/config.dart';
import '../../../core/utils/common_widget.dart';
import '../../../core/utils/theme/project_color.dart';
import '../../../core/utils/theme/theme_style.dart';
import '../../cubits/book_ride_cubit.dart';
import '../../cubits/location/user_current_location_cubit.dart';

class SearchMapScreen extends StatefulWidget {
  final String? selectedAddressTitle;
  final bool? checkStatus;
  const SearchMapScreen({
    super.key,
    this.selectedAddressTitle,
    this.checkStatus,
  });
  @override
  State<SearchMapScreen> createState() => _SearchMapScreenState();
}

class _SearchMapScreenState extends State<SearchMapScreen> {
  double selectedMapLat = 41.7151;
  double selectedMapLng = 44.8271;
  double? _resolvedMapLat;
  double? _resolvedMapLng;
  bool _initialCoordinatesLoaded = false;
  GoogleMapController? mapController;
  TextEditingController textEditingAddressSearchController =
      TextEditingController();
  FocusNode focusNode1 = FocusNode();
  final NativePlacesService _nativePlacesService = NativePlacesService();
  List<NativePlacePrediction> _nativePredictions = const [];
  bool _isSearchingPlaces = false;
  String? _placesError;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_initialCoordinatesLoaded) return;

    final ride = context.read<BookRideRealTimeDataBaseCubit>().state;
    final pickup = _validLatLng(
      ride.pickupAddressLatitude,
      ride.pickupAddressLongitude,
    );
    final dropoff = _validLatLng(
      ride.dropoffAddressLatitude,
      ride.dropoffAddressLongitude,
    );
    final initial = widget.checkStatus == false && dropoff != null
        ? dropoff
        : pickup;
    if (initial != null) {
      selectedMapLat = initial.latitude;
      selectedMapLng = initial.longitude;
    }
    textEditingAddressSearchController.clear();
    _initialCoordinatesLoaded = true;
  }

  LatLng? _validLatLng(String latitude, String longitude) {
    final lat = double.tryParse(latitude);
    final lng = double.tryParse(longitude);
    if (lat == null || lng == null || !lat.isFinite || !lng.isFinite) {
      return null;
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
    if (lat == 0 && lng == 0) return null;
    return LatLng(lat, lng);
  }

  bool _matchesResolvedPin() {
    final lat = _resolvedMapLat;
    final lng = _resolvedMapLng;
    if (lat == null || lng == null) return false;
    return (lat - selectedMapLat).abs() < 0.000001 &&
        (lng - selectedMapLng).abs() < 0.000001;
  }

  void _onMapCreated(GoogleMapController controller) {
    if (mapController != null) {
      mapController!.dispose();
    }
    mapController = controller;
    if (selectedMapLat != 0 && selectedMapLng != 0) {
      mapController?.animateCamera(
        CameraUpdate.newLatLng(LatLng(selectedMapLat, selectedMapLng)),
      );
    }
  }

  void _zoomIn() {
    mapController?.animateCamera(CameraUpdate.zoomIn());
  }

  void _zoomOut() {
    mapController?.animateCamera(CameraUpdate.zoomOut());
  }

  void _moveToCurrentLocation({LatLng? currentLocation}) {
    selectedMapLat = currentLocation!.latitude;
    selectedMapLng = currentLocation.longitude;
    mapController?.animateCamera(CameraUpdate.newLatLng(currentLocation));
  }

  @override
  void dispose() {
    _mapDebounce?.cancel();
    _placesDebounce?.cancel();
    mapController?.dispose();
    textEditingAddressSearchController.dispose();
    focusNode1.dispose();
    if (Platform.isAndroid) {
      unawaited(_nativePlacesService.cancelSession());
    }
    super.dispose();
  }

  Timer? _mapDebounce;
  Timer? _placesDebounce;

  void _searchNativePlaces(String query) {
    _placesDebounce?.cancel();
    final normalizedQuery = query.trim();
    if (normalizedQuery.length < 2) {
      setState(() {
        _nativePredictions = const [];
        _placesError = null;
        _isSearchingPlaces = false;
      });
      return;
    }

    _placesDebounce = Timer(const Duration(milliseconds: 350), () async {
      if (!mounted) return;
      setState(() {
        _isSearchingPlaces = true;
        _placesError = null;
      });
      try {
        final predictions = await _nativePlacesService.findPredictions(
          normalizedQuery,
        );
        if (!mounted ||
            textEditingAddressSearchController.text.trim() != normalizedQuery) {
          return;
        }
        setState(() {
          _nativePredictions = predictions;
          _isSearchingPlaces = false;
        });
      } on PlatformException catch (error) {
        if (!mounted) return;
        setState(() {
          _nativePredictions = const [];
          _isSearchingPlaces = false;
          _placesError =
              error.message ??
              "Address search is temporarily unavailable.".translate(context);
        });
      }
    });
  }

  Future<void> _selectNativePlace(NativePlacePrediction prediction) async {
    FocusScope.of(context).unfocus();
    setState(() {
      _isSearchingPlaces = true;
      _placesError = null;
    });
    try {
      final place = await _nativePlacesService.fetchPlace(prediction.placeId);
      if (!mounted) return;
      textEditingAddressSearchController.text = place.description;
      setState(() {
        _nativePredictions = const [];
        _isSearchingPlaces = false;
        _resolvedMapLat = place.latitude;
        _resolvedMapLng = place.longitude;
      });
      _moveToCurrentLocation(
        currentLocation: LatLng(place.latitude, place.longitude),
      );
    } on PlatformException catch (error) {
      if (!mounted) return;
      setState(() {
        _isSearchingPlaces = false;
        _placesError =
            error.message ??
            "Unable to load the selected address.".translate(context);
      });
    }
  }

  Widget _nativeAddressSearchField() {
    return TextField(
      focusNode: focusNode1,
      controller: textEditingAddressSearchController,
      onChanged: _searchNativePlaces,
      textInputAction: TextInputAction.search,
      style: regularBlack(context).copyWith(fontSize: 14),
      decoration: InputDecoration(
        filled: true,
        fillColor: whiteColor,
        prefixIcon: Icon(Icons.location_on_outlined, color: blackColor),
        suffixIcon: _isSearchingPlaces
            ? const Padding(
                padding: EdgeInsets.all(16),
                child: SizedBox.square(
                  dimension: 18,
                  child: CircularProgressIndicator(strokeWidth: 2),
                ),
              )
            : null,
        hintStyle: regular3(context).copyWith(color: blackColor),
        hintText: "Search Address".translate(context),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: grey4),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: grey4),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: themeColor),
        ),
      ),
    );
  }

  Widget _nativePredictionsOverlay() {
    if (!Platform.isAndroid ||
        (_nativePredictions.isEmpty && _placesError == null)) {
      return const SizedBox.shrink();
    }

    return Positioned(
      top: 0,
      left: 20,
      right: 20,
      child: Material(
        elevation: 8,
        borderRadius: BorderRadius.circular(12),
        clipBehavior: Clip.antiAlias,
        color: notifires.getbgcolor,
        child: _placesError != null
            ? Padding(
                padding: const EdgeInsets.all(14),
                child: Text(
                  _placesError!,
                  style: regular2(context).copyWith(color: Colors.red),
                ),
              )
            : ConstrainedBox(
                constraints: const BoxConstraints(maxHeight: 280),
                child: ListView.separated(
                  shrinkWrap: true,
                  padding: EdgeInsets.zero,
                  itemCount: _nativePredictions.length,
                  separatorBuilder: (_, __) => Divider(height: 1, color: grey4),
                  itemBuilder: (context, index) {
                    final prediction = _nativePredictions[index];
                    return ListTile(
                      dense: true,
                      leading: Icon(Icons.location_on, color: themeColor),
                      title: Text(
                        prediction.description,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: regular2(context),
                      ),
                      onTap: () => _selectNativePlace(prediction),
                    );
                  },
                ),
              ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        toolbarHeight: 55,
        elevation: 0,
        surfaceTintColor: Colors.white,
        backgroundColor: Colors.white,
        centerTitle: true,
        title: Text(
          widget.checkStatus == true
              ? "Pickup Location".translate(context)
              : "Drop-off Location".translate(context),
          style: headingBlack(
            context,
          ).copyWith(fontSize: 18, color: blackColor),
        ),
        leadingWidth: 80,
        leading: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: InkWell(
            onTap: () {
              Navigator.of(context).pop();
            },
            child: Container(
              alignment: Alignment.center,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: notifires.getbgcolor,
                border: Border.all(color: notifires.getGrey3whiteColor),
              ),
              child: Icon(
                Icons.arrow_back,
                size: 20,
                color: notifires.getwhiteblackColor,
              ),
            ),
          ),
        ),
        bottom: PreferredSize(
          preferredSize: const Size(double.infinity, 60),
          child: Column(
            children: [
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.only(bottom: 10, left: 20, right: 20),
                child: SizedBox(
                  width: double.maxFinite,
                  height: 60,
                  child: Platform.isAndroid
                      ? _nativeAddressSearchField()
                      : GooglePlaceAutoCompleteTextField(
                          containerVerticalPadding: 6,
                          focusNode: focusNode1,
                          containerHorizontalPadding: 0,
                          textStyle: regularBlack(
                            context,
                          ).copyWith(fontSize: 14),
                          textEditingController:
                              textEditingAddressSearchController,
                          boxDecoration: BoxDecoration(
                            color: whiteColor,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: grey4),
                          ),
                          isLatLngRequired: true,
                          googleAPIKey: Config.googleKey,
                          countries: null,
                          inputDecoration: InputDecoration(
                            prefixIcon: Icon(
                              Icons.location_on_outlined,
                              color: blackColor,
                            ),
                            hintStyle: regular3(
                              context,
                            ).copyWith(color: blackColor),
                            hintText: "Search Address".translate(context),
                            border: InputBorder.none,
                          ),
                          getPlaceDetailWithLatLng: (Prediction prediction) {
                            if (prediction.lat != null &&
                                prediction.lng != null) {
                              final latitude = double.tryParse(prediction.lat!);
                              final longitude = double.tryParse(
                                prediction.lng!,
                              );
                              if (latitude == null || longitude == null) return;
                              _resolvedMapLat = latitude;
                              _resolvedMapLng = longitude;
                              _moveToCurrentLocation(
                                currentLocation: LatLng(latitude, longitude),
                              );
                            }
                          },
                          itemClick: (Prediction prediction) {},
                          itemBuilder: (context, index, Prediction prediction) {
                            return Container(
                              decoration: BoxDecoration(
                                color: notifires.getbgcolor,
                              ),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 0,
                                vertical: 0,
                              ),
                              child: Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 10,
                                      vertical: 2,
                                    ),
                                    child: Row(
                                      children: [
                                        Icon(
                                          Icons.location_on,
                                          color: blackColor,
                                        ),
                                        const SizedBox(width: 7),
                                        Expanded(
                                          child: Text(
                                            prediction.description ?? "",
                                            style: regular2(context),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(height: 5),
                                  Divider(color: blackColor, thickness: 1),
                                  const SizedBox(height: 5),
                                ],
                              ),
                            );
                          },
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
      body: Stack(
        children: [
          BlocBuilder<UpdateSearchMapAddressCubit, UpdateSearchMapAddressState>(
            builder: (context, state) {
              if (state is UpdateSearchMapAddresSuccess) {
                _resolvedMapLat = state.lat;
                _resolvedMapLng = state.lng;
                WidgetsBinding.instance.addPostFrameCallback((_) {
                  if (!mounted) return;
                  textEditingAddressSearchController.text = state.currentAddress
                      .toString();
                  context.read<UpdateSearchMapAddressCubit>().removeAddress();
                });
              }
              return GoogleMap(
                onMapCreated: _onMapCreated,
                scrollGesturesEnabled: true,
                rotateGesturesEnabled: true,
                zoomGesturesEnabled: true,
                compassEnabled: true,
                myLocationEnabled: false,
                myLocationButtonEnabled: false,
                zoomControlsEnabled: false,
                onCameraMove: (CameraPosition position) {
                  selectedMapLat = position.target.latitude;
                  selectedMapLng = position.target.longitude;
                  if (!_matchesResolvedPin()) {
                    _resolvedMapLat = null;
                    _resolvedMapLng = null;
                  }
                },
                onCameraIdle: () {
                  if (_mapDebounce?.isActive ?? false) _mapDebounce!.cancel();

                  _mapDebounce = Timer(const Duration(milliseconds: 700), () {
                    context.read<UpdateSearchMapAddressCubit>().removeAddress();
                    context
                        .read<UpdateSearchMapAddressCubit>()
                        .getAddressFromLatLng(
                          latitude: selectedMapLat,
                          longitude: selectedMapLng,
                        );
                  });
                },
                initialCameraPosition: CameraPosition(
                  target: LatLng(selectedMapLat, selectedMapLng),
                  zoom: 14,
                ),
              );
            },
          ),
          _nativePredictionsOverlay(),

          Positioned(
            top: 0,
            right: 0,
            bottom: 0, // Center vertically, offset by half icon height
            left: 0, // Center horizontally, offset by half icon width
            child: Transform.translate(
              offset: const Offset(0, -15),
              child: Center(
                child: Image.asset(
                  "assets/images/dropmarker.png",
                  height: 34,
                  width: 34,

                  alignment: Alignment
                      .bottomCenter, // Ensure pin's tip points to the location
                ),
              ),
            ),
          ),

          Positioned(
            top: 40,
            right: 16,
            child: zoomButton(
              icon: Icons.zoom_out,
              onPressed: () {
                _zoomOut();
              },
            ),
          ),

          // **Zoom In Button**
          Positioned(
            top: 90,
            right: 16,
            child: zoomButton(
              icon: Icons.zoom_in,
              onPressed: () {
                _zoomIn();
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        color: whiteColor,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 30),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              "Quickly type your address or drop".translate(context),
              style: heading3Grey1(context),
            ),
            const SizedBox(height: 10),
            CustomsButtons(
              text: "Set Address",
              backgroundColor: themeColor,
              onPressed: () {
                if (textEditingAddressSearchController.text.isNotEmpty) {
                  if (!_matchesResolvedPin()) {
                    showErrorToastMessage(
                      "Please wait while the address is loading".translate(
                        context,
                      ),
                    );
                    return;
                  }
                  if (widget.checkStatus == true) {
                    context
                        .read<SelectedAddressCubit>()
                        .updateIsSelectePickupdAddress(
                          isCheckedSelectedPickup: true,
                        );
                    context
                        .read<SelectedAddressCubit>()
                        .updateIsSelectedDropOffAddress(
                          isCheckedSelectedDropOff: false,
                        );
                    context
                        .read<SelectedAddressCubit>()
                        .updateIsCrossIconSelectePickup(
                          icheckedCrossIconPickup: true,
                        );
                    context
                        .read<SelectedAddressCubit>()
                        .pickupAddressController
                        .text = textEditingAddressSearchController.text
                        .toString();
                    context.read<GetCordinatesCubit>().getCoordinates(
                      address: textEditingAddressSearchController.text
                          .toString(),
                      latitude: selectedMapLat,
                      longitude: selectedMapLng,
                    );

                    Navigator.of(context).pop();
                  } else {
                    final pickup = _validLatLng(
                      context
                          .read<BookRideRealTimeDataBaseCubit>()
                          .state
                          .pickupAddressLatitude,
                      context
                          .read<BookRideRealTimeDataBaseCubit>()
                          .state
                          .pickupAddressLongitude,
                    );
                    if (pickup != null &&
                        (pickup.latitude - selectedMapLat).abs() < 0.00001 &&
                        (pickup.longitude - selectedMapLng).abs() < 0.00001) {
                      showErrorToastMessage(
                        "Please select different address".translate(context),
                      );
                      return;
                    }
                    context
                        .read<SelectedAddressCubit>()
                        .updateIsSelectePickupdAddress(
                          isCheckedSelectedPickup: false,
                        );
                    context
                        .read<SelectedAddressCubit>()
                        .updateIsSelectedDropOffAddress(
                          isCheckedSelectedDropOff: true,
                        );
                    context
                        .read<SelectedAddressCubit>()
                        .updateIsCrossIconSelectedDropOff(
                          ischeckedCrossIconDropOff: true,
                        );

                    context
                        .read<SelectedAddressCubit>()
                        .dropOffAddressController
                        .text = textEditingAddressSearchController.text
                        .toString();
                    context.read<GetCordinatesCubit>().getCoordinates(
                      address: textEditingAddressSearchController.text
                          .toString(),
                      latitude: selectedMapLat,
                      longitude: selectedMapLng,
                    );
                    Navigator.of(context).pop();
                  }
                } else {
                  showErrorToastMessage(
                    "please selected the address".translate(context),
                  );
                }
              },
              textColor: blackColor,
            ),
          ],
        ),
      ),
    );
  }
}
