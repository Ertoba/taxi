import 'package:flutter/services.dart';

class NativePlacePrediction {
  const NativePlacePrediction({
    required this.placeId,
    required this.description,
  });

  final String placeId;
  final String description;

  factory NativePlacePrediction.fromMap(Map<Object?, Object?> map) {
    return NativePlacePrediction(
      placeId: map['placeId']?.toString() ?? '',
      description: map['description']?.toString() ?? '',
    );
  }
}

class NativePlaceDetails {
  const NativePlaceDetails({
    required this.placeId,
    required this.description,
    required this.latitude,
    required this.longitude,
  });

  final String placeId;
  final String description;
  final double latitude;
  final double longitude;

  factory NativePlaceDetails.fromMap(Map<Object?, Object?> map) {
    return NativePlaceDetails(
      placeId: map['placeId']?.toString() ?? '',
      description: map['description']?.toString() ?? '',
      latitude: (map['latitude'] as num).toDouble(),
      longitude: (map['longitude'] as num).toDouble(),
    );
  }
}

class NativePlacesService {
  static const MethodChannel _channel = MethodChannel('ge.mili.taxi/places');

  Future<List<NativePlacePrediction>> findPredictions(String query) async {
    final result = await _channel.invokeListMethod<Object?>(
      'findPredictions',
      <String, Object?>{'query': query},
    );

    return (result ?? const <Object?>[])
        .whereType<Map<Object?, Object?>>()
        .map(NativePlacePrediction.fromMap)
        .where(
          (prediction) =>
              prediction.placeId.isNotEmpty &&
              prediction.description.isNotEmpty,
        )
        .toList(growable: false);
  }

  Future<NativePlaceDetails> fetchPlace(String placeId) async {
    final result = await _channel.invokeMapMethod<Object?, Object?>(
      'fetchPlace',
      <String, Object?>{'placeId': placeId},
    );
    if (result == null) {
      throw PlatformException(
        code: 'EMPTY_PLACE_RESULT',
        message: 'Unable to load the selected address.',
      );
    }
    return NativePlaceDetails.fromMap(result);
  }

  Future<void> cancelSession() {
    return _channel.invokeMethod<void>('cancelSession');
  }
}
