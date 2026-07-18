var APP_TITLE = "DropTaxi";
var APP_DEBUG = false; //set to true for debug mode on browser. false for production
var APP_VERSION_IOS = "2.3.0";
var APP_VERSION_ANDROID = "2.3.0";
var APP_UPDATE_URL_IOS = ""; 
var APP_UPDATE_URL_ANDROID = ""; 
var DRIVER_APP_UPDATE_URL_IOS = ""; 
var DRIVER_APP_UPDATE_URL_ANDROID = "";
var SDL_KEY = ""; //used to track single device login
var app_start_animate = 0;
var app_start_animate_counter = 0;
var app_start_animate_timer;
var google = undefined;
var walletbal = 0;
var Latitude = undefined;
var Longitude = undefined;
var marker = undefined;
var map = undefined;
var map2 = undefined;
var map3 = undefined;
var marker1 = undefined;
var driver_marker = undefined;
var city_drivers_markers = {};
var bounds = undefined;
var bounds2 = undefined;
var marker2 = undefined;
var marker3 = undefined;
var marker4 = undefined;
var marker5 = undefined;
var marker6 = undefined;
var markerds1 = undefined;
var markerds2 = undefined;
var markerds3 = undefined;
var markerdrvsearch = undefined;
var drv_search_rider_lat_long = {'lng':'','lat':''};
var Latitude1 = undefined;
var Longitude2 = undefined;
var latLong1 = undefined;
var latLong2 = undefined;
var latLong3 = undefined;
var latLong4 = undefined;
var pick_up_data = {'address': '','lng':'','lat':''};
var drop_off_data = {'address': '','lng':'','lat':''};
var userprofileinfo = undefined;
var routetariffs = undefined;
var watchID = undefined;
var mapOptions = undefined;
var mapOptions2 = undefined;
var device_ready = 0;
var session_id = "0";
var siteurl = "https://viza.droptaxi.com.ng"; //Change the endpoints server url here
var ajaxurl = siteurl + '/ajax_2_3_0.php';
var loading = $('#loading'); 
var startscreen = $('#startscreen');
var animatecircle = $('#animate-circle');
var notification_dialog = $('#notif-dialog');
var chat_window_display_status = 0;
var selected_city_route = undefined;
var stored_selected_route;
var selected_city_id = 0;
var selected_city_lat;
var selected_city_long;
var selected_city_radius = 3000; //default city radius for google places autocomplete strictbound
var selected_city_curency_symbol = '';
var selected_city_curency_exchange_rate = 1;
var selected_city_curency_code = '';
var booking_currency_symbol = '';
var selected_state_route = undefined;
var intra_city_distance = undefined;
var intra_city_duration = undefined;
var intra_city_distance_text = '';
var intra_city_duration_text = '';
var selected_state_id = 0;
var selected_state_coord = undefined;
var google_map_api_key = '';
var directionsDisplay = undefined;
var directionsDisplay2 = undefined;
var routes_loaded = 0;
var cdate = new Date();
var call_center_num = null;
var wallet_amount = null;
var wallet_history_items = null;
var wallet_debit_history;
var ride_cpk = null;
var ride_cpm = null;
var ride_puc = null;
var ride_doc = null;       
var nride_cpk = null;
var nride_cpm = null;
var nride_puc = null;
var nride_doc = null;
var ride_ind = null;
var nride_ind = null;
var ride_num_seats = null;
var ride_hrcph = null;
var ride_hrdist = null;
var nride_hrcph = null;
var nride_hrdist = null;
var night_day = 0;
var peak_period_enabled = 0;
var peak_period_start = 0;
var peak_period_end = 0;
var peak_period_days = undefined;
var peak_period_charge_type = 0;
var peak_period_charge_value = 0;
var peak_period = 0;
var decoded_location_data = {'address':'','lat':null,'lng':null};
var bookride_cost = 0.00;
var selected_city_ride = 0;
var bookings_data = {'pend_onride':'','completed':'','cancelled':''};
var notifications_data = '';
var online_payment_info = undefined;
var get_push_token_retry_count = 0;
var side_menu_state = 0;
var close_dialog_enable = 0;
var mobile_gps_enabled = 0;
var notification_sound;
var MAP_TYPE_IN_USE = 1; //sets the google map type to use. 0 = javascript, 1 = native;
var map_load_timer_handle;
var app_online = 0; //sets if app is online or offline;
var google_autocomplete_service;
var googlemap_autocomplete_session = 0;
var location_type_selected = 0; //0 = pick-up, 1 = drop-off
var route_polyline;
var route_points;
var route_polyline_interstate;
var route_points_interstate;
var loading_directions = 0;
var loading_geocode = 0;
var platform;
var favourite_places = [];
var fav_list_items_string = "";
var recent_list_items_string = "";
var aboutpage_content = "";
var terms_and_privacy_content = '';
var drivewith_content = '';
var help_data;
var verified_coupon_code = '';
var point_lat = undefined;
var point_long = undefined;
var processed_interstate_route = 0;
var user_location = {'lat':null,'lng':null};
var help_categories = '';
var help_topics = [];
var help_topics_contents = [];
var processing= 0;
var driver_notify_ui_displayed = 0;
var routeanimationtimer;
var routepointindex = 0;
var route_polyline_animatable;
var route_distance_duration_info_marker;
var route_distance_duration_info_window;
var get_available_drivers_timer;
var user_timezone;
var driver_search_display_timer;
var carrier_country_code = 'ng'; //Change default country dial code here
var user_country_dial_code = '+234';
var user_signup_photo;
var processed_notifications = {};
var ride_rating = 5;
var pubnub_reconnection_count = 0;
var resend_code_btn_status = 1;
var resend_code_countdown_timer_handle = 0;
const RESEND_CODE_COUNTDOWN_VALUE = 60;
const USE_FIREBASE_PHONE_AUTH = 1; 
var firebase_phone_number_verified = 0;
var firebase_phone_auth_verificationid = '';
var app_fully_started = 0;
var scheduled_ride_enabled = 0;
var selected_lang = {code:'en',name:'English',dir:'ltr'};
var default_currency_data;
var current_ride_status = 0; 
var current_booking_data = {'status':0,'action':'','booking_id':0,'driver_id':0,'driver_firstname':'','driver_phone':'','driver_platenum':'','driver_rating':'','driver_location_lat':0.00,'driver_location_long':0.00,'driver_carmodel':'','driver_photo':'','completion_code':'','pickup_addr' : '','dropoff_addr' : '','pickup_lat':0.00,'pickup_long':0.00,'dropoff_lat':0.00,'dropoff_long':0.00,'driver_completed' : 0,'driver_carid':0,'route_id':0,'driver_arrived_time':0,'driver_start_time':0,'driver_arrived_stop_time_1':0,'driver_arrived_stop_time_2':0,'driver_left_stop_time_1':0,'driver_left_stop_time_2':0};
var app_settings = {};
var recent_locations_data;
var reward_points = 0.0;
var trip_summary_dialog_show = 0;
var driver_tip_amount = 0;
var dest_location_type_selected = 0;
var multi_destination_mode = 0;
var destination_stop_inp1_shown = 0;
var destination_stop_inp2_shown = 0;
var multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};
var server_client_time_diff = 0;
var banner_data = '';
var chat_support_msg_poll_timer_handle;
var chat_update_ajax_handle;
var rides_proximity = undefined;
var user_location_watch_handle;
var user_location_live = {'lat':null,'lng':null};
var disable_nbk_dlg_auto_show_on_home = 0;
const AVAIL_DRIVERS_LOCATION_UPDATE_INTERVAL = 5000;
var animate_drivers_markers_timer = 0;
var img_source_obj;
var user_login_options;
var user_reg_data = {country_dial_code:'',phone:'',otp_code:'',profile_photo:'',firstname:'',lastname:'',rem_password:0,password:'',referral:'',fb_user_details:null};
var state_search_progress;
var state_routes_search_result = {};
var map_visibility_status = 0;
var user_location_detected = 0;
var booking_retry_counter = {};
var notify_new_data_available = {notifications : 0,chat_support:0};
var map_ready = false;
var banner_view_timer = 0;
var code_inp_str = "";
var push_notification_buffer;
var wait_timer_handle = 0;
var service_mode = 0 //0 = taxi mode, 1 = quick ride mode
var hourly_rate_enabled = 0;
var hourly_rate_user_set_num_hours = 0;


document.addEventListener('resume', function(){ //fires when app is pulled up from background
    

    if(!APP_DEBUG){
        updateUserLocation();
        let top_page = document.querySelector('#myNavigator').topPage;
        if(top_page.id == "mappage"){
            map_visibility_status = 1;
        }else{
            map_visibility_status = 0;
        }
        
        setTimeout(function(){
            animateDriversMarkers(); //restart marker animation when on foreground 
        },5000);
        /* cordova.plugins.diagnostic.isLocationAvailable(function(status){
            //success
            console.log(status);
            if(status){
                //ons.notification.alert("Location Enabled.",{title:""});
                
                
            }else{
                ons.notification.alert( APP_TITLE + " requires location service turned on for the best experience. Please turn on GPS and location services in phone settings",{title:""});
            }

        }, function(){
            //error
        }); */
    }

    



}, false);



document.addEventListener('pause', function(){ //fires when app enters the background


    
    clearInterval(animate_drivers_markers_timer); //stop marker animation when backgrounded
    console.log('backgrounded');


}, false);


ons.ready(function() {
    startscreen.show();
    initSession();
    loadLang(initApp); 
    initActionSheets();  

});


function initApp(){

    StatusBar.overlaysWebView(true);
    StatusBar.styleDefault(); 


    //clear splashscreen after a while
    setTimeout(function(){
        navigator.splashscreen.hide();
    },5000);

    
    
    device_ready = 1;  

    if(window.MobileAccessibility){
        MobileAccessibility.setTextZoom(90, function(){return;});
        //window.MobileAccessibility.usePreferredTextZoom(false);
    }

    var tz = jstz.determine(); // Determines the time zone of the browser client
    user_timezone = tz.name(); //read timezone value

    
    translateElements();
    checkLoginStatus();
    updateUserLocation();    


    cordova.plugins.firebase.messaging.requestPermission().then(function(token) {
        return;
    });




        
    if(!APP_DEBUG){

        /* window.plugins.sim.getSimInfo(function(res){
            carrier_country_code = res.hasOwnProperty('countryCode') ? res.countryCode : 'ng';
            console.log(res);
            carrier_country_code = carrier_country_code.toLocaleLowerCase();
        }, function(err){
            carrier_country_code = 'ng';
            user_country_dial_code = '+234';
            console.log('error getting device carier info.' + err);
        }); */

        /* window.plugins.carrier.getCarrierInfo(function(res){  
            //alert(JSON.stringify(res));          
            carrier_country_code = res.hasOwnProperty('countryCode') ? res.countryCode : 'ng';
            carrier_country_code = carrier_country_code.toLocaleLowerCase();
        }, function(err){
            carrier_country_code = 'ng';
            user_country_dial_code = '+234';
            console.log('error getting device carier info.' + err);
        }); */

        

        var sound_url = 'sound/notify.mp3';
        if(device.platform.toLowerCase() === "android"){
            sound_url = 'file:///android_asset/www/sound/notify.mp3';
        }
        

        notification_sound = new Media(sound_url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
        );
    
        

        cordova.plugins.firebase.messaging.onMessage(function(payload) { //trigger push notification when app is in foreground
            process_push_message(payload);
        });


        cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) { //trigger push notification when app is in background
            process_push_message(payload);
        });


        //firebase AUth

        cordova.plugins.firebase.auth.onAuthStateChanged(function(userInfo) {
            if (userInfo) {
                // user was signed in
                console.log('success sign in: ' + userInfo);
            } else {
                // user was signed out
                console.log('success sign out: ' + userInfo);
            }
        });


        
    }



    document.addEventListener("offline", function(){
        app_online = 0;
        $('#nointernet').css('visibility','visible');
        
    }, false);


    document.addEventListener("online", function(){
        app_online = 1;
        $('#nointernet').css('visibility','hidden');
    }, false);


    ons.setDefaultDeviceBackButtonListener(onBackButton);

   
    if(!APP_DEBUG){
        requestLocationAccuracy();                        
    }else{
        mapinitialize();
    }

    
    //get user applied promo code 
    let stored_promo_code = localStorage.getObject('user-promo-codes');    
    if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
        verified_coupon_code = stored_promo_code.promo_code;        
    }

    
}

function initSession(){
    //get session id if available
    let sess_id = localStorage.getItem('sess_id');
    let sdl_key = localStorage.getItem('sdl_key'); //check single device login key

    if(sess_id){
        ajaxurl = siteurl + `/ajax_2_3_0.php?sess_id=${sess_id}`;
    }else{
        //generate a random session ID and encode
        let rand_session_str = btoa(genRandomString(10) + Date.now());
        ajaxurl = siteurl + `/ajax_2_3_0.php?sess_id=${rand_session_str}`;
        localStorage.setItem('sess_id', rand_session_str);
    }

    if(!sdl_key){
        //generate a random key used to ensure only one device is logged in to an account at a time
        let rand_sdl_str = btoa(genRandomString(10) + Date.now());
        localStorage.setItem('sdl_key', rand_sdl_str);
        sdl_key = rand_sdl_str;
    }

    SDL_KEY = sdl_key;

}


function redeempoints(){

    loading.show();

    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'redeempoints'},
        dataType: 'json',
        success: function(data){

            loading.hide();

            
            if(data.hasOwnProperty('error')){
                
                ons.notification.alert(data.error,{title:''});
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                
                ons.notification.alert(__('Your reward points have been redeemed and added to your wallet'),{title:''});
                getwalletinfo();

            }
            

        },
        error: function(){

            loading.hide();
            
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });
}



function share_message(title_str,text_str,url_str){
    navigator.share({
        title: title_str,
        text: text_str,
        url: url_str
    }).then(() => {
        console.log("Location was shared successfully");
    }).catch((err) => {
        console.error("Location share failed:", err.message);
    });

    
}



var chat_update_ajax_handle;
function chat_update_content(booking_id){

    if (chat_update_ajax_handle) {
        chat_update_ajax_handle.abort();
    }    
        
    chat_update_ajax_handle = $.ajax({  
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getChatContent', 'booking_id':booking_id},
        dataType: 'json',
        success: function(data){
            
            chat_update_ajax_handle = undefined;

            if(data.hasOwnProperty('error')){
                $('#chat-window-body').html(`<div class='center-screen'><p style='text-align:center;'>${data.error}</p></div>`);
            }

            if(data.hasOwnProperty('success')){
                //refresh chat content
                if(data.hasOwnProperty('chat_content')){
                    $('#chat-window-body').empty();
                    $('#chat-window-body').html(data.chat_content);
                    $('#chat-window-body').scrollTop(10000000);
                    
                }

                //new chat message?
                if(data.hasOwnProperty('chat_new_content') && data.chat_new_content == 1){
                    //notification_sound.play();
                    if(!chat_window_display_status){
                        $('#chat-new-msg-ind').show();
                    }                ;
                }
            }
            

        },
        error: function(){
            chat_update_ajax_handle = undefined;
        } 


    });
    
}


function chat_msg_send(booking_id){
    

    let msg = $('#chat-msg-content').val();
    if(!msg)return;

    $('#chat-msg-send-btn').prop('disabled', true);
    $('#chat-msg-send-btn').css("background-color","grey");

    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'chatSendMsg', 'booking_id':booking_id,'chat_msg':msg},
        dataType: 'json',
        success: function(data){

            $('#chat-msg-send-btn').prop('disabled', false);
            $('#chat-msg-send-btn').css("background-color","#0077ff");

            if(data.hasOwnProperty('error')){
                
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                //refresh chat content               

                if(data.hasOwnProperty('chat_content')){
                    $('#chat-msg-content').val('');
                    $('#chat-window-body').empty();
                    $('#chat-window-body').html(data.chat_content);
                    $('#chat-window-body').scrollTop(10000000);
                }

                //new chat message?
                if(data.hasOwnProperty('chat_new_content') && data.chat_new_content == 1){
                    //notification_sound.play();
                    if(!chat_window_display_status){
                        $('#chat-new-msg-ind').show();
                    }
                }

            }
            

        },
        error: function(){
            $('#chat-msg-send-btn').prop('disabled', false);
            $('#chat-msg-send-btn').css("background-color","#0077ff");
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });



}

function chat_support_msg_send(){
    

    let msg = $('#chat-support-msg-content').val();
    if(!msg)return;

    $('#chat-support-msg-send-btn').prop('disabled', true);
    $('#chat-support-msg-send-btn').css("background-color","grey");

    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'chatSupportSendMsg','chat_msg':msg},
        dataType: 'json',
        success: function(data){

            $('#chat-support-msg-send-btn').prop('disabled', false);
            $('#chat-support-msg-send-btn').css("background-color","#0077ff");

            if(data.hasOwnProperty('error')){
                
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                //refresh chat content               

                if(data.hasOwnProperty('chat_content')){
                    $('#chat-support-msg-content').val('');
                    $('#chat-support-content').empty();
                    $('#chat-support-content').html(data.chat_content);
                    $('#chat-support-content').scrollTop(1000000000);
                }
                

            }
            

        },
        error: function(){
            $('#chat-support-msg-send-btn').prop('disabled', false);
            $('#chat-support-msg-send-btn').css("background-color","#0077ff");
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });



}



function get_chat_support_msg(){
    

    loading.show();

    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getChatSupportMsg'},
        dataType: 'json',
        success: function(data){
            loading.hide();
            

            if(data.hasOwnProperty('error')){
                
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                //refresh chat content   
                
                if(data.new_msg == 1){
                    $('#customer-chat-icon').css('color', 'red');
                }else{
                    $('#customer-chat-icon').css('color', 'white');
                }  

                if(data.hasOwnProperty('chat_content')){
                    $('#chat-support-content').val('');
                    $('#chat-support-content').empty();
                    $('#chat-support-content').html(data.chat_content);
                    $('#chat-support-content').scrollTop(1000000000);
                }
                

            }
            

        },
        error: function(){
            loading.hide();
            
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });



}


function updateChatSupportMsg(){

    clearInterval(chat_support_msg_poll_timer_handle);
    chat_support_msg_poll_timer_handle = setInterval(function(){

    if (chat_update_ajax_handle) {
        chat_update_ajax_handle.abort();
    }  

     
    chat_update_ajax_handle = $.ajax({ 
                                url: ajaxurl, 
                                method: 'GET',
                                crossDomain:true,
                                timeout:20000,
                                xhrFields: {withCredentials: true},
                                data: { 'action_get' : 'getChatSupportMsg'},
                                dataType: 'json',
                                success: function(data){
                                    loading.hide();
                                    
                                        
                                    if(data.hasOwnProperty('success')){
                                        
                                        //refresh chat content               
                        
                                        if(data.hasOwnProperty('chat_content')){
                                            $('#chat-support-content').val('');
                                            $('#chat-support-content').empty();
                                            $('#chat-support-content').html(data.chat_content);
                                            
                                        }

                                        if(data.new_msg == 1){
                                            $('#chat-support-content').scrollTop(1000000000);
                                        }
                                        
                        
                                    }
                                    
                        
                                },
                                error: function(){
                                        
                                    return;
                        
                                } 
                        
                        
                            });


    },6000)
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        var copied = false;
        try {
            copied = true;
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            ons.notification.toast(__("Failed to copy referal code"),{
                timeout: 1000
            });
            return false;
        } finally {
            document.body.removeChild(textarea);
            if(copied){
                ons.notification.toast(__("Referal code copied"),{
                    timeout: 1000
                });
            }
        }
    }
}



function hideuielements(){
    
    current_booking_data = {'status':0,'action':'','booking_id':0,'driver_id':0,'driver_firstname':'','driver_phone':'','driver_platenum':'','driver_rating':'','driver_location_lat':0.00,'driver_location_long':0.00,'driver_carmodel':'','driver_photo':'','completion_code':'','pickup_addr' : '','dropoff_addr' : '','pickup_lat':0.00,'pickup_long':0.00,'dropoff_lat':0.00,'dropoff_long':0.00,'driver_completed' : 0,'driver_carid':0,'route_id':0,'driver_arrived_time':0,'driver_start_time':0,'driver_arrived_stop_time_1':0,'driver_arrived_stop_time_2':0,'driver_left_stop_time_1':0,'driver_left_stop_time_2':0};

    if(processing == 1)return;
    var anim_count = 0;

    processing = 1;

    selected_state_id = 0;
    
    //clear map interface and location input boxes
    $('#pac-input').val('');
    $('#pac-input2').val('');

    clearMapItemsSelectively();    
    
    
    pick_up_data=[];
    drop_off_data=[];
    pick_up_data = {'address': '','lng':'','lat':''};
    drop_off_data = {'address': '','lng':'','lat':''};

    
    //reset multi destination mode
    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();
    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0; 

    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

    
    var ui_anim_interval_timer = setInterval(function(){
        anim_count++;
        if(anim_count == 1){
            $("#driver-notify-ui-back-btn").removeClass("fadeOutLeft animated").addClass("fadeOutLeft animated").one('animationend', function(){
                $(this).removeClass("fadeOutLeft animated");
                $("#driver-notify-ui-back-btn").css("visibility","hidden");
                $("#driver-notify-ui-back-btn").css("z-index","10");
            })
        }

        if(anim_count == 2){
            $("#bookbutton").removeClass("zoomOut animated").addClass("zoomOut animated").one('animationend', function(){
                $(this).removeClass("zoomOut animated");
                $("#bookbutton").css("visibility","hidden");
            })
        }

        

        if(anim_count == 7){
            $("#pick-box").css("visibility","visible");
            $("#pick-box").removeClass("zoomIn animated").addClass("zoomIn animated").one('animationend', function(){
              $(this).removeClass("zoomIn animated");
            })     
            
        }
      
      
        if(anim_count == 8){
            $("#drop-box-container").css("visibility","visible");
            $('#banner-items-container').fadeIn();
            $("#drop-box-container").removeClass("zoomIn animated").addClass("zoomIn animated").one('animationend', function(){
              $(this).removeClass("zoomIn animated");
            })      
        }



        if(anim_count == 9){
            $("#wait-time-info-container").hide();
            $("#current-ride-driver-details").removeClass("fadeOutDown animated").addClass("fadeOutDown animated").one('animationend', function(){
                $(this).removeClass("fadeOutDown animated");
                $("#current-ride-driver-details").css("visibility","hidden");
                
            })
        }

        if(anim_count == 12){
            $("#menubtn").css("visibility","visible");
            $('#mylocationbtn').css('visibility', 'visible');
            $("#menubtn").css("z-index","100");
            $("#menubtn").removeClass("fadeInLeft animated").addClass("fadeInLeft animated").one('animationend', function(){
                $(this).removeClass("fadeInLeft animated");
            })
            

        }


        if(anim_count == 13){
            $("#recent-strip-container").css("visibility","visible");
            $("#recent-strip-container").removeClass("slideInRight animated").addClass("slideInRight animated").one('animationend', function(){
              $(this).removeClass("slideInRight animated");
            })  

            $('#presetroutesbtn').css('visibility', 'visible');
            
            clearInterval(ui_anim_interval_timer);
            anim_count = 0;
            processing = 0;
            driver_notify_ui_displayed = 0;
            getuserlocation();
        }


    },100);

    
    
}


function process_push_message(payload){
    //$('#driver-search').hide();
    if(!app_fully_started){
        push_notification_buffer = payload;
        return;
    }
    if(map)showhidedriversearch(0);
    clearTimeout(driver_search_display_timer);
    if("gcm" in payload){
        if(payload.show == 1){
            //flash message
            $('#notif-title').html(payload.gcm.title);
            $('#notif-img').attr('src','img/notification_bg.jpg');
            $('#notif-content').html(payload.gcm.body);
            
            notification_dialog.show();
                
            //ons.notification.alert(payload.gcm.body,{title:payload.gcm.title});
            return;
        }

        try{

            var ext_data_embed = JSON.parse(payload.show);
            if(typeof ext_data_embed == 'object'){
                if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 1){ //mode to show more detailed messages
                    $('#notif-title').html(ext_data_embed.title);
                    $('#notif-img').attr('src','img/notification_bg.jpg');
                    $('#notif-img-preload').attr('src','');
                    if(ext_data_embed.hasOwnProperty('image_url') && ext_data_embed.image_url){
                        $('#notif-img-preload').attr('src',ext_data_embed.image_url);
                    }
                    var message_html_content = ext_data_embed.message;
                    var entities_map = {
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&quot;': '"',
                    '&#039;': "'"
                    };
                
                    var message_dec_html = message_html_content.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m){return entities_map[m];});
                    message_dec_html = message_dec_html.replace(/(\\r\\n|\\n|\\r)/gm, "");
                    $('#notif-content').html(message_dec_html);

                    $('#notif-content').find('a').each(function(){
                        var el = $(this);
                        el.off('click').on('click', function(e){
                          e.preventDefault();
                          e.stopPropagation();        
                          let a_href = $(this).attr('href');
                          window.open(a_href, '_system', 'location=yes');
                        })
                    })

                    notification_dialog.show();
                    
                }else if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 3){
                    //account activation / deativation
                    ons.notification.alert(ext_data_embed.message,{title:""}); 
                    if(ext_data_embed.status == 0){
                        //account deativated
                        let top_page = document.querySelector('#myNavigator').topPage;
                        if(top_page.id != "loginpage"){
                            Login_show();
                        }
                    }
                                               
                }
                
            }            

        }catch(e){
            console.log(e);
        }
        //console.log("New foreground FCM message: ", payload);
    }else if("show" in payload){
        if(payload.show == 1){
            //flash message
            let msg_obj = JSON.parse(payload.msg);
            $('#notif-title').html(msg_obj.title);
            $('#notif-content').html(msg_obj.message);
            notification_dialog.show();
            
        }

        try{

            var ext_data_embed = JSON.parse(payload.show);
            if(typeof ext_data_embed == 'object'){
                if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 1){ //mode to show more detailed messages
                    $('#notif-title').html(ext_data_embed.title);
                    $('#notif-img').attr('src','img/notification_bg.jpg');
                    $('#notif-img-preload').attr('src','');
                    if(ext_data_embed.hasOwnProperty('image_url') && ext_data_embed.image_url){
                        $('#notif-img-preload').attr('src',ext_data_embed.image_url);
                    }

                    var message_html_content = ext_data_embed.message;
                    var entities_map = {
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&quot;': '"',
                    '&#039;': "'"
                    };
                
                    var message_dec_html = message_html_content.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m){return entities_map[m];});
                    message_dec_html = message_dec_html.replace(/(\\r\\n|\\n|\\r)/gm, "");

                    $('#notif-content').html(message_dec_html);

                    $('#notif-content').find('a').each(function(){
                        var el = $(this);
                        el.off('click').on('click', function(e){
                          e.preventDefault();
                          e.stopPropagation();        
                          let a_href = $(this).attr('href');
                          window.open(a_href, '_system', 'location=yes');
                        })
                    })


                    notification_dialog.show();

                }else if(ext_data_embed.hasOwnProperty('mode') && ext_data_embed.mode == 3){
                    //account activation / deativation
                    ons.notification.alert(ext_data_embed.message,{title:""}); 
                    if(ext_data_embed.status == 0){
                        //account deativated
                        let top_page = document.querySelector('#myNavigator').topPage;
                        if(top_page.id != "loginpage"){
                            Login_show();
                        }
                    }
                                               
                }
            }            

        }catch(e){
            console.log(e);
        }
    }

    if(payload.hasOwnProperty('booking_id') && payload.hasOwnProperty('action')){

        if(payload.action != "chat-message"){
            if(processed_notifications.hasOwnProperty(payload.booking_id)){
                var found = processed_notifications[payload.booking_id].find(function(el){
                    
                    return el == payload.action;
                    
                });
                if(found){
                    //console.log('processed');
                    if(payload.action != "customer-onride")return; //allow customer-onride action to be processed multiple times since we are also using it for Waypoint / Stop status notifications

                }else{
                    processed_notifications[payload.booking_id].push(payload.action);
                    //console.log('added');
                }
            }else{

                
                    processed_notifications[payload.booking_id] = [payload.action];
                
                
                //console.log('new');                    
            }
        }

        switch(payload.action){
            case "driver-assigned":
            driver_assigned_notify(payload);
            break;
            case "driver-arrived":
            driver_arrived_notify(payload);
            break;
            case "customer-onride":
            customer_onride_notify(payload);
            break;
            case "driver-complete":
            driver_complete_notify(payload);
            break;
            case "driver-cancelled":
            driver_cancelled_notify(payload);
            break;
            case "chat-message":
            driver_chat_msg_notify(payload);
            break;
            case "app-message":
            app_message(payload);
            break;
        }
        return;
    }
    
    if("action" in payload){
        return;
        switch(payload.action){
            /* case "driver-assigned":
            driver_assigned_notify(payload);
            break;
            case "driver-arrived":
            driver_arrived_notify(payload);
            break;
            case "customer-onride":
            customer_onride_notify(payload);
            break;
            case "driver-complete":
            driver_complete_notify(payload);
            break;
            case "driver-cancelled":
            driver_cancelled_notify(payload);
            break; */
            case "app-message":
            app_message(payload);
            break;
        }
    }


}



function resumeBooking(booking_id){

    if(!booking_id)return;

    loading.show();
    
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'resumebooking', 'booking_id':booking_id},
        dataType: 'json',
        success: function(data){

            loading.hide();

            if(data.hasOwnProperty('error')){
                
                ons.notification.toast(__(data.error),{
                    timeout: 1000
                });
                return;
            }
            
            if(data.hasOwnProperty('success')){
                
                document.querySelector('#myNavigator').popPage({animation: 'fade'});

                switch(data.ongoing_bk.action){
                    case "driver-assigned":
                    driver_assigned_notify(data.ongoing_bk);
                    break;
                    case "driver-arrived":
                    driver_arrived_notify(data.ongoing_bk);
                    break;
                    case "customer-onride":
                    customer_onride_notify(data.ongoing_bk);
                    break;
                }

            }
            

        },
        error: function(){

            loading.hide();
            
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });

            return;

        } 


    });


}

function driver_chat_msg_notify(push_data){
    notification_sound.play();
    if(!chat_window_display_status){
        $('#chat-new-msg-ind').show();
    }
    chat_update_content(push_data.booking_id);
}


function driver_assigned_notify(push_data){ //show driver assigned app UI notification

    notification_sound.play();
    current_booking_data.status = 1;
    current_booking_data.action = push_data.action;
    current_booking_data.booking_id = push_data.booking_id;
    current_booking_data.driver_id = push_data.driver_id;
    current_booking_data.driver_firstname = push_data.driver_firstname;
    current_booking_data.driver_phone = push_data.driver_phone;
    current_booking_data.driver_platenum = push_data.driver_platenum;
    current_booking_data.driver_rating = push_data.driver_rating;
    current_booking_data.driver_location_lat = push_data.driver_location_lat;
    current_booking_data.driver_location_long = push_data.driver_location_long;
    current_booking_data.pickup_addr = push_data.pickup_addr;
    current_booking_data.dropoff_addr = push_data.dropoff_addr;
    current_booking_data.pickup_lat = push_data.pickup_lat;
    current_booking_data.pickup_long = push_data.pickup_long;
    current_booking_data.dropoff_lat = push_data.dropoff_lat;
    current_booking_data.dropoff_long = push_data.dropoff_long;
    current_booking_data.driver_completed = push_data.driver_completed_rides;
    current_booking_data.route_id = push_data.route_id;
    current_booking_data.driver_carid = push_data.driver_carid;
    current_booking_data.driver_carmodel = push_data.driver_carmodel;
    current_booking_data.driver_photo = push_data.driver_photo;
    current_booking_data.completion_code = push_data.completion_code;


    $("#statusmsg h3").html(__("Driver is on his way"));
    $('#ride-time-status').show();

    //compute how much time it will take driver to reach rider pickup location
    let rider_latlng = {'lat':parseFloat(push_data.pickup_lat),'lng':parseFloat(push_data.pickup_long)};
    let driver_latlng = {'lat':parseFloat(push_data.driver_location_lat),'lng':parseFloat(push_data.driver_location_long)};
    let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(rider_latlng, driver_latlng); //distance in meters
    let time_to_pickup_location_sec = distance / 15.555555556; //56km/hr to m/s - worst case time if driver is driving at this average speed

    let time_to_pickup_location_min = Math.floor(time_to_pickup_location_sec / 60);

    $('#ride-action-time').text(time_to_pickup_location_min); 

    if(time_to_pickup_location_min > 1){
        $('#ride-action-time-unit').text('Mins'); 
    }else{
        $('#ride-action-time-unit').text('Min');
    }
        
    let driver_rides_count = '';    
    
    $('#assigned-driver-image-preload').attr('src',push_data.driver_photo); //load driver image
    $('#current-ride-driver-name').html(push_data.driver_firstname); //load driver firstname
    $('#current-ride-driver-car-model').html(push_data.driver_carmodel); //load driver car model and color
    $('#current-ride-driver-rating').attr("src","img/rating-" + push_data.driver_rating + ".png"); //load driver rating
    $('#current-ride-driver-car-number').html(push_data.driver_platenum); //load driver car plate number
    //$('#driver-rides-count').html("+" + (parseInt(push_data.driver_completed_rides / 10) * 10) + " " + __('Trips'));
    $('#driver-rides-count').html(push_data.driver_completed_rides + " " + __('Trips'));
    $('#current-ride-vehicle-img').attr('src', $(`#uniq-car-type-id-${push_data.driver_carid}`).attr('src'));

    let ride_otp = push_data.completion_code + "";
    let ride_otp_styled = "";

    for(let x = 0;x < ride_otp.length;x++){
        let ride_otp_letter = ride_otp[x];
        ride_otp_styled += `<span class='ride-otp-style'>${ride_otp_letter}</span>`; 
    }

    app_settings.ride_otp == 0 ? $('#current-ride-completion-code').hide() : $('#current-ride-completion-code').show();

    $('#current-ride-completion-code').html(ride_otp_styled); //load completion code

    $('#current-ride-pickup').html(push_data.pickup_addr);
    $('#current-ride-dropoff').html(push_data.dropoff_addr ? push_data.dropoff_addr : __('Destination not specified'));
    

    $('#call-driver').data('phonenum',push_data.driver_phone); //load call driver action button data
    $('#sms-driver').data('phonenum',push_data.driver_phone); //load sms driver action button data
    $('#cancel-ride').data('bookingid',push_data.booking_id); ////load cancel booking action button data

    
    $('#chat-msg-send-btn').data('bookingid', push_data.booking_id);
    $('#chat-window-show-btn').data('bookingid', push_data.booking_id);

    var driver_location_lat = parseFloat(push_data.driver_location_lat);
    var driver_location_long = parseFloat(push_data.driver_location_long);

    clearMapItemsSelectively();    
    
    
    pick_up_data=[];
    drop_off_data=[];
    pick_up_data = {'address': '','lng':'','lat':''};
    drop_off_data = {'address': '','lng':'','lat':''};

    //reset multi destination mode
    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();
    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0; 
    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

    
    $('#bookbutton').css('visibility','hidden');
    $('#pickup-addr-disp').hide();
    $('#dropoff-addr-disp').hide();
    $('#pac-input').val('');
    $('#pac-input2').val('');

    map.setClickable(false);
    map.animateCamera({
        target: {lat: driver_location_lat, lng: driver_location_long},
        zoom: 15,
        duration: 1000,
        padding: 0  // default = 20px
        }, function() {
        map.setClickable(true);
        //alert("Camera target has been changed");
    });

    marker1.setVisible(true);
    marker1.setPosition({lat: parseFloat(push_data.pickup_lat),lng: parseFloat(push_data.pickup_long)});

    try{

        let route_directions = JSON.parse(push_data.directions);

        if(route_directions.hasOwnProperty('status') && route_directions.status == 'OK'){

            map.setClickable(false);

            let route_legs = route_directions.routes[0].legs;
            let route_duration = 0;
            let route_distance = 0;
            route_legs.forEach(function(val,indx){
                route_duration += parseInt(val.duration);
                route_distance += parseInt(val.distanceMeters);
            })

            route_duration = Math.ceil(route_duration / 60);
            route_distance = route_distance / 1000;

            
            let route_duration_text = route_directions.routes[0].duration;
            let route_distance_text = route_directions.routes[0].distanceMeters + "m";

            toggleroutepathanimation(0);
                            

            route_points = [];
            route_points = plugin.google.maps.geometry.encoding.decodePath(route_directions.routes["0"].polyline.encodedPolyline);

            //plot route
            if(route_polyline != null){
                route_polyline.setVisible(false);
                route_polyline.setPoints(route_points);
                route_polyline.setVisible(true);  

                toggleroutepathanimation(1);

                map.animateCamera({
                target: route_points,
                duration: 1000,
                }, function() {
                    //alert("Camera target has been changed");
                    map.setClickable(true);

                    
                });
                
            }else{

                route_polyline = map.addPolyline({
                    "points": route_points,
                    'color' : '#000000',
                    'width': 3,
                    'geodesic': true,
                    'clickable': true
                });
                
                route_polyline.setVisible(true);

                
                toggleroutepathanimation(1);

                
                route_polyline.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                    
                    map.animateCamera({
                        target: route_points,
                        duration: 1000
                        }, function() {
                        //alert("Camera target has been changed");
                        map.setClickable(true);
                    });
                });

                map.animateCamera({
                    target: route_points,
                    duration: 1000
                    }, function() {
                        //alert("Camera target has been changed");
                        map.setClickable(true);

                });

                

            }        
                            
            
            
                         
            
        }
    }catch(e){
        console.log(e);
    }   
    
    
    $("#menubtn").removeClass("fadeOutLeft animated").addClass("fadeOutLeft animated").one('animationend', function(){
        $(this).removeClass("fadeOutLeft animated");
        $("#menubtn").css("visibility","hidden");
        $("#menubtn").css("z-index","10");
        $('#mylocationbtn').css('visibility', 'hidden');
        $('#presetroutesbtn').css('visibility', 'hidden');
        $("#trip-summary-back-btn").css("z-index","10");
        $('#ride-request-cancel-btn').css("z-index","10");
        $('#ride-request-cancel-btn').css("visibility","hidden");
        $("#driver-notify-ui-back-btn").css("visibility","visible");
        $("#driver-notify-ui-back-btn").css("z-index","100");
        $("#driver-notify-ui-back-btn").removeClass("fadeInRight animated").addClass("fadeInRight animated").one('animationend', function(){
            $(this).removeClass("fadeInRight animated");                       
        })

    })

        
    $('#bookbutton').css("visibility","hidden");//hide the book ride button
    $("#pick-box").css("visibility","hidden");
    $('#pickup-addr-disp').hide();
    $('#dropoff-addr-disp').hide();
    $("#drop-box-container").css("visibility","hidden");
    $('#banner-items-container').fadeOut();
    $("#recent-strip-container").css("visibility","hidden");
    $("#new-bookng-details").css("visibility","hidden");
    $("#new-bookng-details").css("left", "-10000px");
    $("#ride-details-container").hide();
    $('#map-event-absorber').hide();
    map.setPadding(0,0,0,0);
    

    
    $("#wait-time-info-container").hide();
    $("#current-ride-driver-details").css("visibility","visible");
    $("#current-ride-driver-details").removeClass("fadeInUp animated").addClass("fadeInUp animated").one('animationend', function(){
        $(this).removeClass("fadeInUp animated");
        driver_notify_ui_displayed = 1;
    })


}


function driver_arrived_notify(push_data){ //show driver arrived app UI notification
  
    
    notification_sound.play();

    current_booking_data.status = 2;
    current_booking_data.action = push_data.action;
    current_booking_data.booking_id = push_data.booking_id;
    current_booking_data.driver_id = push_data.driver_id;
    current_booking_data.driver_firstname = push_data.driver_firstname;
    current_booking_data.driver_phone = push_data.driver_phone;
    current_booking_data.driver_platenum = push_data.driver_platenum;
    current_booking_data.driver_rating = push_data.driver_rating;
    current_booking_data.driver_location_lat = push_data.driver_location_lat;
    current_booking_data.driver_location_long = push_data.driver_location_long;
    current_booking_data.pickup_addr = push_data.pickup_addr;
    current_booking_data.dropoff_addr = push_data.dropoff_addr;
    current_booking_data.pickup_lat = push_data.pickup_lat;
    current_booking_data.pickup_long = push_data.pickup_long;
    current_booking_data.dropoff_lat = push_data.dropoff_lat;
    current_booking_data.dropoff_long = push_data.dropoff_long;
    current_booking_data.driver_carmodel = push_data.driver_carmodel;
    current_booking_data.driver_completed = push_data.driver_completed_rides;
    current_booking_data.route_id = push_data.route_id;
    current_booking_data.driver_carid = push_data.driver_carid;
    current_booking_data.driver_photo = push_data.driver_photo;
    current_booking_data.completion_code = push_data.completion_code;
    current_booking_data.driver_arrived_time = push_data.driver_arrived_time; //save time driver arrived
    current_booking_data.driver_start_time = push_data.driver_start_time; //save time driver started
    
    $("#statusmsg h3").html(__("Driver has arrived. Meet Driver"));
    
    //process wait time

    let route_cars = routetariffs.result[push_data.route_id].cars;
    let wait_time = 0;
    let wait_time_cost = 0.00;
    for(var key in route_cars){
        if(route_cars[key].id == push_data.driver_carid){
            wait_time = parseInt(route_cars[key].wait_time);
            wait_time_cost = parseFloat(route_cars[key].wait_cost_per_minute);
        }
    }

    clearInterval(wait_timer_handle);

    if(wait_time && current_booking_data.driver_start_time == 0){
        $("#wait-time-info-container").css('background-color','#4CAF50');
        $("#wait-time-info").html(__('Free waiting time') + " <b>--:--</b>");
        
        wait_timer_handle = setInterval(function(){

            
            let current_local_timestamp = Date.now();
            current_local_timestamp += server_client_time_diff; //sync with server time
            current_local_timestamp = current_local_timestamp / 1000 | 0;       
            let elapsed_time = current_local_timestamp - current_booking_data.driver_arrived_time;
            if(elapsed_time < 0){
                elapsed_time = 0;
            }


            let wait_time_left = (wait_time * 60) - elapsed_time;

            let display_time = Math.abs(wait_time_left);

            

            //convert to minute and seconds
            let seconds_time = display_time % 60;
            let minute_time = Math.floor(display_time / 60);

            let sec_str = seconds_time.toString().length < 2 ? "0" + seconds_time : seconds_time;
            let min_str = minute_time.toString().length < 2 ? "0" + minute_time : minute_time;

            if(wait_time_left < 0){ //wait time has elapsed. Indicate 
                $("#wait-time-info-container").css('background-color','black');
                $("#wait-time-info").html(__('Waiting time') + ` <b>${min_str}:${sec_str}</b>`);
            }else{
                $("#wait-time-info-container").css('background-color','#4CAF50');
                $("#wait-time-info").html(__('Free waiting time') + ` <b>${min_str}:${sec_str}</b>`);
            }

        },1000);
    }else{
        $("#wait-time-info-container").hide();
    }
    
    

    $('#assigned-driver-image-preload').attr('src',push_data.driver_photo); //load driver image
    $('#current-ride-driver-name').html(push_data.driver_firstname); //load driver firstname
    $('#current-ride-driver-car-model').html(push_data.driver_carmodel); //load driver car model and color
    $('#current-ride-driver-rating').attr("src","img/rating-" + push_data.driver_rating + ".png"); //load driver rating
    $('#current-ride-driver-car-number').html(push_data.driver_platenum); //load driver car plate number
    //$('#driver-rides-count').html("+" + (parseInt(push_data.driver_completed_rides / 10) * 10) + " " + __('Trips'));
    $('#driver-rides-count').html(push_data.driver_completed_rides + " " + __('Trips'));
    $('#current-ride-vehicle-img').attr('src', $(`#uniq-car-type-id-${push_data.driver_carid}`).attr('src'));

    let ride_otp = push_data.completion_code + "";
    let ride_otp_styled = "";

    for(let x = 0;x < ride_otp.length;x++){
        let ride_otp_letter = ride_otp[x];
        ride_otp_styled += `<span class='ride-otp-style'>${ride_otp_letter}</span>`; 
    }

    app_settings.ride_otp == 0 ? $('#current-ride-completion-code').hide() : $('#current-ride-completion-code').show();

    $('#current-ride-completion-code').html(ride_otp_styled); //load completion code

    $('#current-ride-pickup').html(push_data.pickup_addr);
    $('#current-ride-dropoff').html(push_data.dropoff_addr ? push_data.dropoff_addr : __('Destination not specified'));

    $('#call-driver').data('phonenum',push_data.driver_phone); //load call driver action button data
    $('#sms-driver').data('phonenum',push_data.driver_phone); //load sms driver action button data
    $('#cancel-ride').data('bookingid',push_data.booking_id); ////load cancel booking action button data

    
    $('#chat-msg-send-btn').data('bookingid', push_data.booking_id);
    $('#chat-window-show-btn').data('bookingid', push_data.booking_id);

    var driver_location_lat = parseFloat(push_data.driver_location_lat);
    var driver_location_long = parseFloat(push_data.driver_location_long);

    clearMapItemsSelectively();   
    
    
    pick_up_data=[];
    drop_off_data=[];
    pick_up_data = {'address': '','lng':'','lat':''};
    drop_off_data = {'address': '','lng':'','lat':''};

    //reset multi destination mode
    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();
    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0; 
    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

    
    
    $('#pac-input').val('');
    $('#pac-input2').val('');

    map.setClickable(false);
    map.animateCamera({
        target: {lat: driver_location_lat, lng: driver_location_long},
        zoom: 15,
        duration: 2000,
        padding: 0  // default = 20px
        }, function() {
        map.setClickable(true);
        //alert("Camera target has been changed");
    });

    if(driver_notify_ui_displayed){
    
        $('#bookbutton').css("visibility","hidden");//hide the book ride button
        $('#pickup-addr-disp').hide();
        $('#dropoff-addr-disp').hide();
        $("#pick-box").css("visibility","hidden");
        $("#drop-box-container").css("visibility","hidden");
        $('#banner-items-container').fadeOut();
        $("#recent-strip-container").css("visibility","hidden");
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();

        map.setPadding(0,0,0,0);

        
        $("#current-ride-driver-details").css("visibility","visible");
        $("#wait-time-info-container").hide();
        if(wait_time && current_booking_data.driver_start_time == 0){
            $("#wait-time-info-container").show();            
        }
    }else{
        $("#menubtn").removeClass("fadeOutLeft animated").addClass("fadeOutLeft animated").one('animationend', function(){
            $(this).removeClass("fadeOutLeft animated");
            $("#menubtn").css("visibility","hidden");
            $("#menubtn").css("z-index","10");
            $('#presetroutesbtn').css('visibility', 'hidden');
            $('#mylocationbtn').css('visibility', 'hidden');
            $("#trip-summary-back-btn").css("z-index","10");
            $('#ride-request-cancel-btn').css("z-index","10");
            $('#ride-request-cancel-btn').css("visibility","hidden");
    
            $("#driver-notify-ui-back-btn").css("visibility","visible");
            $("#driver-notify-ui-back-btn").css("z-index","100");
            $("#driver-notify-ui-back-btn").removeClass("fadeInRight animated").addClass("fadeInRight animated").one('animationend', function(){
                $(this).removeClass("fadeInRight animated");
                           
            })
    
        })
    
            
        $('#bookbutton').css("visibility","hidden");//hide the book ride button
        $('#pickup-addr-disp').hide();
        $('#dropoff-addr-disp').hide();
        $("#pick-box").css("visibility","hidden");
        $("#drop-box-container").css("visibility","hidden");
        $('#banner-items-container').fadeOut();
        $("#new-bookng-details").css("left", "-10000px");
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#recent-strip-container").css("visibility","hidden");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();

        map.setPadding(0,0,0,0);
        
    
           
    
        $("#current-ride-driver-details").css("visibility","visible");
        $("#current-ride-driver-details").removeClass("fadeInUp animated").addClass("fadeInUp animated").one('animationend', function(){
            $(this).removeClass("fadeInUp animated");
            driver_notify_ui_displayed = 1;
            $("#wait-time-info-container").hide();
            if(wait_time){
                $("#wait-time-info-container").show();
                $("#wait-time-info-container").removeClass("fadeInUp animated").addClass("fadeInUp animated").one('animationend', function(){
                    $(this).removeClass("fadeInUp animated");
                });
            }
        })
    }

}




function customer_onride_notify(push_data){ //show driver assigned app UI notification
    
    notification_sound.play();
    
    current_booking_data.status = 3;
    current_booking_data.action = push_data.action;
    current_booking_data.booking_id = push_data.booking_id;
    current_booking_data.driver_id = push_data.driver_id;
    current_booking_data.driver_firstname = push_data.driver_firstname;
    current_booking_data.driver_phone = push_data.driver_phone;
    current_booking_data.driver_platenum = push_data.driver_platenum;
    current_booking_data.driver_rating = push_data.driver_rating;
    current_booking_data.driver_location_lat = push_data.driver_location_lat;
    current_booking_data.driver_location_long = push_data.driver_location_long;
    current_booking_data.pickup_addr = push_data.pickup_addr;
    current_booking_data.dropoff_addr = push_data.dropoff_addr;
    current_booking_data.pickup_lat = push_data.pickup_lat;
    current_booking_data.pickup_long = push_data.pickup_long;
    current_booking_data.dropoff_lat = push_data.dropoff_lat;
    current_booking_data.dropoff_long = push_data.dropoff_long;
    current_booking_data.driver_carmodel = push_data.driver_carmodel;
    current_booking_data.driver_completed = push_data.driver_completed_rides;
    current_booking_data.driver_carid = push_data.driver_carid;
    current_booking_data.driver_photo = push_data.driver_photo;
    current_booking_data.completion_code = push_data.completion_code;
    current_booking_data.driver_arrived_stop_time_1 = push_data.date_arrived_stop_1;
    current_booking_data.driver_arrived_stop_time_2 = push_data.date_arrived_stop_2;
    current_booking_data.driver_left_stop_time_1 = push_data.date_left_stop_1;
    current_booking_data.driver_left_stop_time_2 = push_data.date_left_stop_2;

    
    $("#statusmsg h3").html(__("Your trip has begun"));
    $('#ride-time-status').show();

    $('#assigned-driver-image-preload').attr('src',push_data.driver_photo); //load driver image
    $('#current-ride-driver-name').html(push_data.driver_firstname); //load driver firstname
    $('#current-ride-driver-car-model').html(push_data.driver_carmodel); //load driver car model and color
    $('#current-ride-driver-rating').attr("src","img/rating-" + push_data.driver_rating + ".png"); //load driver rating
    $('#current-ride-driver-car-number').html(push_data.driver_platenum); //load driver car plate number
    //$('#driver-rides-count').html("+" + (parseInt(push_data.driver_completed_rides / 10) * 10) + " " + __('Trips'));
    $('#driver-rides-count').html(push_data.driver_completed_rides + " " + __('Trips'));
    $('#current-ride-vehicle-img').attr('src', $(`#uniq-car-type-id-${push_data.driver_carid}`).attr('src'));

    let ride_otp = push_data.completion_code + "";
    let ride_otp_styled = "";

    for(let x = 0;x < ride_otp.length;x++){
        let ride_otp_letter = ride_otp[x];
        ride_otp_styled += `<span class='ride-otp-style'>${ride_otp_letter}</span>`; 
    }

    app_settings.ride_otp == 0 ? $('#current-ride-completion-code').hide() : $('#current-ride-completion-code').show();
    
    $('#current-ride-completion-code').html(ride_otp_styled); //load completion code

    $('#current-ride-pickup').html(push_data.pickup_addr);
    $('#current-ride-dropoff').html(push_data.dropoff_addr ? push_data.dropoff_addr : __('Destination not specified'));
    

    $('#call-driver').data('phonenum',push_data.driver_phone); //load call driver action button data
    $('#sms-driver').data('phonenum',push_data.driver_phone); //load sms driver action button data
    $('#cancel-ride').data('bookingid',push_data.booking_id); ////load cancel booking action button data

    
    $('#chat-msg-send-btn').data('bookingid', push_data.booking_id);
    $('#chat-window-show-btn').data('bookingid', push_data.booking_id);

    clearInterval(wait_timer_handle); //stop timer that keeps track of wait time

    //process wait time

    let route_cars = routetariffs.result[push_data.route_id].cars;
    let wait_time = 0;
    let wait_time_cost = 0.00;
    

    for(var key in route_cars){
        if(route_cars[key].id == push_data.driver_carid){
            wait_time = parseInt(route_cars[key].wait_time);
            wait_time_cost = parseFloat(route_cars[key].wait_cost_per_minute);
        }
    }

    let stop_arrived_time = 0;

    if(push_data.waypoint1_address && push_data.waypoint2_address){

        if(push_data.date_arrived_stop_1 && !push_data.date_left_stop_1 && !push_data.date_arrived_stop_2 && !push_data.date_left_stop_2){
            //arrived stop 1
            stop_arrived_time = parseInt(push_data.date_arrived_stop_1);
            $("#statusmsg h3").html(__("Driver has arrived at stop 1"));
        }else if(push_data.date_arrived_stop_1 && push_data.date_left_stop_1 && !push_data.date_arrived_stop_2 && !push_data.date_left_stop_2){
            //left stop 1
            $("#statusmsg h3").html(__("Your trip has resumed"));
            
        }else if(push_data.date_arrived_stop_1 && push_data.date_left_stop_1 && push_data.date_arrived_stop_2 && !push_data.date_left_stop_2){
            //arrived stop 2
            stop_arrived_time = parseInt(push_data.date_arrived_stop_2);
            $("#statusmsg h3").html(__("Driver has arrived at stop 2"));
        }else if(push_data.date_arrived_stop_1 && push_data.date_left_stop_1 && push_data.date_arrived_stop_2 && push_data.date_left_stop_2){
            //left stop 2
            $("#statusmsg h3").html(__("Your trip has resumed"));
        }

    }else if(push_data.waypoint1_address){

        if(push_data.date_arrived_stop_1 && !push_data.date_left_stop_1){
            //arrived stop 1
            stop_arrived_time = parseInt(push_data.date_arrived_stop_1);
            $("#statusmsg h3").html(__("Driver has arrived at your stop"));
        }else if(push_data.date_arrived_stop_1 && push_data.date_left_stop_1){
            //left stop 1
            $("#statusmsg h3").html(__("Your trip has resumed"));
        }
    }else if(push_data.waypoint2_address){
        if(push_data.date_arrived_stop_2 && !push_data.date_left_stop_2){
            //arrived stop 2
            stop_arrived_time = parseInt(push_data.date_arrived_stop_2);
            $("#statusmsg h3").html(__("Driver has arrived at your stop"));
        }else if(push_data.date_arrived_stop_2 && push_data.date_left_stop_2){
            //left stop 2
            $("#statusmsg h3").html(__("Your trip has resumed"));
        }
    }


    if(wait_time && stop_arrived_time != 0){
        $("#wait-time-info-container").css('background-color','#4CAF50');
        $("#wait-time-info").html(__('Free waiting time') + " <b>--:--</b>");
        
        wait_timer_handle = setInterval(function(){

            
            let current_local_timestamp = Date.now();
            current_local_timestamp += server_client_time_diff; //sync with server time
            current_local_timestamp = current_local_timestamp / 1000 | 0;       
            let elapsed_time = current_local_timestamp - stop_arrived_time;
            if(elapsed_time < 0){
                elapsed_time = 0;
            }


            let wait_time_left = (wait_time * 60) - elapsed_time;

            let display_time = Math.abs(wait_time_left);

            

            //convert to minute and seconds
            let seconds_time = display_time % 60;
            let minute_time = Math.floor(display_time / 60);

            let sec_str = seconds_time.toString().length < 2 ? "0" + seconds_time : seconds_time;
            let min_str = minute_time.toString().length < 2 ? "0" + minute_time : minute_time;

            if(wait_time_left < 0){ //waiting time has elapsed. Indicate 
                $("#wait-time-info-container").css('background-color','black');
                $("#wait-time-info").html(__('Waiting time') + ` <b>${min_str}:${sec_str}</b>`);
            }else{
                $("#wait-time-info-container").css('background-color','#4CAF50');
                $("#wait-time-info").html(__('Free waiting time') + ` <b>${min_str}:${sec_str}</b>`);
            }

        },1000);
    }else{
        $("#wait-time-info-container").hide();
    }


    //compute how much time it will take driver to reach rider dropoff location
    if(parseFloat(push_data.dropoff_lat) && parseFloat(push_data.dropoff_long)){
        let rider_latlng = {'lat':parseFloat(push_data.dropoff_lat),'lng':parseFloat(push_data.dropoff_long)};
        let driver_latlng = {'lat':parseFloat(push_data.driver_location_lat),'lng':parseFloat(push_data.driver_location_long)};
        let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(rider_latlng, driver_latlng); //distance in meters
        let time_to_pickup_location_sec = distance / 15.555555556; //56km/hr to m/s - worst case time if driver is driving at this average speed

        let time_to_pickup_location_min = Math.floor(time_to_pickup_location_sec / 60);
        $('#ride-action-time').text(time_to_pickup_location_min); 
        if(time_to_pickup_location_min > 1){
            $('#ride-action-time-unit').text('Mins'); 
        }else{
            $('#ride-action-time-unit').text('Min');
        }
    }else{
        $('#ride-action-time').text('--');
        $('#ride-action-time-unit').text('Min');
    }

    var driver_location_lat = parseFloat(push_data.driver_location_lat);
    var driver_location_long = parseFloat(push_data.driver_location_long);

    clearMapItemsSelectively();
    
    
    pick_up_data=[];
    drop_off_data=[];
    pick_up_data = {'address': '','lng':'','lat':''};
    drop_off_data = {'address': '','lng':'','lat':''};

    //reset multi destination mode
    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();

    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0; 
    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

        
    $('#pac-input').val('');
    $('#pac-input2').val('');

    map.setClickable(false);
    map.animateCamera({
        target: {lat: driver_location_lat, lng: driver_location_long},
        zoom: 15,
        duration: 2000,
        padding: 0  // default = 20px
        }, function() {
        map.setClickable(true);
        //alert("Camera target has been changed");
    });

    if(parseFloat(push_data.dropoff_lat) && parseFloat(push_data.dropoff_long)){
        marker2.setVisible(true);
        marker2.setPosition({lat: parseFloat(push_data.dropoff_lat),lng: parseFloat(push_data.dropoff_long)});
    }

    if(push_data.waypoint1_address){
        markerds1.setVisible(true);
        markerds1.setPosition({lat: parseFloat(push_data.waypoint1_lat),lng: parseFloat(push_data.waypoint1_long)});
    }

    if(push_data.waypoint2_address){
        markerds2.setVisible(true);
        markerds2.setPosition({lat: parseFloat(push_data.waypoint2_lat),lng: parseFloat(push_data.waypoint2_long)});
    }

    try{

        let route_directions = JSON.parse(push_data.directions);

        if(route_directions.hasOwnProperty('status') && route_directions.status == 'OK'){

            map.setClickable(false);

            let route_legs = route_directions.routes[0].legs;
            let route_duration = 0;
            let route_distance = 0;
            route_legs.forEach(function(val,indx){
                route_duration += parseInt(val.duration);
                route_distance += parseInt(val.distanceMeters);
            })

            route_duration = Math.ceil(route_duration / 60);
            route_distance = route_distance / 1000;

            
            let route_duration_text = route_directions.routes[0].duration;
            let route_distance_text = route_directions.routes[0].distanceMeters + "m";

            toggleroutepathanimation(0);
                            

            route_points = [];
            route_points = plugin.google.maps.geometry.encoding.decodePath(route_directions.routes["0"].polyline.encodedPolyline);

            //plot route
            if(route_polyline != null){
                route_polyline.setVisible(false);
                route_polyline.setPoints(route_points);
                route_polyline.setVisible(true);  

                toggleroutepathanimation(1);

                map.animateCamera({
                target: route_points,
                duration: 1000,
                }, function() {
                    //alert("Camera target has been changed");
                    map.setClickable(true);

                    
                });
                
            }else{

                route_polyline = map.addPolyline({
                    "points": route_points,
                    'color' : '#000000',
                    'width': 3,
                    'geodesic': true,
                    'clickable': true
                });
                
                route_polyline.setVisible(true);

                
                toggleroutepathanimation(1);

                
                route_polyline.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                    
                    map.animateCamera({
                        target: route_points,
                        duration: 1000
                        }, function() {
                        //alert("Camera target has been changed");
                        map.setClickable(true);
                    });
                });

                map.animateCamera({
                    target: route_points,
                    duration: 1000
                    }, function() {
                        //alert("Camera target has been changed");
                        map.setClickable(true);

                });

                

            }        
                            
            
            
                         
            
        }
    }catch(e){
        console.log(e);
    }   

    

    if(driver_notify_ui_displayed){
    
        $('#bookbutton').css("visibility","hidden");//hide the book ride button
        $('#pickup-addr-disp').hide();
        $('#dropoff-addr-disp').hide();
        $("#pick-box").css("visibility","hidden");
        $("#drop-box-container").css("visibility","hidden");
        $('#banner-items-container').fadeOut();
        $("#recent-strip-container").css("visibility","hidden");
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();
        map.setPadding(0,0,0,0);

        
        
        $("#wait-time-info-container").hide();
        if(wait_time && stop_arrived_time != 0){
            $("#wait-time-info-container").show();            
        }
        $("#current-ride-driver-details").css("visibility","visible");
        
        /* $("#current-ride-driver-details").removeClass("fadeInUp animated").addClass("fadeInUp animated").one('animationend', function(){
            $(this).removeClass("fadeInUp animated");
        }) */
    }else{
        $("#menubtn").removeClass("fadeOutLeft animated").addClass("fadeOutLeft animated").one('animationend', function(){
            $(this).removeClass("fadeOutLeft animated");
            $("#menubtn").css("visibility","hidden");
            $("#menubtn").css("z-index","10");
            $("#trip-summary-back-btn").css("z-index","10");
            $('#ride-request-cancel-btn').css("z-index","10");
            $('#ride-request-cancel-btn').css("visibility","hidden");
            $('#mylocationbtn').css('visibility', 'hidden');
            $('presetroutesbtn').css('visibility', 'hidden');
            $("#driver-notify-ui-back-btn").css("visibility","visible");
            $("#driver-notify-ui-back-btn").css("z-index","100");
            $("#driver-notify-ui-back-btn").removeClass("fadeInRight animated").addClass("fadeInRight animated").one('animationend', function(){
                $(this).removeClass("fadeInRight animated");
                           
            })
    
        })
    
            
        $('#bookbutton').css("visibility","hidden");//hide the book ride button
        $('#pickup-addr-disp').hide();
        $('#dropoff-addr-disp').hide();
        $("#pick-box").css("visibility","hidden");
        $("#drop-box-container").css("visibility","hidden");
        $('#banner-items-container').fadeOut();
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#recent-strip-container").css("visibility","hidden");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();
        map.setPadding(0,0,0,0);
        
    
            
        $("#wait-time-info-container").hide();
        $("#current-ride-driver-details").css("visibility","visible");
        $("#current-ride-driver-details").removeClass("fadeInUp animated").addClass("fadeInUp animated").one('animationend', function(){
            $(this).removeClass("fadeInUp animated");
            driver_notify_ui_displayed = 1;
            $("#wait-time-info-container").hide();
            if(wait_time && stop_arrived_time != 0){
                $("#wait-time-info-container").show();
                $("#wait-time-info-container").removeClass("fadeInUp animated").addClass("fadeInUp animated").one('animationend', function(){
                    $(this).removeClass("fadeInUp animated");
                });
            }
        })
    }

}




function driver_complete_notify(push_data){ //show driver ride completed notification
    ride_rating = 5;
    current_booking_data = {'status':0,'action':'','booking_id':0,'driver_id':0,'driver_firstname':'','driver_phone':'','driver_platenum':'','driver_rating':'','driver_location_lat':0.00,'driver_location_long':0.00,'driver_carmodel':'','driver_photo':'','completion_code':'','pickup_addr' : '','dropoff_addr' : '','pickup_lat':0.00,'pickup_long':0.00,'dropoff_lat':0.00,'dropoff_long':0.00,'driver_completed' : 0,'driver_carid':0,'route_id':0,'driver_arrived_time':0,'driver_start_time':0,'driver_arrived_stop_time_1':0,'driver_arrived_stop_time_2':0,'driver_left_stop_time_1':0,'driver_left_stop_time_2':0};
    notification_sound.play();
    
    $("#statusmsg h3").html(__("Your trip has Ended"));
   
    clearMapItemsSelectively();
    
    pick_up_data=[];
    drop_off_data=[];
    pick_up_data = {'address': '','lng':'','lat':''};
    drop_off_data = {'address': '','lng':'','lat':''};

    //reset multi destination mode
    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();
    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0; 
    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

    
    $('#pac-input').val('');
    $('#pac-input2').val('');


    //process coupon code usage

    if(push_data.coupon_used){

        let stored_promo_code = localStorage.getObject('user-promo-codes');    

        if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
            
            let coupon_usage_count = stored_promo_code.times_used + 1;
            
            if(coupon_usage_count >= stored_promo_code.usage_limit){
                localStorage.removeItem('user-promo-codes');
                verified_coupon_code = '';
            }else{
                stored_promo_code.times_used = coupon_usage_count;
                localStorage.setObject("user-promo-codes",stored_promo_code);
            }
                
            
            
        }

    }
           

    
    
    $("#pick-box").css("visibility","visible");
    $("#drop-box-container").css("visibility","visible");
    $('#banner-items-container').fadeIn();
    $("#recent-strip-container").css("visibility","visible");
    $("#new-bookng-details").css("visibility","hidden");
    $("#new-bookng-details").css("left", "-10000px");
    $("#ride-details-container").hide();
    $('#map-event-absorber').hide();
    map.setPadding(0,0,0,0);


    $("#wait-time-info-container").hide();
    $("#current-ride-driver-details").removeClass("fadeOutDown animated").addClass("fadeOutDown animated").one('animationend', function(){
        $(this).removeClass("fadeOutDown animated");
        $("#current-ride-driver-details").css("visibility","hidden");
        $("#driver-notify-ui-back-btn").css("visibility","hidden");
        $("#driver-notify-ui-back-btn").css("z-index","10");
        $("#menubtn").css("visibility","visible");
        $("#menubtn").css("z-index","100");
        $('#mylocationbtn').css('visibility', 'visible');
        $('#presetroutesbtn').css('visibility', 'visible');
        $("#trip-summary-back-btn").css("z-index","10");
        $("#trip-summary-back-btn").css("visibility","hidden");
        $('#ride-request-cancel-btn').css("z-index","10");
        $('#ride-request-cancel-btn').css("visibility","hidden");
        getuserlocation();
        document.querySelector('#myNavigator').pushPage('html/ride-complete.html',{animation:'fade',data:{'comp_data':push_data}});
    })

}


function app_message(push_data){

    
    if(push_data.hasOwnProperty('no_driver')){

        //track booking retry count
        if(push_data.booking_id in booking_retry_counter){
            booking_retry_counter[push_data.booking_id]++;
        }else{
            booking_retry_counter[push_data.booking_id] = 1;
        }

        //display notification based on number of retries. Do not show retry button after three tries for a booking
        if(booking_retry_counter[push_data.booking_id] > 2){
            ons.notification.alert(push_data.message,{title:push_data.title});
        }else{
            
            document.querySelector('#retrybkdialog').show();

            $('#retry-booking-btn').off().on('click', function(){
                document.querySelector('#retrybkdialog').hide();
                bookingretry(push_data.booking_id);
            })
        }

        $("#trip-summary-back-btn").css("visibility","hidden");       
        $("#trip-summary-back-btn").css("z-index","10");
        $('#ride-request-cancel-btn').css("z-index","10");
        $('#ride-request-cancel-btn').css("visibility","hidden");
        $("#menubtn").css("visibility","visible");
        $('#mylocationbtn').css('visibility', 'visble');
        $('#presetroutesbtn').css('visibility', 'visible');
        $("#menubtn").css("z-index","100");
        $("#menubtn").removeClass("zoomIn animated").addClass("zoomIn animated").one('animationend', function(){
            $(this).removeClass("zoomIn animated");
        })
        getuserlocation();
        return;
    }
    ons.notification.alert(push_data.message,{title:push_data.title});
    return;

}




function rate_ride(bookingid,comment){
    
    if(!bookingid){
        document.querySelector('#myNavigator').popPage({animation: 'fade'});
        return;
    }
    
    loading.show();
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout : 10000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'rateride', 'rating':ride_rating,'bookingid':bookingid,'comment':comment, 'driver_tip':driver_tip_amount},
        dataType: 'json',
        success: function(data){
            loading.hide();
            if(data.hasOwnProperty('error')){
                ons.notification.alert(data.error,{title:''});
                return;
            }

                
            document.querySelector('#myNavigator').popPage({animation: 'fade', callback: function(){
                if(data.hasOwnProperty('message') && data.message != ''){
                    ons.notification.alert(data.message,{title:''});
                }
            }});
           
        },
        error: function(){
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
        } 


    });
}


function driver_cancelled_notify(push_data){ //show driver cancelled ride notification
    notification_sound.play();
    current_ride_status = 0;
    current_booking_data = {'status':0,'action':'','booking_id':0,'driver_id':0,'driver_firstname':'','driver_phone':'','driver_platenum':'','driver_rating':'','driver_location_lat':0.00,'driver_location_long':0.00,'driver_carmodel':'','driver_photo':'','completion_code':'','pickup_addr' : '','dropoff_addr' : '','pickup_lat':0.00,'pickup_long':0.00,'dropoff_lat':0.00,'dropoff_long':0.00,'driver_completed' : 0,'driver_carid':0,'route_id':0,'driver_arrived_time':0,'driver_start_time':0,'driver_arrived_stop_time_1':0,'driver_arrived_stop_time_2':0,'driver_left_stop_time_1':0,'driver_left_stop_time_2':0};
    $("#statusmsg h3").html(__("Driver has cancelled your ride"));

    clearMapItemsSelectively();

    clearInterval(wait_timer_handle);
    
    pick_up_data=[];
    drop_off_data=[];
    pick_up_data = {'address': '','lng':'','lat':''};
    drop_off_data = {'address': '','lng':'','lat':''};

    //reset multi destination mode
    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();
    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0; 
    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};
    

    
    
    $('#pac-input').val('');
    $('#pac-input2').val('');
    
        

    
    $(this).removeClass("fadeOutUp animated");
    $("#pick-box").css("visibility","visible");
    $("#drop-box-container").css("visibility","visible");
    $('#banner-items-container').fadeIn();
    $("#recent-strip-container").css("visibility","visible");


    $("#wait-time-info-container").hide();
    $("#current-ride-driver-details").removeClass("fadeOutDown animated").addClass("fadeOutDown animated").one('animationend', function(){
        $(this).removeClass("fadeOutDown animated");
        $("#current-ride-driver-details").css("visibility","hidden");
        $("#driver-notify-ui-back-btn").css("visibility","hidden");
        $("#driver-notify-ui-back-btn").css("z-index","10");
        $("#menubtn").css("visibility","visible");
        $("#menubtn").css("z-index","100");
        $('#mylocationbtn').css('visibility', 'visible');
        $("#trip-summary-back-btn").css("z-index","10");
        $("#trip-summary-back-btn").css("visibility","hidden");
        $('#ride-request-cancel-btn').css("z-index","10");
        $('#ride-request-cancel-btn').css("visibility","hidden");
        $('#presetroutesbtn').css('visibility', 'visible');
        ons.notification.alert(__("Driver has cancelled your ride"),{title:""});
        getuserlocation();
        
    })

}



function call_driver(phonenum){
    if(phonenum){
        window.open('tel:' + phonenum,'_system');
    }
}



function sms_driver(phonenum){
    if(phonenum){
        //window.plugins.CallNumber.callNumber(function(){return;}, function(){return;}, phonenum, 1);
        window.open('sms:' + phonenum,'_system');
    }
}



function cancel_ride(bookingid){
    if(bookingid){
        if(app_settings.hasOwnProperty('trip_cancel_reasons') && app_settings.trip_cancel_reasons.length){
            showCancelReasons(function(reason){
                bookingcancel(bookingid,1,reason);
            });
        }else{
            bookingcancel(bookingid,1);
        }
        
    }
}









function onBackButton(){

    if(side_menu_state){
        document.querySelector('#mySplitter').left.close();
        return;
      }
      if(close_dialog_enable)return;
      close_dialog_enable = 1;
      ons.notification.confirm({
        message: __('Do you want to exit?'),
        // or messageHTML: '<div>Message in HTML</div>',
        title: __('Close App'),
        buttonLabels: [__('Yes'), __('No')],
        animation: 'default', // or 'none'
        primaryButtonIndex: 1,
        cancelable: true,
        callback: function(index) {
         
          if(!index){
            // 0-: Button index from the left
            navigator.app.exitApp();
          }else{
            close_dialog_enable = 0;
            // -1: Cancel
          }
         
        }
      });  


}






function saveProfile(){

    var user_firstname = $('#editfirstname').val();
    var user_lastname = $('#editlastname').val();

    if(!user_firstname){
        ons.notification.alert(__("Firstname required"),{title:""});
        return;
    }

    if(!user_lastname){
        ons.notification.alert(__("Lastname required"),{title:""});
        return;
    }

    loading.show();

    var post_data = {'action':'updateProfile','firstname' : user_firstname,'lastname' : user_lastname};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                
                ons.notification.alert(data_obj.error,{title:""});
            }

            if(data_obj.hasOwnProperty('success')){

                userprofileinfo.firstname = user_firstname;
                userprofileinfo.lastname = user_lastname;

                $('#firstname').html(userprofileinfo.firstname);
                $('#lastname').html(userprofileinfo.lastname);

                ons.notification.alert(data_obj.success, {title:"",});
                
                
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
        }

    });




}







function getavailablecitydrivers(city){
    clearInterval(get_available_drivers_timer);
    var priority_driver = 0;
    var processing_out_of_bounds = 0;
    get_available_drivers_timer = setInterval(function(){

        let top_page = document.querySelector('#myNavigator').topPage;
        if(top_page.id == ""){
            map_visibility_status = 1;
        }else{
            map_visibility_status = 0;
        }
               
        if(current_booking_data.status){
            priority_driver = current_booking_data.driver_id;
            //make all other driver icons invisible and leave only the priority driver
            for(var key in city_drivers_markers){
                if(key == `drv${priority_driver}`)continue;
                city_drivers_markers[key].marker.setVisible(false);
            }
        }else{
            priority_driver = 0;
            //ensure all invisible drivers are visible
            for(var key in city_drivers_markers){
                if(!city_drivers_markers[key].marker.isVisible()){
                    city_drivers_markers[key].marker.setVisible(true);
                }
            }

        }

        $.ajax({ 
            url: ajaxurl, 
            method: 'GET',
            crossDomain:true,
            timeout : 10000,
            xhrFields: {withCredentials: true},
            data: { 'action_get' : 'getavailablecitydrivers','city':city,'priority_driver':priority_driver,'pickup_location': pick_up_data,'sdl_key' : SDL_KEY},
            dataType: 'json',
            success: function(data){
                
                if(data.hasOwnProperty('error')){
                    //ons.notification.alert(data.error);
                    return;
                }  
                
                //console.log(data);
    
                if(data.hasOwnProperty('success')){
    
                   
                    //check if the vehicles selection dialog is visible
                    if($("#new-bookng-details").css("visibility") == "visible"){ 
                        
                        $('.list-ride-avail-status-ind').html(__('Busy'));
                        $('.slider-car-item').data('avail',__('Busy'));

                        $('#pickup-addr-sel-ride-busy').show();
                        $('#pickup-addr-sel-ride-ariv-unit').hide();
                        $('#pickup-addr-sel-ride-ariv-time').hide();

                        
                        if(data.avail_vehicles && Object.keys(data.avail_vehicles).length){  

                            rides_proximity = data.avail_vehicles;
                            
                            if(data.avail_vehicles.hasOwnProperty(selected_city_ride)){
                                $('#ride-availability').html(__('{---1} minutes away',[data.avail_vehicles[selected_city_ride].eta]));
                                $('#pickup-addr-sel-ride-busy').hide();
                                $('#pickup-addr-sel-ride-ariv-unit').show();
                                $('#pickup-addr-sel-ride-ariv-time').show();
                                $('#pickup-addr-sel-ride-ariv-unit').html('Min');
                                $('#pickup-addr-sel-ride-ariv-time').html(data.avail_vehicles[selected_city_ride].eta);

                            }else{
                                $('#ride-availability').html(__('Busy'));
                                $('#pickup-addr-sel-ride-busy').show();
                                $('#pickup-addr-sel-ride-ariv-unit').hide();
                                $('#pickup-addr-sel-ride-ariv-time').hide();
                            }                                                    
                            for(key in data.avail_vehicles){
                                $(`#list-ride-availability-${key}`).html(__('{---1} minutes away',[data.avail_vehicles[key].eta]));
                            }
                            
                        }else{
                            rides_proximity = undefined;
                        }
                    }
                    
                    var avail_drivers_location_last_update_time = Date.now();


                    if(data.drivers_locations.length){

                        //update locations data update time
                        

                        if(priority_driver){

                            if(city_drivers_markers.hasOwnProperty('drv' + data.drivers_locations[0].driver_id)){

                                //update marker
                                let drv_distance_delta = 0;

                                city_drivers_markers['drv' + data.drivers_locations[0].driver_id].last_update_time = avail_drivers_location_last_update_time;

                                if(!city_drivers_markers['drv' + data.drivers_locations[0].driver_id].animate_pos){

                                    //not animating, update positions

                                    let drv_new_pos = data.drivers_locations[0].position;
                                    let drv_cur_pos = city_drivers_markers['drv' + data.drivers_locations[0].driver_id].marker.getPosition();
                                    city_drivers_markers['drv' + data.drivers_locations[0].driver_id].curposition = data.drivers_locations[0].position;
                                    city_drivers_markers['drv' + data.drivers_locations[0].driver_id].oldposition = drv_cur_pos;

                                    
                                    //check how much distance between the driver marker and the new location coord. This is to rule out spurious location data and not animate
                                    drv_distance_delta = plugin.google.maps.geometry.spherical.computeDistanceBetween(drv_new_pos, drv_cur_pos);
                                    
                                    //let max_anim_drv_distance_delta = 22  * (AVAIL_DRIVERS_LOCATION_UPDATE_INTERVAL / 1000); //animate driver speed of 56Km/hr. values higher than this don't animate marker just set the position on map
                                    let max_anim_drv_distance_delta = 500; 

                                    if(isNaN(drv_distance_delta))drv_distance_delta = 0;

                                    
                                    //there is a change in driver position

                                    if(drv_distance_delta > max_anim_drv_distance_delta){
                                        //Change is outside limits. do not animate. 
                                        city_drivers_markers['drv' + data.drivers_locations[0].driver_id].marker.setPosition(data.drivers_locations[0].position);
                                        city_drivers_markers['drv' + data.drivers_locations[0].driver_id].marker.setRotation(parseFloat(data.drivers_locations[0].b_angle));

                                    }else{
                                        //Change is within limits. Animate. 

                                        if(!city_drivers_markers['drv' + data.drivers_locations[0].driver_id].animate_rot && parseFloat(data.drivers_locations[0].b_angle) > 0){
                                    
                                            if(Math.abs(city_drivers_markers['drv' + data.drivers_locations[0].driver_id].oldbearing - parseFloat(data.drivers_locations[0].b_angle)) >= 180 ){
                                                city_drivers_markers['drv' + data.drivers_locations[0].driver_id].marker.setRotation(parseFloat(data.drivers_locations[0].b_angle));
                                            }else{
                                                city_drivers_markers['drv' + data.drivers_locations[0].driver_id].animate_rot = 1;
                                                city_drivers_markers['drv' + data.drivers_locations[0].driver_id].animation_fraction_rot = 0.00;
                                                city_drivers_markers['drv' + data.drivers_locations[0].driver_id].oldbearing = city_drivers_markers['drv' + data.drivers_locations[0].driver_id].marker.getRotation();
                                                city_drivers_markers['drv' + data.drivers_locations[0].driver_id].curbearing = parseFloat(data.drivers_locations[0].b_angle);                                
        
                                            }
        
                                        }

                                        city_drivers_markers['drv' + data.drivers_locations[0].driver_id].animate_pos = 1; //set animation enable flag
                                        city_drivers_markers['drv' + data.drivers_locations[0].driver_id].animation_fraction_pos = 0.00;
                                    }
                                    
                                    
                                }

                                 

                            }else{

                               //create the driver icon marker
                               city_drivers_markers['drv' +data.drivers_locations[0].driver_id] = {};

                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].marker = map.addMarker(data.drivers_locations[0], function(marker){
                                    marker._isReady = true;
                                    marker.setDisableAutoPan(true);
                                    marker.setRotation(parseFloat(data.drivers_locations[0].b_angle));                                        
                                    marker.setIconAnchor(16,16); //32x32 marker icon size. set anchor at midpoint
                                });

                                                                
                                //add animation properties

                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].driver_id =data.drivers_locations[0].driver_id;
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].curposition = parseFloat(data.drivers_locations[0].position);
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].oldposition = null;
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].curbearing = parseFloat(data.drivers_locations[0].b_angle);
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].oldbearing = null;
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].animate_pos = 0;
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].animation_fraction_pos = 0.00;
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].animate_rot = 0;
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].animation_fraction_rot = 0.00;
                                city_drivers_markers['drv' +data.drivers_locations[0].driver_id].last_update_time = avail_drivers_location_last_update_time;
                            }

                            user_location.lat = data.drivers_locations[0].position.lat;
                            user_location.lng = data.drivers_locations[0].position.lng;

                            map.fromLatLngToPoint({"lat":user_location.lat,"lng":user_location.lng}, function(driver_marker_pixel_coord){
                                if(driver_marker_pixel_coord[0] < 50 || driver_marker_pixel_coord[0] > (screen.width - 50) || driver_marker_pixel_coord[1] < 150 || driver_marker_pixel_coord[1] > (screen.height - 150)){
                                    if(!processing_out_of_bounds){
                                        processing_out_of_bounds = 1;
                                        map.setClickable(false);
                                        map.animateCamera({
                                        target: {lat: user_location.lat, lng: user_location.lng},
                                        duration: 1000,
                                        }, function() {
                                            //alert("Camera target has been changed");
                                            map.setClickable(true);
                                            processing_out_of_bounds = 0;
                                        });
                                    }
                                }
                            });
                            
                            //update ride time
                            
                            if(current_booking_data.status == 1){ //rider pick up
                                let driver_latlng = data.drivers_locations[0].position;
                                let rider_latlng = {'lat':parseFloat(current_booking_data.pickup_lat),'lng':parseFloat(current_booking_data.pickup_long)};
                                let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(rider_latlng, driver_latlng); //distance in meters
                                let time_to_pickup_location_sec = distance / 15.555555556; //56km/hr to m/s - worst case time if driver is driving at this average speed

                                let time_to_pickup_location_min = Math.floor(time_to_pickup_location_sec / 60);
                                $('#ride-action-time').text(time_to_pickup_location_min); 
                                if(time_to_pickup_location_min > 1){
                                    $('#ride-action-time-unit').text('Mins'); 
                                }else{
                                    $('#ride-action-time-unit').text('Min');
                                }
                            }else if(current_booking_data.status == 3){ //rider on ride
                                if(parseFloat(current_booking_data.dropoff_lat) && parseFloat(current_booking_data.dropoff_long)){
                                    let driver_latlng = data.drivers_locations[0].position;
                                    let rider_latlng = {'lat':parseFloat(current_booking_data.dropoff_lat),'lng':parseFloat(current_booking_data.dropoff_long)};
                                    let distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(rider_latlng, driver_latlng); //distance in meters
                                    let time_to_pickup_location_sec = distance / 15.555555556; //56km/hr to m/s - worst case time if driver is driving at this average speed

                                    let time_to_pickup_location_min = Math.floor(time_to_pickup_location_sec / 60);
                                    $('#ride-action-time').text(time_to_pickup_location_min); 
                                    if(time_to_pickup_location_min > 1){
                                        $('#ride-action-time-unit').text('Mins'); 
                                    }else{
                                        $('#ride-action-time-unit').text('Min');
                                    }
                                }else{
                                    $('#ride-action-time').text('--');
                                    $('#ride-action-time-unit').text('Min');
                                }
                            }
                                
                            
                            
                        }else{
                            
                            data.drivers_locations.forEach(function(options){

                                if(city_drivers_markers.hasOwnProperty('drv' + options.driver_id)){

                                    //update marker
                                    let drv_distance_delta = 0;
                                    city_drivers_markers['drv' + options.driver_id].last_update_time = avail_drivers_location_last_update_time;

                                    if(!city_drivers_markers['drv' + options.driver_id].animate_pos){

                                        //not animating, update positions

                                        let drv_new_pos = options.position;
                                        let drv_cur_pos = city_drivers_markers['drv' + options.driver_id].marker.getPosition();
                                        city_drivers_markers['drv' + options.driver_id].curposition = options.position;
                                        city_drivers_markers['drv' + options.driver_id].oldposition = drv_cur_pos;

                                        
                                        //check how much distance between the driver marker and the new location coord. This is to rule out spurious location data and not animate
                                        drv_distance_delta = plugin.google.maps.geometry.spherical.computeDistanceBetween(drv_new_pos, drv_cur_pos);
                                        
                                        //let max_anim_drv_distance_delta = 22  * (AVAIL_DRIVERS_LOCATION_UPDATE_INTERVAL / 1000); //animate driver speed of 56Km/hr. values higher than this don't animate marker just set the position on map
                                        let max_anim_drv_distance_delta = 500; 

                                        if(isNaN(drv_distance_delta))drv_distance_delta = 0;

                                        
                                        //there is a change in driver position

                                        if(drv_distance_delta > max_anim_drv_distance_delta){
                                            //Change is outside limits. do not animate. 
                                            city_drivers_markers['drv' + options.driver_id].marker.setPosition(options.position);
                                            city_drivers_markers['drv' + options.driver_id].marker.setRotation(parseFloat(options.b_angle));
                                        }else{
                                            
                                            //Change is within limits. Animate. 

                                            if(!city_drivers_markers['drv' + options.driver_id].animate_rot && parseFloat(data.drivers_locations[0].b_angle) > 0){
                                        
                                                if(Math.abs(city_drivers_markers['drv' + options.driver_id].oldbearing - parseFloat(options.b_angle)) >= 180 ){
        
                                                    city_drivers_markers['drv' + options.driver_id].marker.setRotation(parseFloat(options.b_angle));
        
                                                }else{
        
                                                    city_drivers_markers['drv' + options.driver_id].animate_rot = 1;
                                                    city_drivers_markers['drv' + options.driver_id].animation_fraction_rot = 0.00;
                                                    city_drivers_markers['drv' + options.driver_id].oldbearing = city_drivers_markers['drv' + options.driver_id].marker.getRotation();
                                                    city_drivers_markers['drv' + options.driver_id].curbearing = parseFloat(options.b_angle);
        
                                                }
        
                                            } 

                                            city_drivers_markers['drv' + options.driver_id].animate_pos = 1; //set animation enable flag
                                            city_drivers_markers['drv' + options.driver_id].animation_fraction_pos = 0.00;
                                        }
                                        
                                        
                                    }



                                        
                                    
                                    

                                }else{ 

                                    //create the driver icon marker

                                    city_drivers_markers['drv' + options.driver_id] = {};

                                    city_drivers_markers['drv' + options.driver_id]['marker'] = map.addMarker(options, function(marker){                                        
                                        marker._isReady = true;
                                        marker.setDisableAutoPan(true);
                                        marker.setRotation(options.b_angle);                                        
                                        marker.setIconAnchor(16,16); //32x32 marker icon size. set anchor at midpoint
                                    });
                                    
                                    
                                    //add animation properties

                                    city_drivers_markers['drv' + options.driver_id]['driver_id'] = options.driver_id;
                                    city_drivers_markers['drv' + options.driver_id]['curposition'] = parseFloat(options.position);
                                    city_drivers_markers['drv' + options.driver_id]['oldposition'] = null;
                                    city_drivers_markers['drv' + options.driver_id]['curbearing'] = parseFloat(options.b_angle);
                                    city_drivers_markers['drv' + options.driver_id]['oldbearing'] = null;
                                    city_drivers_markers['drv' + options.driver_id]['animate_pos'] = 0;
                                    city_drivers_markers['drv' + options.driver_id]['animation_fraction_pos'] = 0.00;
                                    city_drivers_markers['drv' + options.driver_id]['animate_rot'] = 0;
                                    city_drivers_markers['drv' + options.driver_id]['animation_fraction_rot'] = 0.00;
                                    city_drivers_markers['drv' + options.driver_id]['last_update_time'] = avail_drivers_location_last_update_time;


                                }

                                

                                

                            });
                        }
                    }

                    //remove markers that werent updated. This means the drivers are no longer available
                    for(var key in city_drivers_markers){
                        if(city_drivers_markers[key].last_update_time == avail_drivers_location_last_update_time || city_drivers_markers[key].animate_pos == 1 || city_drivers_markers[key].animate_rot == 1)continue; //skip markers that have been updated or still being animated
                        city_drivers_markers[key].marker.remove();
                        delete city_drivers_markers[key];
                    }
                    
                    //update banner data if available
                    if(data.hasOwnProperty('bannerdata')){
                        if(data.bannerdata == 'nodata'){
                            $('#banner-items-container').css('left', '-10000px');  
                            $('#banner-items-container').empty();
                            banner_data = '';
                        }else{

                            if(data.bannerdata == banner_data){
                                return;
                            }                
                            
                            banner_data = data.bannerdata;
                            $('#banner-items-container').html(data.bannerdata);
                            if(Math.ceil($('#drop-box-container').outerHeight(true))){
                                $('#banner-items-container').css('left', '0px');
                                $('#banner-items-container').css('bottom', (Math.ceil($('#drop-box-container').outerHeight(true)) + 10) + 'px');
                            }
                            
                        }

                    }

                    if(data.hasOwnProperty('sdl_status') && data.sdl_status == 1){
                        //multiple device login. force restart

                        clearInterval(get_available_drivers_timer);
                        let top_page = document.querySelector('#myNavigator').topPage;
                        document.querySelector('#mySplitter').left.close();
                        localStorage.removeItem("sess_id");
                        localStorage.removeItem("sdl_key");
                        initSession();
                        if(top_page.id != "loginpage"){
                            Login_show();
                        }

                    }
                    
                                  
    
    
                }
               
                
            },
            error: function(){
                
                //ons.notification.alert("Error communicating with server. Please retry.");
                return;
            } 
    
    
        });


        animateBannerItems();


    },AVAIL_DRIVERS_LOCATION_UPDATE_INTERVAL) //set refresh rate for available drivers in curently selected city

}


var last_banner_anim_time;
var current_displayed_banner = 1;

function animateBannerItems(){

    const ANIM_INTERVAL = 10;

    let cur_time_sec = Date.now();
    cur_time_sec = cur_time_sec / 1000 | 0;
    
    if(!last_banner_anim_time){
        last_banner_anim_time = cur_time_sec;
        return;
    }

    let time_diff = cur_time_sec - last_banner_anim_time;
    if(time_diff < ANIM_INTERVAL){
        return;
    }

    last_banner_anim_time = cur_time_sec;

    if(!$('#banner-items-container').html())return;

    let num_of_banners = $('#banner-items-container [id^=banner-info-item-]').length;

    if(num_of_banners > 1){
        current_displayed_banner++;
        if(current_displayed_banner <= num_of_banners){
            $('#banner-items-container [id^=banner-info-item-]').hide();
            $('#banner-items-container [id^=banner-info-item-]').eq(current_displayed_banner - 1).show();
            $('#banner-items-container [id^=banner-info-item-]').eq(current_displayed_banner - 1).removeClass("flipInX animated").addClass("flipInX animated").one('animationend', function(){
                $(this).removeClass("flipInX animated");
            });            
        }else{
            current_displayed_banner = 1;
            $('#banner-items-container [id^=banner-info-item-]').hide();
            $('#banner-items-container [id^=banner-info-item-]').eq(current_displayed_banner - 1).show();
            $('#banner-items-container [id^=banner-info-item-]').eq(current_displayed_banner - 1).removeClass("flipInX animated").addClass("flipInX animated").one('animationend', function(){
                $(this).removeClass("flipInX animated");
            });
            
        } 
        
    }else{
        if(!$('#banner-items-container [id^=banner-info-item-]').eq(0).is(':visible')){
            $('#banner-items-container [id^=banner-info-item-]').hide();
            $('#banner-items-container [id^=banner-info-item-]').eq(0).show();
            $('#banner-items-container [id^=banner-info-item-]').eq(0).removeClass("flipInX animated").addClass("flipInX animated").one('animationend', function(){
                $(this).removeClass("flipInX animated");
            });
        }
        current_displayed_banner = 1;         
    }


}




function showBanner(id){
    document.querySelector('#myNavigator').pushPage('html/banner.html',{animation:'fade',data:{'banner_id':id}});
}


function updatepushnotificationtoken(){
    
    if(APP_DEBUG)return;
    cordova.plugins.firebase.messaging.getToken().then(function(token) {
        
        if(!token){
            //alert('no_token');
            get_push_token_retry_count++
            if(get_push_token_retry_count < 3){
                setTimeout(updatepushnotificationtoken(), 20000);
                return;
            }
            get_push_token_retry_count = 0;
            return;
        }else{
            
            var post_data = {'action':'updatePushNotificationToken','token':token};

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                timeout : 20000,
                crossDomain:true,
                xhrFields: {withCredentials: true},
                data: post_data,
                tryCount : 0, 
                retryLimit : 3,
                success: function (data, status)
                {
                    return;

                },
                error: function(jqXHR,textStatus, errorThrown) {  
                    
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                        return;
                    }            
                    return;
                    
                }

            });

        }
        
        

    });
   


}


//localstorage functions

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};


Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    try {
        return JSON.parse(value);
    }
    catch(err) {
        console.log("JSON parse failed for lookup of ", key, "\n error was: ", err);
        return null;
    }
};


Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)
{
   var n = this,
   c = isNaN(decimals) ? 2 : Math.abs(decimals), // If decimal is zero we must take it. It means the user does not want to show any decimal
   d = decimal_sep || '.', // If no decimal separator is passed, we use the dot as default decimal separator (we MUST use a decimal separator)

   
   t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, // If you don't want to use a thousands separator you can pass empty string as thousands_sep value

   sign = (n < 0) ? '-' : '',

   // Extracting the absolute value of the integer part of the number and converting to string
   i = parseInt(n = Math.abs(n).toFixed(c)) + '',

   j = ((j = i.length) > 3) ? j % 3 : 0;
   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}





function showbookingdetails(bookid){
    

    document.querySelector('#myNavigator').pushPage('html/bookingdetails.html',{animation:'fade',data:{'bookid':bookid}});

    

}






var loading_map = 0;
function loadmap(){ //function retries loading map until it succeeds.
    
    
    if(typeof google === 'object') {
        return;
    }

    if(loading_map)return;

    if(google_map_api_key){
        loading_map = 1;
        $.getScript("https://maps.googleapis.com/maps/api/js?key=" + google_map_api_key + "&libraries=places&callback=mapinitialize")
        .done(function(){
            loading_map = 1;
        }).fail(function(){
            loading_map = 0;
        });
    }
    


}



function mapinitialize(){     
    
                      
            getCurrentLocation();

            let init_map_lat = 9.0778;
            let init_map_lng = 8.6775;
            let init_map_zoom = 3;

            if(user_location_live.lat && user_location_live.lng){

                init_map_lat = user_location_live.lat;
                init_map_lng = user_location_live.lng;
                init_map_zoom = 12;

            }else if(localStorage.getObject('user_location_details')){               

                let user_loc_det = localStorage.getObject('user_location_details');
                init_map_lat = user_loc_det.city_lat;
                init_map_lng = user_loc_det.city_lng;
                init_map_zoom = 12;
            }

            plugin.google.maps.environment.setBackgroundColor("lightgrey");
          
            map = plugin.google.maps.Map.getMap(document.getElementById("map-canvas"), {
                'mapType': plugin.google.maps.MapTypeId.ROADMAP,
                'controls': {
                    'compass': false,
                    'indoorPicker': false,
                    'myLocationButton': false,
                    'myLocation': false,   // (blue dot)
                    'zoom': false,          // android only
                    'mapToolbar': false     // android only
                },
                'gestures': {
                'scroll': true,
                'tilt': false,
                'rotate': false,
                'zoom': true
                },
                /* 'styles': [
                {
                    featureType: "all",
                    stylers: [
                    { saturation: -80 }
                    ]
                },{
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [
                    { hue: "#00ffee" },
                    { saturation: 50 }
                    ]
                },{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [
                    { visibility: "off" }
                    ]
                }
                ], */
                'camera' : {
                target: {
                    lat: init_map_lat,
                    lng: init_map_lng
                },
                zoom: init_map_zoom,
                tilt: 0
                },
                'preferences': {
                'zoom': {
                    'minZoom': 3,
                    'maxZoom': 18
                },
                'building': true
                }
            });

            map.one(plugin.google.maps.event.MAP_READY, function() {
                console.log("--> map_canvas : ready.");
                map_ready = true;
                //$("#startscreen-text").html(__("Almost done..."))
                //map.setMyLocationButtonEnabled(true); 

                //get user location
                /* map.getMyLocation(function(location){
                    
                    user_location.lat = location.latLng.lat;
                    user_location.lng = location.latLng.lng;
                    
                    user_location_live.lat = location.latLng.lat;
                    user_location_live.lng = location.latLng.lng;

                    map.setClickable(false);
                    map.moveCamera({
                        target: {lat: user_location.lat, lng: user_location.lng },
                        zoom: 12,
                        duration: 1000,
                        padding: 0  // default = 20px
                    }, function() {
                        map.setClickable(true);

                    });

                },function(){
                    //failed
                    console.log('no location data');
                }) */

                //create markers
                marker1 = map.addMarker({
                            'position':{lat: 0,lng: 0},
                            'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                            animation: plugin.google.maps.Animation.DROP
                        },function(marker){

                            marker.setVisible(false);
                            marker.setDisableAutoPan(true);
                            marker._isReady = true;

                            marker.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                if(current_booking_data.status)return;
                                location_type_selected = 0;
                                show_adresses();
                            })
                        });


                marker2 = map.addMarker({
                            'position':{lat: 0,lng: 0},
                            'icon' : {url:'img/drop-off-pin.png',size:{width:32,height:32}},
                            animation: plugin.google.maps.Animation.DROP
                        },function(marker){

                            marker.setVisible(false);
                            marker.setDisableAutoPan(true);
                            marker._isReady = true;
                            
                            marker.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                if(current_booking_data.status)return;
                                location_type_selected = 1;
                                dest_location_type_selected = 2;
                                show_adresses();
                            })
                        });


                markerds1 = map.addMarker({ 
                            'position':{lat: 0,lng: 0},
                            'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                            animation: plugin.google.maps.Animation.DROP
                        },function(marker){
                            marker.setVisible(false);
                            marker._isReady = true;

                            marker.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                if(current_booking_data.status)return;
                                location_type_selected = 1;
                                dest_location_type_selected = 0;
                                show_adresses();
                            })
                    
                            marker.setDisableAutoPan(true);

                        });

                
                markerds2 = map.addMarker({ 
                            'position':{lat: 0,lng: 0},
                            'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                            animation: plugin.google.maps.Animation.DROP
                        },function(marker){
                            marker.setVisible(false);
                            marker._isReady = true;

                            marker.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                if(current_booking_data.status)return;
                                location_type_selected = 1;
                                dest_location_type_selected = 0;
                                show_adresses();
                            })
                    
                            marker.setDisableAutoPan(true);
                            
                        });

                        

                    

                    

                    

                                
                                                
                         
                map.on(plugin.google.maps.event.MAP_CLICK, function(latLng) {               
    
                });
    
    
                map.on(plugin.google.maps.event.MAP_DRAG, function() {
    
                        $('#mylocationbtn').show();
                    
                });

                map.on(plugin.google.maps.event.CAMERA_MOVE_START, camEvHandler);
                map.on(plugin.google.maps.event.CAMERA_MOVE, camEvHandler);
                map.on(plugin.google.maps.event.CAMERA_MOVE_END, camEvHandler);

                
                
                

                
            }); 


    

}


function camEvHandler(ev){

    trackPickupElPos();
    trackDropoffElPos();

}


function trackPickupElPos(){

    if(!pick_up_data.lat)return;

    let cam_zoom = map.getCameraZoom();
    let map_visible_region = map.getVisibleRegion();
    let pixel_coord = latlongToPoint({lat:pick_up_data.lat,lng:pick_up_data.lng});
    let scale = Math.pow(2, cam_zoom);

    pixel_coord.x = pixel_coord.x * scale;
    pixel_coord.y = pixel_coord.y * scale;

  

    let offset_coord = latlongToPoint({lat:map_visible_region.nearLeft.lat,lng:map_visible_region.nearLeft.lng});
    let offset_coord2 = latlongToPoint({lat:map_visible_region.farLeft.lat,lng:map_visible_region.farLeft.lng});
    offset_coord.x = offset_coord.x * scale;
    offset_coord.y = offset_coord.y * scale;

    offset_coord2.x = offset_coord2.x * scale;
    offset_coord2.y = offset_coord2.y * scale;

    

    let point_x = (pixel_coord.x - offset_coord.x) + 16;
    let point_y = ((pixel_coord.y - offset_coord2.y)) - 32;

    //console.log(`x = ${point_x}, y = ${point_y}`)

    
    $('#pickup-addr-disp').css('transform', `translate(${point_x}px,${point_y}px)`);        
        
    
}


function trackDropoffElPos(){

    if(!drop_off_data.lat)return;

    let cam_zoom = map.getCameraZoom();
    let map_visible_region = map.getVisibleRegion();
    let pixel_coord = latlongToPoint({lat:drop_off_data.lat,lng:drop_off_data.lng});
    let scale = Math.pow(2, cam_zoom);

    pixel_coord.x = pixel_coord.x * scale;
    pixel_coord.y = pixel_coord.y * scale;
    

    let offset_coord = latlongToPoint({lat:map_visible_region.nearLeft.lat,lng:map_visible_region.nearLeft.lng});
    let offset_coord2 = latlongToPoint({lat:map_visible_region.farLeft.lat,lng:map_visible_region.farLeft.lng});
    offset_coord.x = offset_coord.x * scale;
    offset_coord.y = offset_coord.y * scale;

    offset_coord2.x = offset_coord2.x * scale;
    offset_coord2.y = offset_coord2.y * scale;

    

    let point_x = (pixel_coord.x - offset_coord.x) + 16;
    let point_y = ((pixel_coord.y - offset_coord2.y)) - 32;
    

    
    $('#dropoff-addr-disp').css('transform', `translate(${point_x}px,${point_y}px)`);        
        
    
}





function latlongToPoint(latLng){

    const TILE_SIZE = 256;
    let siny = Math.sin((latLng.lat * Math.PI) / 180);

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.

    siny = Math.min(Math.max(siny, -0.9999), 0.9999);

    return {
        x: TILE_SIZE * (0.5 + latLng.lng / 360),
        y: TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
    };
};


//*******************location permission handling*******************************


function onError(error) {    
    
    console.error("The following error occurred: " + error);
    return;
}

function handleLocationAuthorizationStatus(status) {
    
    switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:

            
            if(!map)mapinitialize();

            if(platform === "ios"){
                onError("Location services is already switched ON");
            }else{
                
                //_makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            requestLocationAuthorization();
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
            requestLocationAuthorization();
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:  
            if(!map)mapinitialize();          
            if(platform === "android"){
                //ons.notification.alert(__("Please enable location service in phone settings"),{title:""});
                onError("User denied permission to use location");
            }else{
                //_makeRequest();                
                
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            // Android only
            if(!map)mapinitialize();
            //ons.notification.alert(__("Please enable location service in phone settings"),{title:""});
            onError("User denied permission to use location");
            break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            
            if(!map)mapinitialize();    
            // iOS only
            if(platform === "ios"){
                onError("Location services is already switched ON");
            }else{                
                //_makeRequest();
            }
            break;

    }
}


function requestLocationAuthorization() {
    cordova.plugins.diagnostic.requestLocationAuthorization(handleLocationAuthorizationStatus, onError);
}

function requestLocationAccuracy() {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(handleLocationAuthorizationStatus, onError);
}

function _makeRequest(){ //request to turn on GPS
    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if (canRequest) {
            cordova.plugins.locationAccuracy.request(function () {
                //ons.notification.alert("GPS enabled successfully.",{title:""});
                    //handleSuccess("Location accuracy request successful");
                    return;                     
                                      
                }, function (error) {
                    onError("Error requesting location accuracy: " + JSON.stringify(error));
                    if (error) {
                        // Android only
                        onError("error code=" + error.code + "; error message=" + error.message);
                        if (platform === "android" && error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                            ons.notification.confirm({
                                message: __('Please enable GPS'),
                                // or messageHTML: '<div>Message in HTML</div>',
                                //title: 'Exit ' + APP_TITLE,
                                buttonLabels: [__('Location settings'), __('Cancel')],
                                animation: 'default', // or 'none'
                                primaryButtonIndex: 1,
                                cancelable: true,
                                callback: function(index) {
                                 
                                  if(!index){
                                    // 0-: Button index from the left
                                    cordova.plugins.diagnostic.switchToLocationSettings();
                                    
                                  }else{
                                    
                                    ons.notification.alert(__("Please enable location service in phone settings"),{title:""});
                                    // -1: Cancel
                                  }
                                 
                                }
                              });
                            
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
            );
        } else {
            // On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
            // On Android, this will occur if the app doesn't have authorization to use location.
            ons.notification.alert(__("Please enable location service in phone settings"),{title:""});
            onError("Cannot request location accuracy");
        }
    });
}



//*************************************************************************************************************

async function showUserLocationMap(){

    let gps_enabled = await userEnableGPSNotify();

    if(gps_enabled.hasOwnProperty('success')){
        getuserlocation();
    }  

}



function getuserlocation(){
    
    
    user_location.lat = user_location_live.lat;
    user_location.lng = user_location_live.lng;

    if(!user_location.lat && !user_location.lng)return;

    
    if(selected_city_route != null){
        

        let user_current_city = detectUserCity();


        if(user_current_city.hasOwnProperty('error') || user_current_city.route != selected_city_id){

            //ons.notification.alert("You are outside the service area of " + APP_TITLE + " in your selected city route. Your current location cannot be used for pickup.",{title:""});
            ons.notification.confirm({
                message: __("You are outside our service area in your selected city route. Your current location cannot be used for pickup"),
                // or messageHTML: '<div>Message in HTML</div>',
                title: "",
                buttonLabels: [__('OK')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 1,
                cancelable: true,
                callback: function(index) {
                    return;               
                 
                }
            });
            return;
        }
    }else{
        
        return;

    }


    

    pick_up_data.address = __("Somewhere in {---1}",[selected_city_route]); 
    pick_up_data.lat = user_location.lat;
    pick_up_data.lng = user_location.lng;

    $('#pac-input').val(pick_up_data.address);
    loading.hide();

    plugin.google.maps.Geocoder.geocode({
        "position": {"lat": pick_up_data.lat, "lng": pick_up_data.lng}
      }, function(results) {
    
        if (results.length) {

            var address = results[0].extra.lines.join(', ');                
            
            if(address){
                pick_up_data.address = address;
                $('#pac-input').val(pick_up_data.address);
                $('#pickup-addr-disp-text').html(pick_up_data.address);
            }
                            
            
          
        }

    });  

                
    
    


    /* $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout : 5000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'geocodeplace', 'place_id':'','get_direction':0,'point_lat':pick_up_data.lat,'point_long':pick_up_data.lng,'mode':1,'location_type':0},
        dataType: 'json',
        success: function(data){

            loading.hide();

            console.log(data);

            if(data.hasOwnProperty('error')){
                
                return;
            }
            
            if(data.hasOwnProperty('success')){

                var address = data.place_details.results[0].formatted_address;                
            
                if(address == ''){
                    address = __("Somewhere in {---1}",[selected_city_route]); 
                }
                
                pick_up_data.address = address; 

                $('#pac-input').val(pick_up_data.address);

                if(route_polyline){
                    route_polyline.setVisible(false);
                }

                if(route_distance_duration_info_marker){    
                    route_distance_duration_info_marker.setVisible(false);
                }               
                
                if(!current_booking_data.status){
                    if(marker1.isVisible() && marker2.isVisible()){ 
                        process_route_between_locations();
                    }
                }
                
                
            }
                
            
           
        },
        error: function(){ 
            
            if(!current_booking_data.status){
                if(marker1.isVisible(true) && marker2.isVisible(true)){ 
                    process_route_between_locations();
                }
            }
            
            return;
        } 


    }); */

    
                  
    

    $('#mylocationbtn').hide();

    if(marker1){
        marker1.setVisible(true);
        marker1.setDisableAutoPan(true);

        marker1.setPosition({
            lat:pick_up_data.lat,
            lng: pick_up_data.lng                                            
        });

        map.setClickable(false);
        map.animateCamera({
            target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
            zoom: 18,
            duration: 1000,
            padding: 0  // default = 20px
        }, function() {
            map.setClickable(true);
            //alert("Camera target has been changed");

        });

        
    }else{
        map.setClickable(false);
        map.animateCamera({
            target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
            zoom: 18,
            duration: 1000,
            padding: 0  // default = 20px
        }, function() {
            map.setClickable(true);
            //alert("Camera target has been changed");

        });

        marker1 = map.addMarker({
                    'position':{lat: pick_up_data.lat,lng: pick_up_data.lng},
                    'icon' : 'img/pick-up-pin.png',
                    animation: plugin.google.maps.Animation.DROP
                }, function(){
                    
                });

                marker1.setDisableAutoPan(true);

                marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                    location_type_selected = 0;
                    show_adresses();
                })

                marker1._isReady = true;
        
        
    }


    if(route_polyline){
        route_polyline.setVisible(false);
    }

    if(route_distance_duration_info_marker){    
        route_distance_duration_info_marker.setVisible(false);
    }   


    if(!current_booking_data.status){
        if(marker1.isVisible() && marker2.isVisible()){ 
            process_route_between_locations();
        }
    }


}


function distance(lat1, lon1, lat2, lon2, unit) {

    //:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles        

	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	if (dist > 1) {
		dist = 1;
	}
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}



function dialcallcenter(){

    document.querySelector('#mySplitter').left.close();
    
    if(call_center_num === null){
        getcallcenternum();
        ons.notification.alert("Unable to place call. please try again later.",{title:""});
        return;
    }
    window.open('tel:' + call_center_num,'_system');
    

}


function rateapp(){
    window.open(APP_UPDATE_URL_ANDROID,'_system');
    
}

function callOnSuccess(){
    return;
}

function callOnError(){
    return;
}



function routecityitemselected(id){
    if(processing)return;
    processing = 1;
    loading.show();
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout : 10000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'updateusercity', 'route_id':id},
        dataType: 'json',
        success: function(data){
            loading.hide();
            processing = 0;
            if(data.hasOwnProperty('error')){
                ons.notification.alert(data.error);
                return;
            }
           
            userprofileinfo.route_id = id;
            routecitychange(id);
            updatefcmtopics(id);
            if(data.hasOwnProperty('recent_locs')){
                build_recents_list(data.recent_locs);
            }
        },
        error: function(){
            processing = 0;
            loading.hide();
            ons.notification.alert(__("Error communicating with server"));
            return;
        } 


    });

      
      
     
 }


//function handles subscribing and unsubscribing to topics for pushnotifications for city routes
 function updatefcmtopics(id = 0){

     if(APP_DEBUG)return;
     
     var topics_city_subs_data = localStorage.getItem('fcm_subscribed_city');
     if(topics_city_subs_data){
         //subscribed topic data found

        
            if(topics_city_subs_data != id){ //is the new city id topic already subscribed to ?
                //unsubscribe from this topic
                cordova.plugins.firebase.messaging.unsubscribe("rider-route-" + topics_city_subs_data); //unsubscribe from the old route id topic 

            }
            
            cordova.plugins.firebase.messaging.subscribe("rider-route-" + id); //subscribe to this topic again just incase fcm device token has changed
            localStorage.setItem('fcm_subscribed_city',id);

     }else{
         //no subscribed topic data found. create new         
         localStorage.setItem('fcm_subscribed_city',id);
         cordova.plugins.firebase.messaging.subscribe("rider-route-" + id); //subscribe to this topic
     }
 }


function routecitychange(id){

    
    $('#pac-input').val('');
    $('#pac-input2').val('');

    
    selected_city_id = id;
    selected_city_route = $('#route-sel-' + id).data('routename');
    selected_city_lat = parseFloat(routetariffs.result[id].cars[0].lat);
    selected_city_long = parseFloat(routetariffs.result[id].cars[0].lng);
    selected_city_curency_symbol = routetariffs.result[id].cars[0].symbol;
    selected_city_curency_exchange_rate = parseFloat(routetariffs.result[id].cars[0].exchng_rate);
    selected_city_curency_code = routetariffs.result[id].cars[0].iso_code; 

    if(routetariffs.result[id].cars[0].dist_unit == 0){ //kilometer
        selected_city_radius = parseFloat(routetariffs.result[id].cars[0].city_radius) * 1000; //convert from KM to meters
    }else{ //miles
        selected_city_radius = parseFloat(routetariffs.result[id].cars[0].city_radius) * 1609.344; //convert from Miles to meters
    }
    
    //save in localstorage
    /* var selected_city_details = {city_id:id,city_name:selected_city_route,city_lat:selected_city_lat,city_lng:selected_city_long,city_radius:selected_city_radius,city_currency_symbol:selected_city_curency_symbol,city_currency_exchange_rate:selected_city_curency_exchange_rate,city_currency_code:selected_city_curency_code};
    localStorage.setObject("selected_city",selected_city_details); */
    
    
    
   
        
    if(!selected_city_lat || !selected_city_long)return;

       


    document.querySelector('#myNavigator').popPage(
        {
        animation: 'fade',
        callback: function(){
                if(typeof map === 'object'){

                    clearMapItemsSelectively();

                    pick_up_data=[];
                    drop_off_data=[];
                    pick_up_data = {'address': '','lng':'','lat':''};
                    drop_off_data = {'address': '','lng':'','lat':''};

                    //reset multi destination mode
                    multi_destination_mode = 0;        
                    $('#location-type-icon-ds1').hide();
                    $('#location-type-icon-ds2').hide();
                    dest_location_type_selected = 0;
                    destination_stop_inp1_shown = 0;
                    destination_stop_inp2_shown = 0; 
                    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};
            
                                
                    $('#bookbutton').css('visibility','hidden');
                    $('#pickup-addr-disp').hide();
                    $('#dropoff-addr-disp').hide();
                    $('#pac-input').val('');
                    $('#pac-input2').val('');
            
                    loadfavourites();
                    getavailablecitydrivers(selected_city_id);
            
                    map.setClickable(false);
                    map.animateCamera({
                        target: {lat: selected_city_lat, lng: selected_city_long},
                        zoom: 13,
                        duration: 2000,
                        padding: 0  // default = 20px
                        }, function() {
                            getuserlocation();
                            /*
                            pick_up_data.address = selected_city_route;
                            pick_up_data.lat = parseFloat(selected_city_lat);
                            pick_up_data.lng = parseFloat(selected_city_long);
                            if(marker1){

                                marker1.setPosition({
                                    lat:pick_up_data.lat,
                                    lng: pick_up_data.lng                                            
                                });

                                map.animateCamera({
                                    target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
                                    zoom: 18,
                                    duration: 1000,
                                    padding: 0  // default = 20px
                                  }, function() {
                                    //alert("Camera target has been changed");

                                });

                                
                            }else{

                                map.animateCamera({
                                    target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
                                    zoom: 18,
                                    duration: 1000,
                                    padding: 0  // default = 20px
                                  }, function() {
                                    //alert("Camera target has been changed");

                                });

                                marker1 = map.addMarker({
                                            'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
                                            'icon' : 'img/pick-up-pin.png',
                                            animation: plugin.google.maps.Animation.DROP
                                        });

                                marker1._isReady = true;

                                marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                    location_type_selected = 0;
                                    show_adresses();
                                })
                            } */
                            map.setClickable(true);
                        
                        //alert("Camera target has been changed");
                        });
                }
            }             
        }
    );    
    
     
 }



 function forgotPwd(){

    ons.notification.prompt(__('Enter your registration email. A password reset code will be sent to this email'),{title: __('Password Reset'),buttonLabels : __('Continue'),cancelable: true})
        .then(function(input) {
            if(!input)return;
            var post_data = {'action':'passwordReset','email':input};
            loading.show();
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                timeout : 20000,
                crossDomain:true,
                xhrFields: {withCredentials: true},
                data: post_data,
                success: function (data, status)
                {
                    loading.hide();    
                    try{
                        var data_obj = JSON.parse(data);
                    }catch(e){
                        ons.notification.alert(__("Error communicating with server"),{title:""});
                        return;
                    }

                    if(data_obj.hasOwnProperty('error')){
                        ons.notification.alert(data_obj.error,{title:""});
                        return;
                    }


                    if(data_obj.hasOwnProperty('success')){
                        ons.notification.prompt(__('Please enter the code sent to your email to complete your password reset'),{title: __('Password Reset'),buttonLabels : __('Continue'),cancelable: true})
                        .then(function(input) {
                            
                                if(!input)return;
                            
                                var post_data = {'action':'passwordResetVerify','code':input};
                                loading.show();
                                $.ajax({
                                    url: ajaxurl,
                                    type: 'POST',
                                    timeout : 20000,
                                    crossDomain:true,
                                    xhrFields: {withCredentials: true},
                                    data: post_data,
                                    success: function (data, status)
                                    {
                                        loading.hide();    
                                        try{
                                            var data_obj = JSON.parse(data);
                                        }catch(e){
                                            ons.notification.alert(__("Error communicating with server"),{title:""});
                                            return;
                                        }

                                        if(data_obj.hasOwnProperty('error')){
                                            ons.notification.alert(data_obj.error,{title:""});
                                            return;
                                        }


                                        if(data_obj.hasOwnProperty('success')){
                                            ons.notification.alert(data_obj.success,{title:""});                
                                            return;
                                        }


                                    },
                                    error: function(jqXHR,textStatus, errorThrown) {  
                                        
                                        loading.hide();
                                        ons.notification.alert(__("Error communicating with server"),{title:""});
                                        return;
                                        
                                    }

                                });
                            



                        });
                    }


                },
                error: function(jqXHR,textStatus, errorThrown) {  
                    
                    loading.hide();
                    ons.notification.alert(__("Error communicating with server"),{title:""});
                    return;
                    
                }

            });
            
    });

    

    

}


function forgotPwdPhoneShow(){

    document.querySelector('#myNavigator').pushPage('pwdresetphone.html',
            {
            animation: 'fade'             
            }
    );
    

}



function forgotPwdPhone(){


    var country_call_code = $('#tel-code-pwd').data('dialcode');
    var country_2c = $('#country-flag-pwd').data('country');
    var phone_number = $('#pwd-rst-phone').val();
    
    if(phone_number == '' || phone_number.length < 5){
        ons.notification.alert(__("Phone number is invalid"),{title:""});
        return;
    }
    var post_data = {'action':'passwordResetPhone','phone_number':phone_number,'country_code':country_call_code};
    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 60000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
                
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                loading.hide();
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                loading.hide();
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }


            if(data_obj.hasOwnProperty('success')){

                
                //send verification SMS
                cordova.plugins.firebase.auth.verifyPhoneNumber("+" + country_call_code + phone_number, 0).then(function(verificationId) {
                    
                    // pass verificationId to signInWithVerificationId
                    firebase_phone_auth_verificationid = verificationId;
                    loading.hide();
                    verifyphonepwd(country_2c,country_call_code,phone_number, data_obj.pwd);
                    ons.notification.toast(__("Verification code sent..."),{
                        timeout: 2000
                    });
                }).catch(function(e){
                    loading.hide();
                    ons.notification.alert(__("Error sending verification code") + ": " + e,{title:""});
                    console.log(e);
                    return;
                });
                

            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });

    

    

}

function locationmapshow(){
    document.querySelector('#myNavigator').pushPage('locationmap.html',{animation: 'fade'});    
    return;
}




 function routestateitemselected(id){

    document.querySelector('#presetroutes').hide();

    if(selected_city_id == 0){
        ons.notification.alert(__("Please select a city route first"),{title:""});
        return;
    }


    //compute the distance of this selected inter state pickup location with the selected city location to ensure its in the same city
    var state_lat = parseFloat($('#route-sel-' + id).data('plat'));
    var state_lng = parseFloat($('#route-sel-' + id).data('plng'));

    var center = {"lat": selected_city_lat, "lng": selected_city_long};
    var current_pos = {"lat": state_lat, "lng": state_lng};

    let city_found = 0;

    let city_boundary_json_data = routetariffs.result[selected_city_id].cars[0].city_bound_coords;

    try{
        let city_boundary_coords = JSON.parse(city_boundary_json_data.replace(/&quot;/g,'"'));
        if(plugin.google.maps.geometry.poly.containsLocation({lat:state_lat,lng:state_lng},city_boundary_coords.coords)){
            city_found = 1;
        }
    }catch(e){

    }

    var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters

    
    if(!city_found){

        /* if(distance > selected_city_radius){
            ons.notification.alert(__("Your current city location does not match the pick-up city of this inter state route"),{title:""});
            return;
        } */

        ons.notification.alert(__("Your current city location does not match the pick-up city of this inter state route"),{title:""});
        return;
        
    }
    
    
    
    selected_state_id = id;
    processed_interstate_route = 0;
    selected_state_route = $('#route-sel-' + id).data('routename');

    if(!routetariffs.result.hasOwnProperty(selected_state_id)){
        routetariffs.result[selected_state_id] = state_routes_search_result[selected_state_id];
    }

    

    //alert(selected_state_route);
    /* document.querySelector('#myNavigator').pushPage('interstatebooking.html',{animation: 'fade',data: {'title':selected_state_route}});
    return; */

    clearMapItemsSelectively();
  
    pick_up_data=[];
    drop_off_data=[];
    pick_up_data = {'address': '','lng':'','lat':''};
    drop_off_data = {'address': '','lng':'','lat':''};

    

    var plng = routetariffs.result[selected_state_id].cars[0].pick_lng;
    var plat = routetariffs.result[selected_state_id].cars[0].pick_lat;
    var dlng = routetariffs.result[selected_state_id].cars[0].drop_lng;
    var dlat = routetariffs.result[selected_state_id].cars[0].drop_lat;

    //$('#bookbutton2').attr("disabled","disabled");
  

  
    pick_up_data['address'] = routetariffs.result[selected_state_id].cars[0].pick_name;
    pick_up_data['lng'] = parseFloat(routetariffs.result[selected_state_id].cars[0].pick_lng);
    pick_up_data['lat'] = parseFloat(routetariffs.result[selected_state_id].cars[0].pick_lat);

    drop_off_data['address'] = routetariffs.result[selected_state_id].cars[0].drop_name;
    drop_off_data['lng'] = parseFloat(routetariffs.result[selected_state_id].cars[0].drop_lng);
    drop_off_data['lat'] = parseFloat(routetariffs.result[selected_state_id].cars[0].drop_lat);


    marker1.setVisible(true);
    marker1.setPosition({lat:pick_up_data.lat,lng: pick_up_data.lng});

    marker2.setVisible(true);
    marker2.setPosition({lat:drop_off_data.lat,lng: drop_off_data.lng});

    process_route_between_locations();
  
    
}


  function showroutes(){

        

    document.querySelector('#myNavigator').pushPage('html/routes.html',
    {
        animation:'fade'             
    }
    );

    document.querySelector('#mySplitter').left.close();
    
    
  }

function mylocation(){

    return;
    
    getMapLocation();
    /* watchID = watchMapPosition(); */       

    
    document.querySelector('#mySplitter').left.close();

}  



function Login_show(){
    
    
    document.querySelector('#myNavigator').pushPage('login.html',
        {
            animation: 'fade'             
        }
    );
  }


function verify(){

    document.querySelector('#myNavigator').pushPage('verify.html',
        {
            animation:'fade'             
        }
     );

}


 

function userRegister(){
    
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var address = $("#address").val();
    var phone = $("#phone-reg").val();
    var country_2c_code = $('#country-flag-reg').data('country');
    var country_call_code = $('#tel-code-reg').data('dialcode');
    var email = $("#reg_email").val();
    var password = $("#reg_password").val();
    var rpassword = $("#reg_rpassword").val();
    var ref_code = $("#ref_code").val();

    if(firstname == '' || firstname.length < 2){
        ons.notification.alert(__("Firstname required"),{title:""});
        return;
    }

    if(lastname == '' || lastname.length < 2){
        ons.notification.alert(__("Lastname required"),{title:""});
        return;
    }

    if(address == '' || address.length < 2){
        ons.notification.alert(__("Address required"),{title:""});
        return;
    }

    

    if(phone == '' || phone.length < 5){
        ons.notification.alert(__("Phone number is invalid"),{title:""});
        return;
    }


    if(phone.indexOf('+') != -1){
        ons.notification.alert(__("Please do not include the international dial code (+___) in the phone number field"),{title:""});
        return;
    }

    

    var re = /\S+@\S+\.\S+/;


    if(!re.test(email)){
        ons.notification.alert(__("Email is invalid"),{title:""});
        return;
    }


    if(password.length < 8){
        ons.notification.alert(__("Password must not be less than 8 characters"),{title:""});
        return;
    }

    if(password == '' || rpassword == '' || password !== rpassword){
        ons.notification.alert(__("Passwords do not match"),{title:""});
        return;
    }


    if(USE_FIREBASE_PHONE_AUTH && !firebase_phone_number_verified){
        //using firebase phone auth but user phone has not been verified. 

        if(!resend_code_btn_status){
            ons.notification.alert(__("Cannot validate your account at this time. Please wait a while then retry"),{title:""});
            return;
        }

        //validate user details on server

        var post_data = {'action':'userRegister','country_code' : country_2c_code,'country_dial_code' : country_call_code,'firstname':firstname,'lastname':lastname,'address':address,'phone':phone,'email':email,'password':password,'rpassword':rpassword,'ref_code':ref_code,'verified_phone_num':firebase_phone_number_verified,'validate_only':1};

        loading.show();
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 25000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    loading.hide();
                    return;
                }

                if(data_obj.hasOwnProperty('error')){
                    loading.hide();
                    ons.notification.alert(data_obj.error,{title:""});
                }

                if(data_obj.hasOwnProperty('success')){

                    //successful validation. let's send the verification SMS
                    
                           
                        //send verification SMS
                        cordova.plugins.firebase.auth.verifyPhoneNumber("+" + country_call_code + phone, 0).then(function(verificationId) {
                            // pass verificationId to signInWithVerificationId
                            firebase_phone_auth_verificationid = verificationId;
                            loading.hide();
                            verifyphone("+" + country_call_code + phone);
                            ons.notification.toast(__("Verification code sent..."),{
                                timeout: 2000
                            });
                        }).catch(function(e){
                            loading.hide();
                            ons.notification.alert(__("Error sending verification code") + ": " + e,{title:""});
                            console.log(e);
                            return;
                        });
                    
                    
                   

                }


            },
                error: function(jqXHR,textStatus, errorThrown) {  
                    loading.hide();
                    ons.notification.alert(__("Error communicating with server"),{title:""});
                    return;
                }

        });
   
        return;

    }

    
    
    var post_data = {'action':'userRegister','country_code' : country_2c_code,'country_dial_code' : country_call_code,'userphoto' : user_signup_photo,'firstname':firstname,'lastname':lastname,'address':address,'phone':phone,'email':email,'password':password,'rpassword':rpassword,'ref_code':ref_code,'verified_phone_num':firebase_phone_number_verified,'validate_only':0};

    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 25000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                
                ons.notification.alert(data_obj.error,{title:""});
            }

            if(data_obj.hasOwnProperty('success')){

                
                if(typeof routetariffs == "object" && routetariffs.hasOwnProperty('result') && routetariffs.result[1] != null){
                    //save default route usually with id 1
                    let id = 1;
                    selected_city_id = id;
                    selected_city_route = routetariffs.result[1].cars[0].r_title;
                    selected_city_lat = parseFloat(routetariffs.result[id].cars[0].lat);
                    selected_city_long = parseFloat(routetariffs.result[id].cars[0].lng);
                    selected_city_curency_symbol = routetariffs.result[id].cars[0].symbol;
                    selected_city_curency_exchange_rate = parseFloat(routetariffs.result[id].cars[0].exchng_rate);
                    selected_city_curency_code = routetariffs.result[id].cars[0].iso_code; 

                    if(routetariffs.result[id].cars[0].dist_unit == 0){ //kilometer
                        selected_city_radius = parseFloat(routetariffs.result[id].cars[0].city_radius) * 1000; //convert from KM to meters
                    }else{ //miles
                        selected_city_radius = parseFloat(routetariffs.result[id].cars[0].city_radius) * 1609.344; //convert from Miles to meters
                    }
                    
                    //save in localstorage
                    var selected_city_details = {city_id:id,city_name:selected_city_route,city_lat:selected_city_lat,city_lng:selected_city_long,city_radius:selected_city_radius,city_currency_symbol:selected_city_curency_symbol,city_currency_exchange_rate:selected_city_curency_exchange_rate,city_currency_code:selected_city_curency_code};
                    localStorage.setObject("selected_city",selected_city_details);
                }

                if(USE_FIREBASE_PHONE_AUTH){
                    document.querySelector('#myNavigator').popPage(
                        {
                        animation: 'fade',   
                        callback: function(){
                            $('#country-flag').attr('class', 'iti__flag iti__' + country_2c_code);
                            $('#country-flag').data('country', country_2c_code)
                            $('#tel-code').html(' +' + country_call_code);
                            $('#tel-code').data('dialcode', country_call_code);

                            $('#login-phone').val(phone);
                            $('#login-password').val(password);
                            $('#loginbut').click();

                            //ons.notification.alert(__("Thank you for signing up. Please login"),{title:""});
                            return;  
                            }          
                        }
                    );
                    return;
                }
                
                if(data_obj.success){
                    ons.enableDeviceBackButtonHandler();
                    verify();
                }


            }


      },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
        }

    });

}





function login() {

    let country_call_code = user_login_options.country_call_code;
    let phone = user_login_options.phone;
    let phone_formatted = user_login_options.phone_formatted;
    let password = user_login_options.password;
    let otp_code = user_login_options.code;
    let fb_user_details = user_login_options.fb_user_details;

    let rem_pwd;
    if(user_login_options.hasOwnProperty('remember_pwd') && user_login_options.remember_pwd == 1 && password){
        rem_pwd = 1; 
    }

    loading.show();    
    
    var post_data = {'action':'userLogin', 'otp_code' : otp_code,'phone':phone,'phone_formatted':phone_formatted,'password':password,'country_call_code' : country_call_code, 'timezone':user_timezone, 'display_lang':selected_lang.code, "platform" : device.platform.toLowerCase(),'fb_user_details' : fb_user_details, 'sdl_key' : SDL_KEY};

    $.ajax({
        url: ajaxurl,
        method: 'POST',
        timeout : 60000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();
               
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }

            if(rem_pwd){
                //save user password locally
                localStorage.setItem('user_pwd', btoa(password));
                
            }


            if(data_obj.hasOwnProperty('is_activated')){
                                
                if(data_obj.is_activated === "0"){                    
                    ons.notification.alert(__("Your account is currently deactivated. Please contact support"),{title:""}); 
                    let top_page = document.querySelector('#myNavigator').topPage;
                    if(top_page.id != "loginpage"){
                        Login_show();
                    }
                    return;
                }else{
                    

                    setTimeout(updatepushnotificationtoken(), 5000);

                    if(data_obj.hasOwnProperty('wallet_amt')){
                                
                        wallet_amount = data_obj.wallet_amt;
                        wallet_history_items = data_obj.wallet_history;                
                    }

                    if(data_obj.hasOwnProperty('bannerdata')){

                        if(data_obj.bannerdata == 'nodata'){
                            $('#banner-items-container').css('left', '-10000px');  
                            $('#banner-items-container').empty();
                            banner_data = '';
                        }else{

                            if(data_obj.bannerdata != banner_data){ 
                                banner_data = data_obj.bannerdata;
                                $('#banner-items-container').html(data_obj.bannerdata);
                                if(Math.ceil($('#drop-box-container').outerHeight(true))){
                                    $('#banner-items-container').css('left', '0px');
                                    $('#banner-items-container').css('bottom', (Math.ceil($('#drop-box-container').outerHeight(true)) + 10) + 'px');
                                }
                            }
                            
                        }

                    }

                    if(data_obj.hasOwnProperty('reward_points')){
                                
                        reward_points = data_obj.reward_points;
                                      
                    }

                    if(data_obj.hasOwnProperty('default_currency')){
                                
                        default_currency_data = data_obj.default_currency;
                                     
                    }


                    if(data_obj.hasOwnProperty('sess_id')){                                
                        session_id = data_obj.sess_id; 
                        ajaxurl = siteurl + `/ajax_2_3_0.php?sess_id=${session_id}`;
                        localStorage.setItem('sess_id', session_id);                                   
                    }



                    if(data_obj.hasOwnProperty('app_settings')){
                                
                        app_settings = data_obj.app_settings;

                        if(app_settings.payment_type == "0"){ //cash payments only
                            $('#users-wallet').hide();
                            $('#wallet-menu-item').hide();
                        }
                        
                                     
                    }

                    if(data_obj.hasOwnProperty('profileinfo')){
                        userprofileinfo = data_obj.profileinfo;
                        updatefcmtopics(userprofileinfo.route_id);
                        $('#user-image-preload').attr('src',userprofileinfo.photo);

                        if(data_obj.hasOwnProperty('fb_conf')){
                            init_fb_rtdb(data_obj.fb_conf,userprofileinfo.userid);                    
                        }

                        //preload user document images
                        let user_doc_data = userprofileinfo.user_docs;
                        let user_doc_images = '';
                        if(user_doc_data){
                            for(var key in user_doc_data){
                                let doc_data = user_doc_data[key];
                                if(doc_data.u_doc_img){
                                    user_doc_images += `<img src='${doc_data.u_doc_img}' />`;
                                }

                            }
                            if(user_doc_images)$('#user-docs-image-preload').html(user_doc_images);
                        }
                                       
                    }

                    if(data_obj.hasOwnProperty('ongoing_bk') &&  data_obj.ongoing_bk.hasOwnProperty('action')){
                        if(data_obj.ongoing_bk.route_id == selected_city_id){
                            ons.notification.alert(__("You have a booking in progress"), {title:"",buttonLabels:[__('Continue')],callback: function(){
                                
                                switch(data_obj.ongoing_bk.action){
                                    case "driver-assigned":
                                    driver_assigned_notify(data_obj.ongoing_bk);
                                    break;
                                    case "driver-arrived":
                                    driver_arrived_notify(data_obj.ongoing_bk);
                                    break;
                                    case "customer-onride":
                                    customer_onride_notify(data_obj.ongoing_bk);
                                    break;
                                }
                            }});
                        }else{
                            ons.notification.alert(__("You have a booking in progress"), {title:"",buttonLabels:[__('Continue')],callback: function(){
                                //navigator.app.exitApp();
                                bookingspage_show();
                            }});
                        }
                    }

                    if(data_obj.hasOwnProperty('recent_locs')){
                        recent_locations_data = data_obj.recent_locs;                        
                    }


                    if(data_obj.hasOwnProperty('scheduled_ride_enabled')){
                        scheduled_ride_enabled = data_obj.scheduled_ride_enabled;                                                                                                  
                    }


                    if(data_obj.hasOwnProperty('tariff_data')){
                        routetariffs = data_obj.tariff_data;  
                        $('#rides-img-preload').html(data_obj.tariff_data.result.preloadrides);                                                                            
                    }


                    if(data_obj.hasOwnProperty('online_pay')){
                        online_payment_info = data_obj.online_pay;                                       
                    }

                    if(data_obj.hasOwnProperty('cc_num')){
                        call_center_num = data_obj.cc_num;                                       
                    }

                    

                    /* if(data_obj.hasOwnProperty('api_key') && google_map_api_key == null){
                        google_map_api_key = data_obj.api_key;
                        loadmap(google_map_api_key); 
                    } */

                    if(data_obj.hasOwnProperty('customer_app_update_url_ios')){                                
                        APP_UPDATE_URL_IOS = data_obj.customer_app_update_url_ios;                
                    }
        
                    if(data_obj.hasOwnProperty('customer_app_update_url_android')){                                
                        APP_UPDATE_URL_ANDROID = data_obj.customer_app_update_url_android;                
                    }

                    if(data_obj.hasOwnProperty('driver_app_update_url_ios')){                                
                        DRIVER_APP_UPDATE_URL_IOS = data_obj.driver_app_update_url_ios;                
                    }
        
                    if(data_obj.hasOwnProperty('driver_app_update_url_android')){                                
                        DRIVER_APP_UPDATE_URL_ANDROID = data_obj.driver_app_update_url_android;                
                    }
        
        
                    if(device.platform.toLowerCase() === "android"){ //running on android
        
                            if(data_obj.hasOwnProperty('app_version_android')){                                
                                
                                if(APP_VERSION_ANDROID != data_obj.app_version_android){                                    
                                    
                                    ons.notification.confirm({
                                        message: __('The version of this App is old. Please update app'),

                                        title: __('Update App'),
                                        buttonLabels: app_settings.force_update_customer_android == 1 ? [__('Update')] : [__('Update'), __('Later')],
                                        animation: 'default', // or 'none'
                                        primaryButtonIndex: 0,
                                        cancelable: false,
                                        callback: function(index) {
                                        
                                        if(!index){
                                            // 0-: Button index from the left
                                            //navigator.app.exitApp();
                                            window.open(APP_UPDATE_URL_ANDROID,'_system');
                                            if(app_settings.force_update_customer_android == 1){
                                                showUpdatePrompt(APP_UPDATE_URL_ANDROID);
                                                return;
                                            }
                                            
                                        }else{
                                            
                                            // -1: Cancel
                                        }
                                        
                                        }
                                    });
                                }                                      
                            }
        
                    }else{ //running on IOS
        
                        if(data_obj.hasOwnProperty('app_version_ios')){                                
                                
                            if(APP_VERSION_IOS != data_obj.app_version_ios){                                
                                                            
                                
                                ons.notification.confirm({
                                    message: __('The version of this App is old. Please update app'),
                                    // or messageHTML: '<div>Message in HTML</div>',
                                    title: __('Update App'),
                                    buttonLabels: app_settings.force_update_customer_ios == 1 ? [__('Update')] : [__('Update'), __('Later')],
                                    animation: 'default', // or 'none'
                                    primaryButtonIndex: 0,
                                    cancelable: false,
                                    callback: function(index) {
                                    
                                    if(!index){
                                        // 0-: Button index from the left
                                        //navigator.app.exitApp();
                                        window.open(APP_UPDATE_URL_IOS,'_system');
                                        if(app_settings.force_update_customer_ios == 1){
                                            showUpdatePrompt(APP_UPDATE_URL_IOS);
                                            return;
                                        }
                                        
                                    }else{
                                        
                                        // -1: Cancel
                                    }
                                    
                                    }
                                });
                            }                                      
                        }
        
                    }

                    

                    document.querySelector('#myNavigator').popPage(
                        {
                        animation: 'fade',
                        times: 3,   
                        callback: function(){
                                circletransition();
                                
                            }          
                        }
                    );

                    

                    
                }
                
           }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });
    
};


function drivertipbuttonclick(elem, amount){
    let button_id = elem.attr('id');
    $('.driver-tip-buttons').css('background-color','transparent');
    $('.driver-tip-buttons').css('color','#999');
    elem.css('background-color','var(--set-foreground-color)');
    elem.css('color','white');
    driver_tip_amount = parseFloat(amount);    

}


function verifyOTPCodeFirebase(country_dial_code,phone_num_inp,phone_num,code,redirect,phone_formatted){    

    $('#verifyotpcodemsg').html('');
    loading.show();
    setTimeout(function(){
        cordova.plugins.firebase.auth.signInWithVerificationId(firebase_phone_auth_verificationid, code).then(function(){
            cordova.plugins.firebase.auth.getCurrentUser().then(function(userdetails){
                loading.hide();
                firebase_phone_number_verified = 1;
                document.querySelector('#myNavigator').popPage(
                    {
                        animation: 'fade', 
                        callback: function(){
                            user_login_options = {country_call_code: country_dial_code, phone : phone_num_inp, phone_formatted : phone_formatted, password : null, code : code, fb_user_details:userdetails};
                            if(redirect == 1){
                                
                                login();
                            }else{
                                user_reg_data = {country_dial_code:'',phone:'',otp_code:'',profile_photo:'',firstname:'',lastname:'',password:'',referral:'',fb_user_details:null};
                                user_reg_data.country_dial_code = country_dial_code;
                                user_reg_data.phone = phone_num_inp;
                                user_reg_data.otp_code = code;
                                user_reg_data.fb_user_details = userdetails;
                                
                                initUserSignUp();
                            }
                            
                        }   
                    }
                );
            }).catch(function(e){
                loading.hide();
                firebase_phone_number_verified = 0;
                $('#verifyotpcodemsg').html(__("Error verifying your phone number. Ensure your phone number and verification code sent to you are valid"));
                return;
            })           
    
        }).catch(function(e){
            loading.hide();
            firebase_phone_number_verified = 0;
            $('#verifyotpcodemsg').html(__("Error verifying your phone number. Ensure your phone number and verification code sent to you are valid"));
            return;
            
        });

    },1000);    
    
}



function verifyOTPCode(country_dial_code,phone_num_inp,phone_num,code,redirect,phone_formatted){    
    //using server verfication with email
    var post_data = {'action':'verifyOTPCode','code':code,'phone':phone_num};
    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }


            if(data_obj.hasOwnProperty('success')){
                document.querySelector('#myNavigator').popPage(
                    {
                        animation: 'fade', 
                        callback: function(){
                            loading.hide();
                            user_login_options = {country_call_code: country_dial_code, phone : phone_num_inp, phone_formatted : phone_formatted, password : null, code : code,fb_user_details:null};
                            if(redirect == 1){
                                login();
                            }else{
                                
                                user_reg_data = {country_dial_code:'',phone:'',otp_code:'',profile_photo:'',firstname:'',lastname:'',password:'',referral:'',fb_user_details:null};
                                user_reg_data.country_dial_code = country_dial_code;
                                user_reg_data.phone = phone_num_inp;
                                user_reg_data.otp_code = code;
                                user_reg_data.fb_user_details = null;

                                initUserSignUp();
                            }
                            
                        }   
                    }
                );
                return;
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });
    

}


function initUserSignUp(){
    
    document.querySelector('#myNavigator').pushPage('signuppage1.html',
        {
            animation: 'fade'             
        }
    );
}


function showSignUpPg2(){
    /* if(!user_reg_data.profile_photo){
        $('#regpage1errormsg').html(__('A clear photo of you is required'));
        setTimeout(function(){
            $('#regpage1errormsg').html('');
        },2000);
        return;
    } */

    document.querySelector('#myNavigator').pushPage('signuppage2.html',
        {
            animation: 'fade'             
        }
    );


}


function showSignUpPg3(){
    let user_firstname = $('#regfirstname').val();
    let user_lastname = $('#reglastname').val();

    if(!user_firstname){
        ons.notification.alert(__("Firstname required"),{title:""});
        return;
    }

    if(!user_lastname){
        ons.notification.alert(__("Lastname required"),{title:""});
        return;
    }

    user_reg_data.firstname = user_firstname;
    user_reg_data.lastname = user_lastname;

    document.querySelector('#myNavigator').pushPage('signuppage3.html',
        {
            animation: 'fade'             
        }
    );


}


function showSignUpPg4(){

    let pwd_inp_1 = $('#regpwdnew').val();
    let pwd_inp_2 = $('#regpwdconfirm').val();

    if(pwd_inp_1 == '' || pwd_inp_2 == '' || pwd_inp_1 !== pwd_inp_2){
        $('#regpwderrormsg').html(__("Passwords do not match"));
        return;
    }

    if(pwd_inp_1.length < 8 || pwd_inp_2.length < 8){
        $('#regpwderrormsg').html(__("Password must not be less than 8 characters"));
        return;
    }
    

    if($('#reg-remember-user-pwd').prop('checked')){
        user_reg_data.rem_password = 1;        
    }else{
        user_reg_data.rem_password = 0;        
    }

    user_reg_data.password = pwd_inp_1;
    
    document.querySelector('#myNavigator').pushPage('signuppage4.html',
        {
            animation: 'fade'             
        }
    );
}


function registerUser(){
    
    user_reg_data.referral = $('#reguserrefcode').val();

    loading.show();
          
    var post_data = {'action':'registerUser','reg_data':user_reg_data};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 60000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();

            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                
                ons.notification.toast(data_obj.error,{
                    timeout: 1000
                });
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                
                user_login_options.password = user_reg_data.password;
                user_login_options.code = null;
                user_login_options.fb_user_details = null;
                if(user_reg_data.rem_password == 1){
                    //store password locally.
                    localStorage.setItem('user_pwd', btoa(user_reg_data.password));  
                    user_login_options.remember_pwd = 1;                  
                }

                document.querySelector('#myNavigator').popPage(
                    {
                        animation: 'fade',
                        times: 4,   
                        callback: function(){
                            login();
                                
                            }          
                    }
                );

                
                return;

            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });
}




function verifyCode(){    

    

    loading.show();   

    var activation_code = $("#verify_code").val();

    var post_data = {'action':'userActivateCode',"code":activation_code};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            
            if(data_obj.hasOwnProperty('error')){
                ons.notification.alert(data_obj.error,{title:""});
                return;
                
            }


            if(data_obj.hasOwnProperty('success')){

                
                ons.notification.alert(data_obj.success, {buttonLabels:['Restart ' + APP_TITLE],callback: function(){
                    //navigator.app.exitApp();
                    window.location.reload(); 
                    return;
                }});

                                           
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }
        
    });

}


function promotions_show(){
    document.querySelector('#myNavigator').pushPage('html/promo.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();
}


function promocheckadd(promocode='',mode=0){
    
    let stored_promo_code = localStorage.getObject('user-promo-codes');
    

    if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
        if(stored_promo_code.promo_code == promocode){
            return;
        }else if(mode == 1){
            promocode = stored_promo_code.promo_code;
            
        }
        
    }

    if(!promocode)return;
        
    var post_data = {'action_get':'promocodecheck','coupon_code':promocode};
    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'GET',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                let stored_promo_code = localStorage.getObject('user-promo-codes');    

                if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
                    if(stored_promo_code.promo_code == promocode){
                        localStorage.removeItem('user-promo-codes');
                        verified_coupon_code = '';
                    }
                    
                }

                if(mode==1)return;
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }


            if(data_obj.hasOwnProperty('success')){
                //ons.notification.alert(data_obj.message,{title: __("Promo code is valid")});
                //$data = array("success"=> 1, "message" => $msg,'usage_limit_count'=>$usage_limit_count,'user_usage_count'=> $user_usage_count,'days_left'=>$days_left,'coupon_title'=>$title,'city'=>$city);
                let promo_data = {'promo_code':promocode,'discount_type':data_obj.discount_type,'discount_value':data_obj.discount_value,'coupon_v':data_obj.coupon_vehicles,'city_id':data_obj.city_id,'min_fare':data_obj.min_fare,'max_discount':data_obj.max_discount,'times_used':parseInt(data_obj.user_usage_count),'usage_limit':parseInt(data_obj.usage_limit_count)};
                localStorage.setObject("user-promo-codes",promo_data);
                verified_coupon_code = promocode;
                
                $('#promo-title').html(promocode.toUpperCase() + " | " + data_obj.coupon_title);
                $('#promo-desc').html(data_obj.message);
                $('#promo-usage').html(__('Times of use') + " - " + data_obj.user_usage_count + " / " + data_obj.usage_limit_count);
                $('#promo-status').html(data_obj.days_left == 0 ? "Expired" :  __("{---1} days left",[data_obj.days_left]));
                $('#promo-city').html(data_obj.city);

                $('#promo-content').show();

            }

            
        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });
}

function coupon_check(){

    ons.notification.prompt(__('Enter a coupon code'),{title: __('Coupon Discount'),buttonLabels : __('Continue'),cancelable: true})
        .then(function(input) {
            if(!input)return;
            var post_data = {'action_get':'couponCheck','coupon_code':input};
            loading.show();
            $.ajax({
                url: ajaxurl,
                type: 'GET',
                timeout : 20000,
                crossDomain:true,
                xhrFields: {withCredentials: true},
                data: post_data,
                success: function (data, status)
                {
                    loading.hide();    
                    try{
                        var data_obj = JSON.parse(data);
                    }catch(e){
                        ons.notification.alert(__("Unable to verify coupon code. Please retry later"),{title:""});
                        return;
                    }

                    if(data_obj.hasOwnProperty('error')){
                        ons.notification.alert(data_obj.error,{title:""});
                        return;
                    }


                    if(data_obj.hasOwnProperty('success')){
                        ons.notification.alert(data_obj.message,{title: __("Coupon Valid")});
                        verified_coupon_code = input;
                        $('#coupon-code').html(input);
                    }

                    
                },
                error: function(jqXHR,textStatus, errorThrown) {  
                    
                    loading.hide();
                    ons.notification.alert(__("Unable to verify coupon code. Please retry later"),{title:""});
                    return;
                    
                }

            });
            
    });

    
}



function showsoftlicenses(){
        
    loading.show();    
    document.querySelector('#myNavigator').pushPage('html/software-licenses.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}



function logout(){
    loading.show();
    var post_data = {'action':'userLogout'};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 15000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            
            if(data_obj.hasOwnProperty('loggedout')){
                
                $('#bookbutton').css('visibility','hidden');
                $('#pickup-addr-disp').hide();
                $('#dropoff-addr-disp').hide();
                $('#pac-input').val('');
                $('#pac-input2').val('');



                //reset items
                wallet_amount = null;
                wallet_history_items = null;
                userprofileinfo = undefined;
                selected_city_id = "0"
                selected_city_route = undefined;
                selected_state_route = undefined;
                routetariffs = undefined;
                notifications_data = '';
                bookings_data =[];
                bookings_data = {'pend_onride':'','completed':'','cancelled':''};

                if(map){
                    clearMapItemsSelectively();                    
                }

                $('#bookbutton').css('visibility','hidden');
                $('#pickup-addr-disp').hide();
                $('#dropoff-addr-disp').hide();
                $('#pac-input').val('');
                $('#pac-input2').val('');
                                
                pick_up_data = [];
                drop_off_data = [];
                pick_up_data = {'address': '','lng':'','lat':''};
                drop_off_data = {'address': '','lng':'','lat':''};

                //reset multi destination mode
                multi_destination_mode = 0;        
                $('#location-type-icon-ds1').hide();
                $('#location-type-icon-ds2').hide();
                dest_location_type_selected = 0;
                destination_stop_inp1_shown = 0;
                destination_stop_inp2_shown = 0; 
                multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

                document.querySelector('#mySplitter').left.close();
                document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){
                    Login_show();
                }});
                return;
                
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }
        
    });

    


}




function del_acc(){

    ons.notification.prompt(__('This action will delete your account and all your records on our servers. Enter your password to continue'),{title:'',cancelable:true,buttonLabels:[__('Cancel'),__('Continue')]})
    .then(function(input) {
        if(!input)return;
        del_user_acc(input);
    });

}


function del_user_acc(input){

    loading.show();
    var post_data = {'action':'del_user_acc','pwd':input};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 15000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }

            
            if(data_obj.hasOwnProperty('success')){
                
                $('#bookbutton').css('visibility','hidden');
                $('#pickup-addr-disp').hide();
                $('#dropoff-addr-disp').hide();
                $('#pac-input').val('');
                $('#pac-input2').val('');



                //reset items
                wallet_amount = null;
                wallet_history_items = null;
                userprofileinfo = undefined;
                selected_city_id = "0"
                selected_city_route = undefined;
                selected_state_route = undefined;                
                routetariffs = undefined;
                notifications_data = '';
                bookings_data =[];
                bookings_data = {'pend_onride':'','completed':'','cancelled':''};

                if(map){
                    clearMapItemsSelectively();
                }

                $('#bookbutton').css('visibility','hidden');
                $('#pickup-addr-disp').hide();
                $('#dropoff-addr-disp').hide();
                $('#pac-input').val('');
                $('#pac-input2').val('');

                                
                pick_up_data = [];
                drop_off_data = [];
                pick_up_data = {'address': '','lng':'','lat':''};
                drop_off_data = {'address': '','lng':'','lat':''};

                //reset multi destination mode
                multi_destination_mode = 0;        
                $('#location-type-icon-ds1').hide();
                $('#location-type-icon-ds2').hide();
                dest_location_type_selected = 0;
                destination_stop_inp1_shown = 0;
                destination_stop_inp2_shown = 0; 
                multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

                document.querySelector('#mySplitter').left.close();
                document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){
                    Login_show();
                }});
                
                return;
                
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }
        
    });

    


}


function resendOTPCodeFirebase(phone){

    if(!resend_code_btn_status){
        ons.notification.toast(__("Please wait a while before resending verification code"),{
            timeout: 2000
        });
        return;
    }

    loading.show();

    
    clearInterval(resend_code_countdown_timer_handle);
    var countdown = RESEND_CODE_COUNTDOWN_VALUE;
    resend_code_btn_status = 0;
    resend_code_countdown_timer_handle = setInterval(function(){
        countdown--;
        if(countdown < 0){
            countdown = 0;
            resend_code_btn_status = 1;
            $('#resend-otp-btn').text(__('Resend Code'));
            clearInterval(resend_code_countdown_timer_handle);
            return;
        }
        $('#resend-otp-btn').text(__('Resend Code') + ' ' + countdown);
    
    },1000);

    var phone_number = $('#resend-otp-btn').data('phonenumber');
    
    //send verification SMS
    cordova.plugins.firebase.auth.verifyPhoneNumber(phone_number, 0).then(function(verificationId) {
        loading.hide();
        // pass verificationId to signInWithVerificationId
        firebase_phone_auth_verificationid = verificationId;
        ons.notification.toast(__("Verification code sent..."),{
            timeout: 2000
        });
        
    }).catch(function(e){
        loading.hide();
        ons.notification.alert(__("Error sending verification code") + ": " + e,{title:""});
        console.log(e);
    });

}



function resendOTPCode(){

    if(!resend_code_btn_status){
        ons.notification.toast(__("Please wait a while before resending verification code"),{
            timeout: 2000
        });
        return;
    }

    
    clearInterval(resend_code_countdown_timer_handle);
    var countdown = RESEND_CODE_COUNTDOWN_VALUE;
    resend_code_btn_status = 0;
    resend_code_countdown_timer_handle = setInterval(function(){
        countdown--;
        if(countdown < 0){
            countdown = 0;
            resend_code_btn_status = 1;
            $('#resend-otp-btn').text(__('Resend Code'));
            clearInterval(resend_code_countdown_timer_handle);
            return;
        }
        $('#resend-otp-btn').text(__('Resend Code') + ' ' + countdown);
    
    },1000);

    var phone_number = $('#resend-otp-btn').data('phonenumber');
    
    //send verification SMS
    var post_data = {'action':'userResendOTPCode', 'phone': phone_number};

    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }


            if(data_obj.hasOwnProperty('success')){
                ons.notification.toast(__("Verification code sent..."),{
                    timeout: 2000
                });               
                return;
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });

}




function resendCode(){
    

    //using server verfication with email
    var post_data = {'action':'userResendCode'};
    loading.show();
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                ons.notification.alert(data_obj.error,{title:""});
                return;
            }


            if(data_obj.hasOwnProperty('success')){
                ons.notification.alert(data_obj.success,{title:""});                
                return;
            }


        },
        error: function(jqXHR,textStatus, errorThrown) {  
            
            loading.hide();
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });



}

function mapLoadSuccess(){

    let res = new Promise(function(resolve,reject){
        //wait for map to initialize completely before continuing
        let old_current_time = Date.now() / 1000 | 0;
        let map_load_check_timer = setInterval(function(){
            if(map_ready){
                clearInterval(map_load_check_timer);
                resolve(true);
            }
            let elapsed_time = (Date.now() / 1000 | 0) - old_current_time;
            /* if(elapsed_time > 5){
                clearInterval(map_load_check_timer);
                resolve(true);
            } */
        }, 100);

       
    })

    return res;
}


function checkLoginStatus(){
        
    
    var post_data = {'action':'checkLoginStatus','timezone':user_timezone,'display_lang':selected_lang.code, "platform" : device.platform.toLowerCase(), 'sdl_key' : SDL_KEY};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: async function (data, status)
        {
            
            
            //console.log(data);
            try{
                if(!data)throw "Server returned invalid data";
                var data_obj = JSON.parse(data);
            }catch(e){

                navigator.splashscreen.hide();

                ons.notification.confirm({
                message: __('Error communicating with server'),
                // or messageHTML: '<div>Message in HTML</div>',
                title: '',
                buttonLabels: [__('Exit'), __('Retry')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 0,
                cancelable: false,
                callback: function(index) {
                    
                    if(!index){
                    // 0-: Button index from the left
                    navigator.app.exitApp();
                    
                    }else{
                    checkLoginStatus();
                    // -1: Cancel
                    }
                    
                }
                });
                return;
            }


            sync_with_servertime();

            await mapLoadSuccess();


            if(data_obj.hasOwnProperty('error')){                                
                Login_show();
                setTimeout(function(){
                    navigator.splashscreen.hide();
                    startscreen.hide();
                },500);                
                return;               
            }            

            if(data_obj.hasOwnProperty('sess_id')){                                
                session_id = data_obj.sess_id; 
                ajaxurl = siteurl + `/ajax_2_3_0.php?sess_id=${session_id}`;
                localStorage.setItem('sess_id', session_id);                                   
            }
            
            
            if(data_obj.hasOwnProperty('app_settings')){
                                
                app_settings = data_obj.app_settings;
                             
            }

            

            if(data_obj.hasOwnProperty('customer_app_update_url_ios')){                                
                APP_UPDATE_URL_IOS = data_obj.customer_app_update_url_ios;                
            }

            if(data_obj.hasOwnProperty('customer_app_update_url_android')){                                
                APP_UPDATE_URL_ANDROID = data_obj.customer_app_update_url_android;                
            }

            if(data_obj.hasOwnProperty('driver_app_update_url_ios')){                                
                DRIVER_APP_UPDATE_URL_IOS = data_obj.driver_app_update_url_ios;                
            }

            if(data_obj.hasOwnProperty('driver_app_update_url_android')){                                
                DRIVER_APP_UPDATE_URL_ANDROID = data_obj.driver_app_update_url_android;                
            }

            

            if(device.platform.toLowerCase() === "android"){ //running on android

                    if(data_obj.hasOwnProperty('app_version_android')){                                
                        
                        if(APP_VERSION_ANDROID != data_obj.app_version_android){
                            
                                                        
                            ons.notification.confirm({
                                message: __('The version of this App is old. Please update app'),
                                // or messageHTML: '<div>Message in HTML</div>',
                                title: __('Update App'),
                                buttonLabels: app_settings.force_update_customer_android == 1 ? [__('Update')] : [__('Update'), __('Later')],
                                animation: 'default', // or 'none'
                                primaryButtonIndex: 0,
                                cancelable: false,
                                callback: function(index) {
                                
                                if(!index){
                                    // 0-: Button index from the left
                                    //navigator.app.exitApp();
                                    window.open(APP_UPDATE_URL_ANDROID,'_system');
                                    if(app_settings.force_update_customer_android == 1){
                                        showUpdatePrompt(APP_UPDATE_URL_ANDROID);
                                        return;
                                    }
                                    
                                }else{
                                    
                                    // -1: Cancel
                                }
                                
                                }
                            });
                        }                                      
                    }

            }else{ //running on IOS

                if(data_obj.hasOwnProperty('app_version_ios')){                                
                        
                    if(APP_VERSION_IOS != data_obj.app_version_ios){
                        
                        
                        ons.notification.confirm({
                            message: __('The version of this App is old. Please update app'),
                            // or messageHTML: '<div>Message in HTML</div>',
                            title: __('Update App'),
                            buttonLabels: app_settings.force_update_customer_ios == 1 ? [__('Update')] : [__('Update'), __('Later')],
                            animation: 'default', // or 'none'
                            primaryButtonIndex: 0,
                            cancelable: false,
                            callback: function(index) {
                            
                            if(!index){
                                // 0-: Button index from the left
                                //navigator.app.exitApp();
                                window.open(APP_UPDATE_URL_IOS,'_system');
                                if(app_settings.force_update_customer_ios == 1){
                                    showUpdatePrompt(APP_UPDATE_URL_IOS);
                                    return;
                                }
                                
                            }else{
                                
                                // -1: Cancel
                            }
                            
                            }
                        });
                    }                                      
                }

            }
           


           if(data_obj.hasOwnProperty('cc_num')){                                
                call_center_num = data_obj.cc_num;                
            }


            
            if(data_obj.hasOwnProperty('loggedin')){
                if(!data_obj.loggedin){
                    if(data_obj.hasOwnProperty('tariff_data')){
                        routetariffs = data_obj.tariff_data;
                        $('#rides-img-preload').html(data_obj.tariff_data.result.preloadrides);                 
                        
                    }
                    Login_show();
                    setTimeout(function(){
                        navigator.splashscreen.hide();
                        startscreen.hide();
                    },500);
                    return;
                }else{

                    if(data_obj.hasOwnProperty('is_activated')){
                                
                        if(data_obj.is_activated === "0"){
                            ons.notification.alert(__("Your account is currently deactivated. Please contact support"),{title:""});                            
                            let top_page = document.querySelector('#myNavigator').topPage;
                            if(top_page.id != "loginpage"){
                                Login_show();
                            }
                            navigator.splashscreen.hide();
                            startscreen.hide();
                            return;
                        }
                        
                   }
                    
                   

                    if(data_obj.hasOwnProperty('recent_locs')){
                        recent_locations_data = data_obj.recent_locs;                        
                    }

                    if(data_obj.hasOwnProperty('bannerdata')){
                        if(data_obj.bannerdata == 'nodata'){
                            $('#banner-items-container').css('left', '-10000px');  
                            $('#banner-items-container').empty();
                            banner_data = '';
                        }else{

                            if(data_obj.bannerdata != banner_data){
                                banner_data = data_obj.bannerdata;
                                $('#banner-items-container').html(data_obj.bannerdata);
                                if(Math.ceil($('#drop-box-container').outerHeight(true))){
                                    $('#banner-items-container').css('left', '0px');
                                    $('#banner-items-container').css('bottom', (Math.ceil($('#drop-box-container').outerHeight(true)) + 10) + 'px');
                                }
                            } 
                            
                        }

                    }

                    setTimeout(updatepushnotificationtoken(), 5000); 

                    if(data_obj.hasOwnProperty('wallet_amt')){
                                
                        wallet_amount = data_obj.wallet_amt;
                        wallet_history_items = data_obj.wallet_history;                
                    }

                    if(data_obj.hasOwnProperty('reward_points')){
                                
                        reward_points = data_obj.reward_points;
                                      
                    }


                    if(data_obj.hasOwnProperty('sess_id')){                                
                        session_id = data_obj.sess_id; 
                        ajaxurl = siteurl + `/ajax_2_3_0.php?sess_id=${session_id}`;
                        localStorage.setItem('sess_id', session_id);                                   
                    }


                    if(data_obj.hasOwnProperty('default_currency')){
                                
                        default_currency_data = data_obj.default_currency;
                                     
                    }

                    if(data_obj.hasOwnProperty('app_settings')){
                                
                        app_settings = data_obj.app_settings;

                        if(app_settings.payment_type == "0"){ //cash payments only
                            $('#users-wallet').hide();
                            $('#wallet-menu-item').hide();
                        }
                                     
                    }

                    if(data_obj.hasOwnProperty('profileinfo')){
                        userprofileinfo = data_obj.profileinfo;
                        updatefcmtopics(userprofileinfo.route_id);
                        $('#user-image-preload').attr('src',userprofileinfo.photo);

                        if(data_obj.hasOwnProperty('fb_conf')){
                            init_fb_rtdb(data_obj.fb_conf,userprofileinfo.userid);                      
                        }

                        //preload user document images
                        let user_doc_data = userprofileinfo.user_docs;
                        let user_doc_images = '';
                        if(user_doc_data){
                            for(var key in user_doc_data){
                                let doc_data = user_doc_data[key];
                                if(doc_data.u_doc_img){
                                    user_doc_images += `<img src='${doc_data.u_doc_img}' />`;
                                }

                            }
                            if(user_doc_images)$('#user-docs-image-preload').html(user_doc_images);
                        }
                                       
                    }

                    if(data_obj.hasOwnProperty('ongoing_bk') &&  data_obj.ongoing_bk.hasOwnProperty('action')){
                        if(data_obj.ongoing_bk.route_id == selected_city_id){
                            ons.notification.alert(__("You have a booking in progress"), {title:"",buttonLabels:[__('Continue')],callback: function(){
                                
                                switch(data_obj.ongoing_bk.action){
                                    case "driver-assigned":
                                    driver_assigned_notify(data_obj.ongoing_bk);
                                    break;
                                    case "driver-arrived":
                                    driver_arrived_notify(data_obj.ongoing_bk);
                                    break;
                                    case "customer-onride":
                                    customer_onride_notify(data_obj.ongoing_bk);
                                    break;
                                }
                            }});
                        }else{
                            ons.notification.alert(__("You have a booking in progress"), {title:"",buttonLabels:[__('Continue')],callback: function(){
                                //navigator.app.exitApp();
                                bookingspage_show();
                            }});
                        }
                    }

                    if(data_obj.hasOwnProperty('scheduled_ride_enabled')){
                        scheduled_ride_enabled = data_obj.scheduled_ride_enabled;                                                                                                  
                    }

                    if(data_obj.hasOwnProperty('tariff_data')){
                        routetariffs = data_obj.tariff_data;
                        $('#rides-img-preload').html(data_obj.tariff_data.result.preloadrides);                          
                    }

                    if(data_obj.hasOwnProperty('online_pay')){
                        online_payment_info = data_obj.online_pay;                                       
                    }

                    if(data_obj.hasOwnProperty('cc_num')){
                        call_center_num = data_obj.cc_num;                                       
                    } 
                    
                    navigator.splashscreen.hide();
                    startscreen.hide();
                    circletransition();
                                       

                    
                }
                
            }

            


        },
        error: function(jqXHR,textStatus, errorThrown) {
            
            //startscreen.hide();
            navigator.splashscreen.hide();

            ons.notification.confirm({
                message: __('Error communicating with server'),
                // or messageHTML: '<div>Message in HTML</div>',
                title: '',
                buttonLabels: [__('Exit'), __('Retry')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 0,
                cancelable: false,
                callback: function(index) {
                 
                  if(!index){
                    // 0-: Button index from the left
                    navigator.app.exitApp();
                    
                  }else{
                    checkLoginStatus();
                    // -1: Cancel
                  }
                 
                }
              });
            return;
            
        }
        
    });

    


}


function load_selected_city(){

    //get earlier selected route if any
    var init_map_lat; 
    var init_map_lng;

    let id = userprofileinfo.route_id;

    let city_result = detectUserCity(true);

    if(city_result.hasOwnProperty('success')){
        id = city_result.route;
    }

    
    selected_city_id = id;
    selected_city_route = routetariffs.result[id].cars[0].r_title;
    selected_city_lat = parseFloat(routetariffs.result[id].cars[0].lat);
    selected_city_long = parseFloat(routetariffs.result[id].cars[0].lng);
    selected_city_curency_symbol = routetariffs.result[id].cars[0].symbol;
    selected_city_curency_exchange_rate = parseFloat(routetariffs.result[id].cars[0].exchng_rate);
    selected_city_curency_code = routetariffs.result[id].cars[0].iso_code; 

    if(routetariffs.result[id].cars[0].dist_unit == 0){ //kilometer
        selected_city_radius = parseFloat(routetariffs.result[id].cars[0].city_radius) * 1000; //convert from KM to meters
    }else{ //miles
        selected_city_radius = parseFloat(routetariffs.result[id].cars[0].city_radius) * 1609.344; //convert from Miles to meters
    }

    updatefcmtopics(id);
    
    
    
    if(!selected_city_lat || !selected_city_long)return;

    if(typeof map === 'object'){

        clearMapItemsSelectively();
        
        pick_up_data=[];
        drop_off_data=[];
        pick_up_data = {'address': '','lng':'','lat':''};
        drop_off_data = {'address': '','lng':'','lat':''};

        //reset multi destination mode
        multi_destination_mode = 0;        
        $('#location-type-icon-ds1').hide();
        $('#location-type-icon-ds2').hide();
        dest_location_type_selected = 0;
        destination_stop_inp1_shown = 0;
        destination_stop_inp2_shown = 0; 
        multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

        
        
        
        

        getuserlocation();

        getavailablecitydrivers(selected_city_id);

    }


}


function loadfavourites(){
    if(localStorage.getObject('favourite_locations_' + selected_city_id)){
        favourite_places = localStorage.getObject('favourite_locations_' + selected_city_id);
        
    }else{
        favourite_places = [];
    }
    rebuild_fav_list();    
    
}


function build_recents_list(data){
    if(selected_city_id != data.route_id)return;
    let links = '';
    recent_list_items_string = '';
    var recent_locations = data.locations;
    if(typeof recent_locations == "object"){
        
        //create recent locations strip
        
        recent_locations.forEach(function(val,indx){            
            links += `<div style="display: flex;flex-wrap: nowrap;align-items: center;min-width:30%;margin:10px 5px 2px 2px;background-color: #fff;border-radius: 15px;border:thin solid #b0b0b0;padding-right: 3px;"><div style="width: 32px;height: 32px;display:inline-block;position:relative;flex-shrink: 0;border-radius: 10px;margin-right: 3px;"><ons-icon icon="fa-stop-circle" size="16px" style="color: black;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"></ons-icon></div><span style="width:100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 11px;color: black;font-weight: bold;" onclick="recent_destination_click($(this))" data-address="${val.dropoff_address}" data-lat="${val.dropoff_lat}" data-lng="${val.dropoff_long}">${val.dropoff_address}</span></div>`;
            recent_list_items_string += `<ons-list-item class='recent-item'  data-address="${val.dropoff_address}" data-lat="${val.dropoff_lat}" data-lng="${val.dropoff_long}" onclick='recent_destination_list_click($(this))' tappable modifier='longdivider'><div class='left'><ons-icon icon='fa-history' size='20px' style='color:#00bcd4;'></ons-icon></div><span class='list-item__title'>${val.dropoff_address}</span><span class='list-item__subtitle'></span></ons-list-item>`;
        })

        if(recent_list_items_string){
            recent_list_items_string = "<br><ons-list-header modifier='longdivider'>" + __("Recent Places") + "</ons-list-header>" + recent_list_items_string
        }
        $('#recent-strip-container').html(links);
        if(app_fully_started){
            $("#recent-strip-container").css("visibility","visible");        
            $("#recent-strip-container").removeClass("slideInRight animated").addClass("slideInRight animated").one('animationend', function(){
                $(this).removeClass("slideInRight animated");
            })
        }

    }
    
}



function circletransition(){

    animatecircle.show(); 
    getnotifications(1);
    get_chat_support_msg(); 
    userGreeting(); 

    $('ons-modal').addClass('modal-transparent');
    $('#circle-transition').animate({
        width:2000,
        height:2000

    },1200,async function(){
                        animatecircle.hide();
                        $('ons-modal').removeClass('modal-transparent');

                        $('#gps-ignore-btn').show();

                        user_location_live.lat = 0;
                        user_location_live.lng = 0;                       


                        if(!user_location_live.lat && !user_location_live.lng){ //still no valid coordinates detected. Notify user to enable GPS
                            
                            let gps_enabled = await userEnableGPSNotify();
                            getCurrentLocation();
                            let time_counter = 0;
                            let city_selection_dlg_shown = false;

                            let check_user_location_detected_timer = setInterval(function(){
                                time_counter++;
                                if(user_location_live.lat && user_location_live.lng){
                                    clearInterval(check_user_location_detected_timer);
                                    document.querySelector('#selectcitydialog').hide();
                                    document.querySelector('#gpsenabedialog').hide();
                                    $('#gps-ignore-btn').hide();
                                    finalize_init(); 
                                }else{
                                    if(gps_enabled.hasOwnProperty('success')){
                                        if(time_counter > 6){
                                            //5 seconds after enabling GPS and still not able to get user coords.
                                            if(city_selection_dlg_shown)return;
                                            city_selection_dlg_shown = true;
                                            let title = __('We were unable to automatically determine your location. Please select the city that matches your current location');
                                            showManualCitySelectionDlg(0,title,function(coords){
                                                user_location_live.lat = coords.lat;
                                                user_location_live.lng = coords.lng;
                                                $('#gps-ignore-btn').hide();
                                                finalize_init(); 
                                            });

                                        }
                                    }else{

                                        if(time_counter > 6){

                                            if(city_selection_dlg_shown)return;
                                            city_selection_dlg_shown = true;
                                            let title = __('We were unable to automatically determine your location. Please select the city that matches your current location');
                                            showManualCitySelectionDlg(0,title,function(coords){
                                                user_location_live.lat = coords.lat;
                                                user_location_live.lng = coords.lng;
                                                clearInterval(check_user_location_detected_timer);
                                                $('#gps-ignore-btn').hide();
                                                finalize_init(); 
                                            });
                                        }
                                    }
                                }
                            },500);

                            return;
                                        
                        }

                        $('#gps-ignore-btn').hide();
                        finalize_init();  

                    });

}


function finalize_init(){

    load_selected_city();    
    loadfavourites(); 
    build_recents_list(recent_locations_data);
    if(!app_start_animate)AnimateAtStart();                     
    app_fully_started = 1;
    
    if(push_notification_buffer){
        process_push_message(push_notification_buffer);
        push_notification_buffer = null;        
    }


    //notify user of required documents
    let user_doc_data = userprofileinfo.user_docs;
    if(user_doc_data){
        for(var key in user_doc_data){
            let doc_data = user_doc_data[key];
            if(doc_data.doc_city == '0' || doc_data.doc_city == selected_city_id){
                if(!doc_data.hasOwnProperty('u_doc_status') || doc_data.u_doc_status == null){
                  setTimeout(function(){
                    ons.notification.alert(__("You need to provide some important documents to keep your account active. Check your profile page for more details"),{title:""});
                  },3000);
                  break;
                }
                
            }

        }
    }



    animateDriversMarkers(); //start marker animation timer

}


function userEnableGPSNotify(){

    let res = new Promise(function(resolve,reject){

        let gps_enable_check_processing = 0;
        let gps_status_polling_timer_handle;
                
        cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){            
            if(enabled){                
                resolve({'success':1});
            }else{
                document.querySelector('#gpsenabedialog').show();                                
            }

        }, function(error){
            document.querySelector('#gpsenabedialog').show();
        })

        $('#gps-turnon-btn').off().on('click', function(){
                    
            _makeRequest();
            let counter = 0;
            clearInterval(gps_status_polling_timer_handle);
            gps_status_polling_timer_handle = setInterval(function(){
                counter++;
                if(gps_enable_check_processing)return;
                gps_enable_check_processing = 1;
                cordova.plugins.diagnostic.isGpsLocationEnabled(function(active){
                    if(active){
                        clearInterval(gps_status_polling_timer_handle);
                        document.querySelector('#gpsenabedialog').hide();
                        resolve({'success':1}); 
                        return;
                    }
                    gps_enable_check_processing = 0;                    
                },function(){
                    clearInterval(gps_status_polling_timer_handle);
                    document.querySelector('#gpsenabedialog').hide();
                    gps_enable_check_processing = 0;
                    resolve({'error':1});
                    return;
                });
            },500);
        });


        $('#gps-ignore-btn').off().on('click', function(){
            document.querySelector('#gpsenabedialog').hide();
            resolve({'error':1});
            return;
        });

        

    })
    return res; 
}



      
function profilepage_show(){
    document.querySelector('#myNavigator').pushPage('html/profile.html',
        {
        animation: 'fade'             
        }
    );

    document.querySelector('#mySplitter').left.close();

}

function bookingspage_show(){
    
    
    document.querySelector('#myNavigator').pushPage('html/bookings.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}

function bookingcancel(booking_id,driver_assigned,reason = ''){

    if(driver_assigned){

        ons.notification.confirm({
            message: __('A Driver has been assigned to this booking. Cancelling this booking might attract a penalty fee. Do you want to continue?'),
            // or messageHTML: '<div>Message in HTML</div>',
            title: __('Cancel Booking'),
            buttonLabels: [__('Yes'), __('No')],
            animation: 'default', // or 'none'
            primaryButtonIndex: 1,
            cancelable: true,
            callback: function(index) {
             
              if(!index){
                // 0-: Button index from the left
                cancelbooking(booking_id, driver_assigned, reason);
              }else{
                return;
                // -1: Cancel
              }
             
            }
          });

    }else{


        ons.notification.confirm({
            message: __('Booking will be cancelled. Do you want to continue?'),
            // or messageHTML: '<div>Message in HTML</div>',
            title: __('Cancel Booking'),
            buttonLabels: [__('Yes'), __('No')],
            animation: 'default', // or 'none'
            primaryButtonIndex: 1,
            cancelable: true,
            callback: function(index) {
             
              if(!index){
                // 0-: Button index from the left
                cancelbooking(booking_id,driver_assigned);
              }else{
                return;
                // -1: Cancel
              }
             
            }
          });



    }


}


function bookingretry(booking_id){

    if(!booking_id)return;

    loading.show();
    var post_data = {'action':'bookingretry','bookingid':booking_id};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'POST',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {          
            loading.hide();           
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                ons.notification.alert(data_obj.error,{title:""});
                return;
                

            }

            
            if(data_obj.hasOwnProperty('success')){
                //$('#driver-search').show();

                //delete push notifications registered for this booking previously so as to allow new notifications after retry
                if(processed_notifications.hasOwnProperty(booking_id)){
                    delete processed_notifications[booking_id];
                }
                
                showhidedriversearch(1);
                if(processed_notifications.hasOwnProperty(booking_id)){
                    processed_notifications[booking_id].forEach(function(val,indx){
                        if(val == 'app-message'){
                            processed_notifications[booking_id][indx] = '';
                        }
                    })
                }

                clearMapItemsSelectively();

                pick_up_data=[];
                drop_off_data=[];
                pick_up_data = {'address': '','lng':'','lat':''};
                drop_off_data = {'address': '','lng':'','lat':''};

                //reset multi destination mode
                multi_destination_mode = 0;        
                $('#location-type-icon-ds1').hide();
                $('#location-type-icon-ds2').hide();
                dest_location_type_selected = 0;
                destination_stop_inp1_shown = 0;
                destination_stop_inp2_shown = 0; 
                multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};
                

                $('#bookbutton').css('visibility','hidden');
                $('#bookbutton2').css('visibility','hidden');
                $('#pickup-addr-disp').hide();
                $('#dropoff-addr-disp').hide();
                $('#pac-input').val('');
                $('#pac-input2').val('');

                let top_page = document.querySelector('#myNavigator').topPage;
                
                if(top_page.id != "bookingpage"){
                    document.querySelector('#myNavigator').popPage({animation: 'fade'});
                }

                $('#mylocationbtn').css('visibility', 'hidden'); 
                
                reset_ui_elements_to_cancel_btn(); 
                
                
                driver_search_display_timer = setTimeout(function(){ //auto close the driver-search modal after a period of time.
                    //$('#driver-search').hide();
                    showhidedriversearch(0);
                    ons.notification.alert(__("It is taking time to locate a driver. Please be patient while we continue searching. You will be notified"),{'title':""});                                    
                },120000);
            }          
            
            
        },
        error: function() {
            loading.hide();        
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });

}


function cancelbooking(b_id,driver_assigned,reason){
    loading.show();
    var post_data = {'action':'bookingcancel','bookingid':b_id,'comment':reason};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'POST',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {          
            loading.hide();           
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                ons.notification.alert(data_obj.error,{title:""});
                return;
                

            }


            
            if(data_obj.hasOwnProperty('success')){
              $('#booking-list-item-' + b_id).fadeOut('slow');    
              clearInterval(wait_timer_handle); //stop timer that keeps track of wait time                         
              if(current_booking_data.status){
                  hideuielements();
              }
            }          
            
            
        },
        error: function() {
            loading.hide();        
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });



}


function notifydelete(n_id){
    loading.show();
    var post_data = {'action':'deletenotification','n_id':n_id};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'POST',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {          
            loading.hide();           
            console.log(data);
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.alert(__("Error communicating with server"),{title:""});
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                ons.notification.alert(data_obj.error,{title:""});
                return;
                

            }


            
            if(data_obj.hasOwnProperty('success')){
              $('#notification-list-item-' + n_id).fadeOut('slow');                             
              
            }          
            
            
        },
        error: function() {
            loading.hide();        
            ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });



}


function shownotifications(){

    document.querySelector('#myNavigator').pushPage('html/notifications.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();   


}

function showchatsupport(){
    document.querySelector('#myNavigator').pushPage('html/chatsupport.html',
            {
            animation: 'fade'             
            }
    );

    //document.querySelector('#mySplitter').left.close();
}


function show_adresses(type){

    if(current_booking_data.status)return;

    if(selected_state_id)return;

    if(trip_summary_dialog_show){
        $("#trip-summary-back-btn").css("visibility","hidden");
        $("#trip-summary-back-btn").css("z-index","10");
        $("#menubtn").css("visibility","visible");
        $("#menubtn").css("z-index","100");
        $('#ride-request-cancel-btn').css("z-index","10");
        $('#ride-request-cancel-btn').css("visibility","hidden");
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();
        trip_summary_dialog_show = 0;
        map.setPadding(0,0,0,0);
    }

    document.querySelector('#myNavigator').pushPage('html/addresses.html',
            {
            animation: 'fade'/* ,
            data:{location_type:type} */           
            }
    );

    

    document.querySelector('#mySplitter').left.close();


}


var list_items_string = "";
var address_autocomplete;
function address_input(){

    if(location_type_selected){
        if(multi_destination_mode){
            if(dest_location_type_selected == 0){
                var location_string = $("#address-input-ds1").val();
            }else if(dest_location_type_selected == 1){
                var location_string = $("#address-input-ds2").val();
            }else{
                var location_string = $("#address-input-d").val();
            }
            
        }else{
            var location_string = $("#address-input-d").val();
        }
    }else{
        var location_string = $("#address-input-p").val();
    }
    
    
    selected_city_lat = parseFloat(routetariffs.result[selected_city_id].cars[0].lat);
    selected_city_long = parseFloat(routetariffs.result[selected_city_id].cars[0].lng);

    var location_bias_lat = selected_city_lat;
    var location_bias_lng = selected_city_long;
    var location_bias_radius = selected_city_radius;
    
    if(location_string === ""){
        list_items_string = "";
        return;
    }
    
    if (address_autocomplete) {
        address_autocomplete.abort();
    }

    if(selected_city_route == "World"){
        if(user_location['lat']){
           location_bias_lat = user_location['lat']; 
           location_bias_lng = user_location['lng'];
           if(user_location_detected){
                location_bias_radius = 50000;
           }
        }
    }else{
        if(user_location['lat']){
            location_bias_lat = user_location['lat']; 
            location_bias_lng = user_location['lng'];            
         } 
    }
    
    $('#address-progressbar').css('visibility','visible');    
    address_autocomplete = $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getplacesautocomplete', 'place_hint':location_string, 'location_lat':location_bias_lat, 'location_lng':location_bias_lng, 'city_radius' : location_bias_radius, 'session' : googlemap_autocomplete_session },
        dataType: 'json',
        success: function(data){
            $('#address-progressbar').css('visibility','hidden');
            address_autocomplete = undefined;
            $('#locations-info-results').scrollTop();
            
            if(data.hasOwnProperty('places')){
                
                if(data.places.hasOwnProperty('suggestions')){
                    var predictions = data.places.suggestions;
                    if(predictions != null){
                        predictions.forEach(function(value){
                            var secondary_title = value.placePrediction.structuredFormat.secondaryText.text != null ? value.placePrediction.structuredFormat.secondaryText.text : "";
                            var place_id = value.placePrediction.placeId;
                            var place_name = value.placePrediction.text.text;
                            place_name = place_name.replace(/'/g, "&apos;");
                            place_name = place_name.replace(/"/g, "&quot;");
                            var main_text = value.placePrediction.structuredFormat.mainText.text;
                            main_text = main_text.replace(/'/g, "&apos;");
                            main_text = main_text.replace(/"/g, "&quot;");
                            var sec_text = secondary_title.replace(/"/g, "&quot;");
                            sec_text = sec_text.replace(/'/g, "&apos;");
                            var fav_icon = "<div class='right' data-maintext = '" + main_text + "' data-sectext = '" + sec_text + "' data-placeid = '" + place_id + "' data-placename = '" + place_name + "' data-added='" + 0 + "' onclick='faviconclick(event,$(this));'><ons-icon  icon='md-star-outline' size='28px' style='color: #eebd60;'></ons-icon></div>";
                            
                            favourite_places.forEach(function(item){
                                if(item.hasOwnProperty('place_name') && item.place_id === place_id){
                                    fav_icon = "<div class='right' data-maintext = '" + main_text + "' data-sectext = '" + sec_text + "' data-placeid = '" + place_id + "' data-placename = '" + place_name + "' data-added='" + 1 + "' onclick='faviconclick(event,$(this));'><ons-icon  icon='md-star' size='28px' style='color: #eebd60;'></ons-icon></div>";
                                }
                                 
                            });
                            let icon_color = "#ff5722";
                            if(!location_type_selected)icon_color = "#8bc34a";
                            list_items_string += "<ons-list-item data-place_id='"+ place_id + "' data-place_name='"+ place_name + `' onclick='geocode_place($(this))' tappable modifier='longdivider'><div class='left'><ons-icon icon='fa-map-marker' size='24px' style='color:${icon_color};'></ons-icon></div><div class='center'><span style='font-weight:bold;' class='list-item__title'>` + main_text + "</span><span class='list-item__subtitle'>" + sec_text + "</span></div>" + fav_icon + "</ons-list-item>";
                        })
            
                        var google_logo = "<ons-list-header modifier='longdivider'><img src='img/powered_by_google_on_white.png' style='height: 15px;' /></ons-list-header>";
                        $("#location-result").html(google_logo + list_items_string);
                        list_items_string = "";
                        
                    }


                }
                
            }  

        },
        error: function(){
            $('#address-progressbar').css('visibility','hidden');
            address_autocomplete = undefined;

        } 


    });

        
}


function locate_place(el){

    var place_lat = el.data('place_lat');
    var place_lng = el.data('place_lng');

    if(multi_destination_mode){
        if(location_type_selected){
            if(dest_location_type_selected == 0){
                //compute distance of this place with city area to check if its within range
                var center = {"lat": selected_city_lat, "lng": selected_city_long};
                var current_pos = {"lat": parseFloat(place_lat), "lng": parseFloat(place_lng)};
        
                var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                console.log(distance);
                if(distance > selected_city_radius){
                    loading_geocode = 0;
                    loading.hide();
                    ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used as a stop"),{title:""});
                    return;
                                        
                }
            
            
                multi_destinations['dest-1']['address'] = el.data('place_name');
                multi_destinations['dest-1']['lat'] = parseFloat(place_lat);
                multi_destinations['dest-1']['lng'] = parseFloat(place_lng);
                $("#address-input-ds1").val(multi_destinations['dest-1']['address']);

            }else if(dest_location_type_selected == 1){

                //compute distance of this place with city area to check if its within range
                var center = {"lat": selected_city_lat, "lng": selected_city_long};
                var current_pos = {"lat": parseFloat(place_lat), "lng": parseFloat(place_lng)};
        
                var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                console.log(distance);
                if(distance > selected_city_radius){
                    loading_geocode = 0;
                    loading.hide();
                    ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used as a stop"),{title:""});
                    return;
                                        
                }

                multi_destinations['dest-2']['address'] = el.data('place_name');
                multi_destinations['dest-2']['lat'] = parseFloat(place_lat);
                multi_destinations['dest-2']['lng'] = parseFloat(place_lng);
                $("#address-input-ds2").val(multi_destinations['dest-2']['address']);
                
            }else{
                //compute distance of this place with city area to check if its within range
                var center = {"lat": selected_city_lat, "lng": selected_city_long};
                var current_pos = {"lat": parseFloat(place_lat), "lng": parseFloat(place_lng)};
        
                var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                console.log(distance);
                if(distance > selected_city_radius){
                    loading_geocode = 0;
                    loading.hide();
                    ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used as a stop"),{title:""});
                    return;
                                        
                }
                multi_destinations['dropoff']['address'] = el.data('place_name');
                multi_destinations['dropoff']['lat'] = parseFloat(place_lat);
                multi_destinations['dropoff']['lng'] = parseFloat(place_lng);
                $("#address-input-d").val(multi_destinations['dropoff']['address']);
                
            }

            if(!multi_destinations['pickup']['address']){
                location_type_selected = 0; //swith to pickup location
                $("#address-input-p").focus();
            }
            
            return;
        }else{
            //compute distance of this place with city area to check if its within range
            var center = {"lat": selected_city_lat, "lng": selected_city_long};
            var current_pos = {"lat": parseFloat(place_lat), "lng": parseFloat(place_lng)};
    
            var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
            console.log(distance);
            if(distance > selected_city_radius){
                loading_geocode = 0;
                loading.hide();
                ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for pick-up"),{title:""});
                return;
                                    
            }

            multi_destinations['pickup']['address'] = el.data('place_name');
            multi_destinations['pickup']['lat'] = parseFloat(place_lat);
            multi_destinations['pickup']['lng'] = parseFloat(place_lng);
            $("#address-input-p").val(multi_destinations['pickup']['address']);
            return;
        }
    }else{
        if(location_type_selected){ //drop-off location data

            //compute distance of this place with city area to check if its within range
            var center = {"lat": selected_city_lat, "lng": selected_city_long};
            var current_pos = {"lat": parseFloat(place_lat), "lng": parseFloat(place_lng)};
    
            var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
            console.log(distance);
            if(distance > selected_city_radius){
                loading_geocode = 0;
                loading.hide();
                ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for drop-off"),{title:""});
                return;
                                      
            }
            
            drop_off_data.address = el.data('place_name');
            drop_off_data.lat = parseFloat(place_lat);
            drop_off_data.lng = parseFloat(place_lng);
    
       }else{
    
            //compute distance of this place with city area to check if its within range
            var center = {"lat": selected_city_lat, "lng": selected_city_long};
            var current_pos = {"lat": parseFloat(place_lat), "lng": parseFloat(place_lng)};
    
            var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
            console.log(distance);
            if(distance > selected_city_radius){
                loading_geocode = 0;
                loading.hide();
                ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for pick-up"),{title:""});
                return;
                
            }
            
            pick_up_data.address = el.data('place_name');
            pick_up_data.lat = parseFloat(place_lat);
            pick_up_data.lng = parseFloat(place_lng);
    
       }
        
    }


    //************************************************8 */
    
    

   //pop address page
    
   document.querySelector('#myNavigator').popPage(
        {
        animation: 'fade',   
        callback: function(){

                if(route_polyline){
                    route_polyline.setVisible(false);
                    toggleroutepathanimation(0);                  
                }

                if(route_distance_duration_info_marker){
                    route_distance_duration_info_marker.setVisible(false);
                }
                //fill up input and animate map
                if(location_type_selected){ //drop-off location
                    $('#pac-input2').val(drop_off_data.address);

                    if(typeof map === 'object'){
                        
                        if(marker2){
                            marker2.setVisible(true);
                            marker2.setDisableAutoPan(true);
                            marker2.setPosition({
                                lat:drop_off_data.lat,
                                lng: drop_off_data.lng
                                                                            
                            });

                            map.setClickable(false);
                            map.animateCamera({
                                target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
                                zoom: 18,
                                duration: 1000,
                                padding: 0  // default = 20px
                              }, function() {
                                  map.setClickable(true);
                                //alert("Camera target has been changed");

                            });

                            
                        }else{
                            
                            map.setClickable(false);
                            map.animateCamera({
                                target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
                                zoom: 18,
                                duration: 1000,
                                padding: 0  // default = 20px
                              }, function() {
                                  map.setClickable(true);
                                //alert("Camera target has been changed");

                            });

                            marker2 = map.addMarker({
                                            'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
                                            'icon' : 'img/drop-off-pin.png',
                                            animation: plugin.google.maps.Animation.DROP
                                        });

                            marker2.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                location_type_selected = 1;
                                dest_location_type_selected = 2;
                                show_adresses();
                            })

                            marker2.setDisableAutoPan(true);

                            marker2._isReady = true;
                        }

                        
                    }

                }else{
                    $('#pac-input').val(pick_up_data.address);
                    if(typeof map === 'object'){
                        
                        if(marker1){
                            marker1.setVisible(true);
                            marker1.setDisableAutoPan(true);
                            marker1.setPosition({
                                lat:pick_up_data.lat,
                                lng: pick_up_data.lng                                            
                            });

                            map.animateCamera({
                                target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
                                zoom: 18,
                                duration: 1000,
                                padding: 0  // default = 20px
                              }, function() {
                                //alert("Camera target has been changed");

                            });

                            
                        }else{

                            map.animateCamera({
                                target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
                                zoom: 18,
                                duration: 1000,
                                padding: 0  // default = 20px
                              }, function() {
                                //alert("Camera target has been changed");

                            });

                            marker1 = map.addMarker({
                                        'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
                                        'icon' : 'img/pick-up-pin.png',
                                        animation: plugin.google.maps.Animation.DROP
                                    });

                            marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                location_type_selected = 0;
                                show_adresses();
                            })
                            marker1.setDisableAutoPan(true);
                            marker1._isReady = true;
                        }

                        
                    }
                }

                if(marker1.isVisible(true) && marker2.isVisible(true)){ //process route details when user has entered both pickup and drop-off locations
                    
                    process_route_between_locations();
                    
                }

                
                
            }          
        }
    );
}

function myfavloc(type,mode){

    
    
    //get the users current location cordinates
    var fav_item_place_name = "";
    var fav_item_main_text = "";
    var fav_item_sec_text = "";
    var fav_item_place_id = "";
    var fav_item_lat = 0.00;
    var fav_item_lng = 0.00; 

    if(mode == 0){ //when pressed fav button on main map

       

        
        if(type == 1){
            fav_item_place_name = pick_up_data.address;
            fav_item_place_name = fav_item_place_name.replace(/"/g, "&quot;");
            fav_item_place_name = fav_item_place_name.replace(/'/g, "&apos;");

            fav_item_main_text = "Home";
            fav_item_sec_text = pick_up_data.address;
            fav_item_sec_text = fav_item_sec_text.replace(/"/g, "&quot;");
            fav_item_sec_text = fav_item_sec_text.replace(/'/g, "&apos;");


            fav_item_place_id = "100";
            fav_item_lat = pick_up_data.lat;
            fav_item_lng = pick_up_data.lng;

        }else if(type == 2){

            fav_item_place_name = pick_up_data.address;
            fav_item_place_name = fav_item_place_name.replace(/"/g, "&quot;");
            fav_item_place_name = fav_item_place_name.replace(/'/g, "&apos;");

            fav_item_main_text = "Work";
            fav_item_sec_text = pick_up_data.address;
            fav_item_sec_text = fav_item_sec_text.replace(/"/g, "&quot;");
            fav_item_sec_text = fav_item_sec_text.replace(/'/g, "&apos;");


            fav_item_place_id = "200";
            fav_item_lat = pick_up_data.lat;
            fav_item_lng = pick_up_data.lng;
            
        }else{

            fav_item_place_name = pick_up_data.address;
            fav_item_place_name = fav_item_place_name.replace(/"/g, "&quot;");
            fav_item_place_name = fav_item_place_name.replace(/'/g, "&apos;");

            fav_item_main_text = "Market";
            fav_item_sec_text = pick_up_data.address;
            fav_item_sec_text = fav_item_sec_text.replace(/"/g, "&quot;");
            fav_item_sec_text = fav_item_sec_text.replace(/'/g, "&apos;");


            fav_item_place_id = "300";
            fav_item_lat = pick_up_data.lat;
            fav_item_lng = pick_up_data.lng;
            
        }
    }else{ //when pressed fav button on location page

        

        if(type == 1){

            $("#myfav-home").removeClass("bounce animated").addClass("bounce animated").one('animationend', function(){
                $(this).removeClass("bounce animated");
            });


            fav_item_place_name = decoded_location_data.address;
            fav_item_place_name = fav_item_place_name.replace(/"/g, "&quot;");
            fav_item_place_name = fav_item_place_name.replace(/'/g, "&apos;");

            fav_item_main_text = "Home";
            fav_item_sec_text = decoded_location_data.address;
            fav_item_sec_text = fav_item_sec_text.replace(/"/g, "&quot;");
            fav_item_sec_text = fav_item_sec_text.replace(/'/g, "&apos;");


            fav_item_place_id = "100";
            fav_item_lat = decoded_location_data.lat;
            fav_item_lng = decoded_location_data.lng;

        }else if(type == 2){

            $("#myfav-work").removeClass("bounce animated").addClass("bounce animated").one('animationend', function(){
                $(this).removeClass("bounce animated");
            });

            fav_item_place_name = decoded_location_data.address;
            fav_item_place_name = fav_item_place_name.replace(/"/g, "&quot;");
            fav_item_place_name = fav_item_place_name.replace(/'/g, "&apos;");

            fav_item_main_text = "Work";
            fav_item_sec_text = decoded_location_data.address;
            fav_item_sec_text = fav_item_sec_text.replace(/"/g, "&quot;");
            fav_item_sec_text = fav_item_sec_text.replace(/'/g, "&apos;");


            fav_item_place_id = "200";
            fav_item_lat = decoded_location_data.lat;
            fav_item_lng = decoded_location_data.lng;
            
        }else{

            $("#myfav-market").removeClass("bounce animated").addClass("bounce animated").one('animationend', function(){
                $(this).removeClass("bounce animated");
            });

            fav_item_place_name = decoded_location_data.address;
            fav_item_place_name = fav_item_place_name.replace(/"/g, "&quot;");
            fav_item_place_name = fav_item_place_name.replace(/'/g, "&apos;");

            fav_item_main_text = "Market";
            fav_item_sec_text = decoded_location_data.address;
            fav_item_sec_text = fav_item_sec_text.replace(/"/g, "&quot;");
            fav_item_sec_text = fav_item_sec_text.replace(/'/g, "&apos;");


            fav_item_place_id = "300";
            fav_item_lat = decoded_location_data.lat;
            fav_item_lng = decoded_location_data.lng;
            
        }


    }
   
    
    var item_details = {place_name:fav_item_place_name,place_id:fav_item_place_id,main_text:fav_item_main_text,sec_text:fav_item_sec_text,place_lat:fav_item_lat,place_lng:fav_item_lng};

    //check if myfav location has already been stored and remove it
    favourite_places.forEach(function(item,index){
        if(item.hasOwnProperty('place_id') && item.place_id === fav_item_place_id){
            favourite_places.splice(index,1); //remove item
            
        }

        
    });


    //add this myfav location to the favourites list and store on local storage too
    favourite_places.push(item_details);
    localStorage.setObject('favourite_locations_'+selected_city_id,favourite_places);
    
    rebuild_fav_list();
    $("#fav-list").html(fav_list_items_string);




}


function faviconclick(event,el){
    event.stopPropagation();
    event.preventDefault();
    var clicked_item_place_name = el.data('placename');
    var clicked_item_place_id = el.data('placeid');
    var clicked_item_main_text = el.data('maintext');
    var clicked_item_sec_text = el.data('sectext');
    var clicked_item_lat = 0.00;
    var clicked_item_lng = 0.00;
    var item_details = {place_name:clicked_item_place_name,place_id:clicked_item_place_id,main_text:clicked_item_main_text,sec_text:clicked_item_sec_text,place_lat:clicked_item_lat,place_lng:clicked_item_lng};
    if(el.data('added') == 1){ //already in favourites. remove
        favourite_places.forEach(function(item,index){
            if(item.hasOwnProperty('place_name') && item.place_id === clicked_item_place_id){
                favourite_places.splice(index,1);
                el.attr('icon','md-star-outline');
                el.data('added',0);

                rebuild_fav_list();
                $("#fav-list").html(fav_list_items_string);

                /* ons.notification.toast("Location removed from favourites",{
                    timeout: 1000
                }); */

            }
        });
        localStorage.setObject('favourite_locations_'+selected_city_id,favourite_places);

    }else{ //not in favourites. add.
        el.attr('icon','md-star');
        el.data('added',1);
        favourite_places.push(item_details);
        localStorage.setObject('favourite_locations_'+selected_city_id,favourite_places);
        
        rebuild_fav_list();
        $("#fav-list").html(fav_list_items_string);
        /* ons.notification.toast("Location added to favourites",{
            timeout: 1000
        }); */
    }
    




}


function rebuild_fav_list(){
    
    fav_list_items_string = "";
    favourite_places.forEach(function(item,index){

        if(item.place_id == "100"){

            var del_fav_icon = "<div class='right' data-placeid = '" + item.place_id + "' onclick='favdelete(event,$(this));'><ons-icon icon='md-delete' size='28px' style='color:#f44336;'></ons-icon></div>";
            fav_list_items_string += "<ons-list-item class='fav-item' data-place_lat='"+ item.place_lat + "' data-place_lng='"+ item.place_lng + "' data-place_id='"+ item.place_id + "' data-place_name='"+ item.place_name + "' onclick='locate_place($(this))' tappable modifier='longdivider'><div class='left'><ons-icon icon='md-home' size='28px' style='color:#ccc;'></ons-icon></div><span class='list-item__title'>" + __(item.main_text) + "</span><span class='list-item__subtitle'>" + item.sec_text + "</span>" + del_fav_icon + "</ons-list-item>";

        }else if(item.place_id == "200"){

            var del_fav_icon = "<div class='right' data-placeid = '" + item.place_id + "' onclick='favdelete(event,$(this));'><ons-icon icon='md-delete' size='28px' style='color:#f44336;'></ons-icon></div>";
            fav_list_items_string += "<ons-list-item class='fav-item' data-place_lat='"+ item.place_lat + "' data-place_lng='"+ item.place_lng + "' data-place_id='"+ item.place_id + "' data-place_name='"+ item.place_name + "' onclick='locate_place($(this))' tappable modifier='longdivider'><div class='left'><ons-icon icon='md-case' size='28px' style='color:#ccc;'></ons-icon></div><span class='list-item__title'>" + __(item.main_text) + "</span><span class='list-item__subtitle'>" + item.sec_text + "</span>" + del_fav_icon + "</ons-list-item>";

        }else if(item.place_id == "300"){

            var del_fav_icon = "<div class='right' data-placeid = '" + item.place_id + "' onclick='favdelete(event,$(this));'><ons-icon icon='md-delete' size='28px' style='color:#f44336;'></ons-icon></div>";
            fav_list_items_string += "<ons-list-item class='fav-item' data-place_lat='"+ item.place_lat + "' data-place_lng='"+ item.place_lng + "' data-place_id='"+ item.place_id + "' data-place_name='"+ item.place_name + "' onclick='locate_place($(this))' tappable modifier='longdivider'><div class='left'><ons-icon icon='md-shopping-cart' size='28px' style='color:#ccc;'></ons-icon></div><span class='list-item__title'>" + __(item.main_text) + "</span><span class='list-item__subtitle'>" + item.sec_text + "</span>" + del_fav_icon + "</ons-list-item>";


        }else{

            var del_fav_icon = "<div class='right' data-placeid = '" + item.place_id + "' onclick='favdelete(event,$(this));'><ons-icon icon='md-delete' size='28px' style='color:#f44336;'></ons-icon></div>";
            fav_list_items_string += "<ons-list-item class='fav-item' data-place_lat='"+ item.place_lat + "' data-place_lng='"+ item.place_lng + "' data-place_id='"+ item.place_id + "' data-place_name='"+ item.place_name + "' onclick='geocode_place($(this))' tappable modifier='longdivider'><div class='left'><ons-icon icon='md-star' size='28px' style='color:#ccc;'></ons-icon></div><span class='list-item__title'>" + item.main_text + "</span><span class='list-item__subtitle'>" + item.sec_text + "</span>" + del_fav_icon + "</ons-list-item>";

        }
        
    });

    if(fav_list_items_string)fav_list_items_string = "<br><ons-list-header modifier='longdivider'>" + __("Favourite Places") + "</ons-list-header>" + fav_list_items_string;

}


function favdelete(event,el){
    event.stopPropagation();
    event.preventDefault();    

    var clicked_item_place_id = el.data('placeid');
    favourite_places.forEach(function(item,index){
        if(item.hasOwnProperty('place_name') && item.place_id == clicked_item_place_id){
            favourite_places.splice(index,1);

            el.parentsUntil(".fav-item").fadeOut("slow");
                        
        }

        
    });

    localStorage.setObject('favourite_locations_'+selected_city_id,favourite_places);

    rebuild_fav_list();
    $("#fav-list").html(fav_list_items_string);
    
    
}


function geocode_place(item){
    
    if(loading_geocode)return;
    loading.show();
    place_id = item.data('place_id');
    loading_geocode = 1;
    
    if(location_type_selected){ //drop-off address field selected
        //check if pick-up location data has already been entered and get the directions to drop-off location in this request
        if(pick_up_data.address != null){
            get_direction = 1;
            point_lat = pick_up_data.lat;
            point_long = pick_up_data.lng;
        }

    }else{

        if(drop_off_data.address != null){
            get_direction = 1;
            point_lat = drop_off_data.lat;
            point_long = drop_off_data.lng;
        }


    }
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'geocodeplace', 'place_id':place_id,'get_direction':get_direction,'point_lat':point_lat,'point_long':point_long,'selected_city_id':selected_city_id,'location_type':location_type_selected},
        dataType: 'json',
        success: function(data){
            loading.hide();            
            
            if(data.hasOwnProperty('place_details') && data.place_details.status === 'OK'){
               console.log(data.place_details);
               
               if(location_type_selected){ //drop-off location data
                    if(multi_destination_mode){
                        if(dest_location_type_selected == 0){
                            //compute distance of this place with city area to check if its within range
                            var center = {"lat": selected_city_lat, "lng": selected_city_long};
                            var current_pos = {"lat": parseFloat(data.place_details.results['0'].geometry.location.lat), "lng": parseFloat(data.place_details.results['0'].geometry.location.lng)};

                            var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                            console.log(distance);
                            if(distance > selected_city_radius){
                                loading_geocode = 0;
                                loading.hide();
                                ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used as a stop"),{title:""});
                                return;
                                                    
                            }
                            
                            multi_destinations['dest-1']['address'] = item.data('place_name');
                            multi_destinations['dest-1']['lat'] = parseFloat(data.place_details.results['0'].geometry.location.lat);
                            multi_destinations['dest-1']['lng'] = parseFloat(data.place_details.results['0'].geometry.location.lng);
                        }else if(dest_location_type_selected == 1){
                            //compute distance of this place with city area to check if its within range
                            var center = {"lat": selected_city_lat, "lng": selected_city_long};
                            var current_pos = {"lat": parseFloat(data.place_details.results['0'].geometry.location.lat), "lng": parseFloat(data.place_details.results['0'].geometry.location.lng)};

                            var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                            console.log(distance);
                            if(distance > selected_city_radius){
                                loading_geocode = 0;
                                loading.hide();
                                ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used as a stop"),{title:""});
                                return;
                                                    
                            }
                            
                            multi_destinations['dest-2']['address'] = item.data('place_name');
                            multi_destinations['dest-2']['lat'] = parseFloat(data.place_details.results['0'].geometry.location.lat);
                            multi_destinations['dest-2']['lng'] = parseFloat(data.place_details.results['0'].geometry.location.lng);
                        }else{
                            //compute distance of this place with city area to check if its within range
                            var center = {"lat": selected_city_lat, "lng": selected_city_long};
                            var current_pos = {"lat": parseFloat(data.place_details.results['0'].geometry.location.lat), "lng": parseFloat(data.place_details.results['0'].geometry.location.lng)};

                            var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                            console.log(distance);
                            if(distance > selected_city_radius){
                                loading_geocode = 0;
                                loading.hide();
                                ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for drop-off"),{title:""});
                                return;
                                                    
                            }
                            
                            multi_destinations['dropoff']['address'] = item.data('place_name');
                            multi_destinations['dropoff']['lat'] = parseFloat(data.place_details.results['0'].geometry.location.lat);
                            multi_destinations['dropoff']['lng'] = parseFloat(data.place_details.results['0'].geometry.location.lng);

                            if(!drop_off_data.address){

                            }
                        }

                    }else{
                        //compute distance of this place with city area to check if its within range
                        var center = {"lat": selected_city_lat, "lng": selected_city_long};
                        var current_pos = {"lat": parseFloat(data.place_details.results['0'].geometry.location.lat), "lng": parseFloat(data.place_details.results['0'].geometry.location.lng)};

                        var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                        console.log(distance);
                        if(distance > selected_city_radius){
                            loading_geocode = 0;
                            loading.hide();
                            ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for drop-off"),{title:""});
                            return;
                                                
                        }
                        
                        drop_off_data.address = item.data('place_name');
                        drop_off_data.lat = parseFloat(data.place_details.results['0'].geometry.location.lat);
                        drop_off_data.lng = parseFloat(data.place_details.results['0'].geometry.location.lng);
                    }                    

               }else{

                    if(multi_destination_mode){
                        var center = {"lat": selected_city_lat, "lng": selected_city_long};
                        var current_pos = {"lat": parseFloat(data.place_details.results['0'].geometry.location.lat), "lng": parseFloat(data.place_details.results['0'].geometry.location.lng)};

                        var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                        console.log(distance);
                        if(distance > selected_city_radius){
                            loading_geocode = 0;
                            loading.hide();
                            ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for pick-up"),{title:""});
                            return;
                            
                        }
                        
                        multi_destinations['pickup']['address'] = item.data('place_name');
                        multi_destinations['pickup']['lat'] = parseFloat(data.place_details.results['0'].geometry.location.lat);
                        multi_destinations['pickup']['lng'] = parseFloat(data.place_details.results['0'].geometry.location.lng);

                    }else{
                        //compute distance of this place with city area to check if its within range
                        var center = {"lat": selected_city_lat, "lng": selected_city_long};
                        var current_pos = {"lat": parseFloat(data.place_details.results['0'].geometry.location.lat), "lng": parseFloat(data.place_details.results['0'].geometry.location.lng)};

                        var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
                        console.log(distance);
                        if(distance > selected_city_radius){
                            loading_geocode = 0;
                            loading.hide();
                            ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for pick-up"),{title:""});
                            return;
                            
                        }
                        
                        pick_up_data.address = item.data('place_name');
                        pick_up_data.lat = parseFloat(data.place_details.results['0'].geometry.location.lat);
                        pick_up_data.lng = parseFloat(data.place_details.results['0'].geometry.location.lng);
                    }

                    

               }

               if(multi_destination_mode){
                   if(location_type_selected){
                        if(dest_location_type_selected == 0){
                            $("#address-input-ds1").val(multi_destinations['dest-1']['address']);
                            loading_geocode = 0;
                        }else if(dest_location_type_selected == 1){
                            $("#address-input-ds2").val(multi_destinations['dest-2']['address']);
                            loading_geocode = 0;
                        }else{
                            $('#pac-input2').val(drop_off_data.address);
                            $("#address-input-d").val(multi_destinations['dropoff']['address']);
                            loading_geocode = 0;
                        }
                        if(!pick_up_data.address){
                            location_type_selected = 0; //swith to pickup location
                            $("#address-input-p").focus();                        
                        }
                        loading.hide();
                        return;
                    }else{
                        $("#address-input-p").val(multi_destinations['pickup']['address']);                        
                    }
               }else{

                    if(location_type_selected){
                        if(drop_off_data.address && !pick_up_data.address){ //only dropoff address has been entered. send focus to pickup address so user can fill that too
                            
                            $('#pac-input2').val(drop_off_data.address);
                            $("#address-input-d").val(drop_off_data.address);
                            loading_geocode = 0;
                            if(marker2){
                                marker2.setVisible(true);
                                marker2.setDisableAutoPan(true);
                                marker2.setPosition({
                                    lat:drop_off_data.lat,
                                    lng: drop_off_data.lng
                                                                                
                                });

                                
                                
                            }else{
                                
                                
                                marker2 = map.addMarker({
                                                'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
                                                'icon' : 'img/drop-off-pin.png',
                                                animation: plugin.google.maps.Animation.DROP
                                            });

                                marker2.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                    location_type_selected = 1;
                                    dest_location_type_selected = 2;
                                    show_adresses();
                                })

                                marker2.setDisableAutoPan(true);
                                marker2._isReady = true;
                                
                            }

                            location_type_selected = 0; //swith to pickup location
                            $("#address-input-p").focus();
                            loading.hide();
                            return;
                        }
                    }else{
                        if(!drop_off_data.address && pick_up_data.address){ //only dropoff address has been entered. send focus to pickup address so user can fill that too
                            
                            $('#pac-input1').val(pick_up_data.address);
                            $("#address-input-p").val(pick_up_data.address);
                            loading_geocode = 0;
                            if(marker1){
                                marker1.setVisible(true);
                                marker1.setDisableAutoPan(true);
                                marker1.setPosition({
                                    lat:pick_up_data.lat,
                                    lng: pick_up_data.lng
                                                                                
                                });

                                
                                
                            }else{
                                
                                
                                marker1 = map.addMarker({ 
                                                'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
                                                'icon' : 'img/pick-up-pin.png',
                                                animation: plugin.google.maps.Animation.DROP
                                            });

                                marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                    location_type_selected = 0;
                                    show_adresses();
                                })

                                marker1.setDisableAutoPan(true);  
                                marker1._isReady = true;
                                
                            }

                            loading.hide();

                            if(service_mode != 1){ //run this code block if not quick ride mode
                                location_type_selected = 1; //swith to destination
                                $("#address-input-d").focus();                            
                                return;
                            }
                        }
                    }

                    
                }

               //pop address page
               disable_nbk_dlg_auto_show_on_home = 1;
               document.querySelector('#myNavigator').popPage(
                    {
                    animation: 'fade',   
                    callback: function(){

                            if(route_polyline){
                                route_polyline.setVisible(false);
                                toggleroutepathanimation(0);                  
                            }
                            if(route_distance_duration_info_marker){
                                route_distance_duration_info_marker.setVisible(false);
                            }
                            //fill up input and animate map
                            if(location_type_selected){ //drop-off location
                                $('#pac-input2').val(drop_off_data.address);

                                if(typeof map === 'object'){
                                    
                                    if(marker2){
                                        marker2.setVisible(true);
                                        marker2.setDisableAutoPan(true);
                                        marker2.setPosition({
                                            lat:drop_off_data.lat,
                                            lng: drop_off_data.lng
                                                                                        
                                        });

                                        map.setClickable(false);
                                        map.animateCamera({
                                            target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
                                            zoom: 18,
                                            duration: 1000,
                                            padding: 0  // default = 20px
                                          }, function() {
                                              map.setClickable(true);
                                            //alert("Camera target has been changed");
    
                                        });

                                        
                                    }else{
                                        
                                        map.setClickable(false);
                                        map.animateCamera({
                                            target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
                                            zoom: 18,
                                            duration: 1000,
                                            padding: 0  // default = 20px
                                          }, function() {
                                              map.setClickable(true);
                                            //alert("Camera target has been changed");
    
                                        });

                                        marker2 = map.addMarker({
                                                        'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
                                                        'icon' : 'img/drop-off-pin.png',
                                                        animation: plugin.google.maps.Animation.DROP
                                                    });

                                        marker2.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                            location_type_selected = 1;
                                            dest_location_type_selected = 2;
                                            show_adresses();
                                        })

                                        marker2.setDisableAutoPan(true);

                                        marker2._isReady = true;
                                    }

                                    
                                }

                            }else{
                                $('#pac-input').val(pick_up_data.address);
                                if(typeof map === 'object'){
                                    
                                    if(marker1){
                                        marker1.setVisible(true);
                                        marker1.setDisableAutoPan(true);

                                        marker1.setPosition({
                                            lat:pick_up_data.lat,
                                            lng: pick_up_data.lng                                            
                                        });

                                        map.animateCamera({
                                            target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
                                            zoom: 18,
                                            duration: 1000,
                                            padding: 0  // default = 20px
                                          }, function() {
                                            //alert("Camera target has been changed");
    
                                        });

                                        
                                    }else{

                                        map.animateCamera({
                                            target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
                                            zoom: 18,
                                            duration: 1000,
                                            padding: 0  // default = 20px
                                          }, function() {
                                            //alert("Camera target has been changed");
    
                                        });

                                        marker1 = map.addMarker({
                                                    'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
                                                    'icon' : 'img/pick-up-pin.png',
                                                    animation: plugin.google.maps.Animation.DROP
                                                });

                                        marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                            location_type_selected = 0;
                                            show_adresses();
                                        })

                                        marker1.setDisableAutoPan(true);

                                        marker1._isReady = true;
                                    }

                                    
                                }
                            }

                            if(marker1.isVisible(true) && marker2.isVisible(true)){ //process route details when user has entered both pickup and drop-off locations
                                
                                setTimeout(process_booking_route(data.directions),500);
                                //process_booking_route(data.directions);
                                
                            }else if(service_mode == 1 && marker1.isVisible()){ 
                                $('#pickup-addr-disp-text').html(pick_up_data.address);                       
                                shownewbookingdialog();
                            }

                            
                            
                        }          
                    }
                );
            
                loading_geocode = 0;
                loading.hide();
               return             
                
            }

            loading_geocode = 0;

            if(data.hasOwnProperty('error')){
                ons.notification.alert(data.error,{title:""});
                return;             
                 
             }
            
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 2000
              });
            return;

        },
        error: function(){
            loading_geocode = 0;
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 2000
              });
            return;
            
        } 


    });
}

function recent_destination_list_click(item){
        if(multi_destination_mode){
            if(location_type_selected){
                if(dest_location_type_selected == 0){
                    multi_destinations['dest-1']['address'] = item.data('address');
                    multi_destinations['dest-1']['lat'] = item.data('lat');
                    multi_destinations['dest-1']['lng'] = item.data('lng');
                    $("#address-input-ds1").val(multi_destinations['dest-1']['address']);
                }else if(dest_location_type_selected == 1){
                    multi_destinations['dest-2']['address'] = item.data('address');
                    multi_destinations['dest-2']['lat'] = item.data('lat');
                    multi_destinations['dest-2']['lng'] = item.data('lng');
                    $("#address-input-ds2").val(multi_destinations['dest-2']['address']);
                    
                }else{
                    multi_destinations['dropoff']['address'] = item.data('address');
                    multi_destinations['dropoff']['lat'] = item.data('lat');
                    multi_destinations['dropoff']['lng'] = item.data('lng');
                    $("#address-input-d").val(multi_destinations['dropoff']['address']);
                    
                }

                if(!multi_destinations['pickup']['address']){
                    location_type_selected = 0; //swith to pickup location
                    $("#address-input-p").focus();
                }
                
                return;
            }else{
                multi_destinations['pickup']['address'] = item.data('address');
                multi_destinations['pickup']['lat'] = item.data('lat');
                multi_destinations['pickup']['lng'] = item.data('lng');
                $("#address-input-p").val(multi_destinations['pickup']['address']);
                return;
            }
        }else{
            if(location_type_selected){
                drop_off_data.address = item.data('address');
                drop_off_data.lat = item.data('lat');
                drop_off_data.lng = item.data('lng');
                $("#address-input-d").val(drop_off_data.address);
            }else{
                pick_up_data.address = item.data('address');
                pick_up_data.lat = item.data('lat');
                pick_up_data.lng = item.data('lng');
                $("#address-input-p").val(pick_up_data.address);
            }
            
        }
    
    document.querySelector('#myNavigator').popPage(
        {
            animation: 'fade',   
            callback: function(){
                if(route_polyline){
                    route_polyline.setVisible(false);
                    toggleroutepathanimation(0);                   
                }
                if(route_distance_duration_info_marker){
                    route_distance_duration_info_marker.setVisible(false);
                }
                //fill up input and animate map
                $('#pac-input2').val(drop_off_data.address);
            
                if(typeof map === 'object'){
                    
                    if(location_type_selected){
                    
                        if(marker2){
                            marker2.setVisible(true);
                            marker2.setDisableAutoPan(true);
                
                            marker2.setPosition({
                                lat:drop_off_data.lat,
                                lng: drop_off_data.lng
                                                                            
                            });
                
                            map.setClickable(false);
                            map.animateCamera({
                                target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
                                zoom: 18,
                                duration: 1000,
                                padding: 0  // default = 20px
                                }, function() {
                                    map.setClickable(true);
                                //alert("Camera target has been changed");
                
                            });
                
                            
                        }else{
                            
                            map.setClickable(false);
                            map.animateCamera({
                                target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
                                zoom: 18,
                                duration: 1000,
                                padding: 0  // default = 20px
                                }, function() {
                                    map.setClickable(true);
                                //alert("Camera target has been changed");
                
                            });
                
                            marker2 = map.addMarker({
                                            'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
                                            'icon' : 'img/drop-off-pin.png',
                                            animation: plugin.google.maps.Animation.DROP
                                        });
                
                            marker2.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                location_type_selected = 1;
                                dest_location_type_selected = 2;
                                show_adresses();
                            })
                
                            marker2.setDisableAutoPan(true);
                
                            marker2._isReady = true;
                        }
                    }else{
                    
                        if(marker1){
                            marker1.setVisible(true);
                            marker1.setDisableAutoPan(true);
                
                            marker1.setPosition({
                                lat:pick_up_data.lat,
                                lng: pick_up_data.lng
                                                                            
                            });
                
                            map.setClickable(false);
                            map.animateCamera({
                                target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
                                zoom: 18,
                                duration: 1000,
                                padding: 0  // default = 20px
                                }, function() {
                                    map.setClickable(true);
                                //alert("Camera target has been changed");
                
                            });
                
                            
                        }else{
                            
                            map.setClickable(false);
                            map.animateCamera({
                                target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
                                zoom: 18,
                                duration: 1000,
                                padding: 0  // default = 20px
                                }, function() {
                                    map.setClickable(true);
                                //alert("Camera target has been changed");
                
                            });
                
                            marker1 = map.addMarker({
                                            'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
                                            'icon' : 'img/pick-up-pin.png',
                                            animation: plugin.google.maps.Animation.DROP
                                        },function(){
                                            marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                                                location_type_selected = 0;
                                                show_adresses();
                                            })
                                
                                            marker1.setDisableAutoPan(true);
                                
                                            marker1._isReady = true;
                                        });
                
                            
                        }
                    }


            
                    
                }
            
                if(marker1.isVisible(true) && marker2.isVisible(true)){ //process route details when user has entered both pickup and drop-off locations
                    setTimeout(process_route_between_locations(),500);
                    //process_booking_route(data.directions);        
                }else{
                    if(!marker1){
                        setTimeout(function(){
                            location_type_selected = 0;
                            show_adresses();
                        },500); 
                    }else{
                        setTimeout(function(){
                            location_type_selected = 1;
                            show_adresses();
                        },500);
                    }
                           
                }
            }
        }
    )
}


function recent_destination_click(item){

    drop_off_data.address = item.data('address');
    drop_off_data.lat = item.data('lat');
    drop_off_data.lng = item.data('lng');

    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();
    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0;
    multi_destinations['dest-1']['address'] = '';
    multi_destinations['dest-1']['lat'] = '';
    multi_destinations['dest-1']['lng'] = '';
    multi_destinations['dest-2']['address'] = '';
    multi_destinations['dest-2']['lat'] = '';
    multi_destinations['dest-2']['lng'] = '';

    if(markerds1){
        markerds1.setVisible(false);
    }

    if(markerds2){
        markerds2.setVisible(false); 
        
    }

    
    if(route_polyline){
        route_polyline.setVisible();
        toggleroutepathanimation(0);
                            
    }
    if(route_distance_duration_info_marker){
        route_distance_duration_info_marker.setVisible();
        
    }
    //fill up input and animate map
    $('#pac-input2').val(drop_off_data.address);

    if(typeof map === 'object'){
        
        if(marker2){
            marker2.setVisible(true);
            marker2.setDisableAutoPan(true);

            marker2.setPosition({
                lat:drop_off_data.lat,
                lng: drop_off_data.lng
                                                            
            });

            map.setClickable(false);
            map.animateCamera({
                target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
                zoom: 18,
                duration: 1000,
                padding: 0  // default = 20px
                }, function() {
                    map.setClickable(true);
                //alert("Camera target has been changed");

            });

            
        }else{
            
            map.setClickable(false);
            map.animateCamera({
                target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
                zoom: 18,
                duration: 1000,
                padding: 0  // default = 20px
                }, function() {
                    map.setClickable(true);
                //alert("Camera target has been changed");

            });

            marker2 = map.addMarker({
                            'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
                            'icon' : 'img/drop-off-pin.png',
                            animation: plugin.google.maps.Animation.DROP
                        });

            marker2.on(plugin.google.maps.event.MARKER_CLICK, function(){
                location_type_selected = 1;
                dest_location_type_selected = 2;
                show_adresses();
            })

            marker2.setDisableAutoPan(true);

            marker2._isReady = true;
        }

        
    }

    if(marker1.isVisible(true) && marker2.isVisible(true)){ //process route details when user has entered both pickup and drop-off locations
        setTimeout(process_route_between_locations(),500);
        //process_booking_route(data.directions);        
    }else{
        setTimeout(function(){
            location_type_selected = 0;
            show_adresses();
        },500);        
    }
}


function process_booking_route(directions){

    if(directions != null && directions.status === 'OK'){
        map.setClickable(false);

        intra_city_duration = Math.ceil(parseInt(directions.routes[0].duration) / 60);
        intra_city_distance = parseInt(directions.routes[0].distanceMeters) / 1000; //default value in metric

        intra_city_duration_text = directions.routes[0].duration;
        intra_city_distance_text = directions.routes[0].distanceMeters + "m";
        

        toggleroutepathanimation(0);

        route_points = [];
        route_points = plugin.google.maps.geometry.encoding.decodePath(directions.routes["0"].polyline.encodedPolyline);

        map.setPadding(0,0,getMapBottomPadding(),0);

        //plot route
        if(route_polyline){
            route_polyline.setVisible(false);
            route_polyline.setPoints(route_points);
            route_polyline.setVisible(true);  

            
            toggleroutepathanimation(1);

            
            
            map.animateCamera({
            target: route_points,
            duration: 1000,
            }, function() {
                //alert("Camera target has been changed");
                map.setClickable(true);

                if(route_distance_duration_info_marker){
                    route_distance_duration_info_marker.setVisible(false);
                }

                
                

                /* $("#drop-box-container").removeClass("address-box-d-sel");
                $("#pick-box-container").removeClass("address-box-p-sel");  

                $('#pick-box').css('border','2px solid #999');
                $('#drop-box').css('border','2px solid #999'); */

                

                shownewbookingdialog();
                

            });
            
        }else{

            route_polyline = map.addPolyline({ 
                "points": route_points,
                'color' : '#000000',
                'width': 3,
                'geodesic': true,
                'clickable': true
            });
            
            route_polyline.setVisible(true);

            
            toggleroutepathanimation(1);


            route_polyline.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                  
                map.animateCamera({
                    target: route_points,
                    duration: 1000
                    }, function() {
                    //alert("Camera target has been changed");
                    map.setClickable(true);

                    

                });
            });


            map.setPadding(0,0,getMapBottomPadding(),0);

            
            map.animateCamera({
                target: route_points,
                duration: 1000,
                padding: 100
                }, function() {
                    //alert("Camera target has been changed");
                    map.setClickable(true);

                    if(route_distance_duration_info_marker){
                        route_distance_duration_info_marker.setVisible(false);
                    }

                    

                    

                    /* $("#drop-box-container").removeClass("address-box-d-sel");
                    $("#pick-box-container").removeClass("address-box-p-sel");  

                    $('#pick-box').css('border','2px solid #999');
                    $('#drop-box').css('border','2px solid #999'); */

                    shownewbookingdialog();
                    
                    
            });

        }

        

        $('#bookbutton').css('visibility','visible');                                
        $("#bookbutton").removeClass("heartBeat animated").addClass("heartBeat animated").one('animationend', function(){
            $(this).removeClass("heartBeat animated");
        });
        $('#pickup-addr-disp-text').html(pick_up_data.address);        
        $('#dropoff-addr-disp-text').html(drop_off_data.address);

        //format duration and distance data

        let trip_duration_secs = Math.ceil(intra_city_duration * 60);
    
        let _hours = Math.floor(trip_duration_secs / 3600);
        let _minutes = Math.floor((trip_duration_secs % 3600) / 60);

        let trip_duration_text = '';

        if(_hours){
            trip_duration_text += _hours + 'Hr ';
        }

        if(_minutes){
            trip_duration_text += _minutes + ' min ';
        }else{
            trip_duration_text += '0' + ' min ';
        }

        $('#ride-stats-time').text(trip_duration_text); 

        if(routetariffs.result[userprofileinfo.route_id].cars[0].dist_unit == 0){ //kilometer
            $('#ride-stats-dist').text(intra_city_distance.toFixed(2) + ' ' +  'km');
        }else{//miles
            let trip_distance_meters = intra_city_distance * 1000;
            let trip_req_distance_miles = trip_distance_meters / 1609.344; //convert to mi
            $('#ride-stats-dist').text(trip_req_distance_miles + ' ' + 'mi');
        }

        $('#pickup-addr-disp').show();
        $('#dropoff-addr-disp').show();
        trackPickupElPos();
        trackDropoffElPos();
    }
}







function process_interstate_booking_route(){
        loading.show();
        $.ajax({ 
            url: ajaxurl, 
            method: 'GET',
            timeout : 10000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: { 'action_get' : 'getdirections','p-lat':pick_up_data.lat,'p-lng':pick_up_data.lng,'d-lat':drop_off_data.lat,'d-lng':drop_off_data.lng},
            dataType: 'json',
            success: function(data){
                            
                loading.hide();

                if(data.hasOwnProperty('direction_details') && data.direction_details.status === 'OK'){

                    map2.setClickable(false);

                    intra_city_duration = Math.ceil(parseInt(data.direction_details.routes[0].duration) / 60);
                    intra_city_distance = parseInt(data.direction_details.routes[0].distanceMeters) / 1000; //default value in metric

                    intra_city_duration_text = data.direction_details.routes[0].duration;
                    intra_city_distance_text = data.direction_details.routes[0].distanceMeters + "m";

                    route_points_interstate = [];
                    route_points_interstate = plugin.google.maps.geometry.encoding.decodePath(data.direction_details.routes["0"].polyline.encodedPolyline);

                    map.setPadding(0,0,getMapBottomPadding(),0);

                    //plot route
                    if(route_polyline_interstate != null){
                        route_polyline_interstate.setVisible(false);
                        route_polyline_interstate.setPoints(route_points_interstate);
                        route_polyline_interstate.setVisible(true);  

                        
                        map2.animateCamera({
                        target: route_points_interstate,
                        duration: 1000,
                        }, function() {
                            //alert("Camera target has been changed");
                            map2.setClickable(true);
                        });
                        
                    }else{

                        route_polyline_interstate = map2.addPolyline({
                            "points": route_points_interstate,
                            'color' : '#000000',
                            'width': 3,
                            'geodesic': true,
                            'clickable': true
                        });
                        
                        route_polyline_interstate.setVisible(true);
                        route_polyline_interstate.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                            
                            map2.animateCamera({
                                target: route_points_interstate,
                                duration: 1000,
                                }, function() {
                                //alert("Camera target has been changed");
                                map2.setClickable(true);
                            });
                        });

                        map2.animateCamera({
                            target: route_points_interstate,
                            duration: 1000,
                            }, function() {
                                //alert("Camera target has been changed");
                                map2.setClickable(true);
                        });

                    }

                    shownewbookingdialog();

                    //$('#bookbutton2').css('visibility','visible');                                
                    /* $("#bookbutton2").removeClass("heartBeat animated").addClass("heartBeat animated").one('animationend', function(){
                        $(this).removeClass("heartBeat animated");
                    });  */            
                                      
                    
                    
                    return             
                    
                }
        
                
                if(data.hasOwnProperty('error')){
                    ons.notification.confirm({
                        message: data.error,
                        // or messageHTML: '<div>Message in HTML</div>',
                        title: '',
                        buttonLabels: ['Cancel', 'Retry'],
                        animation: 'default', // or 'none'
                        primaryButtonIndex: 0,
                        cancelable: false,
                        callback: function(index) {
                            
                            if(!index){
                            // 0-: Button index from the left
                            return;
                            
                            }else{
                            process_interstate_booking_route();
                            // -1: Cancel
                            }
                            
                        }
                        });
                    return;             
                    
                }
                
                ons.notification.confirm({
                    message: __("Error communicating with server"),
                    // or messageHTML: '<div>Message in HTML</div>',
                    title: '',
                    buttonLabels: ['Cancel', 'Retry'],
                    animation: 'default', // or 'none'
                    primaryButtonIndex: 0,
                    cancelable: false,
                    callback: function(index) {
                        
                        if(!index){
                        // 0-: Button index from the left
                        return;
                        
                        }else{
                        process_interstate_booking_route();
                        // -1: Cancel
                        }
                        
                    }
                    });
                return;
        
            },
            error: function(){
                
                loading.hide();
                ons.notification.confirm({
                    message: __("Error communicating with server"),
                    // or messageHTML: '<div>Message in HTML</div>',
                    title: '',
                    buttonLabels: [__('Cancel'), __('Retry')],
                    animation: 'default', // or 'none'
                    primaryButtonIndex: 0,
                    cancelable: false,
                    callback: function(index) {
                        
                        if(!index){
                        // 0-: Button index from the left
                        return;
                        
                        }else{
                        process_interstate_booking_route();
                        // -1: Cancel
                        }
                        
                    }
                    });
                return;
                
            } 
        
        
        });

    
}



function toggleroutepathanimation(state){
    if(!state){
        clearInterval(routeanimationtimer);
        routepointindex = 0;
        if(route_polyline_animatable){
            route_polyline_animatable.setVisible(false);
        }
        return;

    }

    var route_coords = [];
    var route_polyline_animation_dir = 0;
    routeanimationtimer = setInterval(function(){
        if(route_points == null){
            return;
        }
        
        if(!route_polyline_animation_dir){        
            if(routepointindex > route_points.length - 1){
                route_polyline_animation_dir = 1;
                routepointindex = 0; 
                return;

            }
            route_coords.push(route_points[routepointindex]);
            routepointindex++;
        }else{
            
            route_coords.splice(0,1);

            if(!route_coords.length){
                route_polyline_animation_dir = 0;
                routepointindex = 0;
                return;
            }
            
        }
        

        //route_coords.push(route_points[routepointindex - 1]);

        //route_coords.push(route_points[0]);
        

        if(route_polyline_animatable == null){
            route_polyline_animatable = map.addPolyline({
                "points": route_coords,
                'color' : '#2196f3',
                'width': 3,
                'geodesic': true,
                'clickable': false
            });
        }
        
        route_polyline_animatable.setPoints(route_coords);
            
        
        route_polyline_animatable.setVisible(true);

    },30)
}

function process_multidestinations(){
    if(!multi_destinations['pickup']['address']){
        ons.notification.alert(__("Please enter a pickup location"),{title:""});
        return;
    }

    document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){
        
    }});

    if(!multi_destinations['dest-1']['address'] && !multi_destinations['dest-2']['address']){        

        if(multi_destinations['dropoff']['address']){            
            multi_destination_mode = 0;        
            $('#location-type-icon-ds1').hide();
            $('#location-type-icon-ds2').hide();
            dest_location_type_selected = 0;
            destination_stop_inp1_shown = 0;
            destination_stop_inp2_shown = 0; 
            
            pick_up_data.address = multi_destinations['pickup']['address'];
            pick_up_data.lat = multi_destinations['pickup']['lat'];
            pick_up_data.lng = multi_destinations['pickup']['lng'];

            drop_off_data.address = multi_destinations['dropoff']['address'];
            drop_off_data.lat = multi_destinations['dropoff']['lat'];
            drop_off_data.lng = multi_destinations['dropoff']['lng'];

            $('#pac-input2').val(drop_off_data.address);

            if(markerds1){
                markerds1.setVisible(false);
            }
      
            if(markerds2){
                markerds2.setVisible(false);
            }

            setTimeout(process_route_between_locations(),500);

                        
            return;

        }else{
            ons.notification.alert(__("Please enter your destination"),{title:""});
            return;
        }
        

    }else if(!multi_destinations['dropoff']['address'] && multi_destinations['dest-1']['address'] && !multi_destinations['dest-2']['address']){

        pick_up_data.address = multi_destinations['pickup']['address'];
        pick_up_data.lat = multi_destinations['pickup']['lat'];
        pick_up_data.lng = multi_destinations['pickup']['lng'];
        
        drop_off_data.address = multi_destinations['dest-1']['address'];
        drop_off_data.lat = multi_destinations['dest-1']['lat'];
        drop_off_data.lng = multi_destinations['dest-1']['lng'];

        $('#pac-input2').val(drop_off_data.address);

        if(marker2){
            marker2.setVisible(true);
            marker2.setDisableAutoPan(true);
            marker2.setPosition({
                lat:drop_off_data.lat,
                lng: drop_off_data.lng
                                                            
            });
    
                    
        }else{
            
            
            marker2 = map.addMarker({
                            'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
                            'icon' : 'img/drop-off-pin.png',
                            animation: plugin.google.maps.Animation.DROP
                        });
    
            marker2.on(plugin.google.maps.event.MARKER_CLICK, function(){
                location_type_selected = 1;
                dest_location_type_selected = 2;
                show_adresses();
            })
    
            marker2.setDisableAutoPan(true);
    
            marker2._isReady = true;
        }    
    
    
        if(marker1){
            marker1.setVisible(true);
            marker1.setDisableAutoPan(true);
            marker1.setPosition({
                lat:pick_up_data.lat,
                lng: pick_up_data.lng
                                                            
            });
    
                    
        }else{
            
            
            marker1 = map.addMarker({
                            'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
                            'icon' : 'img/pick-up-pin.png',
                            animation: plugin.google.maps.Animation.DROP
                        });
    
            marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                location_type_selected = 0;
                show_adresses();
            })
    
            marker1.setDisableAutoPan(true);
    
            marker1._isReady = true;
        }

        multi_destinations['dest-1']['address'] = '';
        multi_destinations['dest-1']['lat'] = '';
        multi_destinations['dest-1']['lng'] = '';

        multi_destination_mode = 0;        
        $('#location-type-icon-ds1').hide();
        $('#location-type-icon-ds2').hide();
        dest_location_type_selected = 0;
        destination_stop_inp1_shown = 0;
        destination_stop_inp2_shown = 0;

        if(markerds1){
            markerds1.setVisible(false);
        }
  
        if(markerds2){
            markerds2.setVisible(false);
        }

        
        setTimeout(process_route_between_locations(),500);
        return;
        
        
    }else if(!multi_destinations['dropoff']['address'] && !multi_destinations['dest-1']['address'] && multi_destinations['dest-2']['address']){

        pick_up_data.address = multi_destinations['pickup']['address'];
        pick_up_data.lat = multi_destinations['pickup']['lat'];
        pick_up_data.lng = multi_destinations['pickup']['lng'];


        drop_off_data.address = multi_destinations['dest-2']['address'];
        drop_off_data.lat = multi_destinations['dest-2']['lat'];
        drop_off_data.lng = multi_destinations['dest-2']['lng'];

        $('#pac-input2').val(drop_off_data.address);

        if(marker2){
            marker2.setVisible(true);
            marker2.setDisableAutoPan(true);
            marker2.setPosition({
                lat:drop_off_data.lat,
                lng: drop_off_data.lng
                                                            
            });
    
                    
        }else{
            
            
            marker2 = map.addMarker({
                            'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
                            'icon' : 'img/drop-off-pin.png',
                            animation: plugin.google.maps.Animation.DROP
                        });
    
            marker2.on(plugin.google.maps.event.MARKER_CLICK, function(){
                location_type_selected = 1;
                dest_location_type_selected = 2;
                show_adresses();
            })
    
            marker2.setDisableAutoPan(true);
    
            marker2._isReady = true;
        }    
    
    
        if(marker1){
            marker1.setVisible(true);
            marker1.setDisableAutoPan(true);
            marker1.setPosition({
                lat:pick_up_data.lat,
                lng: pick_up_data.lng
                                                            
            });
    
                    
        }else{
            
            
            marker1 = map.addMarker({
                            'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
                            'icon' : 'img/pick-up-pin.png',
                            animation: plugin.google.maps.Animation.DROP
                        });
    
            marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                location_type_selected = 0;
                show_adresses();
            })
    
            marker1.setDisableAutoPan(true);
    
            marker1._isReady = true;
        }

        multi_destinations['dest-2']['address'] = '';
        multi_destinations['dest-2']['lat'] = '';
        multi_destinations['dest-2']['lng'] = '';
        multi_destination_mode = 0;        
        $('#location-type-icon-ds1').hide();
        $('#location-type-icon-ds2').hide();
        dest_location_type_selected = 0;
        destination_stop_inp1_shown = 0;
        destination_stop_inp2_shown = 0;

        if(markerds1){
            markerds1.setVisible(false);
        }
  
        if(markerds2){
            markerds2.setVisible(false);
        }

        

        
        setTimeout(process_route_between_locations(),500);
        return;
    }

    pick_up_data.address = multi_destinations['pickup']['address'];
    pick_up_data.lat = multi_destinations['pickup']['lat'];
    pick_up_data.lng = multi_destinations['pickup']['lng'];

    drop_off_data.address = multi_destinations['dropoff']['address'];
    drop_off_data.lat = multi_destinations['dropoff']['lat'];
    drop_off_data.lng = multi_destinations['dropoff']['lng'];


           
    if(multi_destinations['dest-1']['address']){
        if(markerds1){
            markerds1.setVisible(true);
            markerds1.setDisableAutoPan(true);
            markerds1.setPosition({
                lat:multi_destinations['dest-1']['lat'],
                lng: multi_destinations['dest-1']['lng']
                                                            
            });

        }else{
            markerds1 = map.addMarker({ 
                'position':{lat: parseFloat(multi_destinations['dest-1']['lat']),lng: parseFloat(multi_destinations['dest-1']['lng'])},
                'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                animation: plugin.google.maps.Animation.DROP
            });

            markerds1._isReady = true;

            markerds1.on(plugin.google.maps.event.MARKER_CLICK, function(){
                location_type_selected = 1;
                dest_location_type_selected = 0;
                show_adresses();
            })
    
            markerds1.setDisableAutoPan(true);
        }
    }else{
        //remove marker if available
        if(markerds1){
            markerds1.setVisible(false);
        }
        
    }


    if(multi_destinations['dest-2']['address']){
        if(markerds2){
            markerds2.setVisible(true);
            markerds2.setDisableAutoPan(true);
            markerds2.setPosition({
                lat:multi_destinations['dest-2']['lat'],
                lng: multi_destinations['dest-2']['lng']
                                                            
            });
        }else{
            markerds2 = map.addMarker({
                'position':{lat: parseFloat(multi_destinations['dest-2']['lat']),lng: parseFloat(multi_destinations['dest-2']['lng'])},
                'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                animation: plugin.google.maps.Animation.DROP
            });

            markerds2._isReady = true;

            markerds2.on(plugin.google.maps.event.MARKER_CLICK, function(){
                location_type_selected = 1;
                dest_location_type_selected = 1;
                show_adresses();
            })
    
            markerds2.setDisableAutoPan(true);
        }
    }else{
        //remove marker if available
        if(markerds2){
            markerds2.setVisible(false);
        }
        
    }

    if(marker2){
        marker2.setVisible(true);
        marker2.setDisableAutoPan(true);
        marker2.setPosition({
            lat:drop_off_data.lat,
            lng: drop_off_data.lng
                                                        
        });

                
    }else{
        
        
        marker2 = map.addMarker({
                        'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
                        'icon' : 'img/drop-off-pin.png',
                        animation: plugin.google.maps.Animation.DROP
                    });

        marker2.on(plugin.google.maps.event.MARKER_CLICK, function(){
            location_type_selected = 1;
            dest_location_type_selected = 2;
            show_adresses();
        })

        marker2.setDisableAutoPan(true);

        marker2._isReady = true;
    }    


    if(marker1){
        marker1.setVisible(true);
        marker1.setDisableAutoPan(true);
        marker1.setPosition({
            lat:pick_up_data.lat,
            lng: pick_up_data.lng
                                                        
        });

                
    }else{
        
        
        marker1 = map.addMarker({
                        'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
                        'icon' : 'img/pick-up-pin.png',
                        animation: plugin.google.maps.Animation.DROP
                    });

        marker1.on(plugin.google.maps.event.MARKER_CLICK, function(){
            location_type_selected = 0;
            show_adresses();
        })

        marker1.setDisableAutoPan(true);

        marker1._isReady = true;
    }

    
    setTimeout(process_route_between_locations(),500);
    


}


function process_route_between_locations(){
    loading.show();
      
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        timeout : 20000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getdirections','p-lat':pick_up_data.lat,'p-lng':pick_up_data.lng,'d-lat':drop_off_data.lat,'d-lng':drop_off_data.lng, 'waypoints' : multi_destinations},
        dataType: 'json',
        success: function(data){
                        
            loading.hide();

            if(data.hasOwnProperty('direction_details') && data.direction_details.status === 'OK'){

                map.setClickable(false);

                let route_legs = data.direction_details.routes[0].legs;
                intra_city_duration = 0;
                intra_city_distance = 0;
                route_legs.forEach(function(val,indx){
                    intra_city_duration += parseInt(val.duration);
                    intra_city_distance += parseInt(val.distanceMeters);
                })

                intra_city_duration = Math.ceil(intra_city_duration / 60);
                intra_city_distance = intra_city_distance / 1000;

                
                intra_city_duration_text = data.direction_details.routes[0].duration;
                intra_city_distance_text = data.direction_details.routes[0].distanceMeters + "m";

                toggleroutepathanimation(0);

                map.setPadding(0,0,getMapBottomPadding(),0);

                                

                route_points = [];
                route_points = plugin.google.maps.geometry.encoding.decodePath(data.direction_details.routes["0"].polyline.encodedPolyline);

                //plot route
                if(route_polyline != null){
                    route_polyline.setVisible(false);
                    route_polyline.setPoints(route_points);
                    route_polyline.setVisible(true);  

                    toggleroutepathanimation(1);

                    map.animateCamera({
                    target: route_points,
                    duration: 1000,
                    }, function() {
                        //alert("Camera target has been changed");
                        map.setClickable(true);

                        
                        
                        /* $("#drop-box-container").removeClass("address-box-d-sel");
                        $("#pick-box-container").removeClass("address-box-p-sel");  

                        $('#pick-box').css('border','2px solid #999');
                        $('#drop-box').css('border','2px solid #999'); */

                        shownewbookingdialog();
                    });
                    
                }else{

                    route_polyline = map.addPolyline({
                        "points": route_points,
                        'color' : '#000000',
                        'width': 3,
                        'geodesic': true,
                        'clickable': true
                    });
                    
                    route_polyline.setVisible(true);

                    
                    toggleroutepathanimation(1);

                    
                    route_polyline.on(plugin.google.maps.event.POLYLINE_CLICK, function(latLng) {
                        
                        map.animateCamera({
                            target: route_points,
                            duration: 1000
                            }, function() {
                            //alert("Camera target has been changed");
                            map.setClickable(true);
                        });
                    });

                    map.animateCamera({
                        target: route_points,
                        duration: 1000
                        }, function() {
                            //alert("Camera target has been changed");
                            map.setClickable(true);

                            
                            /* $("#drop-box-container").removeClass("address-box-d-sel");
                            $("#pick-box-container").removeClass("address-box-p-sel");  

                            $('#pick-box').css('border','2px solid #999');
                            $('#drop-box').css('border','2px solid #999'); */

                            shownewbookingdialog();

                    });

                    

                }

                

               /*  $("#drop-box-container").removeClass("address-box-d-sel");
                $("#pick-box-container").removeClass("address-box-p-sel");  

                $('#pick-box').css('border','');
                $('#drop-box').css('border',''); */

                
                $('#bookbutton').css('visibility','visible');                                
                $("#bookbutton").removeClass("heartBeat animated").addClass("heartBeat animated").one('animationend', function(){
                    $(this).removeClass("heartBeat animated");
                });  
                $('#pickup-addr-disp-text').html(pick_up_data.address);
                $('#dropoff-addr-disp-text').html(drop_off_data.address);

                //format duration and distance data

                let trip_duration_secs = Math.ceil(intra_city_duration * 60);
            
                let _hours = Math.floor(trip_duration_secs / 3600);
                let _minutes = Math.floor((trip_duration_secs % 3600) / 60);

                let trip_duration_text = '';

                if(_hours){
                    trip_duration_text += _hours + 'Hr ';
                }

                if(_minutes){
                    trip_duration_text += _minutes + ' min ';
                }else{
                    trip_duration_text += '0' + ' min ';
                }

                $('#ride-stats-time').text(trip_duration_text); 

                if(routetariffs.result[userprofileinfo.route_id].cars[0].dist_unit == 0){ //kilometer
                    $('#ride-stats-dist').text(intra_city_distance.toFixed(2) + ' ' + 'km');
                }else{//miles
                    let trip_distance_meters = intra_city_distance * 1000;
                    let trip_req_distance_miles = trip_distance_meters / 1609.344; //convert to mi
                    $('#ride-stats-dist').text(trip_req_distance_miles + ' ' + 'mi');
                }
                $('#pickup-addr-disp').show();
                $('#dropoff-addr-disp').show(); 

                trackPickupElPos();
                trackDropoffElPos();          
                                  
                
                
                return             
                
            }
    
            
            if(data.hasOwnProperty('error')){
                ons.notification.confirm({
                    message: data.error,
                    // or messageHTML: '<div>Message in HTML</div>',
                    title: '',
                    buttonLabels: [__('Cancel'), __('Retry')],
                    animation: 'default', // or 'none'
                    primaryButtonIndex: 0,
                    cancelable: false,
                    callback: function(index) {
                        
                        if(!index){
                        // 0-: Button index from the left
                        $("#bookbutton").css("visibility","hidden");
                        return;
                        
                        }else{
                        process_route_between_locations();
                        // -1: Cancel
                        }
                        
                    }
                    });
                return;             
                
            }
            
            ons.notification.confirm({
                message: __("Error communicating with server"),
                // or messageHTML: '<div>Message in HTML</div>',
                title: '',
                buttonLabels: [__('Cancel'), __('Retry')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 0,
                cancelable: false,
                callback: function(index) {
                    
                    if(!index){
                    // 0-: Button index from the left
                    $("#bookbutton").css("visibility","hidden");
                    return;
                    
                    }else{
                    process_route_between_locations();
                    // -1: Cancel
                    }
                    
                }
                });
            return;
    
        },
        error: function(){
            
            loading.hide();
            ons.notification.confirm({
                message: __("Error communicating with server"),
                // or messageHTML: '<div>Message in HTML</div>',
                title: '',
                buttonLabels: [__('Cancel'), __('Retry')],
                animation: 'default', // or 'none'
                primaryButtonIndex: 0,
                cancelable: false,
                callback: function(index) {
                    
                    if(!index){
                    // 0-: Button index from the left
                    $("#bookbutton").css("visibility","hidden");
                    return;
                    
                    }else{
                    process_route_between_locations();
                    // -1: Cancel
                    }
                    
                }
                });
            return;
            
        } 
    
    
    });


}









function shownewbooking(){

      
       
    document.querySelector('#myNavigator').pushPage('html/newbooking.html',
            {
            animation: 'fade'             
            }
    );

   // document.querySelector('#mySplitter').left.close();

}

function shownewbookingstate(){

    
    
    if(typeof marker3 !== 'object' || typeof marker4 !== 'object'){
        ons.notification.alert('Pick-up and drop-off states not found',{title:""});
        return;
    }
    
    
    document.querySelector('#myNavigator').pushPage('html/newbooking.html',
            {
            animation: 'fade'             
            }
    );

   // document.querySelector('#mySplitter').left.close();

}


function infopage_show(){
    
        
    document.querySelector('#myNavigator').pushPage('html/info.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}



function showaboutapp(){
    
        
    document.querySelector('#myNavigator').pushPage('html/aboutapp.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}



function showterms(){
    
        
    document.querySelector('#myNavigator').pushPage('html/termsandprivacy.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}


function showdrivewith(){
    
        
    document.querySelector('#myNavigator').pushPage('html/drivewith.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}



function showhelpguide(){
    
        
    document.querySelector('#myNavigator').pushPage('html/help-cats.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}




function showhelpcattopics(topics_id){

    if(typeof help_topics === 'object' && help_topics.hasOwnProperty(topics_id)){

        var title = $('#cat-title-' + topics_id).html();

        document.querySelector('#myNavigator').pushPage('html/help-topics.html',
                {
                animation: 'fade',
                data:{'topics_list':help_topics[topics_id],'page_title':title}             
                }
        );

        document.querySelector('#mySplitter').left.close();  
        return;
    }

    ons.notification.alert(__("Help topics for this category are currently unavailable"),{title:""});    
        
    

}



function showhelptopic(help_content_id){
    var title = $('#topic-title-' + help_content_id).html();

    document.querySelector('#myNavigator').pushPage('html/help-content.html',
                {
                animation: 'fade',
                data:{'help_content_id':help_content_id,'help_content_title':title}             
                }
        );

        document.querySelector('#mySplitter').left.close();      
        
    

}


function walletpage_show(){   
    document.querySelector('#mySplitter').left.close();  
    if(selected_city_id == 0){
        ons.notification.confirm({
            message: __("Please select your current city"),
            // or messageHTML: '<div>Message in HTML</div>',
            title: "",
            buttonLabels: [__('Select city')],
            animation: 'default', // or 'none'
            primaryButtonIndex: 0,
            cancelable: true,
            callback: function(index) {
             
              if(!index){
                // 0-: Button index from the left
                showroutes();
              }else{
                return;
                // -1: Cancel
              }
             
            }
        });
        return;
    }
    
    document.querySelector('#myNavigator').pushPage('html/wallet.html',
            {
            animation: 'fade'             
            }
           
    );

    document.querySelector('#mySplitter').left.close();
  
}

function completedpage_show(){
    
    document.querySelector('#myNavigator').pushPage('html/completed.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}

function currentpage_show(){
    
    document.querySelector('#myNavigator').pushPage('html/current.html',
            {
            animation: 'fade'             
            }
    );

    document.querySelector('#mySplitter').left.close();

}

//*************************Payment Gateways**************************/

function showPaymentGateways(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }


    if(parseInt($('#fundAmount').val()) < walletLowTopupAmount()){
        $('#fundAmount').val(walletLowTopupAmount());
    }

    if(app_settings.default_payment_gateway instanceof Array){
        let payment_gateways = app_settings.default_payment_gateway;
        if(!payment_gateways.length){
            return;
        }else if(payment_gateways.length == 1){
            Vpay(payment_gateways[0]);
            return;
        }
    }else{
        return;
    }

    document.querySelector('#myNavigator').pushPage('html/pgateways.html',
    {
        animation:'fade'             
    }
    );

    document.querySelector('#mySplitter').left.close();
}


function walletLowTopupAmount(){
    let lowest_amount_preset = 0;
    let wallet_topup_preset_string = app_settings.wallet_topup_presets;
    let wallet_topup_preset_array = wallet_topup_preset_string.split('|');
    if(typeof wallet_topup_preset_array == 'object'){        
    
        wallet_topup_preset_array.forEach(function(val,indx){
            val = parseFloat(val);
            if(indx == 0){
                lowest_amount_preset = val;

            }else{
                if(val < lowest_amount_preset){
                    lowest_amount_preset = val;
                }

            }         
                    
            
        })
        
    }

    return lowest_amount_preset;
}


function Vpay(payment_gateway){

    let top_page = document.querySelector('#myNavigator').topPage;
    if(top_page.id == "pgateways"){
        document.querySelector('#myNavigator').popPage({animation: 'none'});
    }

    switch(payment_gateway){

        case "paystack":
        paystackGateway();
        break; 
        
        case "voguepay":
        paystackGateway();
        break;

        case "pesapal":
        pesapalGateway();
        break;

        case "paytr":
        paytrGateway();
        break;

        case "paytm":
        paytmGateway();
        break;

        case "phonepe":
        phonepeGateway();
        break;

        case "stripe":
        stripeGateway();
        break;

        case "flutterwave":
        flutterwaveGateway();
        break;

        case "payku":
        paykuGateway();
        break;

        case "paymob":
        paymobGateway();
        break;

        case "midtrans":
        midtransGateway();
        break;

        case "paypal":
        paypalGateway();
        break;

        case "custom":
        customGateway();
        break;    

        default:
        ons.notification.alert(__('Payment Gateway not available'),{title:""});
        
    }   
      
    
    
}


function customGateway(){
    //add your custom gateway code here  
    //If you are using AJAX set 'action':'customInit' in the data payload. This will call the server file in /drop-files/lib/pgateways/custom/custom-transaction-init.php. 
    //You can write your payment initialization code in this file.
}


function paytrGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to default set currency
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);

    var metadata = {
                  
        user_id:userprofileinfo.userid,
        amount: payment_amount,
        cur_symbol:selected_city_curency_symbol,
        cur_code:selected_city_curency_code,
        cur_exchng:selected_city_curency_exchange_rate,
        user_type:0,
        memo:__('Rider App Wallet Funding')
    };

    
    var data = {
        email: userprofileinfo.email,
        user_firstname: userprofileinfo.firstname,
        user_lastname: userprofileinfo.lastname,
        user_phone: userprofileinfo.phone,
        amount: local_currency_payment_amount,
        metadata: metadata
      };

      loading.show();   

      var post_data = {'action':'paytrInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",['PayTR']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();
                        var inappbrowser = cordova.InAppBrowser.open(data_obj.paytr_data, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.paytr_data;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });

}




function phonepeGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to default set currency
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);

    var metadata = {
                  
        user_id:userprofileinfo.userid,
        amount: payment_amount,
        cur_symbol:selected_city_curency_symbol,
        cur_code:selected_city_curency_code,
        cur_exchng:selected_city_curency_exchange_rate,
        user_type:0,
        memo:__('Rider App Wallet Funding')
    };

    
    var data = {
        email: userprofileinfo.email,
        user_firstname: userprofileinfo.firstname,
        user_lastname: userprofileinfo.lastname,
        user_phone: userprofileinfo.phone,
        amount: local_currency_payment_amount,
        metadata: metadata
      };

      loading.show();   

      var post_data = {'action':'phonepeInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",['PhonePe']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();
                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.paytr_data;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });

}




function paytmGateway(){

    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to default set currency
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);

    var metadata = {
                  
        user_id:userprofileinfo.userid,
        amount: payment_amount,
        cur_symbol:selected_city_curency_symbol,
        cur_code:selected_city_curency_code,
        cur_exchng:selected_city_curency_exchange_rate,
        user_type:0,
        memo:'Rider App Wallet Funding'
    };

    
    var data = {
        email: userprofileinfo.email,
        user_firstname: userprofileinfo.firstname,
        user_lastname: userprofileinfo.lastname,
        user_phone: userprofileinfo.phone,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: metadata
      };

      loading.show();   

      var post_data = {'action':'paytmInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",['PayTM']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();
                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.paytr_data;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });

}




function pesapalGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseFloat($('#fundAmount').val());

    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);

    var metadata = {
                  
        user_id:userprofileinfo.userid,
        amount: payment_amount,
        cur_symbol:selected_city_curency_symbol,
        cur_code:selected_city_curency_code,
        cur_exchng:selected_city_curency_exchange_rate,
        user_type:0,
        memo: __('Rider App Wallet Funding')
    };

    var metadata_json = JSON.stringify(metadata);
    var data = {
        email: userprofileinfo.email,
        user_firstname: userprofileinfo.firstname,
        user_lastname: userprofileinfo.lastname,
        user_phone: userprofileinfo.phone,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: metadata_json
      };

      loading.show();   

      var post_data = {'action':'pesapalInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",['PesaPal']), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        var inappbrowser = cordova.InAppBrowser.open(data_obj.pesapal_data, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.pesapal_data;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });


}


function flutterwaveGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);
    payment_amount = payment_amount / 100; //convert back to initial value for use with flutterwave 

    //convert amount to local currency supported by paystack
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate * 100);
    local_currency_payment_amount = local_currency_payment_amount / 100;

    

    var data = {
        
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        payment_options: "card",
        customer : {
            email: userprofileinfo.email,
            phonenumber : userprofileinfo.phone,
            name: userprofileinfo.firstname + " " + userprofileinfo.lastname
        },
        meta: {           
                  
            user_id:userprofileinfo.userid,
            amount: payment_amount,
            cur_symbol:selected_city_curency_symbol,
            cur_code:selected_city_curency_code,
            cur_exchng:selected_city_curency_exchange_rate,
            user_type:0,
            memo: __('Rider App Wallet Funding')              
           
        }
      };

      loading.show();   

      var post_data = {'action':'flutterwaveInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["FlutterWave"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}



function paystackGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by paystack
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {
           custom_fields: [
              {
                  
                  user_id:userprofileinfo.userid,
                  amount: payment_amount,
                  cur_symbol:selected_city_curency_symbol,
                  cur_code:selected_city_curency_code,
                  cur_exchng:selected_city_curency_exchange_rate,
                  user_type:0,
                  memo: __('Rider App Wallet Funding')
              }
           ]
        }
      };

      loading.show();   

      var post_data = {'action':'paystackInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Paystack"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();
                        var inappbrowser = cordova.InAppBrowser.open(data_obj.paystack_data.data.authorization_url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }


                        
                        //window.location =  data_obj.paystack_data.data.authorization_url;
                        return;

                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}


function stripeGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by stripe
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {           
                  
            user_id:userprofileinfo.userid,
            amount: payment_amount,
            cur_symbol:selected_city_curency_symbol,
            cur_code:selected_city_curency_code,
            cur_exchng:selected_city_curency_exchange_rate,
            user_type:0,
            memo: __('Rider App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'stripeInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Stripe"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        var inappbrowser = cordova.InAppBrowser.open(data_obj.stripe_url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.stripe_url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}


function paykuGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by payku
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {           
                  
            user_id:userprofileinfo.userid,
            amount: payment_amount,
            cur_symbol:selected_city_curency_symbol,
            cur_code:selected_city_curency_code,
            cur_exchng:selected_city_curency_exchange_rate,
            user_type:0,
            memo: __('Rider App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'paykuInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Payku"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}



function midtransGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by midtrans
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {           
                  
            user_id:userprofileinfo.userid,
            amount: payment_amount,
            cur_symbol:selected_city_curency_symbol,
            cur_code:selected_city_curency_code,
            cur_exchng:selected_city_curency_exchange_rate,
            user_type:0,
            memo: __('Rider App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'midtransInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Midtrans"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}




function paypalGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by midtrans
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        currency: default_currency_data.iso_code,
        metadata: {           
                  
            user_id:userprofileinfo.userid,
            amount: payment_amount,
            cur_symbol:selected_city_curency_symbol,
            cur_code:selected_city_curency_code,
            cur_exchng:selected_city_curency_exchange_rate,
            user_type:0,
            memo: 'Rider App Wallet Funding'
             
        }
      };

      loading.show();   

      var post_data = {'action':'paypalInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["PayPal"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }

                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}



function paymobGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }

    var payment_amount = parseInt($('#fundAmount').val() * 100);

    //convert amount to local currency supported by paymob
    var local_currency_payment_amount = parseInt(payment_amount / selected_city_curency_exchange_rate);


    var data = {
        email: userprofileinfo.email,
        amount: local_currency_payment_amount,
        firstname: userprofileinfo.firstname,
        lastname: userprofileinfo.lastname,
        phone: userprofileinfo.country_dial_code + userprofileinfo.phone,
        currency: default_currency_data.iso_code,
        payment_mode: $('#kiosk-mode').prop('checked') == true ? 'kiosk' : 'card',
        metadata: {           
                  
            user_id:userprofileinfo.userid,
            amount: payment_amount,
            cur_symbol:selected_city_curency_symbol,
            cur_code:selected_city_curency_code,
            cur_exchng:selected_city_curency_exchange_rate,
            user_type:0,
            memo: __('Rider App Wallet Funding')
             
        }
      };

      loading.show();   

      var post_data = {'action':'paymobInit',"data":data};

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            timeout : 30000,
            crossDomain:true,
            xhrFields: {withCredentials: true},
            data: post_data,
            success: function (data, status)
            {
                
                loading.hide();    
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                }

                
                if(data_obj.hasOwnProperty('error')){
                    ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                    return;
                    
                }


                if(data_obj.hasOwnProperty('success')){

                    if(data_obj.hasOwnProperty('bill_ref')){
                        ons.notification.alert(__("Kiosk payment initialized successfully. Here is your bill reference number: {---1}",[data_obj.bill_ref]),{title:""});
                        return;
                    }
                    
                    ons.notification.alert(__("Transaction initialized successfully. You will be redirected to {---1} website to complete your payment. After your payment is sucessful your wallet will be credited",["Paymob"]), {title:"",buttonLabels:[__('Continue')],callback: function(){
                        //navigator.app.exitApp();

                        var inappbrowser = cordova.InAppBrowser.open(data_obj.url, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=yes,toolbar=yes,hidespinner=yes,hardwareback=no');
                        if (inappbrowser != undefined) {
                            //inappbrowser.insertCSS({ code: "body{height: calc(100vh - 60px);}" });
                            loading.show();
                            inappbrowser.addEventListener('loadstart', function(){
                                
                            });

                            inappbrowser.addEventListener('loadstop', function(){
                                loading.hide();
                                inappbrowser.show();
                            });

                            inappbrowser.addEventListener('exit', function(){
                                getwalletinfo();
                            });

                            inappbrowser.addEventListener('loaderror', function(){
                                loading.hide();
                                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});  
                                inappbrowser.close(); 
                                return;             
                            });

                            inappbrowser.addEventListener('message', function(message){
                                var res = message.data;
                                inappbrowser.close();
                                if(res.status == 1){
                                    ons.notification.alert(__("Payment was successful. Thank you"),{title:""});                                    
                                      
                                }else{
                                    ons.notification.alert(__("Payment failed."),{title:""});                                    
                                } 
                                return;                              
                                           
                            });
                        }
                        //window.location =  data_obj.url;
                        return;
                    }});

                                            
                }


            },
            error: function(jqXHR,textStatus, errorThrown) {  
                loading.hide();
                
                ons.notification.alert(__("Error Initiating transaction with gateway"),{title:""});
                return;
                
            }
            
        });
}



function voguepayGateway(){
    if(isNaN(parseInt($('#fundAmount').val())) || parseInt($('#fundAmount').val()) == 0 ){
        ons.notification.alert(__('Please enter a valid amount'),{title:""})  ;
        return;
    }
    
    Voguepay.init({
        v_merchant_id: online_payment_info.merchantid,
        total: $('#fundAmount').val(),
        notify_url: online_payment_info.notifyurl,
        cur: selected_city_curency_code,
        merchant_ref: selected_city_curency_symbol + '-' + selected_city_curency_code + '-' + selected_city_curency_exchange_rate + '-0-' + userprofileinfo.userid, //set account type identifier 0- 'user', 1- 'driver'
        memo: 'Taxi App Wallet Funding',
        // recurrent: true,
        // frequency: 10,
        email: userprofileinfo.email,
        phone: userprofileinfo.phone,
        developer_code: online_payment_info.devid,
        store_id: online_payment_info.storeid,
        loadText:'Loading Card payment',
        items: [
            {
                name: "My Wallet",
                description: "Wallet funding",
                price: $('#fundAmount').val()
            }
        ],
        closed:Vpayclosed,
        success:Vpaysuccess,
        failed:Vpayfailed
    });

}

Vpayclosed=function() {
    //alert('window closed');
}

Vpaysuccess=function(transaction_id) {
    $('#fundAmount').val('');
    getwalletinfo();
    /* document.querySelector('#myNavigator').popPage(
        {
        animation: 'fade'             
        }
    ); */
    ons.notification.alert('Wallet funded successfully' ,{title:""});
}


Vpayfailed=function(transaction_id) {
    //getwalletinfo();
    /* document.querySelector('#myNavigator').popPage(
        {
        animation: 'fade'             
        }
    ); */
     ons.notification.alert('Transaction was not successful',{title:""});
}



function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function(position){
        user_location_detected = 1;
        user_location_live.lat = position.coords.latitude;
        user_location_live.lng = position.coords.longitude;
    },function(){
        return;
    },{ maximumAge: 10000, timeout: 10000, enableHighAccuracy: false });
}





function loadLang(callback){

    let lang = localStorage.getObject('lang');
        
    if(lang){
        selected_lang = lang;
    }

    let el = document.createElement('script');
    el.onload = function(){callback()};
    el.src = `js/lang/${selected_lang.code}.js`;
    document.head.appendChild(el);

}


function translateElements(suffix = ""){

    //Translate page html elements inner text 
    let elements_to_traslate = document.querySelectorAll(`[data-i18n${suffix}]`);
    elements_to_traslate.forEach(function(el,indx){

        if(selected_lang.dir == 'rtl'){    
            el.setAttribute('dir','rtl');
        }else{
            el.setAttribute('dir','ltr');
        }

        let word_phrase = el.dataset['i18n' + suffix];        
        if(lang_phrases.hasOwnProperty(word_phrase)){
            let trans_phrase = lang_phrases[word_phrase];
            el.innerText = trans_phrase;            
        }
    })

    //Translate page html elements placeholder text
    let elements_to_traslate_p = document.querySelectorAll(`[data-i18nn${suffix}]`);
    elements_to_traslate_p.forEach(function(el_p,indx){

        if(selected_lang.dir == 'rtl'){    
            el_p.setAttribute('dir','rtl');
            if(el_p.querySelector('span')){
                el_p.querySelector('span').style.left = 'auto';
                el_p.querySelector('span').style.right = '0';
            }
        }else{
            el_p.setAttribute('dir','ltr');
        }
        let word_phrase_p = el_p.dataset['i18nn' + suffix];        
        if(lang_phrases.hasOwnProperty(word_phrase_p)){
            let trans_phrase_p = lang_phrases[word_phrase_p];
            el_p.setAttribute('placeholder',trans_phrase_p);
            
        }
    })

    //Translate page Tab elements label text
    let elements_to_traslate_t = document.querySelectorAll(`[data-i18nt${suffix}]`);
    elements_to_traslate_t.forEach(function(el_t,indx){
        if(selected_lang.dir == 'rtl'){    
            el_t.setAttribute('dir','rtl');
        }else{
            el_t.setAttribute('dir','ltr');
        }
        let word_phrase_t = el_t.dataset['i18nt' + suffix];        
        if(lang_phrases.hasOwnProperty(word_phrase_t)){
            let trans_phrase_t = lang_phrases[word_phrase_t];
            el_t.setAttribute('label',trans_phrase_t);
            
        }
    })
}


function __(phrase,variables = []){

    if(lang_phrases.hasOwnProperty(phrase)){
        let translation = lang_phrases[phrase];
        if(translation.length){
            let regx = /\{\-\-\-[0-9]\}/g;
            let matches = translation.match(regx);
            if(variables.length && matches && matches.length == variables.length){               
                
                matches.forEach(function(val,indx){
                    var_indx = val.substr(4,1);
                    translation = translation.replace(val,variables[var_indx - 1]);
                })
                
            }
            return translation;
        }else{
            return phrase;
        }
    }else{
        return phrase;
    }
    
}




function countryListSelect(callback){
    
    document.querySelector('#countrylistdialog').show();
    $('#countrylistdialog').attr('title',__('Select your country')); 

        
    $('#countrylistdialog .default-country-items').off().on('click', function(){
        document.querySelector('#countrylistdialog').hide();
        let country = $(this).data('country');
        let country_code = $(this).data('countrycode');
        let country_dial_code = $(this).data('countrydialcode');
        callback({country:country,dial_code:country_dial_code,country_code:country_code});        
    })

    
}


function showCountryTel(){   
    
    if(app_settings.allowed_countries_list != ""){

        let allowed_countries_list_string = app_settings.allowed_countries_list;
        let allowed_countries_array = allowed_countries_list_string.split('|');
        if(typeof allowed_countries_array == 'object'){
            $('#countrylistdialog .default-country-items').hide();

            allowed_countries_array.forEach(function(val,indx){
                let country_code = val.trim();
                $(`#countrylistdialog .default-country-items[data-countrycode='${country_code}']`).show();           
            })
        }
        

    }

    countryListSelect(function(res){
        $('#country-flag').attr('class', 'iti__flag iti__' + res.country_code);
        $('#country-flag').data('country', res.country_code);
        $('#tel-code').html(' +' + res.dial_code);
        $('#tel-code').data('dialcode', res.dial_code);
        $('#tel-code').data('country', res.country_code);
    });
    
}



function init_fb_rtdb(config,user_id){

    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }

    const db = firebase.database();

    const message_ref = db.ref(`Riders/ridr-${user_id}/notf`);
    message_ref.on('value', (snapshot) => {

        
        const data = snapshot.val();
        if(data == null)return;
        if(!(data.hasOwnProperty('msg') && data.hasOwnProperty('msg_t')))return;

        let last_msg_time_id = localStorage.getItem('fb_last_recvd');        


        if(last_msg_time_id != null && data.msg_t == last_msg_time_id)return;

        localStorage.setItem('fb_last_recvd',data.msg_t); 

        let current_local_timestamp = Date.now();
        current_local_timestamp += server_client_time_diff; //sync with server time
        current_local_timestamp = current_local_timestamp / 1000 | 0; //get only the seconds part

        if((current_local_timestamp - 5) > data.msg_t)return; //skip old messages
        
        
        //console.log(data);
        //console.log(Date.now() / 1000 | 0);

        showhidedriversearch(0);
        clearTimeout(driver_search_display_timer);
        var message = data.msg;
        //console.log(message)
        if(message.hasOwnProperty('booking_id') && message.hasOwnProperty('action')){
            if(message.action != "chat-message"){    
                if(processed_notifications.hasOwnProperty(message.booking_id)){
                    var found = processed_notifications[message.booking_id].find(function(el){
                        
                        return el == message.action; 
                        
                    });
                    if(found){
                        //console.log('processed');
                        return;
                    }else{
                        processed_notifications[message.booking_id].push(message.action);
                        //console.log('added');
                    }
                }else{
                    processed_notifications[message.booking_id] = [message.action];
                    //console.log('new');                    
                }
            }

            switch(message.action){
                case "driver-assigned":
                driver_assigned_notify(message);
                break;
                case "driver-arrived":
                driver_arrived_notify(message);
                break;
                case "customer-onride":
                customer_onride_notify(message);
                break;
                case "driver-complete":
                driver_complete_notify(message);
                break;
                case "driver-cancelled":
                driver_cancelled_notify(message);
                break;
                case "chat-message":
                driver_chat_msg_notify(message);
                break;
                case "app-message":
                app_message(message);
                break;
            }
        }



    });

}


async function sync_with_servertime(){

    let time_diffs = [];
        
    for(var x = 0;x < 3;x++){
        try{
         let server_time = await getservertime(); 

         let time_diff = Date.now() - server_time;
         time_diffs.push(time_diff);         
        
        }catch(e){
            continue;
        }    
    }

    if(time_diffs.length){
        let sum = 0;
        time_diffs.forEach(function(val,indx){
            sum += val;
        })
        server_client_time_diff = Math.floor(sum / time_diffs.length); //in milliecs
    }

    
}



async function getservertime(){

    let res = new Promise(function(resolve,reject){
        let sync_time_before = Date.now();
        var post_data = {'action_get':'syncservertime'};       
        jQuery.ajax({
        url: ajaxurl,
        method: 'GET',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
            {
                
                        
                try{
                    var data_obj = JSON.parse(data);
                }catch(e){
                    reject('error');
                    return;
                }


                

                
                if(data_obj.hasOwnProperty('server_time')){
                    let sync_time_arrived = Date.now();
                    let server_time = parseInt(data_obj.server_time);
                    let req_elapsed = server_time - sync_time_before;
                    let res_elapsed = sync_time_arrived - server_time;
                    let server_actual_time = sync_time_arrived + res_elapsed;
                    resolve(server_actual_time);
                    return;                   
                }


                
                
                
            },
            error: function() {
                reject('error');
                return;
                
            }

        });
    })

    return res;

}



function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    
}



function cancelBookingRequest(b_id){


    reset_ui_elements_full(); 

    clearTimeout(driver_search_display_timer);
    
    if(!b_id)return;

    var post_data = {'action':'bookingCancelDriverSearch','bookingid':b_id};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'POST',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {          
            loading.hide();           
            
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                return;
            }

            if(data_obj.hasOwnProperty('error')){

               // ons.notification.alert(data_obj.error,{title:""});
                return;
                

            }


            
            if(data_obj.hasOwnProperty('success')){
              return;
            }          
            
            
        },
        error: function() {
            loading.hide();        
            //ons.notification.alert(__("Error communicating with server"),{title:""});
            return;
            
        }

    });
}





function shownewbookingdialog(){

        if(typeof routetariffs !== 'object'){
            return;     
        }

        var matched_zones_fare = matchZoneFare();

        var stored_promo_code = localStorage.getObject('user-promo-codes');   
        var coupon_discount_text = "n/a"; 
        var peak_period_text = "n/a"; 
        var ride_details = {};
        var ride_details_schd = {};
        var number_of_city_vehicle;
        var vehicles_list_height;
        var vehicle_sel_dlg_base_height = 148;
        hourly_rate_enabled = 0;
        hourly_rate_user_set_num_hours = 1;

        $('#promo-ind').hide();
        $('#ride-details-container').hide();

        //prepare UI       
            
        $("#menubtn").css("visibility","hidden");
        $("#menubtn").css("z-index","10");
        $("#driver-notify-ui-back-btn").css("z-index", "10");
        $('#ride-request-cancel-btn').css("z-index","10");
        $('#ride-request-cancel-btn').css("visibility","hidden");

        $("#trip-summary-back-btn").css("visibility","visible");
        $("#trip-summary-back-btn").css("z-index","100");
        $("#trip-summary-back-btn").removeClass("zoomIn animated").addClass("zoomIn animated").one('animationend', function(){
            $("#trip-summary-back-btn").removeClass("zoomIn animated");
                    
        })

        

        

        $("#new-bookng-details").css("left","0px");
        $("#new-bookng-details").css("visibility","visible");
        $("#new-bookng-details").removeClass("bounceInUp animated").addClass("bounceInUp animated").one('animationend', function(){
            $('#new-bookng-details').removeClass("bounceInUp animated");
        })              
    
        $('#bookride').html(__('Request Ride'));

        $('#bookride-options').css('width', '0');
        $('#bookride-options').css('visibility', 'hidden');

        ons.setDefaultDeviceBackButtonListener(function(){
            collapseVehicleList();
            reset_ui_elements_full();
            ons.setDefaultDeviceBackButtonListener(onBackButton);
        });


        trip_summary_dialog_show = 1;
        disable_nbk_dlg_auto_show_on_home = 0;

        $('#banner-items-container').css('opacity', '0');
        $('#drop-box-container').css('opacity', '0');
    
        

        
        var selected_route_id = '';
        

        
        
        if(app_settings.hasOwnProperty('vehicle_sel_disp_type') && app_settings.vehicle_sel_disp_type == 2){ //list display

            $('#map-event-absorber').css('height','350px');
            $('#map-event-absorber').show();
            $('#vehicle-view-section').hide();
            $('#vehicle-price-section').hide();  
            $('#new-bookng-details').css('height','148px');              
            $('#vehicle-list-container').show();
            
            if(selected_state_id != 0){
                $('#vehicle-list-car-items').html(routetariffs.result[selected_state_id].list_cars_html);
                selected_route_id = selected_state_id;            
            
            }else{
                $('#vehicle-list-car-items').html(routetariffs.result[selected_city_id].list_cars_html);

                selected_route_id = selected_city_id;
                

            }

            let city_vehicles = routetariffs.result[selected_route_id].cars;
            number_of_city_vehicle = city_vehicles.length;
            vehicles_list_height = (number_of_city_vehicle * 70) + 24;
            if(number_of_city_vehicle > 2)vehicles_list_height = 210;
            $('#vehicle-list-container').css('transform',`translateY(0)`);
            $('#vehicle-list-container').css('height',`${vehicles_list_height + vehicle_sel_dlg_base_height}px`);
            $('#vehicle-list-container').css('top',`-${vehicles_list_height}px`);
            $('#map-event-absorber').css('height',`${vehicles_list_height + vehicle_sel_dlg_base_height}px`);


        }else{ //slider display

            $('#rides-carousel').empty();
            var rides_carousel_clone = $('#rides-carousel').clone();
            $('#cars-container').empty();
            rides_carousel_clone.appendTo('#cars-container');
            
            if(selected_state_id != 0){
                $('#rides-carousel').html(routetariffs.result[selected_state_id].cars_html);
                selected_route_id = selected_state_id;            
            
            }else{
                $('#rides-carousel').html(routetariffs.result[selected_city_id].cars_html);
                selected_route_id = selected_city_id;
                
            }

            var table_width = $('#trip-summary-details').width();

            $('#cars-container').css('width',table_width - (0.0157 * table_width));



            $('.owl-carousel').owlCarousel({
            loop:false,
            margin:10,
            nav:false,
            dots:true,
            items:2,
            center:true,
            info: function(item){
                //console.log('mikolo');
            }
            
            });
        }

        

       
                
        booking_currency_symbol = routetariffs.result[selected_route_id].cars[0].symbol;
        let payment_options_data = routetariffs.result.payment_options_data;
        

        if(payment_options_data){
            $('#payment-type').html(payment_options_data[0].name);
            $('#payment-type').data('paymenttype',payment_options_data[0].id);

            if(payment_options_data[0].id == 1){
                $('#payment-type-icon').attr('src', 'img/cash.png');
            }else if(payment_options_data[0].id == 2){
                $('#payment-type-icon').attr('src', 'img/wallet.png');                       
            }else{
                $('#payment-type-icon').attr('src', 'img/cash.png');
            }

            let payment_methods_html = '';
            payment_options_data.forEach(function(val,indx){
                let payment_method_icon = '';
                let cur_wallet_balance = '';
                
                if(val.id == 1){
                    payment_method_icon = 'img/cash.png';
                }else if(val.id == 2){
                    
                    payment_method_icon = 'img/wallet.png';
                    let wallet_amount_currency_converted = wallet_amount * selected_city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
                    wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100; 
                    wallet_amount_currency_converted = wallet_amount_currency_converted.toFixed(2);
                    if(selected_city_id != 0){
                        cur_wallet_balance = "  <span style='color:#999'>" + selected_city_curency_symbol + wallet_amount_currency_converted + "</spn>";      
                    }
                    
                }else{
                    
                    payment_method_icon = 'img/cash.png';
                }

                payment_methods_html += `<ons-list-item data-value="${val.id}" data-text="${val.name}" class="sel-list-item">
                                  
                                            <div class="left">
                                                <img src="${payment_method_icon}" style="width:50px;" />
                                            </div>
                                            <div class="center">
                                            <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${val.name + cur_wallet_balance}</span>
                                            </div>
                                            <div class="right" id="list-item-sel-${val.id}">
                                                
                                            </div>
                                        </ons-list-item>`;



            });

            payment_methods_html = `<ons-list>${payment_methods_html}</ons-list>`;

            $('#payment-type').off('click').on('click', function(){
                let cur_payment_method = $(this).data('paymenttype');
                $('#customselectcontent').empty();
                $('#customselectcontent').html(payment_methods_html);

                customItemSelect(cur_payment_method,__('Choose a payment method'), function(value){
                    if(value == 1){
                        $('#payment-type-icon').attr('src', 'img/cash.png');
                    }else if(value == 2){
                        $('#payment-type-icon').attr('src', 'img/wallet.png');                       
                    }else{
                        $('#payment-type-icon').attr('src', 'img/cash.png');
                    }
                    payment_options_data.forEach(function(val,indx){
                        if(val.id == value){
                            $('#payment-type').html(val.name);
                            $('#payment-type').data('paymenttype', val.id);
                            
                        }
                    })
                });


            })

        }

        var current_dt = new Date();
        var c_year = current_dt.getFullYear();
        var c_month = current_dt.getMonth() + 1;
        var c_day = current_dt.getDate();
        var c_day_week = current_dt.getDay();
        var c_hours = current_dt.getHours();
        var c_min = current_dt.getMinutes();

        if(c_hours < 10){
          c_hours = '0' + c_hours;
        }

        if(c_min < 10){
          c_min = '0' + c_min;
        }


        if(c_day < 10){
          c_day = '0' + c_day;
        }

        if(c_month < 10){
          c_month = '0' + c_month;
        }

        var unix_time = current_dt.getTime();
        unix_time += 7200000; //add 1 day in milliseconds
        
        var min_date = new Date(unix_time);
        var scheduled_ride = 0;
        var booking_cost_h = '';
        var computed_fare = 0;
        //$('#puc_dt').html(__("Now"));
        //$('#puc_dt').html(c_day + '/' + c_month + '/' + c_year + ' ' + c_hours + ':' + c_min);

        $('#set_puc_dt').off("click").on('click', function(){

          if(scheduled_ride_enabled == 0 || service_mode == 1){
            ons.notification.alert(__('Scheduled rides are currently unavailable'),{title:""});
            return
          }

          if(device_ready){
              cordova.plugins.DateTimePicker.show({
                mode : "datetime",
                date : cdate,
                allowOldDates : false,
                allowFutureDates : true,
                minuteInterval : 10,
                local : "EN",
                okText : __("OK"),
                cancelText : __("Cancel"),
                android : {
                            theme : 0,
                            calender : true,
                            is24HourView : false
                },
                success : function(newDate){
                        cdate = newDate;
                        current_dt = [];
                        current_dt = new Date(newDate);
                        scheduled_ride = 1;
                        var c_year = current_dt.getFullYear();
                        var c_month = current_dt.getMonth() + 1;
                        var c_day = current_dt.getDate();
                        var c_day_week = current_dt.getDay();
                        var c_hours = current_dt.getHours();
                        var c_min = current_dt.getMinutes();

                        let time_diff = 0;
                        time_diff = (current_dt.getTime() - Date.now()) / 1000 | 0;

                        if(time_diff < 1200){                            
                            ons.notification.alert(__('Please set a time atleast 20 minutes ahead for scheduled ride'),{title:""});
                            return;
                        }

                        

                        var c_hours_str;
                        var c_min_str;
                        var c_day_str;
                        var c_month_str;

                        if(c_hours < 10){
                          c_hours_str = '0' + c_hours;
                        }else{
                          c_hours_str = c_hours;
                        }

                        if(c_min < 10){
                          c_min_str = '0' + c_min;
                        }else{
                          c_min_str = c_min;
                        }


                        if(c_day < 10){
                          c_day_str = '0' + c_day;
                        }else{
                          c_day_str = c_day;
                        }

                        if(c_month < 10){
                          c_month_str = '0' + c_month;
                        }else{
                          c_month_str = c_month;
                        }

                        let days_of_the_week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                        let month_of_the_year = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

                        let date_str = c_hours_str + ":" + c_min_str + ", " + days_of_the_week[c_day_week] + " " + c_day + " " + month_of_the_year[c_month - 1];

                        $('#bookride').html(__('Schedule') + "- " + date_str);



                        //$('#puc_dt').html(c_day_str + '/' + c_month_str + '/' + c_year + ' ' + c_hours_str + ':' + c_min_str);
                        var set_shour = parseInt(routetariffs.result.nighttime.start_hour);
                        var set_ehour = parseInt(routetariffs.result.nighttime.end_hour);

                        if(app_settings.hasOwnProperty('vehicle_sel_disp_type') && app_settings.vehicle_sel_disp_type == 1){ //slider display

                            if(c_hours >= set_shour || c_hours <= set_ehour){
                                //Night time range
                                night_day = 0;
                                bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * parseFloat(intra_city_distance));           

                                if(parseFloat(nride_ind)){

                                    if(parseFloat(nride_ind) >= intra_city_distance){
                                        //bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration));
                                        bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);           
                                    }else{
                                        bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);
                                        bookride_cost += (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * (parseFloat(intra_city_distance) - parseFloat(nride_ind)));           
                                    }                            
                                }
                            }else{
                            //outside night time range
                            night_day = 1;
                            bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * parseFloat(intra_city_distance));           

                            if(parseFloat(ride_ind)){
                                if(parseFloat(ride_ind) >= intra_city_distance){
                                    //bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration));           
                                    bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);           
                                }else{
                                    bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);
                                    bookride_cost += (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * (parseFloat(intra_city_distance) - parseFloat(ride_ind)));           
                                }
                                
                            }

                            }

                            if(typeof matched_zones_fare == 'object' && matched_zones_fare.hasOwnProperty('fare_type1') && selected_state_id == 0){
                                if(matched_zones_fare.fare_type1 == 1){
                                    bookride_cost *= parseFloat(matched_zones_fare.fare_value1);
                                }else if(matched_zones_fare.fare_type1 == 2){
                                    bookride_cost += parseFloat(matched_zones_fare.fare_value1);
                                }

                                if(matched_zones_fare.fare_type2 == 1){
                                    bookride_cost *= parseFloat(matched_zones_fare.fare_value2);
                                }else if(matched_zones_fare.fare_type2 == 2){
                                    bookride_cost += parseFloat(matched_zones_fare.fare_value2);
                                }
                                
                            }

                            peak_period = 0;
                            peak_period_text = "n/a";
                            if(peak_period_enabled){ //check if peak period charge is enabled for this car
                
                                if(typeof peak_period_days == 'object'){
                                for(var i = 0;i < peak_period_days.length;i++){
                    
                                    if(peak_period_days[i] == c_day_week || peak_period_days[i] - 7 == c_day_week){ //check if the day is part of the peak period days. had to correct for mismatch in sunday as javascript getDay() has sunday as 0, monday 1...
                                        //day of the week is part of peak period days
                                        
                                        if(c_hours >= peak_period_start && c_hours <= peak_period_end){
                                        //peak period, compute booking cost
                                        peak_period = 1;
                                        if(peak_period_charge_type){
                                                peak_period_text = peak_period_charge_value + "X";
                                            bookride_cost = bookride_cost * peak_period_charge_value;
                                        }else{
                                            peak_period_text = "+" + peak_period_charge_value;
                                            bookride_cost = bookride_cost + peak_period_charge_value;
                                        }                     
                                        
                                        }
                                        break;
                                    }
                    
                    
                                }
                                } 
                            }

                            
                            
                            let bookride_cost_fixed = Math.round(bookride_cost * 100) / 100;
                            bookride_cost_fixed = bookride_cost_fixed.toFixed(2);
                            bookride_cost_fixed = roundFare(bookride_cost_fixed);
                            $('#bookride_cost').html(booking_currency_symbol + bookride_cost_fixed);
                            $('#bookride_cost_full').html(booking_currency_symbol + bookride_cost_fixed);
                            
                            bookride_cost = bookride_cost_fixed;
                            booking_cost_h = md5("projectgics" + bookride_cost.toString());

                            //show promo code discount price if available
                            coupon_discount_text = "n/a";
                            
                            if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
                                $('#bookride_cost_full').css('visibility','visible');
                                if(selected_route_id == stored_promo_code.city_id && bookride_cost >= stored_promo_code.min_fare){

                                    let coupon_vehicles = stored_promo_code.coupon_v
                                    if(coupon_vehicles !=''){
                                        let c_v_ids = coupon_vehicles.split(',');
                                        let found = 0;
                                        c_v_ids.forEach(function(val,indx){
                                            if(val == selected_city_ride)found = 1;
                                        })
                                        if(found){
                                            
                                            $('#promo-ind').show();
                                            if(stored_promo_code.discount_type == 0){
                                                $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                                                let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                                                let coupon_bookride_cost = bookride_cost * coupon_discount_percentage / 100;
                                                if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                                                coupon_discount_text = coupon_discount_percentage + "%";
                                                coupon_bookride_cost = bookride_cost - coupon_bookride_cost;
                                                $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                            }else{
                                                $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                                                let coupon_bookride_cost = (bookride_cost - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : bookride_cost - parseFloat(stored_promo_code.discount_value);
                                                coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                                                $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                            }
                                            
                                        }else{
                                            $('#promo-ind').hide();
                                            $('#bookride_cost_full').css('visibility','hidden');
                                        }
                                    }else{
                                        $('#promo-ind').show();
                                        if(stored_promo_code.discount_type == 0){
                                            $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                                            let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                                            let coupon_bookride_cost = bookride_cost * coupon_discount_percentage / 100;
                                            if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                                            coupon_discount_text = coupon_discount_percentage + "%";
                                            coupon_bookride_cost = bookride_cost - coupon_bookride_cost;
                                            $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                        }else{
                                            $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                                            let coupon_bookride_cost = (bookride_cost - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : bookride_cost - parseFloat(stored_promo_code.discount_value);
                                            coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                                            $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                        }
                                    }

                                }else{
                                    $('#promo-ind').hide();
                                    $('#bookride_cost_full').css('visibility','hidden');
                                }            
                            }else{
                                $('#promo-ind').hide();
                                $('#bookride_cost_full').css('visibility','hidden');
                            }

                            if(night_day){
                                //day
                                
                                $('#ride-detail-night').html('');
                                $('#ride-detail-fare').html($('#bookride_cost').html());
                                $('#ride-detail-min-fare').html(booking_currency_symbol + roundFare(parseFloat(ride_puc) + parseFloat(ride_doc)));
                                $('#ride-detail-cpk').html(booking_currency_symbol + ride_cpk);
                                $('#ride-detail-cpm').html(booking_currency_symbol + ride_cpm);
                                if(coupon_discount_text != ""){
                                    $('#ride-detail-coupon-discount').html(coupon_discount_text);
                                    $('#ride-detail-coupon-discount-cont').show();
                                }else{
                                    $('#ride-detail-coupon-discount-cont').hide();
                                }
                
                                if(peak_period_text != ""){
                                    $('#ride-detail-surge').html(peak_period_text);
                                    $('#ride-detail-surge-cont').show();
                                }else{
                                    $('#ride-detail-surge-cont').hide();
                                }
                                
                                $('#ride-detail-num-seats').html(ride_num_seats);
                    
                            }else{
                                //night
                                $('#ride-detail-night').html("(" + __('Night') + ")");
                                $('#ride-detail-fare').html($('#bookride_cost').html());
                                $('#ride-detail-min-fare').html(booking_currency_symbol + roundFare(parseFloat(nride_puc) + parseFloat(nride_doc)));
                                $('#ride-detail-cpk').html(booking_currency_symbol + nride_cpk);
                                $('#ride-detail-cpm').html(booking_currency_symbol + nride_cpm);
                                if(coupon_discount_text != ""){
                                    $('#ride-detail-coupon-discount').html(coupon_discount_text);
                                    $('#ride-detail-coupon-discount-cont').show();
                                }else{
                                    $('#ride-detail-coupon-discount-cont').hide();
                                }
                
                                if(peak_period_text != ""){
                                    $('#ride-detail-surge').html(peak_period_text);
                                    $('#ride-detail-surge-cont').show();
                                }else{
                                    $('#ride-detail-surge-cont').hide();
                                }
                                
                                $('#ride-detail-num-seats').html(ride_num_seats);
                    
                            }

                            return;
                        }

                        //********************************** list display**************************************** */

                        let vehicle_item_bookride_cost = 0.00;
                        ride_details_schd[selected_city_ride] = {};
                        ride_details[selected_city_ride].scheduled = 1;

                        ride_cpk = $(`#list-car-item-${selected_city_ride}`).data('cpk');
                        ride_cpm = $(`#list-car-item-${selected_city_ride}`).data('cpm');
                        ride_puc = $(`#list-car-item-${selected_city_ride}`).data('puc');
                        ride_doc = $(`#list-car-item-${selected_city_ride}`).data('doc');
                        ride_ind = $(`#list-car-item-${selected_city_ride}`).data('ind'); 

                        nride_cpk = $(`#list-car-item-${selected_city_ride}`).data('ncpk');
                        nride_cpm = $(`#list-car-item-${selected_city_ride}`).data('ncpm');
                        nride_puc = $(`#list-car-item-${selected_city_ride}`).data('npuc');
                        nride_doc = $(`#list-car-item-${selected_city_ride}`).data('ndoc');
                        nride_ind = $(`#list-car-item-${selected_city_ride}`).data('nind');

                        peak_period_enabled = parseInt($(`#list-car-item-${selected_city_ride}`).data('ppenabled'));
                        peak_period_start = parseInt($(`#list-car-item-${selected_city_ride}`).data('ppstart'));
                        peak_period_end = parseInt($(`#list-car-item-${selected_city_ride}`).data('ppend'));
                        peak_period_charge_type = parseInt($(`#list-car-item-${selected_city_ride}`).data('ppchargetype'));
                        peak_period_charge_value = parseFloat($(`#list-car-item-${selected_city_ride}`).data('ppchargevalue'));
                        peak_period_days = $(`#list-car-item-${selected_city_ride}`).data('ppdays');
                        computed_fare = parseInt($(`#list-car-item-${selected_city_ride}`).data('cfare'));
                        peak_period = 0;

                        set_shour = parseInt(routetariffs.result.nighttime.start_hour);
                        set_ehour = parseInt(routetariffs.result.nighttime.end_hour);

                        if(c_hours >= set_shour || c_hours <= set_ehour){
                            //Night time range
                            night_day = 0;
                            ride_details_schd[selected_city_ride].night_time = 1;
                            vehicle_item_bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * parseFloat(intra_city_distance));           
                            ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;

                            if(parseFloat(nride_ind)){

                                if(parseFloat(nride_ind) >= intra_city_distance){
                                    //vehicle_item_bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration));           
                                    vehicle_item_bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);           
                                    ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;
                                }else{
                                    vehicle_item_bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);
                                    vehicle_item_bookride_cost += (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * (parseFloat(intra_city_distance) - parseFloat(nride_ind)));           
                                    ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;
                                }                            
                            }
                        }else{
                            //outside night time range
                            night_day = 1;
                            ride_details_schd[selected_city_ride].night_time = 0;
                            vehicle_item_bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * parseFloat(intra_city_distance));           
                            ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;

                            if(parseFloat(ride_ind)){

                                if(parseFloat(ride_ind) >= intra_city_distance){
                                    //vehicle_item_bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration));           
                                    vehicle_item_bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);           
                                    ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;
                                }else{
                                    vehicle_item_bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);
                                    vehicle_item_bookride_cost += (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * (parseFloat(intra_city_distance) - parseFloat(ride_ind)));           
                                    ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;
                                }
                                
                            }

                        }


                        if(typeof matched_zones_fare == 'object' && matched_zones_fare.hasOwnProperty('fare_type1') && selected_state_id == 0){
                            if(matched_zones_fare.fare_type1 == 1){
                                vehicle_item_bookride_cost *= parseFloat(matched_zones_fare.fare_value1);
                            }else if(matched_zones_fare.fare_type1 == 2){
                                vehicle_item_bookride_cost += parseFloat(matched_zones_fare.fare_value1);
                            }

                            if(matched_zones_fare.fare_type2 == 1){
                                vehicle_item_bookride_cost *= parseFloat(matched_zones_fare.fare_value2);
                            }else if(matched_zones_fare.fare_type2 == 2){
                                vehicle_item_bookride_cost += parseFloat(matched_zones_fare.fare_value2);
                            }

                            ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;
                            
                        }

                        
                        ride_details_schd[selected_city_ride].peak_period_text = "";
                        peak_period = 0;
                        if(peak_period_enabled){ //check if peak period charge is enabled for this car
                            
                            if(typeof peak_period_days == 'object'){
                            for(var i = 0;i < peak_period_days.length;i++){

                                if(peak_period_days[i] == c_day_week || peak_period_days[i] - 7 == c_day_week){ //check if the day is part of the peak period days. had to correct for mismatch in sunday as javascript getDay() has sunday as 0, monday 1...
                                    //day of the week is part of peak period days
                                    
                                    if(c_hours >= peak_period_start && c_hours <= peak_period_end){
                                        //peak period, compute booking cost
                                        peak_period = 1;
                                        if(peak_period_charge_type){
                                            ride_details_schd[selected_city_ride].peak_period_text = peak_period_charge_value + "X";
                                            vehicle_item_bookride_cost = vehicle_item_bookride_cost * peak_period_charge_value;
                                            ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;
                                        }else{
                                            ride_details_schd[selected_city_ride].peak_period_text = "+" + peak_period_charge_value;
                                            vehicle_item_bookride_cost = vehicle_item_bookride_cost + peak_period_charge_value;
                                            ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost;
                                        }                       
                                    
                                    }
                                    break;
                                }


                            }
                            } 
                        }

                        
                        let vehicle_item_bookride_cost_fixed = Math.round(vehicle_item_bookride_cost * 100) / 100;
                        vehicle_item_bookride_cost_fixed = vehicle_item_bookride_cost_fixed.toFixed(2);
                        vehicle_item_bookride_cost_fixed = roundFare(vehicle_item_bookride_cost_fixed);
                        $(`#list-bookride-cost-${selected_city_ride}`).html(booking_currency_symbol + vehicle_item_bookride_cost_fixed);
                        $(`#list-bookride-cost-full-${selected_city_ride}`).html(booking_currency_symbol + vehicle_item_bookride_cost_fixed);
                        ride_details_schd[selected_city_ride].bookride_cost = vehicle_item_bookride_cost_fixed;
                        bookride_cost = vehicle_item_bookride_cost_fixed;
                        booking_cost_h = md5("projectgics" + bookride_cost.toString());
                                
                        
                        //show promo code discount price if available

                        ride_details_schd[selected_city_ride].coupon_discount_text = "";        
                        if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
                            $(`#list-bookride-cost-full-${selected_city_ride}`).css('visibility','visible');
                            if(selected_route_id == stored_promo_code.city_id && vehicle_item_bookride_cost_fixed >= stored_promo_code.min_fare){

                                let coupon_vehicles = stored_promo_code.coupon_v
                                if(coupon_vehicles !=''){
                                    let c_v_ids = coupon_vehicles.split(',');
                                    let found = 0;
                                    c_v_ids.forEach(function(val,indx){
                                        if(val == selected_city_ride)found = 1;
                                    })
                                    if(found){
                                        
                                        //$('#promo-ind').show();
                                        if(stored_promo_code.discount_type == 0){
                                            //$('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                                            let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                                            let coupon_bookride_cost = vehicle_item_bookride_cost_fixed * coupon_discount_percentage / 100;
                                            if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                                            ride_details_schd[selected_city_ride].coupon_discount_text = coupon_discount_percentage + "%";
                                            coupon_bookride_cost = vehicle_item_bookride_cost_fixed - coupon_bookride_cost;
                                            $(`#list-bookride-cost-${selected_city_ride}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                            
                                        }else{
                                            //$('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                                            let coupon_bookride_cost = (vehicle_item_bookride_cost_fixed - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : vehicle_item_bookride_cost_fixed - parseFloat(stored_promo_code.discount_value);
                                            ride_details_schd[selected_city_ride].coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                                            $(`#list-bookride-cost-${selected_city_ride}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                            
                                        }
                                        
                                    }else{
                                        //$('#promo-ind').hide();
                                        $(`#list-bookride-cost-full-${selected_city_ride}`).css('visibility','hidden');
                                    }
                                }else{
                                    //$('#promo-ind').show();
                                    if(stored_promo_code.discount_type == 0){
                                        //$('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                                        let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                                        let coupon_bookride_cost = vehicle_item_bookride_cost_fixed * coupon_discount_percentage / 100;
                                        if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                                        ride_details_schd[selected_city_ride].coupon_discount_text = coupon_discount_percentage + "%";
                                        coupon_bookride_cost = vehicle_item_bookride_cost_fixed - coupon_bookride_cost;
                                        $(`#list-bookride-cost-${selected_city_ride}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                        
                                    }else{
                                        //$('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                                        let coupon_bookride_cost = (vehicle_item_bookride_cost_fixed - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : vehicle_item_bookride_cost_fixed - parseFloat(stored_promo_code.discount_value);
                                        ride_details_schd[selected_city_ride].coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                                        $(`#list-bookride-cost-${selected_city_ride}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                        
                                    }
                                }

                            }else{
                                //$('#promo-ind').hide();
                                $(`#list-bookride-cost-full-${selected_city_ride}`).css('visibility','hidden');
                            }            
                        }else{
                            //$('#promo-ind').hide();
                            $(`#list-bookride-cost-full-${selected_city_ride}`).css('visibility','hidden');
                        }


                        //update ride details info page
                        if(ride_details_schd[selected_city_ride].night_time == 0){
                            //day
                            
                            $('#ride-detail-night').html('');
                            $('#ride-detail-fare').html($(`#list-bookride-cost-${selected_city_ride}`).html());
                            if(ride_details_schd[selected_city_ride].coupon_discount_text != ""){
                                $('#ride-detail-coupon-discount-cont').show();
                                $('#ride-detail-coupon-discount').html(ride_details_schd[selected_city_ride].coupon_discount_text);
                            }else{
                                $('#ride-detail-coupon-discount-cont').hide();
                            }
            
                            if(ride_details_schd[selected_city_ride].peak_period_text != ""){
                                $('#ride-detail-surge-cont').show();
                                $('#ride-detail-surge').html(ride_details_schd[selected_city_ride].peak_period_text);
                            }else{
                                $('#ride-detail-surge-cont').hide();
                            }

                        }else{
                            //night
                            $('#ride-detail-night').html("(" + __('Night') + ")");
                            $('#ride-detail-fare').html($(`#list-bookride-cost-${selected_city_ride}`).html());
                            if(ride_details_schd[selected_city_ride].coupon_discount_text != ""){
                                $('#ride-detail-coupon-discount-cont').show();
                                $('#ride-detail-coupon-discount').html(ride_details_schd[selected_city_ride].coupon_discount_text);
                            }else{
                                $('#ride-detail-coupon-discount-cont').hide();
                            }
            
                            if(ride_details_schd[selected_city_ride].peak_period_text != ""){
                                $('#ride-detail-surge-cont').show();
                                $('#ride-detail-surge').html(ride_details_schd[selected_city_ride].peak_period_text);
                            }else{
                                $('#ride-detail-surge-cont').hide();
                            }
                            

                        }



                        
                        
                },
                cancel : function(){
                    return;
                },
                error: function(){
                    return;
                }
            })
          }

        });

        

        if(app_settings.hasOwnProperty('vehicle_sel_disp_type') && app_settings.vehicle_sel_disp_type == 1){ //for slider vehicle selection display

            selected_city_ride = $('.owl-carousel .owl-item').eq(0).find('img').data('rideid');

            if(rides_proximity){ 
                if(rides_proximity.hasOwnProperty(selected_city_ride)){
                    $('#ride-availability').html(__('{---1} minutes away', [rides_proximity[selected_city_ride].eta]));
                    $('#pickup-addr-sel-ride-busy').hide();
                    $('#pickup-addr-sel-ride-ariv-unit').show();
                    $('#pickup-addr-sel-ride-ariv-time').show();
                }else{
                    $('#ride-availability').html(__('Busy'));
                    $('#pickup-addr-sel-ride-busy').show();
                    $('#pickup-addr-sel-ride-ariv-unit').hide();
                    $('#pickup-addr-sel-ride-ariv-time').hide();
                }
            }else{
                $('#ride-availability').html(__('Busy'));
                $('#pickup-addr-sel-ride-busy').show();
                $('#pickup-addr-sel-ride-ariv-unit').hide();
                $('#pickup-addr-sel-ride-ariv-time').hide();
            }

            $('#ride-details-img').attr('src', $(`#uniq-car-type-id-${selected_city_ride}`).attr('src'));

            $('#car-name').html($('.owl-carousel .owl-item').eq(0).find('img').data('title'));
            $('#ride-detail-vehicle-title').html($('.owl-carousel .owl-item').eq(0).find('img').data('title'));
            let v_title = $('.owl-carousel .owl-item').eq(0).find('img').data('title');
            $('#bookride').html(__('Book a {---1}',[v_title]));
            
            //$('#route-ride-title').html($('.owl-carousel .owl-item').eq(0).find('img').html());
            $('#route-ride-desc').html($('.owl-carousel .owl-item').eq(0).find('img').data('ridedesc'));

            ride_num_seats = $('.owl-carousel .owl-item').eq(0).find('img').data('numseats');
            $('#ride-capacity').html(ride_num_seats);

            ride_cpk = $('.owl-carousel .owl-item').eq(0).find('img').data('cpk');
            ride_cpm = $('.owl-carousel .owl-item').eq(0).find('img').data('cpm');
            ride_puc = $('.owl-carousel .owl-item').eq(0).find('img').data('puc');
            ride_doc = $('.owl-carousel .owl-item').eq(0).find('img').data('doc');
            ride_ind = $('.owl-carousel .owl-item').eq(0).find('img').data('ind');
            ride_hrcph = $('.owl-carousel .owl-item').eq(0).find('img').data('hrcph');
            ride_hrdist = $('.owl-carousel .owl-item').eq(0).find('img').data('hrdist');
             

            nride_cpk = $('.owl-carousel .owl-item').eq(0).find('img').data('ncpk');
            nride_cpm = $('.owl-carousel .owl-item').eq(0).find('img').data('ncpm');
            nride_puc = $('.owl-carousel .owl-item').eq(0).find('img').data('npuc');
            nride_doc = $('.owl-carousel .owl-item').eq(0).find('img').data('ndoc');
            nride_ind = $('.owl-carousel .owl-item').eq(0).find('img').data('nind');
            nride_hrcph = $('.owl-carousel .owl-item').eq(0).find('img').data('nhrcph');
            nride_hrdist = $('.owl-carousel .owl-item').eq(0).find('img').data('nhrdist');
            

            peak_period_enabled = parseInt($('.owl-carousel .owl-item').eq(0).find('img').data('ppenabled'));
            peak_period_start = parseInt($('.owl-carousel .owl-item').eq(0).find('img').data('ppstart'));
            peak_period_end = parseInt($('.owl-carousel .owl-item').eq(0).find('img').data('ppend'));
            peak_period_charge_type = parseInt($('.owl-carousel .owl-item').eq(0).find('img').data('ppchargetype'));
            peak_period_charge_value = parseFloat($('.owl-carousel .owl-item').eq(0).find('img').data('ppchargevalue'));
            peak_period_days = $('.owl-carousel .owl-item').eq(0).find('img').data('ppdays');
            computed_fare = parseInt($('.owl-carousel .owl-item').eq(0).find('img').data('cfare'));
            hourly_rate_enabled = parseInt($('.owl-carousel .owl-item').eq(0).find('img').data('hren')); 
            peak_period = 0;            
            

            var set_shour = parseInt(routetariffs.result.nighttime.start_hour);
            var set_ehour = parseInt(routetariffs.result.nighttime.end_hour);

            if(c_hours >= set_shour || c_hours <= set_ehour){
                //Night time range
                night_day = 0;
                bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * parseFloat(intra_city_distance));    
                
                if(parseFloat(nride_ind)){

                    if(parseFloat(nride_ind) >= intra_city_distance){
                        //bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration));           
                        bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);           
                    }else{
                        bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);
                        bookride_cost += (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * (parseFloat(intra_city_distance) - parseFloat(nride_ind)));           
                    }                            
                }

                if(service_mode ==1){
                    if(hourly_rate_enabled){
                        bookride_cost = parseFloat(nride_hrcph);
                    }                    
                }

            }else{
                //outside night time range
                night_day = 1;
                bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * parseFloat(intra_city_distance));           

                if(parseFloat(ride_ind)){

                    if(parseFloat(ride_ind) >= intra_city_distance){
                        //bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration));           
                        bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);           
                    }else{
                        bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);
                        bookride_cost += (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * (parseFloat(intra_city_distance) - parseFloat(ride_ind)));           
                    }
                    
                }

                if(service_mode ==1){
                    if(hourly_rate_enabled){
                        bookride_cost = parseFloat(ride_hrcph);
                    }                    
                }

            }

            if(typeof matched_zones_fare == 'object' && matched_zones_fare.hasOwnProperty('fare_type1') && selected_state_id == 0){
                if(matched_zones_fare.fare_type1 == 1){ 
                    bookride_cost *= parseFloat(matched_zones_fare.fare_value1);
                }else if(matched_zones_fare.fare_type1 == 2){
                    bookride_cost += parseFloat(matched_zones_fare.fare_value1);
                }

                if(matched_zones_fare.fare_type2 == 1){
                    bookride_cost *= parseFloat(matched_zones_fare.fare_value2);
                }else if(matched_zones_fare.fare_type2 == 2){
                    bookride_cost += parseFloat(matched_zones_fare.fare_value2);
                }
                
            }
            
            peak_period_text = "";
            peak_period = 0;
            if(peak_period_enabled){ //check if peak period charge is enabled for this car
                
                if(typeof peak_period_days == 'object'){
                for(var i = 0;i < peak_period_days.length;i++){

                    if(peak_period_days[i] == c_day_week || peak_period_days[i] - 7 == c_day_week){ //check if the day is part of the peak period days. had to correct for mismatch in sunday as javascript getDay() has sunday as 0, monday 1...
                        //day of the week is part of peak period days
                        
                        if(c_hours >= peak_period_start && c_hours <= peak_period_end){
                            //peak period, compute booking cost
                            peak_period = 1;
                            if(peak_period_charge_type){
                                peak_period_text = peak_period_charge_value + "X";
                                bookride_cost = bookride_cost * peak_period_charge_value;
                            }else{
                                peak_period_text = "+" + peak_period_charge_value;
                                bookride_cost = bookride_cost + peak_period_charge_value;
                            }                       
                        
                        }
                        break;
                    }


                }
                } 
            }

            
            let bookride_cost_fixed = Math.round(bookride_cost * 100) / 100;
            bookride_cost_fixed = bookride_cost_fixed.toFixed(2);
            bookride_cost_fixed = roundFare(bookride_cost_fixed);
            $('#bookride_cost').html(booking_currency_symbol + bookride_cost_fixed);
            $('#bookride_cost_full').html(booking_currency_symbol + bookride_cost_fixed);

            if(service_mode ==1){
                if(hourly_rate_enabled){
                    $('#bookride_cost').html(booking_currency_symbol + bookride_cost_fixed + " / " + __('Hour'));
                    $('#bookride_cost_full').html(booking_currency_symbol + bookride_cost_fixed + " / " + __('Hour'));
                }else{
                    $('#bookride_cost').html(booking_currency_symbol + bookride_cost_fixed + " (" + __('Minimum') + ")");
                    $('#bookride_cost_full').html(booking_currency_symbol + bookride_cost_fixed + " (" + __('Minimum') + ")");
                }                    
            }
                    
            bookride_cost = bookride_cost_fixed;
            booking_cost_h = md5("projectgics" + bookride_cost.toString());

            //show promo code discount price if available

            coupon_discount_text = "";        
            if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
                $('#bookride_cost_full').css('visibility','visible');
                if(selected_route_id == stored_promo_code.city_id && bookride_cost >= stored_promo_code.min_fare){

                    let coupon_vehicles = stored_promo_code.coupon_v
                    if(coupon_vehicles !=''){
                        let c_v_ids = coupon_vehicles.split(',');
                        let found = 0;
                        c_v_ids.forEach(function(val,indx){
                            if(val == selected_city_ride)found = 1;
                        })
                        if(found){
                            
                            $('#promo-ind').show();
                            if(stored_promo_code.discount_type == 0){
                                $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                                let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                                let coupon_bookride_cost = bookride_cost * coupon_discount_percentage / 100;
                                if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                                coupon_discount_text = coupon_discount_percentage + "%";
                                coupon_bookride_cost = bookride_cost - coupon_bookride_cost;
                                $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                if(service_mode ==1){
                                    if(hourly_rate_enabled){
                                        $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                    }else{
                                        $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                    }                    
                                }
                            }else{
                                $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                                let coupon_bookride_cost = (bookride_cost - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : bookride_cost - parseFloat(stored_promo_code.discount_value);
                                coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                                $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));

                                if(service_mode ==1){
                                    if(hourly_rate_enabled){
                                        $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                    }else{
                                        $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                    }                    
                                }

                            }
                            
                        }else{
                            $('#promo-ind').hide();
                            $('#bookride_cost_full').css('visibility','hidden');
                        }
                    }else{
                        $('#promo-ind').show();
                        if(stored_promo_code.discount_type == 0){
                            $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                            let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                            let coupon_bookride_cost = bookride_cost * coupon_discount_percentage / 100;
                            if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                            coupon_discount_text = coupon_discount_percentage + "%";
                            coupon_bookride_cost = bookride_cost - coupon_bookride_cost;
                            $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                            if(service_mode ==1){
                                if(hourly_rate_enabled){
                                    $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                }else{
                                    $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                }                    
                            }
                        }else{
                            $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                            let coupon_bookride_cost = (bookride_cost - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : bookride_cost - parseFloat(stored_promo_code.discount_value);
                            coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                            $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                            if(service_mode ==1){
                                if(hourly_rate_enabled){
                                    $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                }else{
                                    $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                }                    
                            }
                        }
                    }

                }else{
                    $('#promo-ind').hide();
                    $('#bookride_cost_full').css('visibility','hidden');
                }            
            }else{
                $('#promo-ind').hide();
                $('#bookride_cost_full').css('visibility','hidden');
            }

            if(service_mode ==1){

                //handle display of options button for hourly rate
                $('#bookride-options').css('width', '0');
                $('#bookride-options').css('visibility', 'hidden');
                $('#bookride-options').off();

                if(hourly_rate_enabled){
                    $('#bookride-options').css('visibility', 'visible');
                    $('#bookride-options').css('width', '150px');                    
                    $('#bookride-options').off().on('click',showHourlyRateOptionDlg);
                }
            }

            
            

            if(night_day){
                //day
                
                $('#ride-detail-night').html('');
                $('#ride-detail-fare').html($('#bookride_cost').html());
                $('#ride-detail-min-fare').html(booking_currency_symbol + roundFare(parseFloat(ride_puc) + parseFloat(ride_doc)));
                $('#ride-detail-cpk').html(booking_currency_symbol + ride_cpk);
                $('#ride-detail-cpm').html(booking_currency_symbol + ride_cpm);
                if(coupon_discount_text != ""){
                    $('#ride-detail-coupon-discount').html(coupon_discount_text);
                    $('#ride-detail-coupon-discount-cont').show();
                }else{
                    $('#ride-detail-coupon-discount-cont').hide();
                }

                if(peak_period_text != ""){
                    
                }else{
                    $('#ride-detail-surge-cont').hide();
                }

                if(service_mode ==1){
                    if(hourly_rate_enabled){                        
                        $('#ride-detail-hourly').html(booking_currency_symbol + ride_hrcph);
                        $('#ride-detail-hourly-rate').show();
                    }else{
                        $('#ride-detail-hourly-rate').hide();
                    }                    
                }else{
                    $('#ride-detail-hourly-rate').hide();
                }
                
                $('#ride-detail-num-seats').html(ride_num_seats);

            }else{

                //night
                $('#ride-detail-night').html("(" + __('Night') + ")");
                $('#ride-detail-fare').html($('#bookride_cost').html());
                $('#ride-detail-min-fare').html(booking_currency_symbol + roundFare(parseFloat(nride_puc) + parseFloat(nride_doc)));
                $('#ride-detail-cpk').html(booking_currency_symbol + nride_cpk);
                $('#ride-detail-cpm').html(booking_currency_symbol + nride_cpm);
                if(coupon_discount_text != ""){
                    $('#ride-detail-coupon-discount').html(coupon_discount_text);
                    $('#ride-detail-coupon-discount-cont').show();
                }else{
                    $('#ride-detail-coupon-discount-cont').hide();
                }

                if(peak_period_text != ""){
                    $('#ride-detail-surge').html(peak_period_text);
                    $('#ride-detail-surge-cont').show();
                }else{
                    $('#ride-detail-surge-cont').hide();
                }

                if(service_mode ==1){
                    if(hourly_rate_enabled){                        
                        $('#ride-detail-hourly').html(booking_currency_symbol + nride_hrcph);
                        $('#ride-detail-hourly-rate').show();
                    }else{
                        $('#ride-detail-hourly-rate').hide();
                    }                    
                }else{
                    $('#ride-detail-hourly-rate').hide();
                }
                
                $('#ride-detail-num-seats').html(ride_num_seats);

            }

        }else{ 
            
            //for list vehicle selection display
            

            $('#vehicle-list-container .car-list-items').each(function(){

                              
                let v_ride_id = $(this).data('rideid');
                selected_city_ride = v_ride_id;
                let vehicle_item_bookride_cost = 0.00;
                ride_details[v_ride_id] = {};
                ride_details[v_ride_id].scheduled = 0; 

                $(`#list-ride-capacity-${v_ride_id}`).html($(this).data('numseats'));

                ride_cpk = $(this).data('cpk');
                ride_cpm = $(this).data('cpm');
                ride_puc = $(this).data('puc');
                ride_doc = $(this).data('doc');
                ride_ind = $(this).data('ind'); 
                ride_hrcph = $(this).data('hrcph');
                ride_hrdist = $(this).data('hrdist');

                nride_cpk = $(this).data('ncpk');
                nride_cpm = $(this).data('ncpm');
                nride_puc = $(this).data('npuc');
                nride_doc = $(this).data('ndoc');
                nride_ind = $(this).data('nind');
                nride_hrcph = $(this).data('nhrcph');
                nride_hrdist = $(this).data('nhrdist');

                peak_period_enabled = parseInt($(this).data('ppenabled'));
                peak_period_start = parseInt($(this).data('ppstart'));
                peak_period_end = parseInt($(this).data('ppend'));
                peak_period_charge_type = parseInt($(this).data('ppchargetype'));
                peak_period_charge_value = parseFloat($(this).data('ppchargevalue'));
                peak_period_days = $(this).data('ppdays');
                computed_fare = parseInt($(this).data('cfare'));
                hourly_rate_enabled = parseInt($(this).data('hren'));
                ride_details[v_ride_id].hren = hourly_rate_enabled;
                ride_details[v_ride_id].hrcph = ride_hrcph;
                ride_details[v_ride_id].nhrcph = nride_hrcph; 
                peak_period = 0;

                let set_shour = parseInt(routetariffs.result.nighttime.start_hour);
                let set_ehour = parseInt(routetariffs.result.nighttime.end_hour);

                if(c_hours >= set_shour || c_hours <= set_ehour){
                    //Night time range
                    night_day = 0;
                    ride_details[v_ride_id].night_time = 1;
                    vehicle_item_bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * parseFloat(intra_city_distance));           
                    ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;

                    if(parseFloat(nride_ind)){

                        if(parseFloat(nride_ind) >= intra_city_distance){
                            //vehicle_item_bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration));           
                            vehicle_item_bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);           
                            ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;
                        }else{
                            vehicle_item_bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);
                            vehicle_item_bookride_cost += (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * (parseFloat(intra_city_distance) - parseFloat(nride_ind)));           
                            ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;
                        }                            
                    }

                    if(service_mode ==1){
                        if(hourly_rate_enabled){
                            vehicle_item_bookride_cost = parseFloat(nride_hrcph);
                        }                    
                    }

                }else{
                    //outside night time range
                    night_day = 1;
                    ride_details[v_ride_id].night_time = 0;
                    vehicle_item_bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * parseFloat(intra_city_distance));           
                    ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;

                    if(parseFloat(ride_ind)){

                        if(parseFloat(ride_ind) >= intra_city_distance){
                            //vehicle_item_bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration));           
                            vehicle_item_bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);           
                            ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;
                        }else{
                            vehicle_item_bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);
                            vehicle_item_bookride_cost += (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * (parseFloat(intra_city_distance) - parseFloat(ride_ind)));           
                            ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;
                        }
                        
                    }

                    if(service_mode ==1){
                        if(hourly_rate_enabled){
                            vehicle_item_bookride_cost = parseFloat(ride_hrcph);
                        }                    
                    }

                }

                if(typeof matched_zones_fare == 'object' && matched_zones_fare.hasOwnProperty('fare_type1') && selected_state_id == 0){
                    if(matched_zones_fare.fare_type1 == 1){
                        vehicle_item_bookride_cost *= parseFloat(matched_zones_fare.fare_value1);
                    }else if(matched_zones_fare.fare_type1 == 2){
                        vehicle_item_bookride_cost += parseFloat(matched_zones_fare.fare_value1);
                    }

                    if(matched_zones_fare.fare_type2 == 1){
                        vehicle_item_bookride_cost *= parseFloat(matched_zones_fare.fare_value2);
                    }else if(matched_zones_fare.fare_type2 == 2){
                        vehicle_item_bookride_cost += parseFloat(matched_zones_fare.fare_value2);
                    }

                    ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;
                    
                }
                
                ride_details[v_ride_id].peak_period_text = "";
                peak_period = 0;
                if(peak_period_enabled){ //check if peak period charge is enabled for this car
                    
                    if(typeof peak_period_days == 'object'){
                    for(var i = 0;i < peak_period_days.length;i++){

                        if(peak_period_days[i] == c_day_week || peak_period_days[i] - 7 == c_day_week){ //check if the day is part of the peak period days. had to correct for mismatch in sunday as javascript getDay() has sunday as 0, monday 1...
                            //day of the week is part of peak period days
                            
                            if(c_hours >= peak_period_start && c_hours <= peak_period_end){
                                //peak period, compute booking cost
                                peak_period = 1;
                                if(peak_period_charge_type){
                                    ride_details[v_ride_id].peak_period_text = peak_period_charge_value + "X";
                                    vehicle_item_bookride_cost = vehicle_item_bookride_cost * peak_period_charge_value;
                                    ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;
                                }else{
                                    ride_details[v_ride_id].peak_period_text = "+" + peak_period_charge_value;
                                    vehicle_item_bookride_cost = vehicle_item_bookride_cost + peak_period_charge_value;
                                    ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost;
                                }                       
                            
                            }
                            break;
                        }


                    }
                    } 
                }

                
                let vehicle_item_bookride_cost_fixed = Math.round(vehicle_item_bookride_cost * 100) / 100;
                vehicle_item_bookride_cost_fixed = vehicle_item_bookride_cost_fixed.toFixed(2);
                vehicle_item_bookride_cost_fixed = roundFare(vehicle_item_bookride_cost_fixed);
                $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + vehicle_item_bookride_cost_fixed);
                $(`#list-bookride-cost-full-${v_ride_id}`).html(booking_currency_symbol + vehicle_item_bookride_cost_fixed);
                ride_details[v_ride_id].bookride_cost = vehicle_item_bookride_cost_fixed;
                ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + vehicle_item_bookride_cost_fixed
                ride_details[v_ride_id].bookride_cost_full = vehicle_item_bookride_cost_fixed;
                ride_details[v_ride_id].bookride_cost_full_text = booking_currency_symbol + vehicle_item_bookride_cost_fixed

                if(service_mode ==1){
                    if(hourly_rate_enabled){
                            ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + vehicle_item_bookride_cost_fixed + " / " + __('Hour');
                            ride_details[v_ride_id].bookride_cost_full_text = booking_currency_symbol + vehicle_item_bookride_cost_fixed + " / " + __('Hour');
                            $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + vehicle_item_bookride_cost_fixed + " / " + __('Hour'));
                            $(`#list-bookride-cost-full-${v_ride_id}`).html(booking_currency_symbol + vehicle_item_bookride_cost_fixed + " / " + __('Hour'));
                        }else{
                            ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + vehicle_item_bookride_cost_fixed + " (" + __('Minimum') + ")";
                            ride_details[v_ride_id].bookride_cost_full_text = booking_currency_symbol + vehicle_item_bookride_cost_fixed + " (" + __('Minimum') + ")";
                            $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + vehicle_item_bookride_cost_fixed + " (" + __('Minimum') + ")");
                            $(`#list-bookride-cost-full-${v_ride_id}`).html(booking_currency_symbol + vehicle_item_bookride_cost_fixed + " (" + __('Minimum') + ")");
                        }                    
                }
                
                        
                
                //show promo code discount price if available

                ride_details[v_ride_id].coupon_discount_text = "";
                      
                if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
                    $(`#list-bookride-cost-full-${v_ride_id}`).css('visibility','visible');                    
                    if(selected_route_id == stored_promo_code.city_id && vehicle_item_bookride_cost_fixed >= stored_promo_code.min_fare){

                        let coupon_vehicles = stored_promo_code.coupon_v
                        if(coupon_vehicles !=''){
                            let c_v_ids = coupon_vehicles.split(',');
                            let found = 0;
                            c_v_ids.forEach(function(val,indx){
                                if(val == selected_city_ride)found = 1;
                            })
                            if(found){
                                
                                //$('#promo-ind').show();
                                if(stored_promo_code.discount_type == 0){
                                    //$('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                                    let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                                    let coupon_bookride_cost = vehicle_item_bookride_cost_fixed * coupon_discount_percentage / 100;
                                    if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                                    ride_details[v_ride_id].coupon_discount_text = coupon_discount_percentage + "%";
                                    coupon_bookride_cost = vehicle_item_bookride_cost_fixed - coupon_bookride_cost;
                                    $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                    ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100);
                                    if(service_mode ==1){
                                        if(hourly_rate_enabled){
                                            ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour');
                                            $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                        }else{
                                            ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")";
                                            $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                        }                    
                                    }
                                    
                                }else{
                                    //$('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                                    let coupon_bookride_cost = (vehicle_item_bookride_cost_fixed - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : vehicle_item_bookride_cost_fixed - parseFloat(stored_promo_code.discount_value);
                                    ride_details[v_ride_id].coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                                    $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                    ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100);
                                    if(service_mode ==1){
                                        if(hourly_rate_enabled){
                                            ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour');
                                            $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                        }else{
                                            ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")";
                                            $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                        }                    
                                    }
                                }
                                
                            }else{
                                //$('#promo-ind').hide();
                                $(`#list-bookride-cost-full-${v_ride_id}`).css('visibility','hidden');
                                
                            }
                        }else{
                            //$('#promo-ind').show();
                            if(stored_promo_code.discount_type == 0){
                                //$('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                                let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                                let coupon_bookride_cost = vehicle_item_bookride_cost_fixed * coupon_discount_percentage / 100;
                                if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                                ride_details[v_ride_id].coupon_discount_text = coupon_discount_percentage + "%";
                                coupon_bookride_cost = vehicle_item_bookride_cost_fixed - coupon_bookride_cost;
                                $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100);
                                if(service_mode ==1){
                                    if(hourly_rate_enabled){
                                        ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour');
                                        $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                    }else{
                                        ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")";
                                        $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                    }                    
                                }
                                
                            }else{
                                //$('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                                let coupon_bookride_cost = (vehicle_item_bookride_cost_fixed - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : vehicle_item_bookride_cost_fixed - parseFloat(stored_promo_code.discount_value);
                                ride_details[v_ride_id].coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                                $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100);
                                if(service_mode ==1){
                                    if(hourly_rate_enabled){
                                        ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour');
                                        $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                    }else{
                                        ride_details[v_ride_id].bookride_cost_text = booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")";
                                        $(`#list-bookride-cost-${v_ride_id}`).html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                    }                    
                                }
                                
                            }
                        }

                    }else{
                        //$('#promo-ind').hide();
                        $(`#list-bookride-cost-full-${v_ride_id}`).css('visibility','hidden');
                    }            
                }else{
                    //$('#promo-ind').hide();
                    $(`#list-bookride-cost-full-${v_ride_id}`).css('visibility','hidden');
                }

                
            });

            selected_city_ride = $('#vehicle-list-container .car-list-items').eq(0).data('rideid');
            bookride_cost = ride_details[selected_city_ride].bookride_cost;
            booking_cost_h = md5("projectgics" + bookride_cost.toString());
            hourly_rate_enabled = $('#vehicle-list-container .car-list-items').eq(0).data('hren');
            
            $('#vehicle-list-container .car-list-items').removeClass('selected-car');
            $('#vehicle-list-container .car-list-items').eq(0).addClass('selected-car');
            let v_title = $('#vehicle-list-container .car-list-items').eq(0).data('title');
            $('#bookride').html(__('Book a {---1}',[v_title]));
            $(`#list-ride-info-${selected_city_ride}`).show();

            if(service_mode ==1){

                //handle display of options button for hourly rate
                $('#bookride-options').css('width', '0');
                $('#bookride-options').css('visibility', 'hidden');
                $('#bookride-options').off();

                if(hourly_rate_enabled){
                    $('#bookride-options').css('visibility', 'visible');
                    $('#bookride-options').css('width', '150px');                    
                    $('#bookride-options').off().on('click',showHourlyRateOptionDlg);
                }
            }


            $('.list-ride-avail-status-ind').html(__('Busy'));
            $('#pickup-addr-sel-ride-busy').show();
            $('#pickup-addr-sel-ride-ariv-unit').hide();
            $('#pickup-addr-sel-ride-ariv-time').hide();            

            
            if(rides_proximity && Object.keys(rides_proximity).length){
                
                
                if(rides_proximity.hasOwnProperty(selected_city_ride)){

                    $('#pickup-addr-sel-ride-busy').hide();
                    $('#pickup-addr-sel-ride-ariv-unit').show();
                    $('#pickup-addr-sel-ride-ariv-time').show();
                    $('#pickup-addr-sel-ride-ariv-unit').html('Min');
                    $('#pickup-addr-sel-ride-ariv-time').html(rides_proximity[selected_city_ride].eta);

                }else{
                    
                    $('#pickup-addr-sel-ride-busy').show();
                    $('#pickup-addr-sel-ride-ariv-unit').hide();
                    $('#pickup-addr-sel-ride-ariv-time').hide();
                }     

                for(key in rides_proximity){
                    $(`#list-ride-availability-${key}`).html(__('{---1} minutes away',[rides_proximity[key].eta]));
                }
                
            }
            

            

        }

        let touch_x_start;
        let touch_y_start;
        let touch_x_move;
        let touch_y_move;
        let current_el_pos;
        
        let el_ev_absorb_orig_h = $('#map-event-absorber').height(); 
        let device_screen_height = screen.height;
        let max_vehicle_list_height = device_screen_height - 100;
        let vehicle_list_content_height = number_of_city_vehicle * 70;
        let vehicle_list_expanded = false;

        let vehicle_list_animating = 0;




        if(number_of_city_vehicle > 2){

            $('#swipe-to-expand').html(__('Swipe up to view more options'));

            document.getElementById('map-event-absorber').addEventListener('click', function(e){
                collapseVehicleList();
            })

            

            document.getElementById('vehicle-list-container').addEventListener('touchstart', function(e){
                touch_x_start = e.touches[0].clientX;
                touch_y_start = e.touches[0].clientY;
                
                //$('#map-event-absorber').css('height', "100vh");

                //console.log(e);
            }, false);


            document.getElementById('vehicle-list-container').addEventListener('touchmove', function(e){

                if(vehicle_list_animating)return;
                
                if(!touch_x_start || !touch_y_start)return;
                touch_x_move = e.touches[0].clientX;
                touch_y_move = e.touches[0].clientY;

                let dy = touch_y_start - touch_y_move;

                let el_pos_change = Math.abs(dy);

                if(dy < 0){
                    //Swipe down
                    
                    collapseVehicleList();                  
                    
                    
                    
                }else{

                    

                    //Swipe up   

                    expandVehicleList();                   
                    
                                
                    
                }

            }, false);


            document.getElementById('vehicle-list-container').addEventListener('touchcancel', function(e){
                touch_x_start = null;
                touch_y_start = null;
                                
            }, false); 


            document.getElementById('vehicle-list-container').addEventListener('touchend', function(e){
                touch_x_start = null;
                touch_y_start = null;
                                
            }, false)
        }else{
            $('#swipe-to-expand').html('');
        }


        function collapseVehicleList(){

            if(vehicle_list_expanded == false)return;

            vehicle_list_expanded = false;

            $('#swipe-to-expand').html(__('Swipe up to view more options'));

            $('#slider-car-options').show();

            
            

            vehicle_list_animating = 1;
            $('#map-event-absorber').css('background-color','');              
            $('#map-event-absorber').height(vehicles_list_height + vehicle_sel_dlg_base_height);
            $('#vehicle-list-container').css('transform',`translateY(${0}px)`);
            setTimeout(function(){
                vehicle_list_animating = 0;
                /* $('#vehicle-list-container').css('height',`${vehicles_list_height + vehicle_sel_dlg_base_height}px`); 
                let el = document.getElementById('vehicle-list-container');
                let el_style = window.getComputedStyle(el);
                let el_matrix = new WebKitCSSMatrix(el_style.transform);         
                $('#map-event-absorber').height(vehicles_list_height + vehicle_sel_dlg_base_height); */
            },100);


        }

        function expandVehicleList(){

            if(vehicle_list_expanded == true)return;

            let vehicle_list_final_position = 0;

            vehicle_list_expanded = true;

            $('#swipe-to-expand').html(__('Swipe down to close'));

            $('#slider-car-options').hide();
            

            if((vehicle_list_content_height + vehicle_sel_dlg_base_height) >= max_vehicle_list_height){
                vehicle_list_final_position = max_vehicle_list_height - (vehicle_sel_dlg_base_height + vehicles_list_height)
            }else{
                let final_list_height = vehicle_list_content_height + vehicle_sel_dlg_base_height;
                vehicle_list_final_position = max_vehicle_list_height - (vehicle_sel_dlg_base_height + vehicles_list_height);
            }

            vehicle_list_animating = 1;
            $('#map-event-absorber').height(device_screen_height);
            $('#map-event-absorber').css('background-color','rgba(0,0,0,0.5)'); 
            $('#vehicle-list-container').css('height',`${vehicle_list_content_height + vehicle_sel_dlg_base_height + (max_vehicle_list_height - (vehicle_list_content_height + vehicle_sel_dlg_base_height))}px`);
            $('#vehicle-list-container').css('transform',`translateY(-${vehicle_list_final_position}px)`);

            setTimeout(function(){
                vehicle_list_animating = 0;   
                /* let el = document.getElementById('vehicle-list-container');
                let el_style = window.getComputedStyle(el);
                let el_matrix = new WebKitCSSMatrix(el_style.transform);         
                //$('#map-event-absorber').height(el_ev_absorb_orig_h + Math.abs(el_matrix.m42));                     
                $('#map-event-absorber').height(device_screen_height); */ 
            },100);

        }



        $('div.car-list-items').off().on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            selected_city_ride = $(this).data('rideid');
            hourly_rate_enabled = ride_details[selected_city_ride].hren;

            if(service_mode ==1){

                //handle display of options button for hourly rate
                $('#bookride-options').css('width', '0');
                $('#bookride-options').css('visibility', 'hidden');
                $('#bookride-options').off();

                if(ride_details[selected_city_ride].hren){
                    $('#bookride-options').css('visibility', 'visible');
                    $('#bookride-options').css('width', '150px');                    
                    $('#bookride-options').off().on('click',showHourlyRateOptionDlg);
                }
            }

            if(vehicle_list_expanded)collapseVehicleList();   
            
            if(rides_proximity && Object.keys(rides_proximity).length){
                
                
                if(rides_proximity.hasOwnProperty(selected_city_ride)){

                    $('#pickup-addr-sel-ride-busy').hide();
                    $('#pickup-addr-sel-ride-ariv-unit').show();
                    $('#pickup-addr-sel-ride-ariv-time').show();
                    $('#pickup-addr-sel-ride-ariv-unit').html('Min');
                    $('#pickup-addr-sel-ride-ariv-time').html(rides_proximity[selected_city_ride].eta);

                }else{
                    
                    $('#pickup-addr-sel-ride-busy').show();
                    $('#pickup-addr-sel-ride-ariv-unit').hide();
                    $('#pickup-addr-sel-ride-ariv-time').hide();
                }
                
            }else{
                $('#pickup-addr-sel-ride-busy').show();
                $('#pickup-addr-sel-ride-ariv-unit').hide();
                $('#pickup-addr-sel-ride-ariv-time').hide();
            }
            

            if(!$(this).hasClass('selected-car')){
                $('#vehicle-list-container .car-list-items').removeClass('selected-car');
                $(this).addClass('selected-car');
                
                $('#bookride').html(__('Book a {---1}',[$(this).data('title')]));
                
                current_dt = new Date();
                scheduled_ride = 0;
                ride_details[selected_city_ride].scheduled = 0;
                hourly_rate_user_set_num_hours = 1;

                bookride_cost = ride_details[selected_city_ride].bookride_cost;
                booking_cost_h = md5("projectgics" + bookride_cost.toString());

                //reset all vehicle prices just in case the scheduled ride option was selected
                for(key in ride_details){
                    $(`#list-bookride-cost-${key}`).html(ride_details[key].bookride_cost_text);
                    $(`#list-ride-info-${key}`).hide();
                    if(ride_details[key].coupon_discount_text != ""){
                        $(`#list-bookride-cost-full-${key}`).html(ride_details[key].bookride_cost_full_text);
                        $(`#list-bookride-cost-full-${key}`).css('visibility','visible'); 
                    }else{
                        $(`#list-bookride-cost-full-${key}`).css('visibility','hidden');
                    }
                }
                $(`#list-ride-info-${selected_city_ride}`).show();

                //reorder if selected items is below the first two vehicles
                let sel_car_el_index = $('#vehicle-list-container .car-list-items').index($(this));
                if(sel_car_el_index > 1){
                    
                    let first_car_item_id = $('#vehicle-list-container .car-list-items').eq(0).data('rideid');
                    $(`#list-car-item-${selected_city_ride}`).insertBefore(`#list-car-item-${first_car_item_id}`);
                    //animate to show change
                    $(`#list-car-item-${selected_city_ride}`).removeClass("bounceIn animated").addClass("bounceIn animated").one('animationend', function(){
                        $(this).removeClass("bounceIn animated"); 
                    })

                }

                return;
            }

                        

            //show ride details info page
            if(ride_details[selected_city_ride].night_time == 0){
                //day
                
                
                $('#ride-details-img').attr('src', $(this).data('img'));
                $('#ride-detail-vehicle-title').html($(this).data('title'));
                $('#ride-detail-vehicle-desc').html($(this).data('ridedesc'));
                $('#ride-detail-fare').html($(`#list-bookride-cost-${selected_city_ride}`).html());
                $('#ride-detail-min-fare').html(booking_currency_symbol + roundFare(parseFloat($(this).data('puc')) + parseFloat($(this).data('doc'))));
                $('#ride-detail-cpk').html(booking_currency_symbol + parseFloat($(this).data('cpk')));
                $('#ride-detail-cpm').html(booking_currency_symbol + parseFloat($(this).data('cpm')));

                if(ride_details[selected_city_ride].scheduled == 0){ //skip if scheduled is set as it is already updated in the date set function

                    bookride_cost = ride_details[selected_city_ride].bookride_cost;
                    booking_cost_h = md5("projectgics" + bookride_cost.toString());

                    $('#ride-detail-night').html('');

                    if(ride_details[selected_city_ride].coupon_discount_text != ""){
                        $('#ride-detail-coupon-discount-cont').show();
                        $('#ride-detail-coupon-discount').html(ride_details[selected_city_ride].coupon_discount_text);
                    }else{
                        $('#ride-detail-coupon-discount-cont').hide();
                    }

                    if(ride_details[selected_city_ride].peak_period_text != ""){
                        $('#ride-detail-surge-cont').show();
                        $('#ride-detail-surge').html(ride_details[selected_city_ride].peak_period_text);
                    }else{
                        $('#ride-detail-surge-cont').hide();
                    }

                    if(service_mode ==1){
                        if(ride_details[selected_city_ride].hren){                        
                            $('#ride-detail-hourly').html(booking_currency_symbol + ride_details[selected_city_ride].hrcph);
                            $('#ride-detail-hourly-rate').show();
                        }else{
                            $('#ride-detail-hourly-rate').hide();
                        }                    
                    }else{
                        $('#ride-detail-hourly-rate').hide();
                    }

                }else{
                    //scheduled ride
                    bookride_cost = ride_details_schd[selected_city_ride].bookride_cost;
                    booking_cost_h = md5("projectgics" + bookride_cost.toString());
                }
                
                $('#ride-detail-num-seats').html($(this).data('numseats'));
                

            }else{

                //night
                
                $('#ride-details-img').attr('src', $(this).data('img'));
                $('#ride-detail-vehicle-title').html($(this).data('title'));
                $('#ride-detail-vehicle-desc').html($(this).data('ridedesc'));
                $('#ride-detail-fare').html($(`#list-bookride-cost-${selected_city_ride}`).html());
                $('#ride-detail-min-fare').html(booking_currency_symbol + roundFare(parseFloat($(this).data('npuc')) + parseFloat($(this).data('ndoc'))));
                $('#ride-detail-cpk').html(booking_currency_symbol + parseFloat($(this).data('ncpk')));
                $('#ride-detail-cpm').html(booking_currency_symbol + parseFloat($(this).data('ncpm')));

                if(ride_details[selected_city_ride].scheduled == 0){ //skip if scheduled is set as it is already updated in the date set function

                    bookride_cost = ride_details[selected_city_ride].bookride_cost;
                    booking_cost_h = md5("projectgics" + bookride_cost.toString());
                
                    $('#ride-detail-night').html("(" + __('Night') + ")");

                    if(ride_details[selected_city_ride].coupon_discount_text != ""){
                        $('#ride-detail-coupon-discount-cont').show();
                        $('#ride-detail-coupon-discount').html(ride_details[selected_city_ride].coupon_discount_text);
                    }else{
                        $('#ride-detail-coupon-discount-cont').hide();
                    }

                    if(ride_details[selected_city_ride].peak_period_text != ""){
                        $('#ride-detail-surge-cont').show();
                        $('#ride-detail-surge').html(ride_details[selected_city_ride].peak_period_text);
                    }else{
                        $('#ride-detail-surge-cont').hide();
                    }

                    if(service_mode ==1){
                        if(ride_details[selected_city_ride].hren){                        
                            $('#ride-detail-hourly').html(booking_currency_symbol + ride_details[selected_city_ride].nhrcph);
                            $('#ride-detail-hourly-rate').show();
                        }else{
                            $('#ride-detail-hourly-rate').hide();
                        }                    
                    }else{
                        $('#ride-detail-hourly-rate').hide();
                    }
                }else{
                    //scheduled ride
                    bookride_cost = ride_details_schd[selected_city_ride].bookride_cost;
                    booking_cost_h = md5("projectgics" + bookride_cost.toString());
                }

                $('#ride-detail-num-seats').html($(this).data('numseats'));
                

            }

            showridedetails();


        })






        $('.owl-carousel').on('changed.owl.carousel', function (e) {

            
          
          selected_city_ride = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('rideid');
          

            if(rides_proximity){
                if(rides_proximity.hasOwnProperty(selected_city_ride)){
                    $('#ride-availability').html(__('{---1} minutes away',[rides_proximity[selected_city_ride].eta]));
                    $('#pickup-addr-sel-ride-busy').hide();
                    $('#pickup-addr-sel-ride-ariv-unit').show();
                    $('#pickup-addr-sel-ride-ariv-time').show();
                }else{
                    $('#ride-availability').html(__('Busy'));
                    $('#pickup-addr-sel-ride-busy').show();
                    $('#pickup-addr-sel-ride-ariv-unit').hide();
                    $('#pickup-addr-sel-ride-ariv-time').hide();
                }
            }else{
                $('#ride-availability').html(__('Busy'));
                $('#pickup-addr-sel-ride-busy').show();
                $('#pickup-addr-sel-ride-ariv-unit').hide();
                $('#pickup-addr-sel-ride-ariv-time').hide();
            }

          $('#ride-details-img').attr('src', $(`#uniq-car-type-id-${selected_city_ride}`).attr('src'));

          ride_num_seats = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('numseats');
          $('#ride-capacity').html(ride_num_seats);
          
          let v_title = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('title');

          $('#car-name').html($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('title'));

          $('#bookride').html(__('Book a {---1}',[v_title]));
          
          
          $('#ride-detail-vehicle-title').html($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('title'));


          $('#route-ride-desc').html($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('title'));

          ride_cpk = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('cpk');
          ride_cpm = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('cpm');
          ride_puc = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('puc');
          ride_doc = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('doc');
          ride_ind = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ind');
          ride_hrcph = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('hrcph');
          ride_hrdist = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('hrdist');

          nride_cpk = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ncpk');
          nride_cpm = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ncpm');
          nride_puc = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('npuc');
          nride_doc = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ndoc');
          nride_ind = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('nind');
          nride_hrcph = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('nhrcph');
          nride_hrdist = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('nhrdist');


          peak_period_enabled = parseInt($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ppenabled'));
          peak_period_start = parseInt($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ppstart'));
          peak_period_end = parseInt($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ppend'));
          peak_period_charge_type = parseInt($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ppchargetype'));
          peak_period_charge_value = parseFloat($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ppchargevalue'));
          peak_period_days = $('.owl-carousel .owl-item').eq(e.item.index).find('img').data('ppdays');
          computed_fare = parseInt($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('cfare'));
          hourly_rate_enabled = parseInt($('.owl-carousel .owl-item').eq(e.item.index).find('img').data('hren'));
          hourly_rate_user_set_num_hours = 1;
          peak_period = 0;

          if(night_day){
             bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * parseFloat(intra_city_distance));           
             if(parseFloat(ride_ind)){

                if(parseFloat(ride_ind) >= intra_city_distance){
                    //bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc) + (parseFloat(ride_cpm) * parseFloat(intra_city_duration));           
                    bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);           
                }else{
                    bookride_cost = parseFloat(ride_puc) + parseFloat(ride_doc);
                    bookride_cost += (parseFloat(ride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(ride_cpk) * (parseFloat(intra_city_distance) - parseFloat(ride_ind)));           
                }
                
             }

            if(service_mode ==1){
                if(hourly_rate_enabled){
                    bookride_cost = parseFloat(ride_hrcph);
                }
            }
            
          }else{
            bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * parseFloat(intra_city_distance));           

            if(parseFloat(nride_ind)){

                if(parseFloat(nride_ind) >= intra_city_distance){
                    //bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc) + (parseFloat(nride_cpm) * parseFloat(intra_city_duration));           
                    bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);           
                }else{
                    bookride_cost = parseFloat(nride_puc) + parseFloat(nride_doc);
                    bookride_cost += (parseFloat(nride_cpm) * parseFloat(intra_city_duration)) + (parseFloat(nride_cpk) * (parseFloat(intra_city_distance) - parseFloat(nride_ind)));           
                }                            
            }

            if(service_mode ==1){
                if(hourly_rate_enabled){
                    bookride_cost = parseFloat(nride_hrcph);
                }
            }
          }

          if(typeof matched_zones_fare == 'object' && matched_zones_fare.hasOwnProperty('fare_type1') && selected_state_id == 0){
            if(matched_zones_fare.fare_type1 == 1){
                bookride_cost *= parseFloat(matched_zones_fare.fare_value1);
            }else if(matched_zones_fare.fare_type1 == 2){
                bookride_cost += parseFloat(matched_zones_fare.fare_value1);
            }

            if(matched_zones_fare.fare_type2 == 1){
                bookride_cost *= parseFloat(matched_zones_fare.fare_value2);
            }else if(matched_zones_fare.fare_type2 == 2){
                bookride_cost += parseFloat(matched_zones_fare.fare_value2);
            }
            
        }

          peak_period_text = "";
          peak_period = 0;
          if(peak_period_enabled){ //check if peak period charge is enabled for this car
            
              if(typeof peak_period_days == 'object'){
                for(var i = 0;i < peak_period_days.length;i++){

                  if(peak_period_days[i] == c_day_week || peak_period_days[i] - 7 == c_day_week){ //check if the day is part of the peak period days. had to correct for mismatch in sunday as javascript getDay() has sunday as 0, monday 1...
                      //day of the week is part of peak period days
                      
                      if(c_hours >= peak_period_start && c_hours <= peak_period_end){
                        //peak period, compute booking cost
                        peak_period = 1;
                        if(peak_period_charge_type){
                            peak_period_text = peak_period_charge_value + "X";
                            bookride_cost = bookride_cost * peak_period_charge_value;
                        }else{
                            peak_period_text = "+" + peak_period_charge_value;
                            bookride_cost = bookride_cost + peak_period_charge_value;
                        }                     
                        
                      }
                      break;
                  }


                }
              } 
          }

          

          let bookride_cost_fixed = Math.round(bookride_cost * 100) / 100;
            bookride_cost_fixed = bookride_cost_fixed.toFixed(2);
            bookride_cost_fixed = roundFare(bookride_cost_fixed);
            $('#bookride_cost').html(booking_currency_symbol + bookride_cost_fixed);
            $('#bookride_cost_full').html(booking_currency_symbol + bookride_cost_fixed);

            if(service_mode ==1){
                if(hourly_rate_enabled){
                    $('#bookride_cost').html(booking_currency_symbol + bookride_cost_fixed + " / " + __('Hour'));
                    $('#bookride_cost_full').html(booking_currency_symbol + bookride_cost_fixed + " / " + __('Hour'));
                }else{
                    $('#bookride_cost').html(booking_currency_symbol + bookride_cost_fixed + " (" + __('Minimum') + ")");
                    $('#bookride_cost_full').html(booking_currency_symbol + bookride_cost_fixed + " (" + __('Minimum') + ")");
                }                    
            }

            bookride_cost = bookride_cost_fixed;
          booking_cost_h = md5("projectgics" + bookride_cost.toString());

          //show promo code discount price if available

          coupon_discount_text = "";
          
            if(!!stored_promo_code && stored_promo_code.hasOwnProperty('promo_code')){
                $('#bookride_cost_full').css('visibility','visible');
                if(selected_route_id == stored_promo_code.city_id && bookride_cost >= stored_promo_code.min_fare){

                    let coupon_vehicles = stored_promo_code.coupon_v
                    if(coupon_vehicles !=''){
                        let c_v_ids = coupon_vehicles.split(',');
                        let found = 0;
                        c_v_ids.forEach(function(val,indx){
                            if(val == selected_city_ride)found = 1;
                        })
                        if(found){
                            
                            $('#promo-ind').show();
                            if(stored_promo_code.discount_type == 0){
                                $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                                let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                                let coupon_bookride_cost = bookride_cost * coupon_discount_percentage / 100;
                                if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                                coupon_discount_text = coupon_discount_percentage + "%";
                                coupon_bookride_cost = bookride_cost - coupon_bookride_cost;
                                $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                if(service_mode ==1){
                                    if(hourly_rate_enabled){
                                        $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                    }else{
                                        $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                    }                    
                                }
                            }else{
                                $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                                let coupon_bookride_cost = (bookride_cost - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : bookride_cost - parseFloat(stored_promo_code.discount_value);
                                coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                                $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                                if(service_mode ==1){
                                    if(hourly_rate_enabled){
                                        $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                    }else{
                                        $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                    }                    
                                }
                            }
                            
                        }else{
                            $('#promo-ind').hide();
                            $('#bookride_cost_full').css('visibility','hidden');
                        }
                    }else{
                        $('#promo-ind').show();
                        if(stored_promo_code.discount_type == 0){
                            $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',[parseInt(stored_promo_code.discount_value) + '%']));
                            let coupon_discount_percentage = parseFloat(stored_promo_code.discount_value);
                            let coupon_bookride_cost = bookride_cost * coupon_discount_percentage / 100;
                            if(parseFloat(stored_promo_code.max_discount) && coupon_bookride_cost >= parseFloat(stored_promo_code.max_discount))coupon_bookride_cost = parseFloat(stored_promo_code.max_discount);
                            coupon_discount_text = coupon_discount_percentage + "%";
                            coupon_bookride_cost = bookride_cost - coupon_bookride_cost;
                            $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                            if(service_mode ==1){
                                if(hourly_rate_enabled){
                                    $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                }else{
                                    $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                }                    
                            }
                        }else{
                            $('#promo-ind').html("<ons-icon style='color:#469e4a' size='16px' icon='ion-pricetag'></ons-icon> " + __('{---1} promotion applied',["" + booking_currency_symbol + stored_promo_code.discount_value]));
                            let coupon_bookride_cost = (bookride_cost - parseFloat(stored_promo_code.discount_value)) < 0 ? 0 : bookride_cost - parseFloat(stored_promo_code.discount_value);
                            coupon_discount_text = booking_currency_symbol + stored_promo_code.discount_value;
                            $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100));
                            if(service_mode ==1){
                                if(hourly_rate_enabled){
                                    $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " / " + __('Hour'));
                                }else{
                                    $('#bookride_cost').html(booking_currency_symbol + roundFare(Math.round(coupon_bookride_cost * 100) / 100) + " (" + __('Minimum') + ")");
                                }                    
                            }
                        }
                    }

                }else{
                    $('#promo-ind').hide();
                    $('#bookride_cost_full').css('visibility','hidden');
                }            
            }else{
                $('#promo-ind').hide();
                $('#bookride_cost_full').css('visibility','hidden');
            }


            if(service_mode ==1){

                //handle display of options button for hourly rate
                $('#bookride-options').css('width', '0');
                $('#bookride-options').css('visibility', 'hidden');
                $('#bookride-options').off();

                if(hourly_rate_enabled){
                    $('#bookride-options').css('visibility', 'visible');
                    $('#bookride-options').css('width', '150px');                    
                    $('#bookride-options').off().on('click',showHourlyRateOptionDlg);
                }
            }

            if(night_day){
                //day
                
                $('#ride-detail-night').html('');
                $('#ride-detail-fare').html($('#bookride_cost').html());
                $('#ride-detail-min-fare').html(booking_currency_symbol + roundFare(parseFloat(ride_puc) + parseFloat(ride_doc)));
                $('#ride-detail-cpk').html(booking_currency_symbol + ride_cpk);
                $('#ride-detail-cpm').html(booking_currency_symbol + ride_cpm);
                if(coupon_discount_text != ""){
                    $('#ride-detail-coupon-discount').html(coupon_discount_text);
                    $('#ride-detail-coupon-discount-cont').show();
                }else{
                    $('#ride-detail-coupon-discount-cont').hide();
                }

                if(peak_period_text != ""){
                    $('#ride-detail-surge').html(peak_period_text);
                    $('#ride-detail-surge-cont').show();
                }else{
                    $('#ride-detail-surge-cont').hide();
                }

                if(service_mode ==1){
                    if(hourly_rate_enabled){                        
                        $('#ride-detail-hourly').html(booking_currency_symbol + ride_hrcph);
                        $('#ride-detail-hourly-rate').show();
                    }else{
                        $('#ride-detail-hourly-rate').hide();
                    }                    
                }else{
                    $('#ride-detail-hourly-rate').hide();
                }
                
                $('#ride-detail-num-seats').html(ride_num_seats);
                
    
            }else{
                //night
                $('#ride-detail-night').html("(" + __('Night') + ")");
                $('#ride-detail-fare').html($('#bookride_cost').html());
                $('#ride-detail-min-fare').html(booking_currency_symbol + roundFare(parseFloat(nride_puc) + parseFloat(nride_doc)));
                $('#ride-detail-cpk').html(booking_currency_symbol + nride_cpk);
                $('#ride-detail-cpm').html(booking_currency_symbol + nride_cpm);
                if(coupon_discount_text != ""){
                    $('#ride-detail-coupon-discount').html(coupon_discount_text);
                    $('#ride-detail-coupon-discount-cont').show();
                }else{
                    $('#ride-detail-coupon-discount-cont').hide();
                }

                if(peak_period_text != ""){
                    $('#ride-detail-surge').html(peak_period_text);
                    $('#ride-detail-surge-cont').show();
                }else{
                    $('#ride-detail-surge-cont').hide();
                }

                if(service_mode ==1){
                    if(hourly_rate_enabled){                        
                        $('#ride-detail-hourly').html(booking_currency_symbol + nride_hrcph);
                        $('#ride-detail-hourly-rate').show();
                    }else{
                        $('#ride-detail-hourly-rate').hide();
                    }                    
                }else{
                    $('#ride-detail-hourly-rate').hide();
                }
                
                $('#ride-detail-num-seats').html(ride_num_seats);
    
            }

      });


      $('#bookride').off("click").on('click', function(){

        //If in quick ride mode, do not allow booking if selected vehicle has ride-sharing enabled
        if(service_mode == 1){
            let route_cars = routetariffs.result[selected_route_id].cars;
            
            for(var key in route_cars){
                if(route_cars[key].ride_id == selected_city_ride){
                    if(route_cars[key].rshare_enabled == 1){
                        /* ons.notification.alert(__('You cannot book a Quick-Ride with a Vehicle that is shared with other customers'),{title:""});
                        return */
                    }
                }
            }
            
        } 
        
        loading.show();
        current_dt2 = new Date(current_dt);
        payment_type = $('#payment-type').data('paymenttype');
                        
        var c_year = current_dt2.getFullYear();
        var c_month = current_dt2.getMonth() + 1;
        var c_day = current_dt2.getDate();
        var c_hours = current_dt2.getHours();
        var c_min = current_dt2.getMinutes();

        var c_hours_str;
        var c_min_str;
        var c_day_str;
        var c_month_str;

        if(c_hours < 10){
          c_hours_str = '0' + c_hours;
        }else{
          c_hours_str = c_hours;
        }

        if(c_min < 10){
          c_min_str = '0' + c_min;
        }else{
          c_min_str = c_min;
        }


        if(c_day < 10){
          c_day_str = '0' + c_day;
        }else{
          c_day_str = c_day;
        }

        if(c_month < 10){
          c_month_str = '0' + c_month;
        }else{
          c_month_str = c_month;
        }



        var pdatetime = c_year + '-' + c_month_str + '-' + c_day_str + ' ' + c_hours_str + ':' + c_min_str;

                
        
        var post_data = {'action_get':'newbooking','paddress':pick_up_data['address'],'plng':pick_up_data['lng'],'plat':pick_up_data['lat'],'daddress':drop_off_data['address'],'dlng':drop_off_data['lng'],'dlat':drop_off_data['lat'],'route_id':selected_route_id,'ride_id':selected_city_ride,'pdatetime':pdatetime,'p_type':payment_type,'scheduled':scheduled_ride,'b_token':booking_cost_h,'booking_price':bookride_cost,'coupon_code':verified_coupon_code, 'multidestination' : multi_destination_mode, 'waypoints': multi_destinations,'trip_duration' : intra_city_duration,'trip_distance':intra_city_distance,'service_mode' : service_mode,'hourly_rate_enabled' : hourly_rate_enabled,'hourly_rate_num_hours' : hourly_rate_user_set_num_hours};     
          
          jQuery.ajax({
          url: ajaxurl,
          method: 'GET',
          timeout : 30000,
          crossDomain:true,
          xhrFields: {withCredentials: true},
          data: post_data,
          success: function (data, status)
              {
                console.log(data);
                loading.hide();

                $('#mylocationbtn').css('visibility', 'hidden');                    
                  
                  try{
                      var data_obj = JSON.parse(data);
                  }catch(e){
                      
                      ons.notification.alert(__("Error communicating with server"),{'title':""});
                      return;
                  }
    
      
                  if(data_obj.hasOwnProperty('error')){

                        if(data_obj.hasOwnProperty('wallet_error')){
                            let wallet_min_topup = walletLowTopupAmount();
                            let deficit_amount_currency_converted = parseFloat(data_obj.deficit_amount) * selected_city_curency_exchange_rate; //converting deficit wallet amount from default currency to selected city currency
                            deficit_amount_currency_converted = Math.round(deficit_amount_currency_converted * 100) / 100;

                            if(wallet_min_topup){
                                if(deficit_amount_currency_converted < wallet_min_topup){
                                    deficit_amount_currency_converted = wallet_min_topup;
                                }
                            }

                            deficit_amount_currency_converted = roundFare(deficit_amount_currency_converted);

                            if(data_obj.wallet_error == 1){
                                showPageWithTripDlgOn('wallet', {msg : __('You have Insufficient fund in your wallet for the trip. Please fund your wallet'), trip_amount : deficit_amount_currency_converted, wallet_low : 1});
                                return;
                            }else if(data_obj.wallet_error == 2){
                                showPageWithTripDlgOn('wallet', {msg : __('You owe some money from your previous trips. Please fund your wallet to continue using the service'), trip_amount : deficit_amount_currency_converted, wallet_low : 1});
                                return;
                            }

                            
                        }
                    
                      ons.notification.alert(data_obj.error,{'title':""});
                      return;                  
    
                  }
    
    
                  
                  if(data_obj.hasOwnProperty('success')){

                    selected_state_id = 0;

                    map.setPadding(0,0,0,0);
                      
                    if(data_obj.hasOwnProperty('coupon_code_invalid') && data_obj.coupon_code_invalid == 1){
                        localStorage.removeItem('user-promo-codes');
                    }
                    
                    $('#ride-request-cancel-btn').data('bookingid', data_obj.new_booking_id);

                    toggleroutepathanimation(0); 
                    clearMapItemsSelectively();

                    
                    drv_search_rider_lat_long.lat = pick_up_data.lat;
                    drv_search_rider_lat_long.lng = pick_up_data.lng;
                    pick_up_data=[];
                    drop_off_data=[];
                    pick_up_data = {'address': '','lng':'','lat':''};
                    drop_off_data = {'address': '','lng':'','lat':''};
                    

                    //reset multi destination mode
                    multi_destination_mode = 0;        
                    $('#location-type-icon-ds1').hide();
                    $('#location-type-icon-ds2').hide();
                    dest_location_type_selected = 0;
                    destination_stop_inp1_shown = 0;
                    destination_stop_inp2_shown = 0; 
                    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

                   

                    $('#bookbutton').css('visibility','hidden');
                    $('#bookbutton2').css('visibility','hidden');
                    $('#pickup-addr-disp').hide();
                    $('#dropoff-addr-disp').hide();
                    $('#pac-input').val('');
                    $('#pac-input2').val(''); 


                    if(scheduled_ride){
                        reset_ui_elements_to_menu_btn();
                        ons.notification.alert(__("Your booking has been placed. You will be notified 15 minutes before pickup time"),{'title':""});                                    
                        getuserlocation();
                    }else{
                        
                                              
                        reset_ui_elements_to_cancel_btn();
                        showhidedriversearch(1);
                        driver_search_display_timer = setTimeout(function(){ //auto close the driver-search modal after a period of time.

                            //show the menu button
                            
                            $("#trip-summary-back-btn").css("visibility","hidden");       
                            $("#trip-summary-back-btn").css("z-index","10");
                            $('#ride-request-cancel-btn').css("z-index","10");
                            $('#ride-request-cancel-btn').css("visibility","hidden");
                            $("#menubtn").css("visibility","visible");
                            $('#mylocationbtn').css('visibility', 'visible');
                            $("#menubtn").css("z-index","100");
                            $('#presetroutesbtn').css('visibility', 'visible');
                            $("#menubtn").removeClass("zoomIn animated").addClass("zoomIn animated").one('animationend', function(){
                                $(this).removeClass("zoomIn animated");
                            })
                            

                            showhidedriversearch(0);


                            //hide the cancel request button and display the
                            ons.notification.alert(__("It is taking time to locate a driver. Please be patient while we continue searching. You will be notified"),{'title':""});                                    
                            getuserlocation();
                        },120000);

                    }

                    
                    
                    return;

                  }
    
    
                
                  
                  
              },
              error: function() {
                loading.hide();     
                ons.notification.alert(__("Error communicating with server"),{'title':""});
                return;
                  
              }
    
          });


      })
}


function showHourlyRateOptionDlg(){

    let hourly_rate_options_html = '';
    let route_cars = routetariffs.result[selected_city_id].cars;
    let car_details;
    let hourly_rate_cost = 0.00;
    let hourly_rate_distance = 0;
    
    
    for(var key in route_cars){
        if(route_cars[key].id == selected_city_ride){
            car_details = route_cars[key];
            break;
        }
    }

    if(!car_details)return;

    if(night_day){
        //day
        hourly_rate_cost = parseFloat(car_details['hr_cph']);
        hourly_rate_distance = parseFloat(car_details['hr_dist']);
    }else{
        //night
        hourly_rate_cost = car_details['nhr_cph'];
        hourly_rate_distance = car_details['nhr_dist'];
    }    

    

    for(let x = 1;x < 7;x++){

        let hourly_cost = 0.00;
        let hourly_cost_text = "";
        let hourly_distance= 0;
        let hourly_distance_text = "";

        if(routetariffs.result[selected_city_id].cars[0].dist_unit == 0){ //kilometer
            hourly_distance = x * hourly_rate_distance;
            hourly_distance = Math.ceil(hourly_distance);
            hourly_distance_text = hourly_distance + " KM";
        }else{//miles
            let distance_meters = x * hourly_rate_distance * 1000;
            let distance_miles = distance_meters / 1609.344; //convert to mi
            distance_miles = Math.ceil(distance_miles);
            hourly_distance_text = distance_miles + " mi";            
        }
        
        hourly_cost = roundFare(x * hourly_rate_cost);
        hourly_cost_text = selected_city_curency_symbol + hourly_cost;
        
        let item_name = `<b>${x}</b> <p style="display:inline">${x == 1 ? __('Hour') : __('Hours')}</p> <ons-icon icon="fa-stop" size="10px" style="color: var(--set-foreground-color);margin:0 10px;"></ons-icon> <b>${hourly_distance_text}</b> <ons-icon icon="fa-long-arrow-right" size="18px" style="color: var(--set-foreground-color);margin:0 10px;"></ons-icon> <b>${hourly_cost_text}</b>`;

        hourly_rate_options_html += `<ons-list-item data-value="${x}" class="sel-list-item">
                                  
                                        <div class="left">
                                            <ons-icon icon="fa-circle" size="18px" style="color: #ccc;"></ons-icon>
                                        </div>
                                        <div class="center">
                                            <span style="font-size: 16px;font-weight: bold;width: 100%;">${item_name}</span>
                                        </div>
                                        <div class="right" id="list-item-sel-${x}">                                      
                                        </div>
                                    </ons-list-item>`;

    }

    hourly_rate_options_html = `<ons-list>${hourly_rate_options_html}</ons-list>`;

    $('#customselectcontent').empty();
    $('#customselectcontent').html(hourly_rate_options_html);

    customItemSelect(hourly_rate_user_set_num_hours,__('How many hours do you need?'), function(value){
        hourly_rate_user_set_num_hours = value;
        $('#bookride').html(__('Book for {---1} hours',[value]));
    });
    
}



function roundFare(fare){

    if(!app_settings.hasOwnProperty('round_trip_fares')){
        return fare;
    }

    fare_conv = parseFloat(fare);

    if(fare_conv == 0)return 0;
    
    switch(app_settings.round_trip_fares){

        case 1: //no rounding;
        return fare_conv.toFixed(2);
        break;

        case 2: //nearest whole number
        return Math.round(fare_conv);
        break;

        case 3: //nearest 10
        let x = fare_conv % 10;
        if(x){
            fare_conv += 10 - x;
        }
        return Math.round(fare_conv);
        break;

        case 4: //nearest 50
        let y = fare_conv % 50;
        if(y){
            fare_conv += 50 - y;
        }
        return Math.round(fare_conv);
        break;


        case 5: //nearest 100
        let z = fare_conv % 100;
        if(z){
            fare_conv += 100 - z;
        }
        return Math.round(fare_conv);
        break;

        case 6: //nearest 250
        let a = fare_conv % 250;
        if(a){
            fare_conv += 250 - a;
        }
        return Math.round(fare_conv);
        break;

        default:
        return fare_conv.toFixed(2);    


        
    }


}


function reset_ui_elements_to_menu_btn(){

    selected_state_id = 0;
    
    $("#trip-summary-back-btn").css("visibility","hidden");    
    $("#trip-summary-back-btn").css("z-index","10");
    $('#ride-request-cancel-btn').css("z-index","10");
    $('#ride-request-cancel-btn').css("visibility","hidden");
    $("#menubtn").css("visibility","visible");
    $('#mylocationbtn').css('visibility', 'visible');
    $("#menubtn").css("z-index","100");
    $("#menubtn").removeClass("zoomIn animated").addClass("zoomIn animated").one('animationend', function(){
        $(this).removeClass("zoomIn animated");
    })

    $('#presetroutesbtn').css('visibility', 'visible');
    
    ons.setDefaultDeviceBackButtonListener(onBackButton);

    $("#new-bookng-details").removeClass("bounceOutDown animated").addClass("bounceOutDown animated").one('animationend', function(){
        $(this).removeClass("bounceOutDown animated");
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();
        map.setPadding(0,0,0,0);
                        
        
    })

    trip_summary_dialog_show = 0;
    service_mode = 0;
    $('#banner-items-container').css('opacity', '1');
    $('#drop-box-container').css('opacity', '1');
}


function reset_ui_elements_to_cancel_btn(){   
    
    selected_state_id = 0;    
    
    $("#trip-summary-back-btn").css("visibility","hidden");
    $("#trip-summary-back-btn").css("z-index","10");
    $("#menubtn").removeClass("zoomOut animated");
    $("#menubtn").css("visibility","hidden");
    $('#mylocationbtn').css('visibility', 'hidden');
    $("#menubtn").css("z-index","10");
    $("#driver-notify-ui-back-btn").css("z-index", "10"); 

    $('#presetroutesbtn').css('visibility', 'hidden');

    $('#ride-request-cancel-btn').css("z-index","100");
    $('#ride-request-cancel-btn').css("visibility","visible");    
    $("#ride-request-cancel-btn").removeClass("zoomIn animated").addClass("zoomIn animated").one('animationend', function(){
        $("#ride-request-cancel-btn").removeClass("zoomIn animated");               
    })

    ons.setDefaultDeviceBackButtonListener(onBackButton);

    $("#new-bookng-details").removeClass("bounceOutDown animated").addClass("bounceOutDown animated").one('animationend', function(){
        $(this).removeClass("bounceOutDown animated");
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();
        map.setPadding(0,0,0,0);
                        
        
    })

    trip_summary_dialog_show = 0;
    service_mode = 0;
    $('#banner-items-container').css('opacity', '0');
}


function reset_ui_elements_full(){

    selected_state_id = 0;

    toggleroutepathanimation(0);
    map.setPadding(0,0,0,0);
    
    drop_off_data=[];
    drop_off_data = {'address': '','lng':'','lat':''};
    
    clearMapItemsSelectively();

    //reset multi destination mode
    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();
    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0; 
    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};

       
    

    $('#bookbutton').css('visibility','hidden');
    $('#bookbutton2').css('visibility','hidden');
    $('#pickup-addr-disp').hide();
    $('#dropoff-addr-disp').hide();
    $('#pac-input').val('');
    $('#pac-input2').val(''); 


    $("#trip-summary-back-btn").css("visibility","hidden");        
    $("#trip-summary-back-btn").css("z-index","10");
    $('#ride-request-cancel-btn').css("z-index","10");
    $('#ride-request-cancel-btn').css("visibility","hidden");
    $("#menubtn").css("visibility","visible");
    $('#mylocationbtn').css('visibility', 'visible');
    $("#menubtn").css("z-index","100");
    $('#presetroutesbtn').css('visibility', 'visible');

    $("#ride-details-container").hide();

    ons.setDefaultDeviceBackButtonListener(onBackButton);

    $("#new-bookng-details").removeClass("bounceOutDown animated").addClass("bounceOutDown animated").one('animationend', function(){
        $(this).removeClass("bounceOutDown animated");
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();                     
        
    })

    trip_summary_dialog_show = 0; 
    service_mode = 0;
    $('#banner-items-container').css('opacity', '1');

    showhidedriversearch(0);

    getuserlocation();


}


function showhidedriversearch(show=0){
    if(show){
        $('#pulse-rings-container').hide();
        $('#drop-box-container').css('opacity', '0');
        $('#banner-items-container').css('opacity', '0');
        $('#driver-search-view-modal').show();
        map.setClickable(false);
        if(markerdrvsearch){
            markerdrvsearch.setVisible(true);
            markerdrvsearch.setDisableAutoPan(true);
            markerdrvsearch.setPosition({
                lat:drv_search_rider_lat_long.lat,
                lng: drv_search_rider_lat_long.lng
                                                            
            });    
                    
        }else{
            
            
            markerdrvsearch = map.addMarker({
                            'position':{lat:drv_search_rider_lat_long.lat,lng: drv_search_rider_lat_long.lng},
                            'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                            animation: plugin.google.maps.Animation.DROP
                        });
    
            markerdrvsearch.setDisableAutoPan(true);
    
            markerdrvsearch._isReady = true;
        }

        

        map.animateCamera({
            target: {lat:drv_search_rider_lat_long.lat,lng: drv_search_rider_lat_long.lng},
            duration: 800,
            zoom:18
            }, function() {
            //alert("Camera target has been changed");
            
        });

        map.fromLatLngToPoint(drv_search_rider_lat_long, function(point){
            $('#pulse-rings-container').css('left', point[0] + 'px');
            $('#pulse-rings-container').css('top', point[1] + 'px');
            $('#pulse-rings-container').css('transform', 'translate(-50%,-50%)')
            $('#pulse-rings-container').fadeIn();
            $("#driver-search-bar").css("left", "0px");
            $("#driver-search-bar").css("visibility","visible");
            $("#driver-search-bar").removeClass("slideInUp animated").addClass("slideInUp animated").one('animationend', function(){
                $(this).removeClass("slideInUp animated");                       
                
            })
        });        


        return;

    }

    map.setClickable(true);
    $('#pulse-rings-container').hide();
    $('#drop-box-container').css('opacity', '1');
    $('#banner-items-container').css('opacity', '1');
    $('#driver-search-view-modal').hide();
    if(markerdrvsearch){
        markerdrvsearch.setVisible(false);
    }

    $("#driver-search-bar").removeClass("slideOutDown animated").addClass("slideOutDown animated").one('animationend', function(){
        $(this).removeClass("slideOutDown animated");
        $("#driver-search-bar").css("visibility","hidden");
        $("#driver-search-bar").css("left", "-10000px");    
        
    })



}

function showmoreuserinfo(){

    booking_id = current_booking_data.booking_id

    
    loading.show();  
    var post_data = {'action_get':'getpersoninfo', 'booking_id':booking_id};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 10000,
    crossDomain:true,
    xhrFields: {withCredentials: true},
    data: post_data,
    success: function (data, status)
        {
            loading.hide();
                    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                ons.notification.toast(__('Error communicating with server'), {
                    timeout: 2000
                    });          
                    return;
                
            }


            
            if(data_obj.hasOwnProperty('success')){
                $('#user-info-image-preload').attr('src', data_obj.photo);
                $('#user-info-rating').attr('src', "img/rating-" + data_obj.userdata.driver_rating + ".png");
                $('#user-info-name').text(data_obj.userdata.firstname + " " + data_obj.userdata.lastname);
                $('#user-info-joined').text(data_obj.userdata.account_create_date);
                $('#user-info-completed').text(data_obj.userdata.completed_rides);
                $('#user-info-cancelled').text(data_obj.userdata.cancelled_rides);
                $('#user-info-rejected').text(data_obj.userdata.rejected_rides);
                $('#user-info-comments').html(data_obj.comments);
                userInfoShow();
                //console.log(data_obj.person_data);
                return;
            }


            
            
            
        },
        error: function() {
            loading.hide();
            ons.notification.toast(__('Error communicating with server'), {
            timeout: 2000
            });          
            return;
            
        }

    });





}


function showridedetails(){
    
    $("#ride-details-container").show();   
    $("#ride-details-container").removeClass("bounceIn animated").addClass("bounceIn animated").one('animationend', function(){
        $(this).removeClass("bounceIn animated"); 
    })
}


function hideridedetails(){
         
    $("#ride-details-container").removeClass("bounceOutDown animated").addClass("bounceOutDown animated").one('animationend', function(){
        $("#ride-details-container").hide();
        $(this).removeClass("bounceOutDown animated"); 
    })
}



function updateUserLocation(){
    

    navigator.geolocation.clearWatch(user_location_watch_handle);

    user_location_watch_handle = navigator.geolocation.watchPosition(
        function(position){
            //success
            user_location_detected = 1;
            user_location_live.lat = position.coords.latitude;
            user_location_live.lng = position.coords.longitude;

            

        }, function(){
            //errror
            return;
        }, 
        {
            enableHighAccuracy: true, timeout: 10000
        }
    );

}




function clearMapItemsSelectively(type = 0){

    if(marker1 && marker1.hasOwnProperty('hashCode')){
        marker1.setVisible(false);
        
    }

    if(marker2 && marker2.hasOwnProperty('hashCode')){
        marker2.setVisible(false);
    }

    if(marker3 && marker3.hasOwnProperty('hashCode')){
        marker3.setVisible(false);
    }

    if(marker4 && marker4.hasOwnProperty('hashCode')){
        marker4.setVisible(false);
    }


    if(markerds1 && markerds1.hasOwnProperty('hashCode')){
        markerds1.setVisible(false);
    }

    if(markerds2 && markerds2.hasOwnProperty('hashCode')){
        markerds2.setVisible(false);
    }


    if(route_polyline && route_polyline.hasOwnProperty('hashCode')){
        toggleroutepathanimation(0);
        route_polyline.setVisible(false);
    }


    if(route_distance_duration_info_marker && route_distance_duration_info_marker.hasOwnProperty('hashCode')){
        route_distance_duration_info_marker.setVisible(false);
        
    }

    if(markerdrvsearch && markerdrvsearch.hasOwnProperty('hashCode')){
        markerdrvsearch.setVisible(false);
    }



}


function animateDriversMarkers(){
    
    clearInterval(animate_drivers_markers_timer);

    animate_drivers_markers_timer = setInterval(function(){
        if(!map_visibility_status)return; //do not animate if map is hidden from view
        for(var key in city_drivers_markers){
            if(!city_drivers_markers[key].animate_pos && !city_drivers_markers[key].animate_rot)continue; //skip markers that havent been enabled for animation.
            
            //animate marker position
            if(city_drivers_markers[key].animate_pos){

                city_drivers_markers[key].animation_fraction_pos += 0.01;

                anim_marker_interpolate_pos_lat = (city_drivers_markers[key].animation_fraction_pos * city_drivers_markers[key].curposition.lat) + ((1 - city_drivers_markers[key].animation_fraction_pos) * city_drivers_markers[key].oldposition.lat);
                anim_marker_interpolate_pos_lng = (city_drivers_markers[key].animation_fraction_pos * city_drivers_markers[key].curposition.lng) + ((1 - city_drivers_markers[key].animation_fraction_pos) * city_drivers_markers[key].oldposition.lng);
                
                city_drivers_markers[key].marker.setPosition({lat : anim_marker_interpolate_pos_lat, lng : anim_marker_interpolate_pos_lng});

                if(city_drivers_markers[key].animation_fraction_pos >= 1){ //animation complete
                    //disable position animation for this marker until new position data arrives
                    city_drivers_markers[key].animation_fraction_pos = 0;
                    city_drivers_markers[key].animate_pos = 0;
                }


            }


            //animate marker rotation
            if(city_drivers_markers[key].animate_rot){

                city_drivers_markers[key].animation_fraction_rot += 0.04;

                anim_marker_interpolate_rot = (city_drivers_markers[key].animation_fraction_rot * city_drivers_markers[key].curbearing) + ((1 - city_drivers_markers[key].animation_fraction_rot) * city_drivers_markers[key].oldbearing);
                
                
                city_drivers_markers[key].marker.setRotation(anim_marker_interpolate_rot);

                if(city_drivers_markers[key].animation_fraction_rot >= 1){ //animation complete
                    //disable rotation animation for this marker until new bearing data arrives
                    city_drivers_markers[key].animation_fraction_rot = 0;
                    city_drivers_markers[key].animate_rot = 0;
                }


            }

        }

    },40);


}


function detectUserCity(update = false){

    let city_found = 0;
    let cities_found = [];

    let cities_ids = routetariffs.result.city_id;

    for(let x = 0; x < cities_ids.length;x++){
        let city_id = cities_ids[x];
        //if(city_id == 1)continue; //skip global city route
        let city_boundary_json_data = routetariffs.result[city_id].cars[0].city_bound_coords;
        try{
            let city_boundary_coords = JSON.parse(city_boundary_json_data.replace(/&quot;/g,'"'));
            if(plugin.google.maps.geometry.poly.containsLocation({lat:user_location_live.lat,lng:user_location_live.lng},city_boundary_coords.coords)){
                cities_found.push(city_id);
            }
        }catch(e){

        }

    }

    let found_in_default_city = 0;
    let found_in_other_city = 0;
    if(cities_found.length){
        cities_found.forEach(function(val,indx){
            if(val == 1){ 
                found_in_default_city = parseInt(val);
            }else{
                found_in_other_city = parseInt(val);
            }
        })
    }

    if(found_in_default_city && found_in_other_city){
        city_found = found_in_other_city;
    }else if(found_in_default_city && !found_in_other_city){
        city_found = found_in_default_city;
    }else if(!found_in_default_city && found_in_other_city){
        city_found = found_in_other_city;
    }else{
        //no city found, use default city
        city_found = 1;
        
    }

    

    //update stored user location information    
    let user_detected_location_data = {city_id : city_found, city_lat: parseFloat(routetariffs.result[city_found].cars[0].lat),city_lng:parseFloat(routetariffs.result[city_found].cars[0].lng),user_lat:user_location_live.lat,user_lng:user_location_live.lng};
    localStorage.setObject('user_location_details',user_detected_location_data);
    
    
    if(city_found == userprofileinfo.route_id){ //user is already in the same city as on the server
        return({success : 1, route : city_found});        
    }else{
        update = true;
    }

    //user is on a different city from the one on his server records. update

    if(update){
        userprofileinfo.route_id = city_found;
        updateUserCityOnServer(city_found);   
    }         
    return({success : 1, route : city_found});

       
    
}





var retry_count = 0;
function updateUserCityOnServer(city_id){
    retry_count++;    
    $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout : 10000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'updateusercity', 'route_id':city_id},
        dataType: 'json',
        success: function(data){
            
            processing = 0;

            if(data.hasOwnProperty('error')){
                if(retry_count > 3)return;
                updateUserCityOnServer(city_id);
                return;
            }               
            
            
            if(data.hasOwnProperty('recent_locs')){
                recent_locations_data =  data.recent_locs; 
            }
            
        },
        error: function(){
            processing = 0;
            if(retry_count > 3)return;
            updateUserCityOnServer(city_id);
            return;
        } 


    });
      
     
}



function matchZoneFare(){

    let matched_zone_data = {};
    let pickup_matched = {};
    let dropoff_matched = {};

    if(!(routetariffs.result.zones && routetariffs.result.zones[selected_city_id]))return false;
    
    let city_zones = routetariffs.result.zones[selected_city_id];
    

    for(var x = 0;x < city_zones.length;x++){

        let zone_data = routetariffs.result.zones[selected_city_id][x];

        let zone_location_boundary_coords_json = zone_data.zone_bound_coords;       
               

        try{

            let zone_location_boundary_coords = JSON.parse(zone_location_boundary_coords_json.replace(/&quot;/g,'"'));            

            let pickup_location_in_zone_boundary = pick_up_data.address ? plugin.google.maps.geometry.poly.containsLocation({lat:pick_up_data.lat,lng:pick_up_data.lng},zone_location_boundary_coords) : false;
            let dropoff_location_in_zone_boundary = drop_off_data.address ? plugin.google.maps.geometry.poly.containsLocation({lat:drop_off_data.lat,lng:drop_off_data.lng},zone_location_boundary_coords) : false;

            if(pickup_location_in_zone_boundary && dropoff_location_in_zone_boundary){ //pickup and dropoff locations fall in the same zone
                console.log('match same');
                matched_zone_data = {'fare_type1' : zone_data.zone_fare_type, 'fare_value1' : zone_data.zone_fare_value,'fare_type2' : 0, 'fare_value2' : 0};
                console.log(matched_zone_data);
                return matched_zone_data;
            }

            if(pickup_location_in_zone_boundary && !pickup_matched.hasOwnProperty('found')){ //pickup location matched zone
                pickup_matched = {found:1,fare_type:zone_data.zone_fare_type,fare_value:zone_data.zone_fare_value};
            }


            if(dropoff_location_in_zone_boundary && !dropoff_matched.hasOwnProperty('found')){ //pickup location matched zone
                dropoff_matched = {found:1,fare_type:zone_data.zone_fare_type,fare_value:zone_data.zone_fare_value};
            }


        }catch(e){
            console.log('invalid boundary coords json');
        }

        
    }


    if(pickup_matched.hasOwnProperty('found') && dropoff_matched.hasOwnProperty('found')){
        //pickup and dropoff locations fall within different zones
        console.log('matched p, matched d');
        matched_zone_data = {'fare_type1' : pickup_matched.fare_type, 'fare_value1' : pickup_matched.fare_value,'fare_type2' : dropoff_matched.fare_type, 'fare_value2' : dropoff_matched.fare_value};
        console.log(matched_zone_data);
        return matched_zone_data;

    }else if(pickup_matched.hasOwnProperty('found')){

        console.log('matched p');
        matched_zone_data = {'fare_type1' : pickup_matched.fare_type, 'fare_value1' : pickup_matched.fare_value,'fare_type2' : 0, 'fare_value2' : 0};
        console.log(matched_zone_data);
        return matched_zone_data;

    }else if(dropoff_matched.hasOwnProperty('found')){

        console.log('matched d');
        matched_zone_data = {'fare_type1' : dropoff_matched.fare_type, 'fare_value1' : dropoff_matched.fare_value,'fare_type2' : 0, 'fare_value2' : 0};
        console.log(matched_zone_data);
        return matched_zone_data;

    }

    return false;
}



function initActionSheets(){
     
    ons.createElement('gpsenabedialog.html', { append: true });
    ons.createElement('customselectdlg.html', { append: true }); 
    ons.createElement('userinfodialog.html', { append: true });
    ons.createElement('chatwindowdialog.html', { append: true });
    ons.createElement('presetroutes.html', { append: true });
    ons.createElement('selectcitydialog.html', { append: true });
    ons.createElement('canceltripreasonsdlg.html', { append: true });
    ons.createElement('retrybkdialog.html', { append: true });
    ons.createElement('helptip.html', { append: true });
    ons.createElement('countrylistdialog.html', { append: true }).then(function(sheet){

        let country_dialcode_data_html = "";
        for(var key in country_dial_code_data){
        let country = country_dial_code_data[key].country;
        let country_dial_code = country_dial_code_data[key].dial_code;
        let country_code = country_dial_code_data[key].country_code;


            if(country_code){
                    
                    country_dialcode_data_html += `<ons-list-item data-country="${country}" data-countrysearch="${country.toLowerCase()}" data-countrycode="${country_code}" data-countrydialcode="${country_dial_code}" tappable class="default-country-items" style="cursor: pointer;min-height: 70px;" >
                                                        <div class="left">
                                                            <div class="iti__flag iti__${country_code}" style="background-color: white;transform:scale(1.5)"></div>
                                                        </div>
                                                        <div class="center">
                                                            <span style="font-size: 16px;font-weight: 500;">${country}</span>
                                                        </div>
                                                        <div class="right">
                                                            <p style="font-size: 16px;">${"+" + country_dial_code}</p>
                                                        </div>
                                                    </ons-list-item>`;
            }
        
        };

        country_dialcode_data_html = `<ons-list>${country_dialcode_data_html}</ons-list>`;
        $('#countrylistcontent').html(country_dialcode_data_html);

    });   
    
    ons.createElement('imagepickrdlg.html', { append: true }); 

}


function imagePicker(callback,resolution = null){

    
    document.querySelector('#imagepickrdlg').show();
    $('#imagepickrdlg').attr('title',__('Select Image'));


    $('#cameraimgpick').off().on('click', function(){

        document.querySelector('#imagepickrdlg').hide();

        img_source_obj = { quality: 25,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        navigator.camera.getPicture(function(imageData){ //success

            try {
                window.btoa(imageData);
            } catch(e) {
                callback({'error' : 1,'img_data' :null});
                return;
            }

            (async () => {
                let res_img_data = await resizeImg("data:image/jpeg;base64," + imageData, resolution);
                callback({'success' : 1,'img_data' :res_img_data});
            })();
                
            
    
        }, function(message){ //failed
    
            
            callback({'error' : 1,'img_data' :null});
    
        }, img_source_obj)

    })


    $('#galleryimgpick').off().on('click', function(){

        document.querySelector('#imagepickrdlg').hide();

        img_source_obj = { quality: 25,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

        navigator.camera.getPicture(function(imageData){ //success

            try {
                window.btoa(imageData);
            } catch(e) {
                callback({'error' : 1,'img_data' :null});
                return;
            }
                
            (async () => {
                let res_img_data = await resizeImg("data:image/jpeg;base64," + imageData, resolution);
                callback({'success' : 1,'img_data' :res_img_data});
            })();
    
        }, function(message){ //failed
    
            
            callback({'error' : 1,'img_data' :null});
    
        }, img_source_obj)

    })

    /* document.querySelector('#imagepickrdlg').addEventListener('prehide', function() {
        callback(image_data);
    }) */
    $('#imagepickrdlg').off().on('prehide',function() {
        callback({'closed' : 1,'img_data' :null});
    })

    
}


async function updateUserPhoto(){
    imagePicker(function(image_data){
        if(image_data.hasOwnProperty('error')){
            return;            
            ons.notification.alert(__('Invalid photo selected'),{title:""});
            return;
        }
        if(image_data.hasOwnProperty('closed'))return;
        

        var current_image = $('#user-edit-photo-img-preview').attr('src');

        $('#user-edit-photo-img-preview').attr('src', image_data.img_data);

        loading.show();
          
          var post_data = {'action':'updateUserPhoto','photo':image_data.img_data};

          $.ajax({
              url: ajaxurl,
              type: 'POST',
              timeout : 10000,
              crossDomain:true,
              xhrFields: {withCredentials: true},
              data: post_data,
              success: function (data, status)
              {
                  loading.hide();    
                  try{
                      var data_obj = JSON.parse(data);
                  }catch(e){
                    ons.notification.toast(__("Error communicating with server"),{
                      timeout: 1000
                    });
                    return;
                  }

                  if(data_obj.hasOwnProperty('error')){                      
                      
                    ons.notification.alert(data_obj.error,{title:""});
                  }

                  if(data_obj.hasOwnProperty('success')){

                    userprofileinfo.photo = data_obj.photo_url;
                    $('#user-profile-photo').attr('src',userprofileinfo.photo);
                      
                    ons.notification.toast(__("Profile photo updated"),{
                      timeout: 1000
                    });
                  }
                  

              },
              error: function(jqXHR,textStatus, errorThrown) {  
                  loading.hide();
                  ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                  });
              }

          });

    },{width:300,height:300});
}



async function regUserPhoto(){
    imagePicker(function(image_data){
        if(image_data.hasOwnProperty('error')){
            return;            
            ons.notification.alert(__('Invalid photo selected'),{title:""});
            return;
        }
        if(image_data.hasOwnProperty('closed'))return;
        

        var current_image = $('#reg-user-photo-img-preview').attr('src');

        $('#reg-user-photo-img-preview').attr('src', image_data.img_data);

        user_reg_data.profile_photo = image_data.img_data;

        $('#signup-pg1-next-btn').prop('disabled', false);

    },{width:300,height:300});
}

function getMapBottomPadding(){

    let selected_route_id;

    if(selected_state_id != 0){       
        selected_route_id = selected_state_id;   
    }else{
        selected_route_id = selected_city_id;
    }

    let city_vehicles = routetariffs.result[selected_route_id].cars;
    number_of_city_vehicle = city_vehicles.length;
    let vehicles_list_height = (number_of_city_vehicle * 70) + 24;
    if(number_of_city_vehicle > 2)vehicles_list_height = 210;

    return app_settings.vehicle_sel_disp_type == 2 ? vehicles_list_height + 148 : 358;
}


function userGreeting(){
    let cur_date = new Date();
    let hour_now = cur_date.getHours();

    if(hour_now >= 0 && hour_now < 12){ //morning
        $('#user-greeting-image').attr('src', 'img/morning.png')
        $('#user-greeting-message').text(__('Good morning, {---1}',[userprofileinfo.firstname]))
    }else if(hour_now >= 12 && hour_now < 17){ //afternoon
        $('#user-greeting-image').attr('src', 'img/afternoon.png')
        $('#user-greeting-message').text(__('Good afternoon, {---1}',[userprofileinfo.firstname]))
    }else{ //evening
        $('#user-greeting-image').attr('src', 'img/evening.png')
        $('#user-greeting-message').text(__('Good evening, {---1}',[userprofileinfo.firstname]))

    }
}


/* function setStatusBarOffset(){
    var initialHeight = document.documentElement.clientHeight;
    window.addEventListener('resize', resizeFunction);
    function resizeFunction() {
        console.log('STATUS BAR HEIGHT', document.documentElement.clientHeight - initialHeight);
        window.removeEventListener('resize', resizeFunction);
    }
    StatusBar.overlaysWebView(true);
} */


function showEditProfile(){

    document.querySelector('#myNavigator').pushPage('html/editprofile.html',
            {
            animation: 'fade'             
            }
    );

}


async function resizeImg(img_data,res){ //resize image function. takes base64 image data and resizes it

    let img_resized = new Promise(function(resolve,reject){
        var img = document.createElement("img");
        img.onload = function(event) {
            var MAX_WIDTH = 800;
            var MAX_HEIGHT = 1600;

            var width = img.width;
            var height = img.height;

            var dx = 0;
            var dy = 0;

            if(res){
                MAX_WIDTH = res.width;
                MAX_HEIGHT = res.height;

                if(width > height){
                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }else{                    
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                    if(height > res.height){ //center image on y-axis
                        let diff = height - res.height;
                        diff = parseInt(diff / 2);
                        dy = diff * -1;
                    }
                }
            }else{

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = height * (MAX_WIDTH / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = width * (MAX_HEIGHT / height);
                        height = MAX_HEIGHT;
                    }
                }

            }
            
            

            var canvas = document.createElement("canvas");
            if(res){
                canvas.width = res.width;
                canvas.height = res.height;
            }else{
                canvas.width = width;
                canvas.height = height;
            }
            
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, dx, dy, width, height);

            var res_img_data = canvas.toDataURL("image/jpeg");
            //console.log(result.data);
            
            resolve(res_img_data);

        }

        img.src = img_data;
    });

    return img_resized;
    
    
}



function updateUserEmail(){
    
    var email = $("#editemailinput").val();

    var re = /\S+@\S+\.\S+/;

    if(!re.test(email)){
        $('#editemailvalidationmsg').show();
        $('#editemailvalidationmsg').html(__("Email is invalid"));
        return;
    }

    $('#editemail').off().on('change', function(){
        $('#editemailvalidationmsg').hide();
    })

    loading.show();
          
    var post_data = {'action':'verifyUserEmail','email':email};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
            ons.notification.toast(__("Error communicating with server"),{
                timeout: 1000
            });
            return;
            }

            if(data_obj.hasOwnProperty('error')){
                
                $('#editemailvalidationmsg').show();
                $('#editemailvalidationmsg').html(data_obj.error);
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                document.querySelector('#myNavigator').pushPage('html/verifyemail.html',{animation:'fade',data:{'email':email}});               
            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });

}


function showEditEmail(){
    document.querySelector('#myNavigator').pushPage('html/editemail.html',
            {
            animation: 'fade'             
            }
    );
}



function initCodeInput(callback){

    let current_sel = 0;
    $('.code-input [id^=v-code-digit-]').each(function(index){

        $(this).attr('maxlength', 2);

        $(this).off('mousedown').on('mousedown', function(e){

            e.preventDefault();
            let character_entered = $(this).val();

            let elem_id = $(this).attr('id');
            let indx = elem_id.substring(elem_id.length - 1)
            current_sel = indx;
            $(`#v-code-digit-${current_sel} input`).focus();
            

            let re = /([^0-9])/g;

            if(re.test(character_entered)){ //charater thats not a number was entered
                $(this).val('');
                return;
            }
            

            if(character_entered.length > 1){
                let char1 = character_entered.charAt(0);
                let char2 = character_entered.charAt(1);
                $(this).val(char2);
                
            }

            $(`#v-code-digit-${current_sel} input`).prop('selectionEnd',1);
            
            
        })

        $(this).off('keyup').on('keyup', function(e) {
            

            if ($(this).val() == '') {
                
                current_sel--;
                if(current_sel < 0)current_sel = 0;
                $(`#v-code-digit-${current_sel} input`).focus();
                $(`#v-code-digit-${current_sel} input`).prop('selectionEnd',1);
                callback('');
                
            }else{

                let character_entered = $(this).val();

                let re = /([^0-9])/g;


                if(re.test(character_entered)){ //charater thats not a number was entered
                    $(this).val('');
                    return;
                }


                                
                current_sel++;
                if(current_sel > 5)current_sel = 5;
                $(`#v-code-digit-${current_sel} input`).focus();

                if(character_entered.length > 1){
                    let char1 = character_entered.charAt(0);
                    let char2 = character_entered.charAt(1);
                    $(this).val(char2);
                    
                }

                $(`#v-code-digit-${current_sel} input`).prop('selectionEnd',1);

                
                code_complete = 1;
                code_entered = '';
                $('.code-input input').each(function(index){
                    let entered_num = $(this).val();                        
                    if(entered_num == '')code_complete = 0;
                    code_entered = code_entered + "" + entered_num;

                });

                callback(code_entered);
                

                
            }
        })
    });

    $(`#v-code-digit-0 input`).focus();

}


function saveUserEmail(code = ''){
    if(code.length != 6)return;

    loading.show();
          
    var post_data = {'action':'saveUserEmail','code':code};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();    
            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                
                $('#verifyemailcodemsg').show();
                $('#verifyemailcodemsg').html(data_obj.error);
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                userprofileinfo.email = data_obj.email;
                document.querySelector('#myNavigator').popPage({times:2,animation: 'fade', callback : function(){
                    ons.notification.toast(__("Your email has been updated"),{
                        timeout: 1000
                    });
                }});
            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });


}



function showEditPassword(){
    document.querySelector('#myNavigator').pushPage('html/editpwd.html',
            {
            animation: 'fade'             
            }
    );
}


function updateUserPWD(){

    let pwd_inp_1 = $('#editpwdnew').val();
    let pwd_inp_2 = $('#editpwdconfirm').val();

    if(pwd_inp_1 == '' || pwd_inp_2 == '' || pwd_inp_1 !== pwd_inp_2){
        ons.notification.alert(__("Passwords do not match"),{title:""});
        return;
    }

    let rem_pwd = 0;

    if($('#remember-user-pwd').prop('checked')){
        rem_pwd = 1;        
    }
    

    loading.show();
          
    var post_data = {'action':'saveUserPwd','password':pwd_inp_1,'remember_pwd':rem_pwd};

    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();

            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                
                $('#pwderrormsg').show();
                $('#pwderrormsg').html(data_obj.error);
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                if(rem_pwd){
                    //store password locally.
                    localStorage.setItem('user_pwd', btoa(pwd_inp_1));
                }else{
                    localStorage.removeItem('user_pwd');
                }
                document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){
                    ons.notification.toast(__("Your password has been updated"),{
                        timeout: 1000
                    });
                }});
            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });
}

function edituserDocuments(){
    document.querySelector('#myNavigator').pushPage('html/editdocs.html',
            {
            animation: 'fade'             
            }
    );
}


function showDocument(doc_id){

    document.querySelector('#myNavigator').pushPage('html/savedoc.html',
            {
            animation: 'fade',
            data:{'doc_id':doc_id}             
            }
    );

}


function SelectUserDocImage(){
    imagePicker(function(image_data){
        if(image_data.hasOwnProperty('error')){
            return;
        }
        if(image_data.hasOwnProperty('closed'))return;        

        var current_image = $('#user-doc-img-preview').attr('src');

        $('#user-doc-img-preview').attr('src', image_data.img_data);
        $('#user-doc-img-preview').data('selectimgdata', image_data.img_data);

        
    });
}

function showLanguage(){

    document.querySelector('#myNavigator').pushPage('html/selectlang.html',
            {
            animation: 'fade'            
            }
    );

}



function userPhoneNumberValidate(){

    $('#loginerrormsg').html('');
    
    var phone = $("#login-phone").val();
    var country_call_code = $('#tel-code').data('dialcode');
    var country_code = $('#tel-code').data('country');

    if(phone == '' || phone.length < 5){
        $('#loginerrormsg').html(__("Phone number is invalid"));
        return;
    }

    if(phone.indexOf('+') != -1){
        $('#loginerrormsg').html(__("Please do not include the international dial code (+___) in the phone number field"));
        return;
    }

    let password = '';

    if(localStorage.getItem('user_pwd')){
        //store password locally.
        password = atob(localStorage.getItem('user_pwd'));
    }
    
    
    loading.show();
    

    var post_data = {'action':'userPhoneNumberValidate','phone':phone, 'country_code':country_code,'country_dial_code' : country_call_code, 'user_pwd' : password,"lang" : selected_lang.code};


    $.ajax({
        url: ajaxurl,
        type: 'POST',
        timeout : 30000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            loading.hide();

            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                });
                return;
            }

            if(data_obj.hasOwnProperty('error')){

                $('#loginerrormsg').html(data_obj.error);
                return;
            }

            if(data_obj.hasOwnProperty('success')){

                $('#loginerrormsg').html('');

                if(password){
                    if(data_obj.pwd_valid == 1){
                        //login directly
                        user_login_options = {country_call_code: country_call_code, phone : phone, phone_formatted : data_obj.phone_num_nat, password : password, code : null,fb_user_details:null};
                        login();
                        return;
                    }else{
                        //invalid password, remove stored password if it exists
                        localStorage.removeItem('user_pwd');
                    }
                }
                
                if(data_obj.service == "firebase"){                    

                    loading.show();
                    //show otp code verification page
                    cordova.plugins.firebase.auth.verifyPhoneNumber("+" + country_call_code + phone, 0).then(function(verificationId) {
                        // pass verificationId to signInWithVerificationId
                        firebase_phone_auth_verificationid = verificationId;
                        loading.hide();
                        document.querySelector('#myNavigator').pushPage('html/verifyotp.html',
                            {
                                animation:'fade',
                                data: data_obj             
                            }
                        );
                        
                        ons.notification.toast(__("Verification code sent..."),{
                            timeout: 2000
                        });
                    }).catch(function(e){
                        loading.hide();
                        ons.notification.alert(__("Error sending verification code") + ": " + e,{title:""});
                        console.log(e);
                        document.querySelector('#myNavigator').pushPage('html/verifyotp.html',
                            {
                                animation:'fade',
                                data: data_obj             
                            }
                        );
                        return;
                    });

                    return;
                }


                document.querySelector('#myNavigator').pushPage('html/verifyotp.html',
                    {
                        animation:'fade',
                        data: data_obj             
                    }
                );


            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            loading.hide();
            ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
            });
        }

    });
}




function genRandomString(length){

    var smallalpha="abcdefghijklmnopqrstuvwxyz";
    var capalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numeric="123456789";
    var symbols="!@#_&+-";
    var p_chars='';
    var temp = '';
    var smallalpha_len = Math.floor(length/2);
    var capsalpha_len = 1;
    var symbols_len = 0;//1;
    var numeric_len = length - smallalpha_len - capsalpha_len - symbols_len;
   

    for (i=0;i<capsalpha_len;i++)
        temp+=capalpha.charAt(Math.floor(Math.random()*capalpha.length));

    for (i=0;i<smallalpha_len;i++)
        temp+=smallalpha.charAt(Math.floor(Math.random()*smallalpha.length));

    /* for (i=0;i<symbols_len;i++)
        temp+=symbols.charAt(Math.floor(Math.random()*symbols.length)); */

    for (i=0;i<numeric_len;i++)
        temp+=numeric.charAt(Math.floor(Math.random()*numeric.length));    

        temp=temp.split('').sort(function(){return 0.5-Math.random()}).join('');

    return temp;
}


function showPwdLogin(){
    document.querySelector('#myNavigator').pushPage('html/loginpwd.html',
            {
                animation: 'fade'            
            }
    );
}



function customItemSelect(default_selected,title,callback){
    
    document.querySelector('#customselectdlg').show();
    $('#customselectdlg').attr('title',title); 


    if(default_selected){
        $('#customselectdlg .sel-list-item div[id^=list-item-sel-]').html('');
        $(`#customselectdlg .sel-list-item #list-item-sel-${default_selected}`).html("<ons-icon icon='fa-check-circle' size='24px' style='color:green;'></ons-icon>");
    }
    
    $('#customselectdlg .sel-list-item').off().on('click', function(){
        document.querySelector('#customselectdlg').hide();
        let item_val = $(this).data('value');
        callback(item_val);
        
    })

    
}



function userInfoShow(){    
    document.querySelector('#userinfodialog').show();
}


function chatWindowShow(){
    document.querySelector('#chat-window').show();
}


async function chat_img_send(booking_id){
    imagePicker(function(image_data){
        if(image_data.hasOwnProperty('error')){
            return;            
            ons.notification.alert(__('Invalid photo selected'),{title:""});
            return;
        }
        if(image_data.hasOwnProperty('closed'))return;        

        $('#chat-img-send-btn').prop('disabled', true);
        $('#chat-img-send-btn').css("background-color","grey");
          
          var post_data = { 'action' : 'chatSendImg', 'booking_id':booking_id,'chat_img':image_data.img_data};

          $.ajax({
              url: ajaxurl,
              type: 'POST',
              timeout : 10000,
              crossDomain:true,
              xhrFields: {withCredentials: true},
              data: post_data,
              success: function (data, status)
              {

                    $('#chat-img-send-btn').prop('disabled', false);
                    $('#chat-img-send-btn').css("background-color","#ffbf00");
                      
                    try{
                        var data_obj = JSON.parse(data);
                    }catch(e){
                        ons.notification.toast(__("Error communicating with server"),{
                        timeout: 1000
                        });
                        return;
                    }

                    if(data_obj.hasOwnProperty('error')){
                        
                        ons.notification.toast(__("Error communicating with server"),{
                            timeout: 1000
                        });
                        return;
                    }
                    
                    if(data_obj.hasOwnProperty('success')){
                        
                        //refresh chat content               

                        if(data_obj.hasOwnProperty('chat_content')){
                            $('#chat-msg-content').val('');
                            $('#chat-window-body').empty();
                            $('#chat-window-body').html(data_obj.chat_content);
                            $('#chat-window-body').scrollTop(10000000);
                        }

                        //new chat message?
                        if(data_obj.hasOwnProperty('chat_new_content') && data_obj.chat_new_content == 1){
                            //notification_sound.play();
                            if(!chat_window_display_status){
                                $('#chat-new-msg-ind').show();
                            }
                        }

                    }
                  

              },
              error: function(jqXHR,textStatus, errorThrown) {  
                $('#chat-img-send-btn').prop('disabled', false);
                $('#chat-img-send-btn').css("background-color","#ffbf00");
                  ons.notification.toast(__("Error communicating with server"),{
                    timeout: 1000
                  });
              }

          });

    });

}







function SearchRoutesAjax(){
    var search_str = $("#search-routes").val();
    $('#search-progressbar').css('visibility','visible');
    if (state_search_progress) {
        state_search_progress.abort();
    } 
    state_search_progress = $.ajax({ 
        url: ajaxurl, 
        method: 'GET',
        crossDomain:true,
        timeout:20000,
        xhrFields: {withCredentials: true},
        data: { 'action_get' : 'getstateroutetariffs', 'state_str':search_str},
        dataType: 'json',
        success: function(data){
            loading.hide();
            $('#search-progressbar').css('visibility','hidden'); 
            state_search_progress = undefined;
            $('#state-routes-list').scrollTop();
            
            if(data.hasOwnProperty('success')){                
                //console.log(data);
                
                var state = data.result.state;
                if(!state.length){
                    /* ons.notification.toast("No routes found",{
                        timeout: 1000
                    }); */
                } 

                state_routes_search_result = data.result;
                $('#state-routes-list').empty();
                $('#state-routes-list').html("<ons-list>" + data.result.state + "</ons-list>");
                

            } 

        },
        error: function(){
            loading.hide();
            return;
        } 


    });
}


function showPresetRoutes(){

    document.querySelector('#presetroutes').show();
    $('#presetroutes').attr('title',__('Routes'));
    loading.show();
    SearchRoutesAjax();

}


function showReferralInfo(){
    document.querySelector('#myNavigator').pushPage('html/riderreferral.html',
            {
                animation: 'fade'            
            }
    );
}


function shareReferralCode(){
    share_message('',userprofileinfo.ref_code_copy_msg,userprofileinfo.ref_url);
}


function showCancelReasons(callback){
    let cancel_reasons = app_settings.trip_cancel_reasons;
    let cancel_reasons_html = '';
    cancel_reasons.forEach(function(val,indx){
        cancel_reasons_html += `<ons-list-item data-value="${val}" data-text="${val}" class="cancel-reason-list-item">
                                  
                                            <div class="left">
                                                <ons-icon icon='fa-user-times' size='24px' style='color:#777;'></ons-icon>
                                            </div>
                                            <div class="center">
                                                <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${val}</span>
                                            </div>
                                        </ons-list-item>`;
    })

    cancel_reasons_html += `<ons-list-item data-value="Other" data-text="${__('Other reason')}" class="cancel-reason-list-item">
                                  
                                            <div class="left">
                                                <ons-icon icon='fa-pencil' size='24px' style='color:#777;'></ons-icon>
                                            </div>
                                            <div class="center">
                                                <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${__('Other reason')}</span>
                                            </div>
                                        </ons-list-item>`;

    cancel_reasons_html = `<ons-list>${cancel_reasons_html}</ons-list>`;

    $('#canceltripreasonscontent').empty();
    $('#canceltripreasonscontent').html(cancel_reasons_html);
    $('#canceltripreasonsdlg').attr('title',__('Cancel Booking'));
    document.querySelector('#canceltripreasonsdlg').show();

    

    $('#canceltripreasonscontent .cancel-reason-list-item').off().on('click', function(){
        document.querySelector('#canceltripreasonsdlg').hide();
        let item_val = $(this).data('value');
        let item_text = $(this).data('text');
        if(item_val == "Other"){

            ons.notification.prompt(__('Why are you cancelling this ride?'),{title:'',cancelable:true,buttonLabels:[__('Cancel'),__('Continue')]})
            .then(function(input) {
                if(!input)return;
                callback(input);
            });

            return;
        }
        callback(item_text);
        
    })
}


function showPageWithTripDlgOn(page_id, data = {}){
       

    if(trip_summary_dialog_show){
        $("#trip-summary-back-btn").css("visibility","hidden");
        $("#trip-summary-back-btn").css("z-index","10");
        $("#menubtn").css("visibility","visible");
        $("#menubtn").css("z-index","100");
        $('#ride-request-cancel-btn').css("z-index","10");
        $('#ride-request-cancel-btn').css("visibility","hidden");
        $("#new-bookng-details").css("visibility","hidden");
        $("#new-bookng-details").css("left", "-10000px");
        $("#ride-details-container").hide();
        $('#map-event-absorber').hide();
        disable_nbk_dlg_auto_show_on_home = 0;
        trip_summary_dialog_show = 0;
        map.setPadding(0,0,0,0);
    }

    document.querySelector('#myNavigator').pushPage(`html/${page_id}.html`,
            {
            animation: 'fade',
            data:data          
            }
    );

    

    document.querySelector('#mySplitter').left.close();


}


function driver_app_store_page_show(){

    //running on android
       
   if(device.platform.toLowerCase() === "android"){                                
                               
       window.open(DRIVER_APP_UPDATE_URL_ANDROID,'_system');

   }else{ //running on IOS

        window.location = DRIVER_APP_UPDATE_URL_IOS;

   }
   
}



function updateBannerViewCount(banner_id = 0){
    
    if(!banner_id)return;
          
    var post_data = {'action_get':'updateBannerViewCount','id' : banner_id};

    $.ajax({
        url: ajaxurl,
        type: 'GET',
        timeout : 10000,
        crossDomain:true,
        xhrFields: {withCredentials: true},
        data: post_data,
        success: function (data, status)
        {
            

            try{
                var data_obj = JSON.parse(data);
            }catch(e){
                return;
            }

            if(data_obj.hasOwnProperty('error')){
                
                return;
            }

            if(data_obj.hasOwnProperty('success')){
                return;
            }
            

        },
        error: function(jqXHR,textStatus, errorThrown) {  
            return;
        }

    });
}


function showUpdatePrompt(url){

    startscreen.show();

    ons.notification.alert(__('Update App'), {title:"",buttonLabels:[__('Update')],callback: function(){
                                
                                window.open(url,'_system');
                                
                                setTimeout(function(){
                                    showUpdatePrompt(url);
                                },1000);
                                
                                
                            }});

}


function SendCodeViaWhatsApp(wts_phone_num, message, auth_code){

    if(typeof SendCodeViaWhatsApp.whatsapp_auth_check_timer == 'undefined'){
        SendCodeViaWhatsApp.whatsapp_auth_check_timer = 0; //declare a static variiable
    }

    if(typeof SendCodeViaWhatsApp.processing == 'undefined'){
        SendCodeViaWhatsApp.processing = 0; //declare a static variiable
    }

    if(!wts_phone_num)return;

    let whatsapp_deep_link = `https://wa.me/${wts_phone_num}/?text=${message}`;
    let time_check_start = Date.now() / 1000 | 0;
    clearInterval(SendCodeViaWhatsApp.whatsapp_auth_check_timer);
    SendCodeViaWhatsApp.whatsapp_auth_check_timer = setInterval(function(){
        let cur_time = Date.now() / 1000 | 0;
        if(cur_time - time_check_start > 120){
            clearInterval(SendCodeViaWhatsApp.whatsapp_auth_check_timer);
            return;
        }

        if(SendCodeViaWhatsApp.processing)return;
        SendCodeViaWhatsApp.processing = 1;
        $.ajax({ 
            url: ajaxurl, 
            method: 'GET',
            crossDomain:true,
            timeout : 10000,
            xhrFields: {withCredentials: true},
            data: { 'action_get' : 'whatsappAuthCheck', 'code':auth_code},
            dataType: 'json',
            success: function(data){
                
                SendCodeViaWhatsApp.processing = 0;

                if(data.hasOwnProperty('error')){
                    return;
                }
            
                if(data.hasOwnProperty('success')){
                    clearInterval(SendCodeViaWhatsApp.whatsapp_auth_check_timer);
                    //automatically inout OTP code
                    let otp_code = data.otp_code;
                    code_inp_str = otp_code;

                    for(let v = 0;v < 6;v++){
                        $(`#v-code-digit-${v}`).val(otp_code[v]);
                    }

                    $('#verify-otp-code-btn').prop('disabled', false); 

                    setTimeout(function(){
                        $('#verify-otp-code-btn').click();
                    },1000);

                }
            },
            error: function(){
                SendCodeViaWhatsApp.processing = 0;
                return;
            } 


        });


    }, 5000);
    window.open(whatsapp_deep_link, '_system');
}


function SearchCountryList(){
    var search_str = $("#search-countries").val();
    if(!search_str){
        $('#countrylistcontent .default-country-items').show(); 
        return;         
    }

    search_str = search_str.toLowerCase();

    if(!$(`#countrylistcontent .default-country-items[data-countrysearch*=${search_str}]`).length)return;

    $('#countrylistcontent .default-country-items').hide();

    $(`#countrylistcontent .default-country-items[data-countrysearch*=${search_str}]`).show(); 
}



async function showQuickRideBooking(){

    let help_tip_content = `
                            <p style='font-size:18px;font-weight:bold'>${__('Get a ride instantly. No destination needed')}</p>
                            <p>${__('With Quick-ride, you can book a trip in just a few taps. Simply tap the Quick-ride button, choose your preferred vehicle type, confirm your pickup location, and your driver will be on the way; no need to enter a destination.')}</p>
                            <p>${__('For even more flexibility, certain vehicle types are available at hourly rates, letting you pay by the hour instead of by distance. Hourly options are clearly shown in the vehicle selection screen, making it easy to pick what works best for you.')}</p>
                            <p>${__('Whether you are running errands, exploring the city, or unsure of your next stop, Quick-ride gives you the freedom to move, your way, on your schedule.')}</p>
                        `;
    let options = {
            name : "quickridetrips", //name of the help tip
            title : "Quick-ride", //Title displayed on the Help tip dialog
            image : "img/quickride-ht.png", //image url of the help tip dialog. leave blank to use a default image
            content : help_tip_content, //Array of string content that make up the body text of the help tip
            button_text : __('Continue') //text displayed on the OK button of the help tip dialog
        }

    
    let response = await showHelptTip(options);

    if(response.hasOwnProperty('error'))return;

    service_mode = 1; //enable quick ride mode
    

    drop_off_data = {'address': '','lng':'','lat':''}; //clear dropoff data

    //reset multi destination mode

    multi_destination_mode = 0;        
    $('#location-type-icon-ds1').hide();
    $('#location-type-icon-ds2').hide();
    dest_location_type_selected = 0;
    destination_stop_inp1_shown = 0;
    destination_stop_inp2_shown = 0; 

    multi_destinations = {'pickup' : {'address':'', 'lat':'', 'lng' :''},'dest-1':{'address':'', 'lat':'', 'lng' :''},'dest-2':{'address':'', 'lat':'', 'lng' :''},'dropoff' : {'address':'', 'lat':'', 'lng' :''}};
            
    $('#pickup-addr-disp-text').html(pick_up_data.address);

    intra_city_duration = 0;
    intra_city_distance = 0;
    $('#pickup-addr-disp').show();
    trackPickupElPos();    

    shownewbookingdialog();
    
}



function helpTipStatus(help_tip_name, mode = 0){

    let shown_help_tips = localStorage.getObject('shownhelptips');
    let help_tip_found = false;

    if(mode){

        //add help tip to shown list

        if(shown_help_tips){

            shown_help_tips.forEach(function(val,indx){
                if(val == help_tip_name){
                    help_tip_found = true; //already added.
                }
            })

            if(help_tip_found)return true;

            let shown_help_tips_list = shown_help_tips.push(help_tip_name);
            localStorage.setObject('shownhelptips', shown_help_tips_list);

        }else{
            let shown_help_tips_list = [help_tip_name];
            localStorage.setObject('shownhelptips', shown_help_tips_list);
        }

        return true;

    }

    

    if(shown_help_tips){
        shown_help_tips.forEach(function(val,indx){
            if(val == help_tip_name){
                help_tip_found = true;
            }
        })

        if(help_tip_found)return true;
    }

    return false;
}


function showHelptTip(options){
    
    let res = new Promise(function(resolve,reject){
        
        if(typeof showHelptTip.timer == 'undefined'){
            showHelptTip.timer = 0; //declare a static variiable
        }

        if(typeof showHelptTip.counter == 'undefined'){
            showHelptTip.counter = 0; //declare a static variiable
        }

        const COUNTDOWN_LIMIT = 1;

        clearInterval(showHelptTip.timer);
        showHelptTip.counter = 0;

        if(helpTipStatus(options.name)){
            //Only handle callback if Help tip has already been shown
            resolve({success : 1});
            return;
        }
        
        $('#helptipdlg').attr('title',options.title);
        $('#help-tip-img').attr('src',options.image ? options.image : "img/help-tip-img.png");

        
        $('#help-tip-content').html(options.content);

        $('#help-tip-btn').text(options.button_text + " " + `(${COUNTDOWN_LIMIT})`);
        $('#help-tip-btn').prop("disabled", true);

        
        document.querySelector('#helptipdlg').show();
        $('#help-tip-content').scrollTop(0);

        $('#help-tip-btn').off().on('click', function(){
            document.querySelector('#helptipdlg').hide();
            if($('#hide-help-tip').prop('checked'))helpTipStatus(options.name,1);
            resolve({success : 1});
        });

        $('#help-tip-close-btn').off().on('click', function(){
            document.querySelector('#helptipdlg').hide();
            resolve({error : 1});
        });

        showHelptTip.timer = setInterval(function(){
            showHelptTip.counter++;        
            let countdown_val = COUNTDOWN_LIMIT - showHelptTip.counter;
            $('#help-tip-btn').text(options.button_text + " " + `(${countdown_val})`);

            if(showHelptTip.counter >=COUNTDOWN_LIMIT ){
                $('#help-tip-btn').prop("disabled", false);
                $('#help-tip-btn').text(options.button_text);
                clearInterval(showHelptTip.timer);
            }

        },1000);
    });

    return res;
    
        
}


function showManualCitySelectionDlg(current_city,dlg_desc,callback){

    let cities_ids = routetariffs.result.city_id;
    let cities_list_html = '';
    let user_selected_city = 0;

    if(dlg_desc){
        $('#city-select-desc').html(dlg_desc);
    }

    cities_ids.forEach(function(val,indx){
    let city_name = routetariffs.result[val].cars[0].r_title;
    cities_list_html += `<ons-list-item data-value="${val}" data-text="${city_name}" class="sel-list-item"> 
    
                            <div class="left">
                                <ons-icon icon='fa-map-marker' size='18px' style='color:black;'></ons-icon>
                            </div>
                    
                            <div class="center">
                                <span style="font-size: 16px;font-weight: 600;padding-left:10px;">${city_name}</span>
                            </div>
                            <div class="right" id="list-item-sel-${val}">
                                
                            </div>

                        </ons-list-item>`;

    });


    cities_list_html = `<ons-list>${cities_list_html}</ons-list>`;
    

    $('#selectcitylistcontent').html(cities_list_html);

    if(current_city){
        $('#selectcitydialog .sel-list-item div[id^=list-item-sel-]').html('');
        $(`#selectcitydialog .sel-list-item #list-item-sel-${current_city}`).html("<ons-icon icon='fa-check-circle' size='24px' style='color:green;'></ons-icon>");
    }

    
    document.querySelector('#selectcitydialog').show();

    
    $('#selectcitydialog .sel-list-item').off().on('click', function(){
        
        $('#city-select-btn').prop('disabled', false);

        
        user_selected_city = $(this).data('value');

        $('#selectcitydialog .sel-list-item div[id^=list-item-sel-]').html('');
        $(`#selectcitydialog .sel-list-item #list-item-sel-${user_selected_city}`).html("<ons-icon icon='fa-check-circle' size='24px' style='color:green;'></ons-icon>");

              
        
        
    });

    $('#city-select-btn').off('click').on('click', function(){

        document.querySelector('#selectcitydialog').hide();
        document.querySelector('#gpsenabedialog').hide();
        let coords = {lat:parseFloat(routetariffs.result[user_selected_city].cars[0].lat),lng:parseFloat(routetariffs.result[user_selected_city].cars[0].lng)};
        callback(coords); 

    });
}