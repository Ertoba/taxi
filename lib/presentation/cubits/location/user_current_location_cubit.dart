import 'dart:async';
import 'dart:convert';

import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:ride_on/domain/entities/catrgory.dart';

import '../../../core/services/config.dart';
import '../../../core/services/reverse_geocoding_service.dart';

abstract class LocationState extends Equatable {
  @override
  List<Object?> get props => [];
}

class LocationInitial extends LocationState {}

class LocationLoading extends LocationState {}

class LocationSucess extends LocationState {
  final LatLng? currentLocation;

  LocationSucess({this.currentLocation});

  @override
  List<Object?> get props => [currentLocation];
}

class LocationFailure extends LocationState {
  final String? error;

  LocationFailure({this.error});

  @override
  List<Object?> get props => [error];
}

class LocationUserCubit extends Cubit<LocationState> {
  LocationUserCubit() : super(LocationInitial());

  late StreamSubscription<Position> positionStreamSubscription;
  var markers = <Marker>{};
  Timer? _debounceTimer;

  Future<void> startLiveLocationTracking({bool? ischeckedLoading}) async {
    try {
      if (ischeckedLoading == true) {
        emit(LocationLoading());
      }

      final permission = await _checkPermissions();
      if (permission == LocationPermission.denied ||
          permission == LocationPermission.deniedForever) {
        return;
      }

      final position = await Geolocator.getCurrentPosition(
        // ignore: deprecated_member_use
        desiredAccuracy: LocationAccuracy.high,
      );

      updateUserLocation(position);
    } catch (error) {
      emit(LocationFailure(error: '$error'));
    }
  }

  Future<LocationPermission> _checkPermissions() async {
    final serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return LocationPermission.denied;
    }

    var permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }

    return permission;
  }

  void updateUserLocation(Position position) {
    try {
      _debounceTimer?.cancel();
      _debounceTimer = Timer(const Duration(seconds: 1), () {
        final currentLocation = LatLng(position.latitude, position.longitude);
        emit(LocationSucess(currentLocation: currentLocation));
      });
    } catch (error) {
      emit(LocationFailure(error: '$error'));
    }
  }

  void removeState() {
    emit(LocationInitial());
  }
}

abstract class UpdateCurrentAddressState extends Equatable {
  @override
  List<Object?> get props => [];
}

class UpdateCurrentAddresInitial extends UpdateCurrentAddressState {}

class UpdateCurrentAddressLoading extends UpdateCurrentAddressState {}

class UpdateCurrentAddressFailed extends UpdateCurrentAddressState {}

class UpdateCurrentAddresSuccess extends UpdateCurrentAddressState {
  final String? currentAddress;
  final double? lat;
  final double? lng;

  UpdateCurrentAddresSuccess({this.currentAddress, this.lat, this.lng});

  @override
  List<Object?> get props => [currentAddress, lat, lng];
}

class UpdateCurrentAddressCubit extends Cubit<UpdateCurrentAddressState> {
  UpdateCurrentAddressCubit() : super(UpdateCurrentAddresInitial());

  Future<void> getAddressFromLatLng({
    double? latitude,
    double? longitude,
  }) async {
    if (latitude == null || longitude == null) {
      emit(UpdateCurrentAddressFailed());
      return;
    }

    emit(UpdateCurrentAddressLoading());

    final address = await ReverseGeocodingService.resolve(
      latitude: latitude,
      longitude: longitude,
    );

    if (address == null || address.trim().isEmpty) {
      emit(UpdateCurrentAddressFailed());
      return;
    }

    emit(
      UpdateCurrentAddresSuccess(
        currentAddress: address,
        lat: latitude,
        lng: longitude,
      ),
    );
  }

  void removeAddress() {
    emit(UpdateCurrentAddresInitial());
  }
}

abstract class UpdateSearchMapAddressState extends Equatable {
  @override
  List<Object?> get props => [];
}

class UpdateSearchMapAddresInitial extends UpdateSearchMapAddressState {}

class UpdateSearchMapAddresSuccess extends UpdateSearchMapAddressState {
  final String? currentAddress;
  final double? lat;
  final double? lng;

  UpdateSearchMapAddresSuccess({this.currentAddress, this.lat, this.lng});

  @override
  List<Object?> get props => [currentAddress, lat, lng];
}

class UpdateSearchMapAddressCubit extends Cubit<UpdateSearchMapAddressState> {
  UpdateSearchMapAddressCubit() : super(UpdateSearchMapAddresInitial());

  Future<void> getAddressFromLatLng({
    double? latitude,
    double? longitude,
  }) async {
    if (latitude == null || longitude == null) return;

    final address = await ReverseGeocodingService.resolve(
      latitude: latitude,
      longitude: longitude,
    );

    if (address == null || address.trim().isEmpty) return;

    emit(
      UpdateSearchMapAddresSuccess(
        currentAddress: address,
        lat: latitude,
        lng: longitude,
      ),
    );
  }

  void removeAddress() {
    emit(UpdateSearchMapAddresInitial());
  }
}

class GetSuggestionAddressState extends Equatable {
  @override
  List<Object?> get props => [];
}

class AddressSuggestion extends Equatable {
  final String description;
  final String placeId;

  const AddressSuggestion({required this.description, required this.placeId});

  @override
  List<Object?> get props => [description, placeId];
}

class GetSuggestionAddressSuccess extends GetSuggestionAddressState {
  final List<AddressSuggestion>? suggestions;

  GetSuggestionAddressSuccess({this.suggestions});

  @override
  List<Object?> get props => [suggestions];
}

class GetSuggestionAddressCubit extends Cubit<GetSuggestionAddressState> {
  GetSuggestionAddressCubit() : super(GetSuggestionAddressState());

  Future<void> getSuggestions(String query) async {
    if (query.isEmpty) {
      emit(GetSuggestionAddressSuccess(suggestions: const []));
      return;
    }

    const apiKey = Config.googleKey;
    final url = Uri.https(
      'maps.googleapis.com',
      '/maps/api/place/autocomplete/json',
      <String, String>{
        'input': query,
        'components': 'country:ge',
        'language': 'ka',
        'region': 'ge',
        'key': apiKey,
      },
    );

    try {
      final response = await http.get(url);
      if (response.statusCode != 200) {
        emit(GetSuggestionAddressSuccess(suggestions: const []));
        return;
      }

      final jsonResponse = json.decode(response.body);
      if (jsonResponse is! Map<String, dynamic>) {
        emit(GetSuggestionAddressSuccess(suggestions: const []));
        return;
      }

      final predictions = jsonResponse['predictions'];
      if (predictions is! List || predictions.isEmpty) {
        emit(GetSuggestionAddressSuccess(suggestions: const []));
        return;
      }

      final suggestions = predictions
          .whereType<Map<String, dynamic>>()
          .map(
            (place) => AddressSuggestion(
              description: place['description']?.toString().trim() ?? '',
              placeId: place['place_id']?.toString().trim() ?? '',
            ),
          )
          .where(
            (suggestion) =>
                suggestion.description.isNotEmpty &&
                suggestion.placeId.isNotEmpty,
          )
          .toList(growable: false);

      emit(GetSuggestionAddressSuccess(suggestions: suggestions));
    } catch (_) {
      emit(GetSuggestionAddressSuccess(suggestions: const []));
    }
  }

  void removeAddress() {
    emit(GetSuggestionAddressSuccess(suggestions: const []));
  }
}

class GetCordinatesState extends Equatable {
  @override
  List<Object?> get props => [];
}

class GetCordinatesSuccess extends GetCordinatesState {
  final String? lattiude;
  final String? longitude;
  final String? address;

  GetCordinatesSuccess({this.lattiude, this.longitude, this.address});

  @override
  List<Object?> get props => [lattiude, longitude];
}

class GetCordinatesFailure extends GetCordinatesState {
  final String? error;

  GetCordinatesFailure({this.error});

  @override
  List<Object?> get props => [error];
}

class GetCordinatesCubit extends Cubit<GetCordinatesState> {
  GetCordinatesCubit() : super(GetCordinatesState());

  Future<void> getCoordinates({
    required String address,
    bool? checkStatus,
    double? latitude,
    double? longitude,
    String? placeId,
  }) async {
    try {
      if (latitude != null || longitude != null) {
        if (!_isValidCoordinate(latitude, longitude)) {
          emit(GetCordinatesFailure(error: 'Invalid map coordinates'));
          return;
        }

        emit(
          GetCordinatesSuccess(
            lattiude: latitude!.toStringAsFixed(7),
            longitude: longitude!.toStringAsFixed(7),
            address: address,
          ),
        );
        return;
      }

      const googleApiKey = Config.googleKey;
      final normalizedPlaceId = placeId?.trim() ?? '';
      final parameters = <String, String>{
        if (normalizedPlaceId.isNotEmpty)
          'place_id': normalizedPlaceId
        else
          'address': address,
        'language': 'ka',
        'region': 'ge',
        'key': googleApiKey,
      };
      final url = Uri.https(
        'maps.googleapis.com',
        '/maps/api/geocode/json',
        parameters,
      );

      final response = await http.get(url);
      if (response.statusCode != 200) {
        emit(GetCordinatesFailure(error: 'HTTP error: ${response.statusCode}'));
        return;
      }

      final data = json.decode(response.body);
      if (data['status'] != 'OK') {
        emit(GetCordinatesFailure(error: data['status']?.toString()));
        return;
      }

      final results = data['results'];
      if (results is! List || results.isEmpty) {
        emit(GetCordinatesFailure(error: 'ZERO_RESULTS'));
        return;
      }

      final location = results[0]['geometry']['location'];
      final resolvedLatitude = (location['lat'] as num?)?.toDouble();
      final resolvedLongitude = (location['lng'] as num?)?.toDouble();
      if (!_isValidCoordinate(resolvedLatitude, resolvedLongitude)) {
        emit(GetCordinatesFailure(error: 'Invalid geocoding response'));
        return;
      }

      emit(
        GetCordinatesSuccess(
          lattiude: resolvedLatitude!.toStringAsFixed(7),
          longitude: resolvedLongitude!.toStringAsFixed(7),
          address: address,
        ),
      );
    } catch (error) {
      emit(GetCordinatesFailure(error: 'Exception: $error'));
    }
  }

  void removeCordinates() {
    emit(GetCordinatesSuccess(lattiude: '', longitude: ''));
  }

  static bool _isValidCoordinate(double? latitude, double? longitude) {
    if (latitude == null || longitude == null) return false;
    if (!latitude.isFinite || !longitude.isFinite) return false;

    return latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180 &&
        !(latitude == 0 && longitude == 0);
  }
}

class SelectedAddressState extends Equatable {
  final String selectedPickupAddress;
  final String selectedDropOffAddress;
  final bool isCheckedSelectedPickup;
  final bool isCheckedSelectedDropOff;
  final bool icheckedCrossIconPickup;
  final bool ischeckedCrossIconDropOff;
  final bool ischeckedPickupSuggestion;
  final bool ischekcedDropOffSuggestion;

  const SelectedAddressState({
    this.selectedPickupAddress = '',
    this.selectedDropOffAddress = '',
    this.ischeckedPickupSuggestion = false,
    this.ischekcedDropOffSuggestion = false,
    this.icheckedCrossIconPickup = false,
    this.ischeckedCrossIconDropOff = false,
    this.isCheckedSelectedDropOff = false,
    this.isCheckedSelectedPickup = false,
  });

  SelectedAddressState copyWith({
    String? selectedPickupAddress,
    String? selectedDropOffAddress,
    bool? isCheckedSelectedDropOff,
    bool? ischeckedPickupSuggestion,
    bool? ischekcedDropOffSuggestion,
    bool? isCheckedSelectedPickup,
    bool? icheckedCrossIconPickup,
    bool? ischeckedCrossIconDropOff,
  }) {
    return SelectedAddressState(
      ischeckedPickupSuggestion:
          ischeckedPickupSuggestion ?? this.ischeckedPickupSuggestion,
      ischekcedDropOffSuggestion:
          ischekcedDropOffSuggestion ?? this.ischekcedDropOffSuggestion,
      ischeckedCrossIconDropOff:
          ischeckedCrossIconDropOff ?? this.ischeckedCrossIconDropOff,
      icheckedCrossIconPickup:
          icheckedCrossIconPickup ?? this.icheckedCrossIconPickup,
      isCheckedSelectedDropOff:
          isCheckedSelectedDropOff ?? this.isCheckedSelectedDropOff,
      isCheckedSelectedPickup:
          isCheckedSelectedPickup ?? this.isCheckedSelectedPickup,
      selectedPickupAddress:
          selectedPickupAddress ?? this.selectedPickupAddress,
      selectedDropOffAddress:
          selectedDropOffAddress ?? this.selectedDropOffAddress,
    );
  }

  @override
  List<Object?> get props => [
    selectedPickupAddress,
    selectedDropOffAddress,
    isCheckedSelectedDropOff,
    isCheckedSelectedPickup,
    ischeckedCrossIconDropOff,
    icheckedCrossIconPickup,
    ischeckedPickupSuggestion,
    ischekcedDropOffSuggestion,
  ];
}

class SelectedAddressCubit extends Cubit<SelectedAddressState> {
  SelectedAddressCubit() : super(const SelectedAddressState());

  final TextEditingController pickupAddressController = TextEditingController();
  final TextEditingController dropOffAddressController =
      TextEditingController();

  void updateSelectePickupdSuggestion({bool? ischeckedPickupSuggestion}) {
    emit(state.copyWith(ischeckedPickupSuggestion: ischeckedPickupSuggestion));
  }

  void updateSelecteDropOffdSuggestion({bool? ischekcedDropOffSuggestion}) {
    emit(
      state.copyWith(ischekcedDropOffSuggestion: ischekcedDropOffSuggestion),
    );
  }

  void removeSelectePickupdSuggestion() {
    emit(state.copyWith(ischeckedPickupSuggestion: false));
  }

  void removeSelecteDropOffdSuggestion() {
    emit(state.copyWith(ischekcedDropOffSuggestion: false));
  }

  void updateSelectePickupdAddress({String? selectedPickupAddress}) {
    emit(state.copyWith(selectedPickupAddress: selectedPickupAddress));
  }

  void updateSelecteDropOffdAddress({String? selectedDropOffAddress}) {
    emit(state.copyWith(selectedDropOffAddress: selectedDropOffAddress));
  }

  void updateIsSelectePickupdAddress({bool? isCheckedSelectedPickup}) {
    emit(state.copyWith(isCheckedSelectedPickup: isCheckedSelectedPickup));
  }

  void updateIsSelectedDropOffAddress({bool? isCheckedSelectedDropOff}) {
    emit(state.copyWith(isCheckedSelectedDropOff: isCheckedSelectedDropOff));
  }

  void updateIsCrossIconSelectePickup({bool? icheckedCrossIconPickup}) {
    emit(state.copyWith(icheckedCrossIconPickup: icheckedCrossIconPickup));
  }

  void updateIsCrossIconSelectedDropOff({bool? ischeckedCrossIconDropOff}) {
    emit(state.copyWith(ischeckedCrossIconDropOff: ischeckedCrossIconDropOff));
  }

  void removeIsCrossIconSelectePickupd() {
    emit(const SelectedAddressState(icheckedCrossIconPickup: false));
  }

  void removeIsCrosssIconSelectedDropOff() {
    emit(const SelectedAddressState(ischeckedCrossIconDropOff: false));
  }

  void removeIsSelectePickupdAddress() {
    emit(const SelectedAddressState(isCheckedSelectedPickup: false));
  }

  void removeIsSelectedDropOffAddress() {
    emit(const SelectedAddressState(isCheckedSelectedDropOff: false));
  }

  void removeSelectedPickupAddress() {
    emit(const SelectedAddressState(selectedPickupAddress: ''));
  }

  void removeSelectedDropOffAddress() {
    emit(const SelectedAddressState(selectedDropOffAddress: ''));
  }

  void resetAllParameter() {
    emit(const SelectedAddressState());
  }
}

class SetVehicleCategoryState extends Equatable {
  final List<ItemTypes> itemList;

  const SetVehicleCategoryState({this.itemList = const []});

  SetVehicleCategoryState copyWith({List<ItemTypes>? itemList}) {
    return SetVehicleCategoryState(itemList: itemList ?? this.itemList);
  }

  bool shouldRebuild(SetVehicleCategoryState previousState) {
    return itemList != previousState.itemList;
  }

  @override
  List<Object?> get props => [itemList];
}

class SetVehicleCategoryCubit extends Cubit<SetVehicleCategoryState> {
  SetVehicleCategoryCubit() : super(const SetVehicleCategoryState());

  void updateSetVehicleCategoryList(List<ItemTypes>? itemList) {
    emit(state.copyWith(itemList: itemList));
  }

  void resetState() {
    emit(const SetVehicleCategoryState());
  }
}
