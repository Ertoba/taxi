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

    await super.createDriverData(
      rideId: rideId,
      checkRestart: checkRestart,
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

          final data = snapshot.data()!;
          final rideRequest = _stringKeyedMap(data['ride_request']);
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

          try {
            final customer = _stringKeyedMap(rideRequestData['customer']);
            final acceptedDriverId = _stringValue(data['driverId']);

            if (acceptedDriverId.isEmpty) {
              throw StateError('Accepted driver ID is missing.');
            }

            await _createAcceptedRideRequestInRealTimeSafely(
              pickupLat: pickupLat,
              pickupLng: pickupLng,
              dropoffLat: dropoffLat,
              dropoffLng: dropoffLng,
              driverId: acceptedDriverId,
              fireStoreToken: driverFireStoreId,
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

            if (!isClosed) {
              emit(state.copyWith(progressIndicator: false));
            }
          } catch (error) {
            debugPrint(
              'Rider accepted-ride processing failed (${error.runtimeType}).',
            );

            if (!isClosed) {
              emit(state.copyWith(
                rideId: rideId,
                isSubmitting: false,
                progressIndicator: false,
                rideMessage:
                    'Unable to finish the accepted ride setup. Please try again.',
              ));
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

  Future<void> _createAcceptedRideRequestInRealTimeSafely({
    required double pickupLat,
    required double pickupLng,
    required double dropoffLat,
    required double dropoffLng,
    required String driverId,
    required String fireStoreToken,
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
  }) async {
    final rideRequestRef =
        FirebaseDatabase.instance.ref().child('ride_requests');

    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('drivers')
          .doc(fireStoreToken)
          .get();

      final data = snapshot.data();
      if (!snapshot.exists || data == null) {
        throw StateError('Accepted driver document is unavailable.');
      }

      final driverName = _stringValue(data['driverName']);
      final driverPhone = _stringValue(data['driverNumber']);
      final driverPhoto = _stringValue(data['driverImageUrl']);
      final driverRating = _stringValue(data['driverRating']);
      final itemId = _stringValue(data['itemId']);
      final vehicleNumber = _stringValue(data['vehicleNumber']);
      final itemTypeName = _stringValue(data['itemTypeName']);
      final vehicleMake = _stringValue(data['vehicleMake']);
      final vehicleModel = _stringValue(data['vehicleModel']);
      final itemTypeId = _stringValue(data['itemTypeId']);

      var driverLat = 0.0;
      var driverLng = 0.0;
      final geo = _stringKeyedMap(data['geo']);
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

      await rideRequestRef.child(rideId).update(rideData);

      if (!isClosed) {
        emit(state.copyWith(
          pickupAddress: pickupAddress,
          dropOffAddress: dropoffAddress,
          isSubmitting: true,
          progressIndicator: false,
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

      await box.put('ride_data', <String, dynamic>{
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
      });
    } catch (error) {
      debugPrint(
        'Rider accepted-ride persistence failed (${error.runtimeType}).',
      );

      if (!isClosed) {
        emit(state.copyWith(
          rideId: rideId,
          isSubmitting: false,
          progressIndicator: false,
          rideMessage:
              'No driver accepted the ride request. Please try again with another vehicle.',
        ));
      }
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
