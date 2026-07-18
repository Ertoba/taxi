var event = require('cordova-plugin-googlemaps-2.event'),
  BaseClass = require('cordova-plugin-googlemaps-2.BaseClass'),
  BaseArrayClass = require('cordova-plugin-googlemaps-2.BaseArrayClass'),
  execCmd = require('cordova-plugin-googlemaps-2.commandQueueExecutor'),
  cordovaGoogleMaps = new(require('cordova-plugin-googlemaps-2.js_CordovaGoogleMaps'))(execCmd);

module.exports = {
  event: event,
  Animation: {
    BOUNCE: 'BOUNCE',
    DROP: 'DROP'
  },
  BaseClass: BaseClass,
  BaseArrayClass: BaseArrayClass,
  Map: {
    getMap: cordovaGoogleMaps.getMap.bind(cordovaGoogleMaps)
  },
  StreetView: {
    getPanorama: cordovaGoogleMaps.getPanorama.bind(cordovaGoogleMaps),
    Source: {
      DEFAULT: 'DEFAULT',
      OUTDOOR: 'OUTDOOR'
    }
  },
  HtmlInfoWindow: require('cordova-plugin-googlemaps-2.HtmlInfoWindow'),
  LatLng: require('cordova-plugin-googlemaps-2.LatLng'),
  LatLngBounds: require('cordova-plugin-googlemaps-2.LatLngBounds'),
  MapTypeId: require('cordova-plugin-googlemaps-2.MapTypeId'),
  environment: require('cordova-plugin-googlemaps-2.Environment'),
  Geocoder: require('cordova-plugin-googlemaps-2.Geocoder')(execCmd),
  ElevationService: require('cordova-plugin-googlemaps-2.ElevationService')(execCmd),
  DirectionsService: require('cordova-plugin-googlemaps-2.DirectionsService')(execCmd),
  LocationService: require('cordova-plugin-googlemaps-2.LocationService')(execCmd),
  geometry: {
    encoding: require('cordova-plugin-googlemaps-2.encoding'),
    spherical: require('cordova-plugin-googlemaps-2.spherical'),
    poly: require('cordova-plugin-googlemaps-2.poly')
  }
};

cordova.addConstructor(function () {
  if (!window.Cordova) {
    window.Cordova = cordova;
  }
  window.plugin = window.plugin || {};
  window.plugin.google = window.plugin.google || {};
  window.plugin.google.maps = window.plugin.google.maps || module.exports;
});
