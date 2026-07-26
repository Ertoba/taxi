import 'dart:async';

import 'package:firebase_database/firebase_database.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class GetRideRequestStatusCubit extends Cubit<String> {
  GetRideRequestStatusCubit() : super("");
  final DatabaseReference _rideRequestsRef = FirebaseDatabase.instance
      .ref()
      .child('ride_requests');
  StreamSubscription<DatabaseEvent>? _subscription;

  void listenToRouteStatus({required String rideId}) {
    _subscription?.cancel();

    if (rideId.trim().isEmpty) {
      emit("");
      return;
    }

    _subscription = _rideRequestsRef.child(rideId).onValue.listen((event) {
      final value = event.snapshot.value;
      if (value is Map) {
        emit(value['status']?.toString().trim().toLowerCase() ?? "");
      }
    });
  }

  void resetState() {
    _subscription?.cancel();
    _subscription = null;
    emit("");
  }

  @override
  Future<void> close() {
    _subscription?.cancel();
    return super.close();
  }
}

class GetRideRequestPaymentCubit extends Cubit<Map<String, String>> {
  GetRideRequestPaymentCubit() : super({});

  final DatabaseReference _database = FirebaseDatabase.instance.ref();
  StreamSubscription<DatabaseEvent>? _subscription;

  void listenToPaymentStatusAndMethod({required String rideId}) {
    _subscription?.cancel();

    _subscription = _database
        .child('ride_requests')
        .child(rideId)
        .onValue
        .listen((event) {
          final data = event.snapshot.value as Map<dynamic, dynamic>?;

          if (data == null) {
            emit({'paymentStatus': '', 'paymentMethod': ''});
            return;
          }

          // ignore: unnecessary_null_comparison
          if (data != null) {
            final paymentStatus = data['paymentStatus']?.toString() ?? '';
            final paymentMethod = data['paymentMethod']?.toString() ?? '';

            emit({
              'paymentStatus': paymentStatus,
              'paymentMethod': paymentMethod,
            });
          }
        });
  }

  void resetStatus() {
    _subscription?.cancel();
    _subscription = null;
    emit({});
  }

  @override
  Future<void> close() {
    _subscription?.cancel();
    return super.close();
  }
}
