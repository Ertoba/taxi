// App logic.
ons.platform.select('android');
window.myApp = {};


document.addEventListener('init', function(event) {

  $(document.body).css("background-color","white !important");
  $('.page__background').css("opacity","1");

  var page = event.target;

  if(device_ready){
   
      //StatusBar.styleLightContent();
    
  }

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }  
  
});


document.addEventListener('show', function(event) {

  if(device_ready){
    StatusBar.styleDefault();
  }

  
  
  var page = event.target;

  // Each page calls its own initialization controller.

  
  if (page.id === "loginpage") {
    StatusBar.styleDefault();
    startscreen.hide();
    navigator.splashscreen.hide();
    page.onDeviceBackButton = onBackButton;
    //ons.enableDeviceBackButtonHandler();   
  }


  if (page.id === "verifypage") {
    StatusBar.styleLightContent();
    startscreen.hide();
    //page.onDeviceBackButton = onBackButton;
    //ons.enableDeviceBackButtonHandler();   
  }

  if (page.id === "verifyemailcode"){
    
    initCodeInput(function(code){
      if(code.length == 6){
          $('#save-user-email-btn').prop('disabled', false);
          $('#save-user-email-btn').off().on('click', function(){
            saveUserEmail(code);
          })
      }else{
        $('#save-user-email-btn').prop('disabled', true);
        $('#save-user-email-btn').off();
      }
    })

  }


  if (page.id === "verifyotpcode"){
    code_inp_str = '';

    if(page.data.otp_send_limit == true){
      $('#verifyotpcodemsg').html(__('Too many OTP messages sent. Try again later'));
    }

    initCodeInput(function(code){
      $('#verifyotpcodemsg').html('');
      code_inp_str = code;
      if(code.length == 6){          
          $('#verify-otp-code-btn').prop('disabled', false);          
      }else{
        $('#verify-otp-code-btn').prop('disabled', true);
      }
    })

    $('#verify-otp-code-btn').off().on('click', function(){
      if(page.data.otp_send_limit == true){
        return;
      }
      loading.show();
      if(page.data.service == 'firebase'){
        verifyOTPCodeFirebase(page.data.country_dial_code,page.data.phone_num_inp,page.data.phone_num,code_inp_str,page.data.exists,page.data.phone_num_nat);
      }else{
        verifyOTPCode(page.data.country_dial_code,page.data.phone_num_inp,page.data.phone_num,code_inp_str,page.data.exists,page.data.phone_num_nat);
      }            
    })

  }

  
  if(page.id === "mappage"){
  
    $('.page__background').css("opacity","0");
    
    //$('#startscreen').show();
    
    StatusBar.styleDefault();

    
    
    /* if (typeof google === 'object' && typeof google.maps === 'object') {

      if(typeof mapOptions === 'undefined'){
          mapOptions = {
          center: new google.maps.LatLng(9.0338725,8.677457),
          zoom: 5,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        getMapLocation();
        initAutocomplete();        
        initAutocomplete2();
      }

      bounds = new google.maps.LatLngBounds();
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
      });

            
    } */

    //map_visibility_status = 1;
    if(device_ready)ons.enableDeviceBackButtonHandler();

    if(!trip_summary_dialog_show && marker1 && marker1.isVisible() && marker2 && marker2.isVisible() && route_polyline && route_polyline.getVisible() && !disable_nbk_dlg_auto_show_on_home){ 
      
      disable_nbk_dlg_auto_show_on_home = 0;
      shownewbookingdialog();      
      
    }

    if(!trip_summary_dialog_show && marker1 && marker1.isVisible() && service_mode == 1 && !disable_nbk_dlg_auto_show_on_home){ 
      
      disable_nbk_dlg_auto_show_on_home = 0;
      shownewbookingdialog();      
      
    }




    let notif_available = 0;
    for(let key in notify_new_data_available){
      if(notify_new_data_available[key]){
        notif_available = 1;
      }
    }

    if(notif_available){
      $('#global-notify-icon').css('color','red');
    }else{
      $('#global-notify-icon').css('color','white');
    }
    
          
     
      

  }

  if(page.id === 'addresses'){
    if(location_type_selected){      
      $("#address-input").focus();
    }else{          
      $("#address-input").focus();
    }
  }


  if(page.id === 'softwarelicense'){
    loading.hide();
  }


  if(page.id === 'locationmappage'){

    $('.page__background').css("opacity","0");

        var locationmap_lat;
        var locationmap_lng;
        var select_location_latLng;
        

        if(location_type_selected){

            if(drop_off_data.lat){
              locationmap_lat = drop_off_data.lat;
              locationmap_lng = drop_off_data.lng;

            }else if(user_location.lat){
                locationmap_lat = user_location.lat;
                locationmap_lng = user_location.lng;
            }else{
                locationmap_lat = selected_city_lat;
                locationmap_lng = selected_city_long;
            }

        }else{

          if(pick_up_data.lat){
              locationmap_lat = pick_up_data.lat;
              locationmap_lng = pick_up_data.lng;
          }else if(user_location.lat){
              locationmap_lat = user_location.lat;
              locationmap_lng = user_location.lng;
          }else{
              locationmap_lat = selected_city_lat;
              locationmap_lng = selected_city_long;
          }


        }



        if(map3){
          map3.remove(); 
          map3 = undefined; 
        }
        map3 = plugin.google.maps.Map.getMap(document.getElementById("map-canvas3"), {
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
              lat: locationmap_lat,
              lng: locationmap_lng
          },
          zoom: 18
          },
          'preferences': {
          'zoom': {
              'minZoom': 3,
              'maxZoom': 18
          },
          'building': true
          }
      });

      map3.one(plugin.google.maps.event.MAP_READY, function() {
          if(location_type_selected){
            $('#locationmap-marker').attr('src','img/drop-off-loc-icon-pin.png');
            $('#locationmap-marker').show();
          }else{
            $('#locationmap-marker').attr('src','img/pick-up-loc-icon-pin.png');
            $('#locationmap-marker').show();
          }

          $('#location-map-action').off('click').on('click',function(){
              

              var center = {"lat": selected_city_lat, "lng": selected_city_long};
              var current_pos = {"lat": select_location_latLng.lat, "lng": select_location_latLng.lng};

              var distance = plugin.google.maps.geometry.spherical.computeDistanceBetween(center, current_pos); //distance in meters
              console.log(distance);
              if(distance > selected_city_radius){
                if(location_type_selected){ 
                  ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for drop-off"),{title:""});
                  return;
                }else{
                  ons.notification.alert(__("The selected location is outside our service area in your selected city route. The location cannot be used for pick-up"),{title:""});
                  return;
                }
              }

              //reverse geocode cordinates
              loading.show();
              plugin.google.maps.Geocoder.geocode({
                "position": {"lat": select_location_latLng.lat, "lng": select_location_latLng.lng}
              }, function(results) {
                loading.hide();
                console.log(results);
                if (results.length === 0) {
                    $('#locationmap-title').html(__("Somewhere in {---1}",[selected_city_route]));
                   decoded_location_data.address = __("Somewhere in {---1}",[selected_city_route]); 
                   decoded_location_data.lat = select_location_latLng.lat;
                   decoded_location_data.lng = select_location_latLng.lng;    
                                  
                                    
                }else{
    
                    var address = results[0].extra.lines.join(', ');
                    
                    if(address == ''){
                        address = __("Somewhere in {---1}",[selected_city_route]); 
                    }
                    
                    $('#locationmap-title').html(address);
                    decoded_location_data.address = address; 
                    decoded_location_data.lat = select_location_latLng.lat;
                    decoded_location_data.lng = select_location_latLng.lng;
                }
                
                $('#myfavbtn2').css('visibility', 'visible');//show the favourite fab button in case user wants to save his current location
                $("#myfavbtn2").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass("bounceIn animated");
                });
                $('#location-action').hide();
                $('#location-confirm').show();
                                     
                
              });
              
              //loading.hide();

          })


          $('#location-map-confirm').off('click').on('click', function(){

                  disable_nbk_dlg_auto_show_on_home = 1;
                  
                  document.querySelector('#myNavigator').popPage(
                    {
                        animation: 'fade',
                        times:multi_destination_mode == 1 ? 1 : 2,   
                        callback: function(){
                        
                        if(multi_destination_mode){
                            if(location_type_selected){
                              if(dest_location_type_selected == 0){                                      
                            
                                multi_destinations['dest-1']['address'] = decoded_location_data.address;
                                multi_destinations['dest-1']['lat'] = decoded_location_data.lat;
                                multi_destinations['dest-1']['lng'] = decoded_location_data.lng;
                                $("#address-input-ds1").val(multi_destinations['dest-1']['address']);
                
                            }else if(dest_location_type_selected == 1){                
                                                
                                multi_destinations['dest-2']['address'] = decoded_location_data.address;
                                multi_destinations['dest-2']['lat'] = decoded_location_data.lat;
                                multi_destinations['dest-2']['lng'] = decoded_location_data.lng;
                                $("#address-input-ds2").val(multi_destinations['dest-2']['address']);
                                
                            }else{
                                
                                multi_destinations['dropoff']['address'] = decoded_location_data.address;
                                multi_destinations['dropoff']['lat'] = decoded_location_data.lat;
                                multi_destinations['dropoff']['lng'] = decoded_location_data.lng;
                                $("#address-input-d").val(multi_destinations['dropoff']['address']);
                                
                            }
                
                            if(!multi_destinations['pickup']['address']){
                                location_type_selected = 0; //swith to pickup location
                                $("#address-input-p").focus();
                            }
                            
                            return;
                          }else{

                                multi_destinations['pickup']['address'] = decoded_location_data.address;
                                multi_destinations['pickup']['lat'] = decoded_location_data.lat;
                                multi_destinations['pickup']['lng'] = decoded_location_data.lng;
                                $("#address-input-p").val(multi_destinations['pickup']['address']);
                                return;

                          }
                        }else{

                            if(route_polyline){
                              route_polyline.remove();
                              route_polyline = null;                     
                            }
                        
                        
                            if(location_type_selected){ //drop-off

                                drop_off_data.address = decoded_location_data.address;
                                drop_off_data.lat = decoded_location_data.lat;
                                drop_off_data.lng = decoded_location_data.lng;
                                        
                                $('#pac-input2').val(drop_off_data.address);
                                $('#dropoff-addr-disp-text').html(drop_off_data.address);

                                if(marker2){
                                  marker2.setVisible(true);
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
                                                'position':{lat: drop_off_data.lat,lng: drop_off_data.lng},
                                                'icon' : {url: 'img/drop-off-pin.png', size:{width:64,height:64}},
                                                animation: plugin.google.maps.Animation.DROP
                                            });                                    
                                    marker2._isReady = true;
                                }

                                
                            }else{


                                pick_up_data.address = decoded_location_data.address;
                                pick_up_data.lat = decoded_location_data.lat;
                                pick_up_data.lng = decoded_location_data.lng;
                                        
                                $('#pac-input').val(pick_up_data.address);
                                $('#pickup-addr-disp-text').html(pick_up_data.address);

                                if(marker1){
                                  marker1.setVisible(true);
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
                                                'icon' : {url: 'img/pick-up-pin.png', size:{width:64,height:64}},
                                                animation: plugin.google.maps.Animation.DROP
                                            });

                                    marker1._isReady = true;
                                }



                            }
                        }

                      if(marker1.isVisible() && marker2.isVisible()){  
                        process_route_between_locations();
                      }else if(service_mode == 1 && marker1.isVisible()){                        
                        shownewbookingdialog();
                      }
                    }          
                  }
                );

                
          })




          map3.on(plugin.google.maps.event.MAP_DRAG_START, function(){
            $('#myfavbtn2').css('visibility', 'hidden');
            $('#location-action').show();
            $('#location-confirm').hide();
          });

          map3.on(plugin.google.maps.event.MAP_DRAG_END, function(){
              
            
              var offset = $('#locationmap-marker').offset();
              var pointX = offset.left + 16;
              var pointY = offset.top;

              console.log(pointX + ',' + pointY);
              map3.fromPointToLatLng([pointX,pointY], function(latLng){
                  console.log(latLng);
                  select_location_latLng = latLng;

                  /* var marker = map3.addMarker({
                    "position": latLng
                  }); */

                  /* map3.fromLatLngToPoint(latLng, function(point) {
                    var px = point[0].toFixed(1);
                    var py = point[1].toFixed(1);
                    $('#square').css('left',px.toString()+'px');
                    $('#square').css('top', py.toString()+'px');
                    console.log("left : " + point[0].toFixed(1) + "px\n" + "top : " + point[1].toFixed(1) + "px");
                  }); */

              })

              
              
          });
                   
          

      }); 
  }

  if(page.id === 'bookingdetails'){
      $('.page__background').css("opacity","0");
      let booking_details_data = JSON.parse($('#booking-list-item-data-' + page.data.bookid).html());
      let reset_map_move_timer = 0;
      let reset_map_move_count = 0;
      if(map3){
        map3.remove(); 
        map3 = undefined; 
      }  
        map3 = plugin.google.maps.Map.getMap(document.getElementById("booking-details-map"), {
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
          target: {lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
          zoom: 18
          },
          'preferences': {
          'zoom': {
              'minZoom': 3,
              'maxZoom': 18
          },
          'building': false
          }
      });

      map3.one(plugin.google.maps.event.MAP_READY, function() {  

          //clear markers                 
          if(marker3){
            marker3.remove();
            marker3 = undefined;
          };

          if(marker4){
            marker4.remove();
            marker4 = undefined;
          };

                      
          if(marker5){
            marker5.remove();
            marker5 = undefined;
          };

          if(marker6){
            marker6.remove();
            marker6 = undefined;
          };

          let target_coords = [];

          if(parseFloat(booking_details_data.p_lat) && parseFloat(booking_details_data.p_lng) && parseFloat(booking_details_data.d_lat) && parseFloat(booking_details_data.d_lng)){
              target_coords = [{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},{lat: parseFloat(booking_details_data.d_lat),lng: parseFloat(booking_details_data.d_lng)}];
              marker3 = map3.addMarker({
                        'position':{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
                        'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });

              marker4 = map3.addMarker({
                        'position':{lat: parseFloat(booking_details_data.d_lat),lng: parseFloat(booking_details_data.d_lng)},
                        'icon' : {url:'img/drop-off-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });

          }else{
              target_coords = [{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)}];
              marker3 = map3.addMarker({
                        'position':{lat: parseFloat(booking_details_data.p_lat),lng: parseFloat(booking_details_data.p_lng)},
                        'icon' : {url:'img/pick-up-pin.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }

          if(parseFloat(booking_details_data.waypoint1_lat) && parseFloat(booking_details_data.waypoint1_long)){
            target_coords.push({lat: parseFloat(booking_details_data.waypoint1_lat),lng: parseFloat(booking_details_data.waypoint1_long)});
            marker5 = map3.addMarker({
                        'position':{lat: parseFloat(booking_details_data.waypoint1_lat),lng: parseFloat(booking_details_data.waypoint1_long)},
                        'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }


          if(parseFloat(booking_details_data.waypoint2_lat) && parseFloat(booking_details_data.waypoint2_long)){
            target_coords.push({lat: parseFloat(booking_details_data.waypoint2_lat),lng: parseFloat(booking_details_data.waypoint2_long)});
            marker6 = map3.addMarker({
                        'position':{lat: parseFloat(booking_details_data.waypoint2_lat),lng: parseFloat(booking_details_data.waypoint2_long)},
                        'icon' : {url:'img/waypoint.png',size:{width:32,height:32}},
                        animation: plugin.google.maps.Animation.DROP
                    },function(marker){
                        marker.setVisible(true);
                        marker.setDisableAutoPan(true);
                        marker._isReady = true;
                    });
          }

          //create markers
          setTimeout(() => {

      
            map3.setClickable(false);
            map3.animateCamera({
                target: target_coords,
                zoom: 18,
                duration: 1000,
                padding: 60  // default = 20px
              }, function() {
                  map3.setClickable(true);
                //alert("Camera target has been changed");
              });
                        
          }, 1000);

          map3.on(plugin.google.maps.event.MAP_DRAG_START, function(){
            clearInterval(reset_map_move_timer);
          });

          map3.on(plugin.google.maps.event.MAP_DRAG_END, function(){
              
              clearInterval(reset_map_move_timer);

              reset_map_move_timer = setTimeout(function(){

                  map3.setClickable(false);
                  map3.animateCamera({
                      target: target_coords,
                      zoom: 18,
                      duration: 1000,
                      padding: 60  // default = 20px
                    }, function() {
                        map3.setClickable(true);
                      //alert("Camera target has been changed");
                    });

              },3000)

              
          });


      });
  }

  if(page.id === 'interstatepage'){
        
          $('.page__background').css("opacity","0");
         if(!processed_interstate_route){ 
           //loading.show();  
            if(typeof map2 === 'object')map2.remove();
            map2 = plugin.google.maps.Map.getMap(document.getElementById("map-canvas2"), {
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
              'rotate': true,
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
                  lat: 9.0778,
                  lng: 8.6775
              },
              zoom: 3
              },
              'preferences': {
              'zoom': {
                  'minZoom': 3,
                  'maxZoom': 18
              },
              'building': true
              }
          });

          map2.one(plugin.google.maps.event.MAP_READY, function() {
              console.log("--> map_canvas2 : ready.");
              interStatePlot(selected_state_id);         
              processed_interstate_route = 1;
              loading.hide();

              
          }); 

          
      }
    
         
    
  }

  if(page.id === 'routespage'){

    
  }

  if(page.id === 'newbookingpage'){

      

  }


  if(page.id === 'aboutapp'){
    
   
  }


  if(page.id === 'signuppage'){
    
    //configure cropit
        jQuery('#image-editor').cropit({
          /* smallImage:'stretch', */
          allowDragNDrop:false,
        /*  width:300,
          height:300, */
          exportZoom:2,
          freeMoveboolean: true,
          onImageLoaded: function(){
            //$('.cropit-preview').css('background-image','none');
            var current_image = $('.cropit-preview').css('background-image');
            $('.cropit-preview').css('background-image','none');
            $('.cropit-preview-image-container').css('visibility','visible');
            
            var imageData = jQuery('#image-editor').cropit('export', {
              type: 'image/jpeg',
              quality: .9                    
            });
            if(!imageData){

              ons.notification.toast(__("Invalid photo selected"),{
                timeout: 1000
              });

              user_signup_photo = '';
              $('.cropit-preview-image-container').css('visibility','hidden');
              $('.cropit-preview').css('background-image',current_image);
              $('.cropit-image-input').val('');
              return;
              
            }

            user_signup_photo = imageData;
                        

          }          
      });

      

      $('.select-image-btn').off('click').on('click',function() {
          $('.cropit-image-input').click();
      });

  }

  if(page.id === 'profilepage'){

    $('#user-verified-email').html(!!userprofileinfo.email ? userprofileinfo.email : "---");

  }


  if(page.id === 'bookingpage'){     
    

  }


  if(page.id === 'bookingpagecomplete'){     
      $('#booking-comp').html(bookings_data['completed']);
  }

  if(page.id === 'bookingpagecancel'){     
      $('#booking-canc').html(bookings_data['cancelled']);
  }



  if(page.id == 'editdocs'){
    
  }




  if(page.id === 'notificationspage'){
    getnotifications();
    notify_new_data_available.notifications = 0;
    $('#notifications-refresh').on('click', function(){
      getnotifications();
    })
  }


  if(page.id === 'walletpage'){

    if(page.data.hasOwnProperty('wallet_low') == true){
      page.data.wallet_low = false;
      ons.notification.alert(page.data.msg,{'title':""});
      $('#fundAmount').val(page.data.trip_amount);
      //Vpay();                 
    }

    getwalletinfo();

       
    
  }

  if(page.id === "banner"){
      let banner_id = page.data.banner_id;
      clearTimeout(banner_view_timer);
      banner_view_timer = setTimeout(updateBannerViewCount(banner_id),5000); //update the banner view count for this user when banner content has been viewed for 5 seconds
  }


  
  $(document.body).css("background-color","");
  
});



document.addEventListener('hide', function(event) {
  var page = event.target;

  if(page.id == "chatsup"){
    clearInterval(chat_support_msg_poll_timer_handle);
  }  
  
  
  if(page.id === "banner"){      
      clearTimeout(banner_view_timer);      
  }

  // Each page calls its own initialization controller.
  if (page.id === "loginpage") {
    ons.enableDeviceBackButtonHandler();    
  }

  if(page.id === "mappage"){
    //map_visibility_status = 0;
    //ons.enableDeviceBackButtonHandler();
  }


  if(page.id === 'profilepage'){
    refreshmap();
  }

  if(page.id == 'promotions'){
    refreshmap();
  }
  if(page.id === "routespage"){   
   

  }
  if(page.id === 'addresses'){
    return;
}

if(page.id === 'bookingdetails'){
    if(marker3){
        marker3.remove();
        marker3 = undefined;
      };

      if(marker4){
        marker4.remove();
        marker4 = undefined;
      };

      if(marker5){
        marker5.remove();
        marker5 = undefined;
      };

      if(marker5){
        marker5.remove();
        marker5 = undefined;
      };

      if(map3){
        map3.remove(); 
        map3 = undefined; 
      }
  }

  if(page.id === 'locationmappage'){
    if(map3){
        map3.remove(); 
        map3 = undefined; 
      }
  }


  if(page.id === 'interstatepage'){




  }



  });




  document.addEventListener('preshow', function(event){ 

    let page = event.target;
    if(page.id == "gpsenabedialog"){
      translateElements('gpsenabedialog');      
    }   

    if(page.id == "selectcitydialog"){
      translateElements('selectcitydialog');      
    }

    if(page.id == "retrybkdialog"){
      translateElements('retrybkdialog');      
    } 

    if(page.id == "chat-window"){
      chat_window_display_status = 1;
      $('#chat-new-msg-ind').hide();
    }

    if(page.id == "presetroutes"){
        $('#presetroutesbtn').css('visibility', 'hidden');
        translateElements('presetroutes');
    }

    if(page.id == "countrylistdialog"){
        translateElements('countrylistdialog');
    }

    if(page.id == "canceltripreasonsdlg"){
      translateElements('canceltripreasonsdlg');      
    }

});



document.addEventListener('prehide', function(event){ 

  let page = event.target;

  if(page.id == "chat-window"){
    chat_window_display_status = 0;
  } 
  
  if(page.id == "presetroutes"){
    $('#presetroutesbtn').css('visibility', 'visible');
  }


});






function getroutestariffs(suppress_alerts){
  
  if(typeof routetariffs === 'object'){
    return;       
  }

  selected_city_id = localStorage.getObject('route-id');
  selected_city_route = localStorage.getObject('route-city');

  var post_data = {'action':'getroutetariffs','sel_route_id':selected_city_id,'sel_route_name':selected_city_route};       
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
                  if(suppress_alerts != 1){
                    ons.notification.alert(__("Error communicating with server"),{title:""});
                  }
                    return;
                }
    
                if(data_obj.hasOwnProperty('error')){
                  if(suppress_alerts != 1){   
                    ons.notification.alert(data_obj.error,{title:""});
                  }
                    
                    return;

                }
  

                
                if(data_obj.hasOwnProperty('success')){
                    $('#rides-img-preload').html(data_obj.result.preloadrides);
                    console.log(data_obj);
                    if(data_obj.result.hasOwnProperty('route-exists') === false){
                      localStorage.removeItem('route-city');
                      localStorage.removeItem('route-id');
                      selected_city_id = null;
                      selected_city_route = undefined;
                      ons.notification.alert(__("Please select a city route first"),{title:""});
                      
                    }
                    
                    routetariffs = JSON.parse(data);
                    
                }


               
                
                
            },
            error: function() { 
              loading.hide();                                
              if(suppress_alerts != 1){  
                ons.notification.alert(__("Error communicating with server"),{title:""});
              }
              return;
                
            }

        });




}



function getuserinfopages(){

  loading.show();  
  var post_data = {'action_get':'getuserinfopages'};       
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

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            $('#privacy-content').html(data_obj.terms); 
            $('#aboutpage-content').html(data_obj.about); 
            $('#drivewith-content').html(data_obj.drivewith);            
            terms_and_privacy_content = data_obj.terms; 
            aboutpage_content = data_obj.about;                          
            drivewith_content = data_obj.drivewith;                          
            return;
          }


        
          
          
      },
      error: function() {
        loading.hide();
        ons.notification.toast('Failed to load data.', {
          timeout: 2000
        });          
        return;
          
      }

  });



}




function gethelpdata(){

  loading.show();  
  var post_data = {'action_get':'gethelpdata'};       
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

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            help_topics = data_obj.help_cat_topics;
            help_categories = data_obj.help_cat;                         
            $('#help-cat-content').html(help_categories);
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



function gethelpcontent(id){

  loading.show();  
  var post_data = {'action_get':'gethelpcontent','id':id};       
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

              ons.notification.toast(data_obj.error, {
                timeout: 2000
              });
              return;

          }


          
          if(data_obj.hasOwnProperty('success')){
            help_topics_contents[id] = data_obj.help_content;   
            $('#help-content').html(help_topics_contents[id]);
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


function getUserDocs(){

  loading.show();
          
  var post_data = {'action':'getUserDocs'};

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
            ons.notification.toast(data_obj.error,{
              timeout: 1000
            });                 
            return;
          }

          if(data_obj.hasOwnProperty('success')){

              userprofileinfo.user_docs = data_obj.user_docs;
              
              let user_doc_data = userprofileinfo.user_docs;

              let doc_found = 0;

              if(user_doc_data){
                for(var key in user_doc_data){
                  let doc_data = user_doc_data[key];
                  if(doc_data.doc_city == '0' || doc_data.doc_city == selected_city_id){
                    doc_found = 1;
                    break;
                  }

                }
              }


              if(!doc_found){
                $('#documents-content').empty();
                $('#documents-content').html(`<p style='width:100%;text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)'>${__('No document is required from you')}</p>`);
                return;
              }              

              
              let doc_list_items = '';
              for(var x in user_doc_data){
                let doc_item = user_doc_data[x];
                if(!(doc_item.doc_city == '0' || doc_item.doc_city == selected_city_id))continue;
                doc_status_indicator = '';
                if(doc_item.hasOwnProperty('u_doc_status')){
                    if(doc_item.u_doc_status == null){
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="color:red;" class='list-item__subtitle'><ons-icon icon='fa-exclamation-circle' size='10px' style='color:red;'></ons-icon> ${__('Required')}</span>`;
                    }else if(doc_item.u_doc_status == 0){
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="" class='list-item__subtitle'><ons-icon icon='fa-clock' size='10px' style='color:#55557f;'></ons-icon> ${__('In review')}</span>`;
                    }else if(doc_item.u_doc_status == 1){
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="color:red;" class='list-item__subtitle'><ons-icon icon='fa-times-circle' size='10px' style='color:red;'></ons-icon> ${__('Not approved')}</span>`;
                    }else if(doc_item.u_doc_status == 2){
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="color:red;" class='list-item__subtitle'><ons-icon icon='fa-calender' size='10px' style='color:red;'></ons-icon> ${__('Expired')}</span>`;
                    }else{
                      doc_status_indicator = `<span id="doc-status-ind-${x}" style="color:green;" class='list-item__subtitle'><ons-icon icon='fa-check-circle' size='10px' style='color:green;'></ons-icon> ${__('Approved')}</span>`;
                    }
                }

                doc_list_items += `<ons-list-item tappable style="cursor: pointer;min-height: 70px;" onclick="showDocument(${doc_item.d_id})">
                                    <div class="left">
                                      <ons-icon icon="fa-file" size="18px" style="color: black;"></ons-icon>
                                    </div>
                                    <div class="center">
                                      <span style="font-size: 16px;font-weight: 600;">${doc_item.title}</span>                            
                                      ${doc_status_indicator}
                                    </div>
                                    <div class="right">
                                        <ons-icon icon='fa-chevron-right' size='14px' style='color:black;'></ons-icon> 
                                    </div>
                                  </ons-list-item>`;
              }


              let doc_items_list_html = `<ons-list><ons-list-item style="cursor: pointer;min-height: 70px;"><div class="center"><p>${__('Upload valid copies of the following documents to keep your account active')}</p></div></ons-list-item>${doc_list_items}</ons-list>`;
              $('#documents-content').empty();
              $('#documents-content').html(doc_items_list_html);
            
          }
          

      },
      error: function(jqXHR,textStatus, errorThrown) {  
          loading.hide();
          ons.notification.toast(__("Error communicating with server"),{
            timeout: 1000
          });
          return;
      }

  });
}



function getwalletinfo(suppress_alerts){
      loading.show();
      if(!suppress_alerts){
        ons.notification.toast(__('Updating wallet items...'), {
          timeout: 2000
        });
      }

      var post_data = {'action':'getwalletinfo'};       
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
              //console.log(data);
              
              
              try{
                  var data_obj = JSON.parse(data);
              }catch(e){
                if(suppress_alerts != 1){
                  ons.notification.toast(__('Error communicating with server'), {
                    timeout: 2000
                  });
                }
                  return;
              }

  
              if(data_obj.hasOwnProperty('error')){
                if(suppress_alerts != 1){
                  ons.notification.alert(data_obj.error,{title:""});
                }
                  return;                  

              }


              
              if(data_obj.hasOwnProperty('success')){
                if(!suppress_alerts){
                  ons.notification.toast(__('Wallet items updated'), {
                    timeout: 2000
                  });
                }

                reward_points = data_obj.reward_points; 
                wallet_amount = data_obj.wallet_amt;                
                wallet_history_items = data_obj.wallet_history;
                wallet_debit_history = data_obj.wallet_debit;

                

                if(wallet_history_items !== ""){
                  $('#wallethistoryitems').html("<ons-list>" + wallet_history_items + "</ons-list>");
                }else{
                  $('#wallethistoryitems').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
                }

                if(wallet_debit_history !== ""){
                  $('#walletdhistoryitems').html("<ons-list>" + wallet_debit_history + "</ons-list>");
                }else{
                  $('#walletdhistoryitems').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
                }

                var wallet_amount_currency_converted = wallet_amount * selected_city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
                wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;
            
                $('#walletbal').html(selected_city_curency_symbol + wallet_amount_currency_converted); //show amount
                $('#rewardpointsvalue').text(reward_points);
                
                
                
                return;
              }


            
              
              
          },
          error: function() { 
            loading.hide();
            if(suppress_alerts != 1){
              ons.notification.toast(__('Error communicating with server'), {
                timeout: 2000
              });
            }
            return;
              
          }

      });



}


function getbookings(){
  loading.show();
  ons.notification.toast(__('Updating trips information...'), {
    timeout: 2000
  });
    var post_data = {'action_get':'getbookings'};       
    jQuery.ajax({
    url: ajaxurl,
    method: 'GET',
    timeout : 20000,
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
              /* ons.notification.toast(__('Bookings information updated'), {
                timeout: 2000
              });  */              
              bookings_data['pend_onride'] = data_obj.pend_onride == "" ? "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>" : data_obj.pend_onride;
              bookings_data['completed'] = data_obj.booking_comp == "" ? "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>" : data_obj.booking_comp;
              bookings_data['cancelled'] = data_obj.booking_canc == "" ? "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>" : data_obj.booking_canc;

              if(data_obj.pend_onride !== ""){
                $('#booking-pend-onride').html(data_obj.pend_onride);                
              }else{
                $('#booking-pend-onride').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }


              if(data_obj.booking_comp !== ""){
                $('#booking-comp').html(data_obj.booking_comp);
              }else{
                $('#booking-comp').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }

              if(data_obj.booking_canc !== ""){
                $('#booking-canc').html(data_obj.booking_canc);
              }else{
                $('#booking-canc').html("<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>");
              }
              
                           
                                            
              return;
            }


          
            
            
        },
        error: function() { 
          loading.hide();
          ons.notification.alert(__("Error communicating with server"),{title:""});
          return;
            
        }

    });



}

function getnotifications(notify){
  loading.show();
  $('#notification-item-list').html(notifications_data);
  if(!notify){
    ons.notification.toast(__('Updating notifications...'), {
      timeout: 2000
    });
  }
    var post_data = {'action':'getusernotifications'};       
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
                if(!notify){
                  ons.notification.alert(__("Error communicating with server"),{title:""});
                }
              
                return;
            }


            if(data_obj.hasOwnProperty('error')){
              if(!notify){
                ons.notification.alert(data_obj.error,{title:""});
              }
              return;                  

            }

            if(data_obj.hasOwnProperty('nodata')){
              if(!notify){
                ons.notification.alert(data_obj.nodata,{title:""});
              }
              notifications_data = "<div class='center-screen'><p style='text-align:center;'>" + __("No records available") + "</p></div>";
              $('#notification-item-list').html("");
              return;                  

            }


            
            if(data_obj.hasOwnProperty('success')){
              if(!notify){
                ons.notification.toast(__('Notifications updated'), {
                  timeout: 2000
                });
              }
              notifications_data = data_obj.notifications;
              $('#notification-item-list').html(data_obj.notifications);
              if(notify){
                var stored_n_count = localStorage.getObject('n_count');
                if(parseInt(data_obj.n_count) > stored_n_count){
                  $('#notification-icon').css('color','red');
                  $('#global-notify-icon').css('color','red');
                  notify_new_data_available.notifications = 1;
                }else{

                  $('#notification-icon').css('color','white');
                }
                
              }else{
                $('#notification-icon').css('color','white');
                localStorage.setObject('n_count',data_obj.n_count);
              }                                                      
              return;

            }


          
            
            
        },
        error: function() { 
          loading.hide();
          if(!notify){
            ons.notification.alert(__("Error communicating with server"),{title:""});
          }
          return;            
        }

    });


}


function interStatePlot(state_route_id){


  if (typeof map2 !== 'object')return;
  
  
  //clear map and directions  

  map2.clear(); //clear all marker on map

  clearMapItemsSelectively();

  pick_up_data=[];
  drop_off_data=[];
  pick_up_data = {'address': '','lng':'','lat':''};
  drop_off_data = {'address': '','lng':'','lat':''};



  var plng = routetariffs.result[state_route_id].cars[0].pick_lng;
  var plat = routetariffs.result[state_route_id].cars[0].pick_lat;
  var dlng = routetariffs.result[state_route_id].cars[0].drop_lng;
  var dlat = routetariffs.result[state_route_id].cars[0].drop_lat;

  //$('#bookbutton2').attr("disabled","disabled");
  

  
  pick_up_data['address'] = routetariffs.result[state_route_id].cars[0].pick_name;
  pick_up_data['lng'] = parseFloat(routetariffs.result[state_route_id].cars[0].pick_lng);
  pick_up_data['lat'] = parseFloat(routetariffs.result[state_route_id].cars[0].pick_lat);

  drop_off_data['address'] = routetariffs.result[state_route_id].cars[0].drop_name;
  drop_off_data['lng'] = parseFloat(routetariffs.result[state_route_id].cars[0].drop_lng);
  drop_off_data['lat'] = parseFloat(routetariffs.result[state_route_id].cars[0].drop_lat);

    
  setTimeout(() => {

      
      map2.setClickable(false);
      map2.animateCamera({
          target: {lat: pick_up_data.lat, lng: pick_up_data.lng},
          zoom: 18,
          duration: 1000,
          padding: 0  // default = 20px
        }, function() {
            map2.setClickable(true);
          //alert("Camera target has been changed");
          

      });
      marker3.setVisible(true);
      marker3.setPosition({lat:pick_up_data.lat,lng: pick_up_data.lng});
      /* marker3 = map2.addMarker({
          'position':{lat:pick_up_data.lat,lng: pick_up_data.lng},
          icon: 'green',
          animation: plugin.google.maps.Animation.DROP
      }); */

      marker3._isReady = true;

      


      setTimeout(() => {
        map2.setClickable(false);
        map2.animateCamera({
            target: {lat: drop_off_data.lat, lng: drop_off_data.lng},
            zoom: 18,
            duration: 1000,
            padding: 0  // default = 20px
          }, function() {
              map2.setClickable(true);
            //alert("Camera target has been changed");
            
  
        });

        marker4.setVisible(true);
        marker4.setPosition({lat:drop_off_data.lat,lng: drop_off_data.lng});
        /* marker4 = map2.addMarker({
            'position':{lat:drop_off_data.lat,lng: drop_off_data.lng},
            animation: plugin.google.maps.Animation.DROP
        }); */

        marker4._isReady = true;

      

      setTimeout(function(){
        
        process_interstate_booking_route(); 
       
  }, 2500);
      
  }, 1500);

                  
  }, 500);



}





function AnimateAtStart(){
  
  app_start_animate = 1;

 app_start_animate_timer = setInterval(function(){
    app_start_animate_counter++;

    if(app_start_animate_counter == 5){
      $("#menubtn").css("visibility","visible");
      $("#menubtn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
      })

    }


    if(app_start_animate_counter == 6){
      $("#drop-box-container").css("visibility","visible");
      $("#drop-box-container").removeClass("heartBeat animated").addClass("heartBeat animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("heartBeat animated");
      })
    }


    if(app_start_animate_counter == 7){
      $("#mylocationbtn").css("visibility","visible");
      $("#mylocationbtn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
      })

    }
    




    if(app_start_animate_counter == 8){
      $("#presetroutesbtn").css("visibility","visible");
      $("#presetroutesbtn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
      })
    }

    
    if(app_start_animate_counter == 9){
      $("#greeting-box").css("visibility","visible");
      $("#greeting-box").removeClass("zoomIn animated").addClass("zoomIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("zoomIn animated");
      })
    }
    


    if(app_start_animate_counter == 10){
      $("#drop-box").css("visibility","visible");
      $("#drop-box").removeClass("zoomIn animated").addClass("zoomIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("zoomIn animated");
      })

    }


    if(app_start_animate_counter == 11){
      $("#recent-strip-container").css("visibility","visible");
      $("#recent-strip-container").removeClass("slideInRight animated").addClass("slideInRight animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("slideInRight animated");
      })

    }



    if(app_start_animate_counter == 12){
      if(Math.ceil($('#drop-box-container').outerHeight(true))){
          $('#banner-items-container').css('bottom', (Math.ceil($('#drop-box-container').outerHeight(true)) + 10) + 'px');
      }
      $("#banner-items-container").fadeIn();
    } 

    if(app_start_animate_counter == 13){
      
      $("#emergency-call-btn").css("visibility","visible");
      $("#emergency-call-btn").removeClass("bounceIn animated").addClass("bounceIn animated").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass("bounceIn animated");
      })
    }

    



    if(app_start_animate_counter == 20){
      clearInterval(app_start_animate_timer);
      app_start_animate_counter = 0;
    }

  },150);


}
