import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

import 'config.dart';

class RouteCoordinate {
  const RouteCoordinate(this.latitude, this.longitude);

  final double latitude;
  final double longitude;

  Map<String, dynamic> toWaypoint() => {
    'waypoint': {
      'location': {
        'latLng': {'latitude': latitude, 'longitude': longitude},
      },
    },
  };
}

class GoogleRoute {
  const GoogleRoute({
    required this.distanceMeters,
    required this.durationSeconds,
    this.encodedPolyline,
  });

  final int distanceMeters;
  final int durationSeconds;
  final String? encodedPolyline;

  double get distanceKm => distanceMeters / 1000;
}

class GoogleRoutePoint {
  const GoogleRoutePoint(this.latitude, this.longitude);

  final double latitude;
  final double longitude;
}

class GoogleRoutesException implements Exception {
  const GoogleRoutesException(this.message);

  final String message;

  @override
  String toString() => message;
}

class GoogleRoutesService {
  static const _routesUri =
      'https://routes.googleapis.com/directions/v2:computeRoutes';
  static const _matrixUri =
      'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix';

  static Future<List<GoogleRoute>> computeRoutes({
    required RouteCoordinate origin,
    required RouteCoordinate destination,
    bool computeAlternativeRoutes = false,
  }) async {
    final response = await http
        .post(
          Uri.parse(_routesUri),
          headers: const {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': Config.googleKey,
            'X-Goog-FieldMask':
                'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
          },
          body: jsonEncode({
            'origin': origin.toWaypoint()['waypoint'],
            'destination': destination.toWaypoint()['waypoint'],
            'travelMode': 'DRIVE',
            'routingPreference': 'TRAFFIC_AWARE',
            'computeAlternativeRoutes': computeAlternativeRoutes,
            'languageCode': 'ka',
            'units': 'METRIC',
          }),
        )
        .timeout(const Duration(seconds: 20));

    if (response.statusCode != 200) {
      throw GoogleRoutesException(
        'Routes API request failed (${response.statusCode}).',
      );
    }

    final body = jsonDecode(response.body) as Map<String, dynamic>;
    final routes = body['routes'] as List<dynamic>? ?? const [];
    return routes
        .map((route) => _routeFromJson(route as Map<String, dynamic>))
        .whereType<GoogleRoute>()
        .toList();
  }

  static Future<Map<int, GoogleRoute>> computeRouteMatrix({
    required List<RouteCoordinate> origins,
    required RouteCoordinate destination,
  }) async {
    if (origins.isEmpty) return const {};

    final response = await http
        .post(
          Uri.parse(_matrixUri),
          headers: const {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': Config.googleKey,
            'X-Goog-FieldMask':
                'originIndex,destinationIndex,duration,distanceMeters,status,condition',
          },
          body: jsonEncode({
            'origins': origins.map((origin) => origin.toWaypoint()).toList(),
            'destinations': [destination.toWaypoint()],
            'travelMode': 'DRIVE',
            'routingPreference': 'TRAFFIC_AWARE',
          }),
        )
        .timeout(const Duration(seconds: 20));

    if (response.statusCode != 200) {
      throw GoogleRoutesException(
        'Route Matrix request failed (${response.statusCode}).',
      );
    }

    final elements = jsonDecode(response.body) as List<dynamic>;
    final result = <int, GoogleRoute>{};
    for (final rawElement in elements) {
      final element = rawElement as Map<String, dynamic>;
      if (element['condition'] != 'ROUTE_EXISTS') continue;
      final status = element['status'] as Map<String, dynamic>?;
      if (status != null && status['code'] != null && status['code'] != 0) {
        continue;
      }
      final route = _routeFromJson(element);
      final originIndex = element['originIndex'] as int?;
      if (route != null && originIndex != null) {
        result[originIndex] = route;
      }
    }
    return result;
  }

  static String formatDuration(int seconds) {
    final minutes = (seconds / 60).ceil().clamp(1, 9999);
    if (minutes < 60) return '$minutes min';
    final hours = minutes ~/ 60;
    final remainingMinutes = minutes % 60;
    return remainingMinutes == 0
        ? '$hours hr'
        : '$hours hr $remainingMinutes min';
  }

  static String formatDistance(int meters) {
    if (meters < 1000) return '$meters m';
    return '${(meters / 1000).toStringAsFixed(1)} km';
  }

  static List<GoogleRoutePoint> decodePolyline(String encoded) {
    if (encoded.isEmpty) return const [];
    final points = <GoogleRoutePoint>[];
    var index = 0;
    var latitude = 0;
    var longitude = 0;

    while (index < encoded.length) {
      final latitudeChunk = _decodeChunk(encoded, index);
      index = latitudeChunk.nextIndex;
      latitude += latitudeChunk.value;

      final longitudeChunk = _decodeChunk(encoded, index);
      index = longitudeChunk.nextIndex;
      longitude += longitudeChunk.value;

      points.add(GoogleRoutePoint(latitude / 1e5, longitude / 1e5));
    }
    return points;
  }

  static GoogleRoute? _routeFromJson(Map<String, dynamic> route) {
    final distanceMeters = route['distanceMeters'] as int?;
    final durationSeconds = _parseDuration(route['duration'] as String?);
    if (distanceMeters == null || durationSeconds == null) return null;
    final polyline = route['polyline'] as Map<String, dynamic>?;
    return GoogleRoute(
      distanceMeters: distanceMeters,
      durationSeconds: durationSeconds,
      encodedPolyline: polyline?['encodedPolyline'] as String?,
    );
  }

  static int? _parseDuration(String? duration) {
    if (duration == null || !duration.endsWith('s')) return null;
    return double.tryParse(duration.substring(0, duration.length - 1))?.round();
  }

  static _DecodedChunk _decodeChunk(String encoded, int startIndex) {
    var index = startIndex;
    var result = 0;
    var shift = 0;
    int byte;
    do {
      if (index >= encoded.length) {
        throw const FormatException('Invalid encoded route polyline.');
      }
      byte = encoded.codeUnitAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    final value = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    return _DecodedChunk(value, index);
  }
}

class _DecodedChunk {
  const _DecodedChunk(this.value, this.nextIndex);

  final int value;
  final int nextIndex;
}
