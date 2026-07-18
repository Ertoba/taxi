cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-file.DirectoryEntry",
      "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.DirectoryReader",
      "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryReader"
      ]
    },
    {
      "id": "cordova-plugin-file.Entry",
      "file": "plugins/cordova-plugin-file/www/Entry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Entry"
      ]
    },
    {
      "id": "cordova-plugin-file.File",
      "file": "plugins/cordova-plugin-file/www/File.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.File"
      ]
    },
    {
      "id": "cordova-plugin-file.FileEntry",
      "file": "plugins/cordova-plugin-file/www/FileEntry.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.FileError",
      "file": "plugins/cordova-plugin-file/www/FileError.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileError"
      ]
    },
    {
      "id": "cordova-plugin-file.FileReader",
      "file": "plugins/cordova-plugin-file/www/FileReader.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileReader"
      ]
    },
    {
      "id": "cordova-plugin-file.FileSystem",
      "file": "plugins/cordova-plugin-file/www/FileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadOptions",
      "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadOptions"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadResult",
      "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadResult"
      ]
    },
    {
      "id": "cordova-plugin-file.FileWriter",
      "file": "plugins/cordova-plugin-file/www/FileWriter.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileWriter"
      ]
    },
    {
      "id": "cordova-plugin-file.Flags",
      "file": "plugins/cordova-plugin-file/www/Flags.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Flags"
      ]
    },
    {
      "id": "cordova-plugin-file.LocalFileSystem",
      "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.LocalFileSystem"
      ],
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.Metadata",
      "file": "plugins/cordova-plugin-file/www/Metadata.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Metadata"
      ]
    },
    {
      "id": "cordova-plugin-file.ProgressEvent",
      "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.ProgressEvent"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems",
      "file": "plugins/cordova-plugin-file/www/fileSystems.js",
      "pluginId": "cordova-plugin-file"
    },
    {
      "id": "cordova-plugin-file.requestFileSystem",
      "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.requestFileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.resolveLocalFileSystemURI",
      "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.isChrome",
      "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.androidFileSystem",
      "file": "plugins/cordova-plugin-file/www/android/FileSystem.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems-roots",
      "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.fileSystemPaths",
      "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "cordova"
      ],
      "runs": true
    },
    {
      "id": "cordova-plugin-call-number.CallNumber",
      "file": "plugins/cordova-plugin-call-number/www/CallNumber.js",
      "pluginId": "cordova-plugin-call-number",
      "clobbers": [
        "call"
      ]
    },
    {
      "id": "cordova-plugin-request-location-accuracy.RequestLocationAccuracy",
      "file": "plugins/cordova-plugin-request-location-accuracy/www/android/RequestLocationAccuracy.js",
      "pluginId": "cordova-plugin-request-location-accuracy",
      "clobbers": [
        "cordova.plugins.locationAccuracy"
      ]
    },
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection",
        "navigator.network.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-plugin-media.MediaError",
      "file": "plugins/cordova-plugin-media/www/MediaError.js",
      "pluginId": "cordova-plugin-media",
      "clobbers": [
        "window.MediaError"
      ]
    },
    {
      "id": "cordova-plugin-media.Media",
      "file": "plugins/cordova-plugin-media/www/Media.js",
      "pluginId": "cordova-plugin-media",
      "clobbers": [
        "window.Media"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    },
    {
      "id": "phonegap-plugin-mobile-accessibility.mobile-accessibility",
      "file": "plugins/phonegap-plugin-mobile-accessibility/www/mobile-accessibility.js",
      "pluginId": "phonegap-plugin-mobile-accessibility",
      "clobbers": [
        "window.MobileAccessibility"
      ]
    },
    {
      "id": "phonegap-plugin-mobile-accessibility.MobileAccessibilityNotifications",
      "file": "plugins/phonegap-plugin-mobile-accessibility/www/MobileAccessibilityNotifications.js",
      "pluginId": "phonegap-plugin-mobile-accessibility",
      "clobbers": [
        "MobileAccessibilityNotifications"
      ]
    },
    {
      "id": "com.peerio.cordova.plugin.carrier.Carrier",
      "file": "plugins/com.peerio.cordova.plugin.carrier/www/carrier.js",
      "pluginId": "com.peerio.cordova.plugin.carrier",
      "clobbers": [
        "window.plugins.carrier"
      ]
    },
    {
      "id": "cordova.plugins.diagnostic.Diagnostic",
      "file": "plugins/cordova.plugins.diagnostic/www/android/diagnostic.js",
      "pluginId": "cordova.plugins.diagnostic",
      "merges": [
        "cordova.plugins.diagnostic"
      ]
    },
    {
      "id": "cordova.plugins.diagnostic.Diagnostic_Location",
      "file": "plugins/cordova.plugins.diagnostic/www/android/diagnostic.location.js",
      "pluginId": "cordova.plugins.diagnostic",
      "merges": [
        "cordova.plugins.diagnostic.location"
      ]
    },
    {
      "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
      "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
      "pluginId": "cordova-plugin-firebase-authentication",
      "merges": [
        "cordova.plugins.firebase.auth"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "cordova-plugin-ionic-keyboard.keyboard",
      "file": "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
      "pluginId": "cordova-plugin-ionic-keyboard",
      "clobbers": [
        "window.Keyboard"
      ]
    },
    {
      "id": "skwas-cordova-plugin-datetimepicker.DateTimePicker",
      "file": "plugins/skwas-cordova-plugin-datetimepicker/www/datetimepicker.js",
      "pluginId": "skwas-cordova-plugin-datetimepicker",
      "clobbers": [
        "cordova.plugins.DateTimePicker"
      ]
    },
    {
      "id": "skwas-cordova-plugin-datetimepicker.utils",
      "file": "plugins/skwas-cordova-plugin-datetimepicker/www/utils.js",
      "pluginId": "skwas-cordova-plugin-datetimepicker"
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-web-share.WebShare",
      "file": "plugins/cordova-plugin-web-share/www/WebShare.js",
      "pluginId": "cordova-plugin-web-share",
      "clobbers": [
        "window.navigator.share"
      ]
    },
    {
      "id": "cordova-plugin-firebase-messaging.FirebaseMessaging",
      "file": "plugins/cordova-plugin-firebase-messaging/www/FirebaseMessaging.js",
      "pluginId": "cordova-plugin-firebase-messaging",
      "merges": [
        "cordova.plugins.firebase.messaging"
      ]
    },
    {
      "id": "cordova-plugin-googlemaps-2.Promise",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Promise.js",
      "pluginId": "cordova-plugin-googlemaps-2"
    },
    {
      "id": "cordova-plugin-googlemaps-2.BaseClass",
      "file": "plugins/cordova-plugin-googlemaps-2/www/BaseClass.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.BaseArrayClass",
      "file": "plugins/cordova-plugin-googlemaps-2/www/BaseArrayClass.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.LatLng",
      "file": "plugins/cordova-plugin-googlemaps-2/www/LatLng.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.LatLngBounds",
      "file": "plugins/cordova-plugin-googlemaps-2/www/LatLngBounds.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.VisibleRegion",
      "file": "plugins/cordova-plugin-googlemaps-2/www/VisibleRegion.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Location",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Location.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.CameraPosition",
      "file": "plugins/cordova-plugin-googlemaps-2/www/CameraPosition.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Polyline",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Polyline.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Polygon",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Polygon.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Marker",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Marker.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.HtmlInfoWindow",
      "file": "plugins/cordova-plugin-googlemaps-2/www/HtmlInfoWindow.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Circle",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Circle.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.TileOverlay",
      "file": "plugins/cordova-plugin-googlemaps-2/www/TileOverlay.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.GroundOverlay",
      "file": "plugins/cordova-plugin-googlemaps-2/www/GroundOverlay.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Common",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Common.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.encoding",
      "file": "plugins/cordova-plugin-googlemaps-2/www/encoding.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.spherical",
      "file": "plugins/cordova-plugin-googlemaps-2/www/spherical.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.poly",
      "file": "plugins/cordova-plugin-googlemaps-2/www/poly.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Geocoder",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Geocoder.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.LocationService",
      "file": "plugins/cordova-plugin-googlemaps-2/www/LocationService.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.ElevationService",
      "file": "plugins/cordova-plugin-googlemaps-2/www/ElevationService.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.DirectionsService",
      "file": "plugins/cordova-plugin-googlemaps-2/www/DirectionsService.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.DirectionsRenderer",
      "file": "plugins/cordova-plugin-googlemaps-2/www/DirectionsRenderer.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Map",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Map.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.event",
      "file": "plugins/cordova-plugin-googlemaps-2/www/event.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.MapTypeId",
      "file": "plugins/cordova-plugin-googlemaps-2/www/MapTypeId.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.KmlOverlay",
      "file": "plugins/cordova-plugin-googlemaps-2/www/KmlOverlay.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.KmlLoader",
      "file": "plugins/cordova-plugin-googlemaps-2/www/KmlLoader.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Environment",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Environment.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.MarkerCluster",
      "file": "plugins/cordova-plugin-googlemaps-2/www/MarkerCluster.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Cluster",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Cluster.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.geomodel",
      "file": "plugins/cordova-plugin-googlemaps-2/www/geomodel.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.commandQueueExecutor",
      "file": "plugins/cordova-plugin-googlemaps-2/www/commandQueueExecutor.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.pluginInit",
      "file": "plugins/cordova-plugin-googlemaps-2/www/pluginInit.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.StreetViewPanorama",
      "file": "plugins/cordova-plugin-googlemaps-2/www/StreetViewPanorama.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Overlay",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Overlay.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.Thread",
      "file": "plugins/cordova-plugin-googlemaps-2/www/Thread.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.InlineWorker",
      "file": "plugins/cordova-plugin-googlemaps-2/www/InlineWorker.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    },
    {
      "id": "cordova-plugin-googlemaps-2.googlemaps-cdv-plugin",
      "file": "plugins/cordova-plugin-googlemaps-2/www/plugin-loader-for-android_ios.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "clobbers": [
        "plugin.google.maps"
      ]
    },
    {
      "id": "cordova-plugin-googlemaps-2.js_CordovaGoogleMaps",
      "file": "plugins/cordova-plugin-googlemaps-2/www/js_CordovaGoogleMaps-for-android_ios.js",
      "pluginId": "cordova-plugin-googlemaps-2",
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-file": "6.0.2",
    "cordova-support-android-plugin": "2.0.4",
    "cordova-plugin-call-number": "1.0.1",
    "cordova-plugin-request-location-accuracy": "2.3.0",
    "cordova-plugin-network-information": "2.0.2",
    "cordova-plugin-media": "5.0.3",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-inappbrowser": "3.1.0",
    "phonegap-plugin-mobile-accessibility": "1.0.5-dev",
    "cordova-android-support-gradle-release": "3.0.1",
    "cordova-plugin-androidx-adapter": "1.1.3",
    "com.peerio.cordova.plugin.carrier": "1.0.1",
    "cordova.plugins.diagnostic": "7.1.0",
    "cordova-plugin-firebase-authentication": "7.0.1",
    "cordova-plugin-geolocation": "4.0.2",
    "cordova-plugin-statusbar": "3.0.0",
    "cordova-plugin-ionic-keyboard": "2.2.0",
    "skwas-cordova-plugin-datetimepicker": "2.1.2",
    "cordova-plugin-camera": "7.0.0",
    "cordova-plugin-web-share": "1.4.1",
    "cordova-plugin-firebase-messaging": "8.0.1",
    "cordova-plugin-googlemaps-2": "2.9.2-dev"
  };
});