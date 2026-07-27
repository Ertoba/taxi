import 'dart:convert';

import 'package:geocoding/geocoding.dart';
import 'package:http/http.dart' as http;

import 'config.dart';

class ReverseGeocodingService {
  const ReverseGeocodingService._();

  static Future<String?> resolve({
    required double latitude,
    required double longitude,
  }) async {
    final nativeAddress = await _resolveWithNativeGeocoder(
      latitude: latitude,
      longitude: longitude,
    );

    if (_isSpecificAddress(nativeAddress)) {
      return nativeAddress;
    }

    final googleAddress = await _resolveWithGoogle(
      latitude: latitude,
      longitude: longitude,
    );
    if (googleAddress != null && googleAddress.isNotEmpty) {
      return googleAddress;
    }

    // A generic native value is still better than leaving the field empty
    // when the network fallback is unavailable.
    return nativeAddress;
  }

  static bool _isSpecificAddress(String? address) {
    if (address == null || address.trim().isEmpty) return false;

    final parts = address
        .split(',')
        .map((part) => part.trim())
        .where((part) => part.isNotEmpty)
        .toList(growable: false);

    final hasPlusCode = RegExp(
      r'\b[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}\b',
      caseSensitive: false,
    ).hasMatch(address);

    return hasPlusCode || parts.length >= 3;
  }

  static Future<String?> _resolveWithNativeGeocoder({
    required double latitude,
    required double longitude,
  }) async {
    try {
      final placemarks = await placemarkFromCoordinates(latitude, longitude);
      if (placemarks.isEmpty) return null;

      final address = _formatPlacemark(placemarks.first);
      return address.isEmpty ? null : address;
    } catch (_) {
      return null;
    }
  }

  static String _formatPlacemark(Placemark place) {
    final values = <String?>[
      place.name,
      place.street,
      place.subLocality,
      place.locality,
      place.subAdministrativeArea,
      place.administrativeArea,
      place.postalCode,
      place.country,
    ];

    final seen = <String>{};
    final parts = <String>[];
    for (final rawValue in values) {
      final value = rawValue?.trim() ?? '';
      if (value.isEmpty) continue;

      final normalized = value.toLowerCase();
      if (seen.add(normalized)) {
        parts.add(value);
      }
    }

    return parts.join(', ');
  }

  static Future<String?> _resolveWithGoogle({
    required double latitude,
    required double longitude,
  }) async {
    if (Config.googleKey.trim().isEmpty) return null;

    final uri = Uri.https(
      'maps.googleapis.com',
      '/maps/api/geocode/json',
      <String, String>{
        'latlng': '$latitude,$longitude',
        'language': 'ka',
        'region': 'ge',
        'key': Config.googleKey,
      },
    );

    try {
      final response = await http.get(uri);
      if (response.statusCode != 200) return null;

      final data = json.decode(response.body);
      if (data is! Map<String, dynamic> || data['status'] != 'OK') {
        return null;
      }

      final results = data['results'];
      if (results is! List || results.isEmpty) return null;

      for (final result in results) {
        if (result is! Map<String, dynamic>) continue;
        final address = result['formatted_address']?.toString().trim() ?? '';
        if (address.isEmpty) continue;

        final types = (result['types'] is List)
            ? (result['types'] as List).map((type) => type.toString()).toSet()
            : <String>{};

        const specificTypes = <String>{
          'street_address',
          'premise',
          'subpremise',
          'route',
          'plus_code',
          'neighborhood',
          'sublocality',
          'sublocality_level_1',
        };

        if (types.any(specificTypes.contains)) {
          return address;
        }
      }

      final compoundCode = data['plus_code'] is Map<String, dynamic>
          ? (data['plus_code'] as Map<String, dynamic>)['compound_code']
              ?.toString()
              .trim()
          : null;
      if (compoundCode != null && compoundCode.isNotEmpty) {
        return compoundCode;
      }

      final first = results.first;
      if (first is Map<String, dynamic>) {
        final address = first['formatted_address']?.toString().trim() ?? '';
        return address.isEmpty ? null : address;
      }
    } catch (_) {
      return null;
    }

    return null;
  }
}
