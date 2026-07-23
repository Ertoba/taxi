import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:ride_on/core/extensions/workspace.dart';
import 'package:ride_on/core/services/data_store.dart';

import 'ride_request_cubit.dart';

class SafeRideRequestCubit extends RideRequestCubit {
  @override
  Future<void> createDriverData({
    required String rideId,
    bool? checkRestart,
    required BuildContext context,
    required List<Map<String, dynamic>> nearbyDrivers,
    required String userId,
    required String userName,
    required double pickupLat,
    required double pickupLng,
    required String pickupAddress,
    required int durationForSearch,
    required double dropoffLat,
    required double dropoffLng,
    required String userPhoneNumber,
    String? userImageUrl,
    required String dropoffAddress,
    required String travelCharges,
    required String routeStatus,
    required String routeDistance,
    required String totalTime,
  }) async {
    final safeNearbyDrivers = nearbyDrivers
        .map(_driverRecordSafeForHive)
        .toList(growable: false);

    var safeCheckRestart = checkRestart;
    if (checkRestart == false) {
      final realtimeReady = await _createRealtimeRideBeforeDispatch(
        pickupLat: pickupLat,
        pickupLng: pickupLng,
        pickupAddress: pickupAddress,
        dropoffLat: dropoffLat,
        dropoffLng: dropoffLng,
        dropoffAddress: dropoffAddress,
        userId: userId,
        userName: userName,
        userPhoneNumber: userPhoneNumber,
        userImageUrl: userImageUrl,
        travelCharges: travelCharges,
        routeDistance: routeDistance,
        totalTime: totalTime,
        rideId: rideId,
      );

      if (!realtimeReady) {
        if (!isClosed) {
          emit(state.copyWith(
            rideId: rideId,
            isSubmitting: false,
            progressIndicator: false,
            rideMessage:
                'Unable to create the ride request. Check your connection and try again.',
          ));
        }
        return;
      }

      // The realtime ride is already committed. Prevent the legacy cubit from
      // starting a second unawaited write that could overwrite accepted data.
      safeCheckRestart = true;
    }

    await super.createDriverData(
      rideId: rideId,
      checkRestart: safeCheckRestart,
      context: context,
      nearbyDrivers: safeNearbyDrivers,
      userId: userId,
      userName: userName,
      pickupLat: pickupLat,
      pickupLng: pickupLng,
      pickupAddress: pickupAddress,
      durationForSearch: durationForSearch,
      dropoffLat: dropoffLat,
      dropoffLng: dropoffLng,
      userPhoneNumber: userPhoneNumber,
      userImageUrl: userImageUrl,
      dropoffAddress: dropoffAddress,
      travelCharges: travelCharges,
      routeStatus: routeStatus,
      routeDistance: routeDistance,
      totalTime: totalTime,
    );
  }

  Future<bool> _createRealtimeRideBeforeDispatch({
    required double pickupLat,
    required double pickupLng,
    required String pickupAddress,
    required double dropoffLat,
    required double dropoffLng,
    required String dropoffAddress,
    required String userId,
    required String userName,
    required String userPhoneNumber,
    required String travelCharges,
    required String routeDistance,
    required String totalTime,
    required String rideId,
    String? userImageUrl,
  }) async {
    final parcelData = _stringKeyedMap(box.get('current_parcel_data'));
    final rideData = <String, dynamic>{
      'OTP': '',
      'adminCommission': '',
      'rideId': rideId,
      'bookingId': '',
      'selectedDriverId': '',
      'rideStatusLabel': '',
      'pickupLocation': {
        'lat': pickupLat,
        'lng': pickupLng,
        'pickupAddress': pickupAddress,
      },
      'dropoffLocation': {
        'lat': dropoffLat,
        'lng': dropoffLng,
        'dropoffAddress': dropoffAddress,
      },
      'status': 'pending',
      'userId': userId,
      'customer': {
        'userName': userName,
        'userPhone': userPhoneNumber,
        'userPhoto': userImageUrl ?? 'defaultImageUrl',
        'userRating': loginModel?.data?.userRating ?? '',
        'userPhoneCountry': loginModel?.data?.phoneCountry ?? '',
      },
      'driverLocation': {'lat': '', 'lng': ''},
      'driver': {
        'driverName': '',
        'driverPhone': '',
        'driverPhoto': '',
        'driverRating': '',
      },
      'driverPayment': '',
      'totalDistance': routeDistance,
      'distanceRemain': '',
      'totalTime': totalTime,
      'timeRemain': '',
      'tax': '',
      'paymentStatus': '',
      'paymentMethod': 'cash',
      'travelCharges': travelCharges,
      'vehicleDetails': {
        'itemId': '',
        'itemTypeName': '',
        'vehicleNumber': '',
        'vehicleMake': '',
        'vehicleModel': '',
      },
      'parcelData': {
        'name': _stringValue(parcelData['name']),
        'weight': _stringValue(parcelData['weight']),
        'receiverName': _stringValue(parcelData['receiverName']),
        'receiverPhone': _stringValue(parcelData['receiverPhone']),
        'pickupInstructions': _stringValue(parcelData['pickupInstructions']),
      },
      'customerFeeback': {'rating': '', 'review': ''},
      'driverFeeback': {'rating': '', 'review': ''},
      'driverConfirmedPayment': '',
      'riderConfirmedPayment': '',
      'playerId': oneSignalPlayerId ?? '',
      'timestamp': DateTime.now().toIso8601String(),
    };

    try {
      await FirebaseDatabase.instance
          .ref()
          .child('ride_requests')
          .child(rideId)
          .set(rideData)
          .timeout(const Duration(seconds: 8));
      return true;
    } catch (error) {
      debugPrint(
        'Rider realtime ride initialization failed (${error.runtimeType}).',
      );
      return false;
    }
  }

  @override
  Future<void> listenForDriverResponses({
    required String currentRequestId,
    required double pickupLat,
    required double pickupLng,
    required String pickupAddress,
    required double dropoffLat,
    required double dropoffLng,
    required String dropoffAddress,
    required int durationForSearch,
    required List<String> driverIds,
    required String rideId,
    required BuildContext context,
    required Map<String, dynamic> rideRequestData,
    required List<Map<String, dynamic>> nearbyDrivers,
  }) async {
    var hasAccepted = false;
    final driverListeners =
        <StreamSubscription<DocumentSnapshot<Map<String, dynamic>>>>[];

    if (!isClosed) {
      emit(state.copyWith(
        rideId: rideId,
        isSubmitting: false,
        progressIndicator: true,
        rideMessage: '',
      ));
    }

    final searchTimeout = Timer(
      Duration(seconds: durationForSearch),
      () async {
        if (hasAccepted ||
            activeRideRequestId != currentRequestId ||
            isManuallyCancelled) {
          return;
        }

        for (final driverId in driverIds) {
          try {
            await FirebaseFirestore.instance
                .collection('drivers')
                .doc(driverId)
                .update({
              'ride_request': <String, dynamic>{},
              'rideStatus': 'available',
            });
          } catch (_) {
            // Another client may already have cleared this driver assignment.
          }
        }

        await _cancelSubscriptions(driverListeners);

        if (!isClosed) {
          emit(state.copyWith(progressIndicator: false));
        }
      },
    );

    for (final driverFireStoreId in driverIds) {
      final subscription = FirebaseFirestore.instance
          .collection('drivers')
          .doc(driverFireStoreId)
          .snapshots()
          .listen(
        (snapshot) async {
          if (!snapshot.exists || snapshot.data() == null || hasAccepted) {
            return;
          }

          final driverData = snapshot.data()!;
          final rideRequest = _stringKeyedMap(driverData['ride_request']);
          if (rideRequest.isEmpty) return;

          final acceptedRideId = _stringValue(rideRequest['rideId']);
          final acceptedStatus =
              _stringValue(rideRequest['status']).toLowerCase();

          if (acceptedRideId != rideId || acceptedStatus != 'accepted') {
            return;
          }

          hasAccepted = true;
          searchTimeout.cancel();
          await _cancelSubscriptions(driverListeners);

          try {
            await FirebaseFirestore.instance
                .collection('drivers')
                .doc(driverFireStoreId)
                .update({'rideStatus': 'busy'});
          } catch (_) {
            // The accepted ride remains valid even if this status write races.
          }

          final customer = _stringKeyedMap(rideRequestData['customer']);
          var acceptedDriverId = _stringValue(driverData['driverId']);
          var acceptedDriverData = driverData;

          if (acceptedDriverId.isEmpty) {
            try {
              final refreshed = await FirebaseFirestore.instance
                  .collection('drivers')
                  .doc(driverFireStoreId)
                  .get()
                  .timeout(const Duration(seconds: 3));
              acceptedDriverData = refreshed.data() ?? driverData;
              acceptedDriverId =
                  _stringValue(acceptedDriverData['driverId']);
            } catch (_) {
              // Keep the accepted snapshot and handle the missing ID below.
            }
          }

          if (acceptedDriverId.isEmpty) {
            debugPrint('Rider accepted driver ID is unavailable.');
            if (!isClosed) {
              emit(state.copyWith(
                rideId: rideId,
                isSubmitting: true,
                progressIndicator: false,
                rideMessage:
                    'The driver accepted your ride. Driver details are still syncing.',
              ));
            }
            return;
          }

          _applyAcceptedRide(
            driverData: acceptedDriverData,
            pickupLat: pickupLat,
            pickupLng: pickupLng,
            dropoffLat: dropoffLat,
            dropoffLng: dropoffLng,
            driverId: acceptedDriverId,
            rideId: rideId,
            userId: _stringValue(rideRequestData['userId']),
            userName: _stringValue(customer['userName']),
            pickupAddress: pickupAddress,
            dropoffAddress: dropoffAddress,
            userPhoneNumber: _stringValue(customer['userPhone']),
            userImageUrl: _nullableString(customer['userPhoto']),
            travelCharges: _stringValue(rideRequestData['travelCharges']),
            routeStatus: 'accepted',
            routeDistance: _stringValue(rideRequestData['travelDistance']),
          );

          for (final otherDriverId in driverIds) {
            if (otherDriverId == driverFireStoreId) continue;

            try {
              await FirebaseFirestore.instance
                  .collection('drivers')
                  .doc(otherDriverId)
                  .update({
                'ride_request': <String, dynamic>{},
                'rideStatus': 'available',
              });
            } catch (_) {
              // A rejected/expired assignment may already be gone.
            }
          }
        },
        onError: (Object error) {
          debugPrint(
            'Rider driver-response listener failed (${error.runtimeType}).',
          );
        },
      );

      driverListeners.add(subscription);
    }
  }

  void _applyAcceptedRide({
    required Map<String, dynamic> driverData,
    required double pickupLat,
    required double pickupLng,
    required double dropoffLat,
    required double dropoffLng,
    required String driverId,
    required String rideId,
    required String userId,
    required String userName,
    required String pickupAddress,
    required String userPhoneNumber,
    String? userImageUrl,
    required String dropoffAddress,
    required String travelCharges,
    required String routeStatus,
    required String routeDistance,
  }) {
    final driverName = _stringValue(driverData['driverName']);
    final driverPhone = _stringValue(driverData['driverNumber']);
    final driverPhoto = _stringValue(driverData['driverImageUrl']);
    final driverRating = _stringValue(driverData['driverRating']);
    final itemId = _stringValue(driverData['itemId']);
    final vehicleNumber = _stringValue(driverData['vehicleNumber']);
    final itemTypeName = _stringValue(driverData['itemTypeName']);
    final vehicleMake = _stringValue(driverData['vehicleMake']);
    final vehicleModel = _stringValue(driverData['vehicleModel']);
    final itemTypeId = _stringValue(driverData['itemTypeId']);

    var driverLat = 0.0;
    var driverLng = 0.0;
    final geo = _stringKeyedMap(driverData['geo']);
    final geoPointValue = geo['geopoint'];

    if (geoPointValue is GeoPoint) {
      driverLat = geoPointValue.latitude;
      driverLng = geoPointValue.longitude;
    } else {
      final geoPointMap = _stringKeyedMap(geoPointValue);
      driverLat = _doubleValue(
        geoPointMap['latitude'] ?? geoPointMap['lat'],
      );
      driverLng = _doubleValue(
        geoPointMap['longitude'] ?? geoPointMap['lng'],
      );
    }

    if (!isClosed) {
      emit(state.copyWith(
        pickupAddress: pickupAddress,
        dropOffAddress: dropoffAddress,
        isSubmitting: true,
        progressIndicator: false,
        rideMessage: '',
        driverRating: driverRating,
        vehicleMake: vehicleMake,
        vehicleModel: vehicleModel,
        accepteDriverPhoneNumber: driverPhone,
        acceptedDriverImageUrl: driverPhoto,
        acceptedDriverName: driverName,
        acceptedDriverVechileName: '$vehicleMake $vehicleModel'.trim(),
        acceptedDriverVechileNumber: vehicleNumber,
        itemId: itemId,
        rideId: rideId,
        selectedDriverId: driverId,
        acceptedDriverLat: driverLat,
        acceptedDriverLng: driverLng,
      ));
    }

    final rideData = <String, dynamic>{
      'selectedDriverId': driverId,
      'status': routeStatus,
      'userId': userId,
      'driverLocation': {'lat': driverLat, 'lng': driverLng},
      'driver': {
        'driverName': driverName,
        'driverPhone': driverPhone,
        'driverPhoto': driverPhoto,
        'driverRating': driverRating,
      },
      'vehicleDetails': {
        'itemId': itemId,
        'itemTypeName': itemTypeName,
        'vehicleNumber': vehicleNumber,
        'vehicleMake': vehicleMake,
        'vehicleModel': vehicleModel,
      },
      'timestamp': DateTime.now().toIso8601String(),
    };

    final localRideData = <String, dynamic>{
      'rideId': rideId,
      'itemId': itemId,
      'selectedDriverId': driverId,
      'acceptedDriverLat': driverLat,
      'acceptedDriverLng': driverLng,
      'driverName': driverName,
      'driverImage': driverPhoto,
      'driverNumber': driverPhone,
      'vehicleNumber': vehicleNumber,
      'rating': driverRating,
      'pickAddress': pickupAddress,
      'dropAddress': dropoffAddress,
      'pickLat': pickupLat,
      'dropLat': dropoffLat,
      'pickLng': pickupLng,
      'dropLng': dropoffLng,
      'itemTypeId': itemTypeId,
      'userName': userName,
      'userPhone': userPhoneNumber,
      'userPhoto': userImageUrl,
      'travelCharges': travelCharges,
      'routeDistance': routeDistance,
    };

    unawaited(_persistAcceptedRideRealtime(rideId, rideData));
    unawaited(_persistAcceptedRideLocally(localRideData));
  }

  Future<void> _persistAcceptedRideRealtime(
    String rideId,
    Map<String, dynamic> rideData,
  ) async {
    final rideRef = FirebaseDatabase.instance
        .ref()
        .child('ride_requests')
        .child(rideId);

    for (var attempt = 0; attempt < 3; attempt++) {
      try {
        await rideRef.update(rideData).timeout(const Duration(seconds: 5));
        return;
      } catch (error) {
        if (attempt == 2) {
          debugPrint(
            'Rider accepted realtime persistence failed '
            '(${error.runtimeType}).',
          );
          return;
        }

        await Future<void>.delayed(
          Duration(milliseconds: 250 * (attempt + 1)),
        );
      }
    }
  }

  Future<void> _persistAcceptedRideLocally(
    Map<String, dynamic> rideData,
  ) async {
    try {
      await box.put('ride_data', rideData);
    } catch (error) {
      debugPrint(
        'Rider accepted local persistence failed (${error.runtimeType}).',
      );
    }
  }
}

Future<void> _cancelSubscriptions(
  List<StreamSubscription<DocumentSnapshot<Map<String, dynamic>>>> subscriptions,
) async {
  final currentSubscriptions = List.of(subscriptions);
  subscriptions.clear();

  for (final subscription in currentSubscriptions) {
    await subscription.cancel();
  }
}

Map<String, dynamic> _driverRecordSafeForHive(
  Map<String, dynamic> driver,
) {
  final normalized = _stringKeyedMap(_hiveSafeValue(driver));
  normalized['id'] = _stringValue(driver['id']);
  return normalized;
}

Object? _hiveSafeValue(Object? value) {
  if (value == null || value is String || value is num || value is bool) {
    return value;
  }

  if (value is GeoPoint) {
    return <String, double>{
      'latitude': value.latitude,
      'longitude': value.longitude,
    };
  }

  if (value is Timestamp) {
    return value.toDate().toIso8601String();
  }

  if (value is DocumentReference) {
    return value.path;
  }

  if (value is DateTime) {
    return value.toIso8601String();
  }

  if (value is Map) {
    return value.map(
      (key, mapValue) => MapEntry(
        key.toString(),
        _hiveSafeValue(mapValue),
      ),
    );
  }

  if (value is Iterable) {
    return value.map(_hiveSafeValue).toList(growable: false);
  }

  return value.toString();
}

Map<String, dynamic> _stringKeyedMap(Object? value) {
  if (value is! Map) return <String, dynamic>{};

  return value.map(
    (key, mapValue) => MapEntry(key.toString(), mapValue),
  );
}

String _stringValue(Object? value) => value?.toString().trim() ?? '';

String? _nullableString(Object? value) {
  final normalized = _stringValue(value);
  return normalized.isEmpty ? null : normalized;
}

double _doubleValue(Object? value) {
  if (value is num) return value.toDouble();
  return double.tryParse(_stringValue(value)) ?? 0.0;
}
