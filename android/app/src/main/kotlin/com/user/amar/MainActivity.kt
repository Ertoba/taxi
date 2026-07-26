package ge.mili.taxi

import android.content.pm.PackageManager
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.AutocompleteSessionToken
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.api.net.FetchPlaceRequest
import com.google.android.libraries.places.api.net.FindAutocompletePredictionsRequest
import com.google.android.libraries.places.api.net.PlacesClient
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
    private lateinit var placesClient: PlacesClient
    private var sessionToken: AutocompleteSessionToken? = null

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        val applicationInfo = packageManager.getApplicationInfo(
            packageName,
            PackageManager.GET_META_DATA,
        )
        val apiKey = applicationInfo.metaData
            ?.getString("com.google.android.geo.API_KEY")
            .orEmpty()

        if (apiKey.isNotBlank()) {
            if (!Places.isInitialized()) {
                Places.initializeWithNewPlacesApiEnabled(applicationContext, apiKey)
            }
            placesClient = Places.createClient(this)
        }

        MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            PLACES_CHANNEL,
        ).setMethodCallHandler { call, result ->
            if (!::placesClient.isInitialized) {
                result.error(
                    "PLACES_NOT_CONFIGURED",
                    "Google Places is not configured for this Android build.",
                    null,
                )
                return@setMethodCallHandler
            }

            when (call.method) {
                "findPredictions" -> {
                    val query = call.argument<String>("query").orEmpty().trim()
                    if (query.length < 2) {
                        result.success(emptyList<Map<String, String>>())
                        return@setMethodCallHandler
                    }

                    val token = sessionToken ?: AutocompleteSessionToken.newInstance()
                        .also { sessionToken = it }
                    val request = FindAutocompletePredictionsRequest.builder()
                        .setQuery(query)
                        .setSessionToken(token)
                        .build()

                    placesClient.findAutocompletePredictions(request)
                        .addOnSuccessListener { response ->
                            result.success(
                                response.autocompletePredictions.map { prediction ->
                                    mapOf(
                                        "placeId" to prediction.placeId,
                                        "description" to prediction.getFullText(null).toString(),
                                    )
                                },
                            )
                        }
                        .addOnFailureListener { exception ->
                            result.error(
                                "PLACES_AUTOCOMPLETE_FAILED",
                                exception.message ?: "Address search failed.",
                                null,
                            )
                        }
                }

                "fetchPlace" -> {
                    val placeId = call.argument<String>("placeId").orEmpty()
                    if (placeId.isBlank()) {
                        result.error("INVALID_PLACE", "A place ID is required.", null)
                        return@setMethodCallHandler
                    }

                    val request = FetchPlaceRequest.builder(
                        placeId,
                        listOf(
                            Place.Field.ID,
                            Place.Field.DISPLAY_NAME,
                            Place.Field.FORMATTED_ADDRESS,
                            Place.Field.LOCATION,
                        ),
                    ).setSessionToken(sessionToken).build()

                    placesClient.fetchPlace(request)
                        .addOnSuccessListener { response ->
                            val place = response.place
                            val location = place.location
                            sessionToken = null
                            if (location == null) {
                                result.error(
                                    "PLACE_WITHOUT_LOCATION",
                                    "The selected place does not have a location.",
                                    null,
                                )
                            } else {
                                result.success(
                                    mapOf(
                                        "placeId" to place.id,
                                        "description" to (
                                            place.formattedAddress
                                                ?: place.displayName
                                                ?: ""
                                            ),
                                        "latitude" to location.latitude,
                                        "longitude" to location.longitude,
                                    ),
                                )
                            }
                        }
                        .addOnFailureListener { exception ->
                            sessionToken = null
                            result.error(
                                "PLACE_DETAILS_FAILED",
                                exception.message ?: "Unable to load the selected address.",
                                null,
                            )
                        }
                }

                "cancelSession" -> {
                    sessionToken = null
                    result.success(null)
                }

                else -> result.notImplemented()
            }
        }
    }

    companion object {
        private const val PLACES_CHANNEL = "ge.mili.taxi/places"
    }
}
