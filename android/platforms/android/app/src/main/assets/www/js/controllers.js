/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

window.myApp = {};



myApp.controllers = {

  //////////////////////////
  //Page Controller: Runs code for each page pushed to the navigator  //
  //////////////////////////
  

  mappage: function(page) {

    
    
       
    
      
    

    $('#pick-box').on('click',function(e){


      

        //console.log(e);
        if(typeof routetariffs !== 'object' || selected_city_id == 0 || selected_city_id == null){        
          showroutes();
          return;       
        }

        location_type_selected = 0;
        show_adresses();
        
    });



    $('#pac-input2').on('click',function(e){

      

      //console.log(e);
      if(typeof routetariffs !== 'object' || selected_city_id == 0 || selected_city_id == null){        
        showroutes();
        return;       
      }      
      
      location_type_selected = 1;
      show_adresses();
      
  });

  $("#map-canvas").on('pointerdown',function(){
    /* $("#drop-box-container").removeClass("address-box-d-sel");
    $("#pick-box-container").removeClass("address-box-p-sel");

    $('#pick-box').css('border','2px solid #999');
    $('#drop-box').css('border','2px solid #999'); */
    
  })
    

    /* $('#pac-input, #pac-input2').on('focus',function(e){
      console.log(selected_city_id);
      if(typeof routetariffs !== 'object' || selected_city_id == 0 || selected_city_id == null){
        
        showroutes();
        return;       
      }
    });
    
  
    $('#pac-input, #pac-input2').on('keyup',function(e){
      e.stopPropagation();
      $('#bookbutton').attr("disabled","disabled");
      if(typeof routetariffs !== 'object' && selected_city_id == 0 || selected_city_id == null){                 
        return;       
      }    
      var str = $(this).val();
      var prefix = selected_city_route + ', ';
      if(str.indexOf(prefix) == 0) {
        console.log($(this).val());
      } else {
        if (prefix.indexOf(str) >= 0) {
              $(this).val(prefix);
        } else {
              $(this).val(prefix+str);
       }
      }
    
    });  */ 

    
               
    
    // Set button functionality to open/close the menu.
    page.querySelector('#menubtn').onclick = function() {

      //$("#drop-box-container").removeClass("address-box-d-sel");
      //$("#pick-box-container").removeClass("address-box-p-sel");

      $('#user-menu-photo').attr('src',userprofileinfo.photo);
      
      document.querySelector('#mySplitter').left.toggle();
      document.querySelector('#users-name').innerHTML = userprofileinfo.firstname + " " + userprofileinfo.lastname;
      var wallet_amount_currency_converted = wallet_amount * selected_city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
      wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;      
      if(selected_city_id != 0){
        document.querySelector('#users-wallet').innerHTML = __("Wallet Balance") + ": " + selected_city_curency_symbol + wallet_amount_currency_converted;      
      }else{
        document.querySelector('#users-wallet').innerHTML = __("Wallet Balance") + ":---";      
      }

    };



    document.querySelector('#mySplitter').addEventListener('preopen', function(event) {
      side_menu_state = 1;
    });


    document.querySelector('#mySplitter').addEventListener('preclose', function(event) {
      side_menu_state = 0;
    })


    
    

    

    
    
  },
  chatsup: function(page){
    translateElements('chatsup');

    get_chat_support_msg();

    updateChatSupportMsg();

  },

  verifyphonepage : function(page){

      translateElements('verifyphone');      
      
  },

  verifyphonepwdpage : function(page){

    translateElements('verifyphonepwd');

    $('#resend-phone-code-pwd-btn').data('phonenumber',"+" + page.data.country_call_code + page.data.phone_num);
    

    $('#verify_phone_code_pwd').data('phone',page.data.phone_num);
    $('#verify_phone_code_pwd').data('pwd',page.data.pwd);
    $('#verify_phone_code_pwd').data('country', page.data.country_2c);
    $('#verify_phone_code_pwd').data('countrycallcode', page.data.country_cc);
    
    //initiate resend code button activate countdown
    clearInterval(resend_code_countdown_timer_handle);
    var countdown = RESEND_CODE_COUNTDOWN_VALUE;
    resend_code_btn_status = 0;
    $('#resend-phone-code-pwd-btn').text(__('Resend Code') + " " + countdown);
    resend_code_countdown_timer_handle = setInterval(function(){
      countdown--;
      if(countdown < 1){
          countdown = 0;
          resend_code_btn_status = 1;
          $('#resend-phone-code-pwd-btn').text(__('Resend Code'));
          clearInterval(resend_code_countdown_timer_handle);
          return;
      }

      $('#resend-phone-code-pwd-btn').text(__('Resend Code') + " " + countdown);
    
    },1000);
    
},

  loginpage: function(page){
    /* alert("loaded"); */
    translateElements('login');

    $('#current-default-language').html(selected_lang.name);
    
    if(carrier_country_code){
      var dial_code = country_dial_code_data[carrier_country_code].dial_code;
      if(dial_code){          
          user_country_dial_code = dial_code;
          $('#country-flag').attr('class', 'iti__flag iti__' + carrier_country_code);
          $('#country-flag').data('country', carrier_country_code);
          $('#tel-code').html(' +' + dial_code);
          $('#tel-code').data('dialcode', dial_code);
          $('#tel-code').data('country', carrier_country_code);

      }
    }

    $('#login-phone').off('keyup').on('keyup', function(){
      $('#loginerrormsg').html('');
    })
      
  },
  signuppage: function(page){
    /* alert("loaded"); */
    translateElements('signup');
    if(carrier_country_code){
      var dial_code = $("li[data-country-code='" + carrier_country_code + "']").data('dial-code');
      if(dial_code){          
          user_country_dial_code = dial_code;
          $('#country-flag-reg').attr('class', 'iti__flag iti__' + carrier_country_code);
          $('#country-flag-reg').data('country', carrier_country_code)
          $('#tel-code-reg').html(' +' + dial_code);
          $('#tel-code-reg').data('dialcode', dial_code);
      }
    }
      
  },

  interstatepage: function(page){
        translateElements('inter');
        $('#interstatebooking-title').html(page.data.title);
        $('#bookbutton2').css('visibility','hidden');

    
  },

  

  promotions: function(){
    translateElements('promotions');
    promocheckadd('',1);
    if(userprofileinfo.ref_code){
      $('#riderrefbtn').css('display','flex');
    }else{
      $('#riderrefbtn').css('display','none');
    }
  },

  riderref: function(){
    translateElements('riderref');
    $('#riderrefmsg').html(userprofileinfo.ref_desc); 
    $('#riderrefcode').html(userprofileinfo.ref_code);    
  },

  verifypage: function(){
    translateElements('verify');
  },

  softwarelicense: function(){
    translateElements('softlice');
  },

  ridecomplete: function(page){
    translateElements('ridecompl');
    ride_rating = 5;
    $('.rate-star').css('color','black');
    $('#star-level-1').css('color','yellow');
    $('#star-level-2').css('color','yellow');
    $('#star-level-3').css('color','yellow');
    $('#star-level-4').css('color','yellow');
    $('#star-level-5').css('color','yellow');  
    $('.rate-star').off('click').on('click', function(){
        var star_level = $(this).data('level');
        switch(star_level){
            case 1:
            ride_rating = 1;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');        
            break;
    
            case 2:
            ride_rating = 2;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');
            $('#star-level-2').css('color','yellow');      
            break;
    
            case 3:
            ride_rating = 3;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');
            $('#star-level-2').css('color','yellow');
            $('#star-level-3').css('color','yellow');        
            break;
    
            case 4:
            ride_rating = 4;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');
            $('#star-level-2').css('color','yellow');
            $('#star-level-3').css('color','yellow');
            $('#star-level-4').css('color','yellow');        
            break;
    
            case 5:
            ride_rating = 5;
            $('.rate-star').css('color','black');
            $('#star-level-1').css('color','yellow');
            $('#star-level-2').css('color','yellow');
            $('#star-level-3').css('color','yellow');
            $('#star-level-4').css('color','yellow');
            $('#star-level-5').css('color','yellow');        
            break;
    
        }
    
    });

    $('#rate-driver-image-preload').attr('src',page.data.comp_data.driver_photo); //load driver image
    $('#rate-driver-name').html(page.data.comp_data.driver_firstname); //load driver firstname
    $('#rate-button').data('bookingid',page.data.comp_data.booking_id); ////load ride rating action button data
    $('#ride-complete-amount').html(page.data.comp_data.ride_amount); ////load amount of the ride 
    $('#ride-complete-stats-dist').html(page.data.comp_data.ride_distance + "KM"); ////load amount of the ride 
    $('#ride-complete-stats-time').html(page.data.comp_data.ride_duration); ////load amount of the ride 
    $('#ride-complete-reward-points').html(page.data.comp_data.reward_points_earned); //number of reward points earned in this trip

    $('#complete-ride-pickup').html(page.data.comp_data.pickup_addr);
    $('#complete-ride-dropoff').html(page.data.comp_data.dropoff_addr ? page.data.comp_data.dropoff_addr : __('Destination not specified'));

    

    if(page.data.comp_data.coupon_used == 1 && page.data.comp_data.referral_used == 1){
      $('#complete-discount-msg').show();
      $('#complete-discount-msg').html(__('Promo and referral discounts were applied'));

      let discount_msg = '';

      if(page.data.comp_data.coupon_type == 1){
          //fixed
          discount_msg = `- ${page.data.comp_data.city_currency_symbol}${page.data.comp_data.coupon_val}`;
      }else{
        //percentage
        discount_msg = `- ${page.data.comp_data.coupon_val}%`;
      }

      discount_msg += ` | - ${page.data.comp_data.referral_discount}%`;

      $('#ride-complete-stats-discounts').html(discount_msg);

    }else if(page.data.comp_data.coupon_used == 1){

      $('#complete-discount-msg').show();
      $('#complete-discount-msg').html(__('Promo discount was applied'));

      let discount_msg = '';

      if(page.data.comp_data.coupon_type == 1){
          //fixed
          discount_msg = `-${page.data.comp_data.city_currency_symbol}${page.data.comp_data.coupon_val}`;
      }else{
        //percentage
        discount_msg = `- ${page.data.comp_data.coupon_val}%`;
      }
      

      $('#ride-complete-stats-discounts').html(discount_msg);

    }else if(page.data.comp_data.referral_used == 1){

      $('#complete-discount-msg').show();
      $('#complete-discount-msg').html(__('Referral discount was applied'));

      let discount_msg = '';

      discount_msg += `${page.data.comp_data.referral_discount}%`;

      $('#ride-complete-stats-discounts').html(discount_msg);

    }else{
        $('#complete-discount-msg').hide();
        $('#ride-complete-stats-discounts').html('0%');
    }


    if(page.data.comp_data.payment_method == 1){
        //cash
        $('#complete-ride-payment-type-icon').attr('src','img/cash.png');
        $('#completed-payment-method').html(__('Cash'));

    }else if(page.data.comp_data.payment_method == 2){
        //wallet
        $('#complete-ride-payment-type-icon').attr('src','img/wallet.png');
        $('#completed-payment-method').html(__('Wallet'));
    }else{
      $('#complete-ride-payment-type-icon').attr('src','img/cash.png');
      $('#completed-payment-method').html(__('Cash'));
    }

    driver_tip_amount = 0;
    let driver_tips_buttons_html = '';
    if(app_settings.driver_tip_presets == ''){
        $('#driver-tip-buttons-container').hide();
    }else{
      let driver_tips_preset_string = app_settings.driver_tip_presets;
      let driver_tips_preset_array = driver_tips_preset_string.split('|');
      if(typeof driver_tips_preset_array == 'object'){
        
        driver_tips_preset_array.forEach(function(val,indx){
          let tips_amount = val.trim();
          if(indx < 4){
            driver_tips_buttons_html += `<ons-button class='driver-tip-buttons' id='driver-tip-button-${indx}' style="border: thin solid #999;margin-right:10px;color:#999" onclick="drivertipbuttonclick($(this),${tips_amount});" modifier="outline">${tips_amount}</ons-button>`;
          }
          
        })
        $('#driver-tip-buttons-presets').html(driver_tips_buttons_html);
      }else{
        $('#driver-tip-buttons-container').hide();
      }
    }

  },

  routespage: function(page){

      translateElements('routespg');     
      var city = routetariffs.result.city;
      /* var state = routetariffs.result.state; */

      if(city.length > 0){
        $('#routes-list').html("<ons-list>" + routetariffs.result.city + "</ons-list>");
      }

      /* 
      if(state.length > 0){
        $('#state-routes-list').html("<ons-list>" + routetariffs.result.state + "</ons-list>");
      } */

      $('#radio-sel-' + selected_city_id).attr('checked','checked');



  },

  intracitylistpage : function(page){
    var city = routetariffs.result.city;
    
    if(city.length > 0){
      $('#routes-list').html("<ons-list>" + routetariffs.result.city + "</ons-list>");
    }

    

    $('#radio-sel-' + selected_city_id).attr('checked','checked');

  },

  interstatelistpage : function(page){

    
    var state = routetariffs.result.state;

    

    if(state.length > 0){
      $('#state-routes-list').html("<ons-list>" + routetariffs.result.state + "</ons-list>");
    }

    


  },

  aboutapp : function(page){
    translateElements('aboutapp');
    if(!aboutpage_content == ''){
      $('#aboutpage-content').html(aboutpage_content);
      return;
    }
    
    getuserinfopages();
    
  },

  infopage: function(){
    translateElements('infopg');
  },

  walletpage : function(page){
    translateElements('walletpg');
  },


  walletbalance: function(page){
    translateElements('walletbl');
    var wallet_amount_currency_converted = wallet_amount * selected_city_curency_exchange_rate; //converting wallet amount from default currency to selected city currency
    wallet_amount_currency_converted = Math.round(wallet_amount_currency_converted * 100) / 100;

    $('#walletbal').html(selected_city_curency_symbol + wallet_amount_currency_converted); //show amount 
    $('#rewardpointsvalue').text(reward_points);   

    if(app_settings.default_payment_gateway == 'paymob'){
        $('#kiosk-mode-option').show();
    }else{
      $('#kiosk-mode-option').hide();
    }

    let topup_buttons_html = '';
    if(app_settings.wallet_topup_presets == ''){
        $('#wallet-preset-buttons').hide();
    }else{
      let wallet_topup_preset_string = app_settings.wallet_topup_presets;
      let wallet_topup_preset_array = wallet_topup_preset_string.split('|');
      if(typeof wallet_topup_preset_array == 'object'){
        
        wallet_topup_preset_array.forEach(function(val,indx){
          let topup_amount = val.trim();
          if(indx < 4){
            topup_buttons_html += `<ons-button style="border: thin solid #ccc;margin-right:20px;color: #777;font-weight: bold;" onclick="$('#fundAmount').val('${topup_amount}');showPaymentGateways();" modifier="outline">${topup_amount}</ons-button>`;
          }
          
        })
        $('#wallet-preset-buttons').html(topup_buttons_html);
      }else{
        $('#wallet-preset-buttons').hide();
      }
    }
    
  },

  termsandprivacy: function(page){
      translateElements('termspriv');
      if(!terms_and_privacy_content == ''){
        $('#privacy-content').html(terms_and_privacy_content);
        return;
      }
      
      getuserinfopages();
  },

  drivewithapp: function(page){
    translateElements('drivewith');
      if(!drivewith_content == ''){
        $('#drivewith-content').html(drivewith_content);
        return;
      }
      
      getuserinfopages();
  },

  helpcategories: function(page){
      translateElements('helpgd'); 
      if(!help_categories == ''){
        $('#help-cat-content').html(help_categories);
        return;
      }
      
      gethelpdata();
  },

  helptopics: function(page){
    $('#help-topics-title').html(page.data.page_title);
    $('#help-topics-content').html(page.data.topics_list);
    return;
  }
  ,

  helpcontent: function(page){
    $('#help-content-title').html(page.data.help_content_title);
    if(typeof help_topics_contents === 'object' && help_topics_contents.hasOwnProperty(page.data.help_content_id)){
      $('#help-content').html(help_topics_contents[page.data.help_content_id]);
      return;
    }

    gethelpcontent(page.data.help_content_id);
      
  },

  profilepage:function(page){
    translateElements('profilepg');
        
    let user_doc_data = userprofileinfo.user_docs;
    let user_doc_required = 0;
    $('#doc-required-notif').hide();
    $('#doc-required-notif').html('');
    
    if(user_doc_data){
      for(var key in user_doc_data){
        let doc_data = user_doc_data[key];
        if(doc_data.doc_city == '0' || doc_data.doc_city == selected_city_id){
          if(!doc_data.hasOwnProperty('u_doc_status') || doc_data.u_doc_status == null || doc_data.u_doc_status == 0 ||doc_data.u_doc_status == 1 || doc_data.u_doc_status == 2){
            user_doc_required = 1;
            $('#doc-required-notif').show();
            $('#doc-required-notif').html(`<ons-icon icon='fa-exclamation-circle' size='10px' style='color:red;'></ons-icon> ${__('Required')}`);     
            break;
          }
          
        }

      }
    }


    

    $('#user-default-lang').html(selected_lang.name);

    
    if(typeof userprofileinfo === 'object'){        
      
      $('#firstname').html(userprofileinfo.firstname);
      $('#lastname').html(userprofileinfo.lastname);
      /* $('#email').val(userprofileinfo.email);
      $('#address').html(userprofileinfo.address);
      $('#phone').val(userprofileinfo.phone);
      $('#refcode_info').html(userprofileinfo.ref_code); */
      $('#user-rating').attr("src","img/rating-" + userprofileinfo.user_rating + ".png");      
      $('#user-profile-photo').attr('src',userprofileinfo.photo);
      $('#user-trips-completed').html(userprofileinfo.completed_rides);
      $('#user-trips-cancelled').html(userprofileinfo.cancelled_rides);
      $('#user-referrals-count').html(userprofileinfo.referral_count);

      
      return;
    }

    loading.show();
    var post_data = {'action':'getuserprofileinfo'};       
        jQuery.ajax({
        url: ajaxurl,
        method: 'POST',
        timeout : 15000,
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
                    console.log(data_obj);
                    userprofileinfo = JSON.parse(data);
                    $('#firstname').val(userprofileinfo.firstname);
                    $('#lastname').val(userprofileinfo.lastname);
                    $('#email').val(userprofileinfo.email);
                    //$('#address').val(userprofileinfo.address);
                    $('#phone').val(userprofileinfo.phone);
                    return;
                }


               
                
                
            },
            error: function() {                                
                
              ons.notification.alert(__("Error communicating with server"),{title:""});
              return;
                
            }

        });

  },
  editprofile: function(){
    translateElements('editprofile');
    $('#user-edit-photo-img-preview').attr('src',userprofileinfo.photo);
    $('#editfirstname').val(userprofileinfo.firstname);
    $('#editlastname').val(userprofileinfo.lastname);
    $('#editphone').val(userprofileinfo.country_dial_code + userprofileinfo.phone);
  },
  editemail: function(){
    translateElements('editemail');
    $('#editemailinput').val(userprofileinfo.email);
  },
  editpwd: function(){
    translateElements('editpwd');
    
    $('.pwd-user-input').off().on('keyup', function(){
        $('#pwderrormsg').hide();
        let pwd_inp_1 = $('#editpwdnew').val();
        let pwd_inp_2 = $('#editpwdconfirm').val();

        if(pwd_inp_1.length < 8 || pwd_inp_2.length < 8){
          $('#edit-pwd-btn').prop('disabled', true);
          return;
        }

        $('#edit-pwd-btn').prop('disabled', false);
      
    });
  },
  editdocs: function(){
    translateElements('editdocs');
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
      $('#documents-content').html(`<p style='width:100%;text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)'>${__('No document is required from you')}</p>`);
      return;
    }

    

    
    let doc_list_items = '';
    for(var x in user_doc_data){
      let doc_item = user_doc_data[x];
      doc_status_indicator = '';
      if(!(doc_item.doc_city == '0' || doc_item.doc_city == selected_city_id))continue;
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
    $('#documents-content').html(doc_items_list_html);

    getUserDocs();

  },

  savedoc: function(page){
    translateElements('savedoc');

    let user_doc_data = userprofileinfo.user_docs;
    let doc_item = user_doc_data[page.data.doc_id];

    let doc_status_indicator =  "";

    if(doc_item.hasOwnProperty('u_doc_status')){
      if(doc_item.u_doc_status == null){
        $('#user-doc-status').html(`<ons-icon icon='fa-exclamation-circle' size='14px'></ons-icon> ${__('Required')}`);
        $('#user-doc-status').css('background-color', 'red');        
      }else if(doc_item.u_doc_status == 0){
        $('#user-doc-status').html(`<ons-icon icon='fa-clock' size='14px'></ons-icon> ${__('In review')}`);
        $('#user-doc-status').css('background-color', '#55557f');
      }else if(doc_item.u_doc_status == 1){
        $('#user-doc-status').html(`<ons-icon icon='fa-times-circle' size='14px'></ons-icon> ${__('Not approved')}`);
        $('#user-doc-status').css('background-color', 'red');
      }else if(doc_item.u_doc_status == 2){
        $('#user-doc-status').html(`<ons-icon icon='fa-calender' size='14px'></ons-icon> ${__('Expired')}`);
        $('#user-doc-status').css('background-color', 'red');
      }else{
        $('#user-doc-status').html(`<ons-icon icon='fa-check-circle' size='14px'></ons-icon> ${__('Approved')}`);
        $('#user-doc-status').css('background-color', 'green');
      }
  }

    if(doc_item.u_doc_img == null){
      if(doc_item.doc_type == 0){
        $('#user-doc-img-preview').attr('src','img/personal-doc-sample.png');
      }else{
        $('#user-doc-img-preview').attr('src','img/vehicle-doc-sample.png');
      }      
    }else{
      $('#user-doc-img-preview').attr('src', doc_item.u_doc_img);
    }

    $('#save-doc-title').html(doc_item.title);
    $('#save-doc-desc').html(doc_item.doc_desc);

    if(doc_item.doc_expiry == 1){

      $('#user-doc-expiry-container').show();
      if(doc_item.u_doc_expiry_date)$('#save-doc-expiry-date').val(doc_item.u_doc_expiry_date);

      $('#save-doc-expiry-date').off("click").on('click', function(){
        
        if(device_ready){
            cordova.plugins.DateTimePicker.show({
              mode : "date",
              date : new Date,
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
                      
                      current_dt = new Date(newDate);

                      let c_year = current_dt.getFullYear();
                      let c_month = current_dt.getMonth() + 1;
                      let c_day = current_dt.getDate();
                     

                      
                      let c_day_str;
                      let c_month_str;

                      

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

                      let user_set_date = c_year + '-' + c_month_str + '-' + c_day_str;
                      $('#save-doc-expiry-date').val(user_set_date);

                      
                      
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
    }

    if(doc_item.doc_id_num == 1){
      $('#save-doc-input-title').html(doc_item.doc_id_num_title);
      $('#save-doc-input-desc').html(doc_item.doc_id_num_desc);
      $('#user-doc-id-input-container').show();
      if(doc_item.u_doc_id_num)$('#save-doc-id-input').val(doc_item.u_doc_id_num);
    }


    $('#save-user-doc-btn').off('click').on('click', function(){

        $('#savedocvalidationmsg').html('');

        if(doc_item.u_can_edit == 0){
          $('#savedocvalidationmsg').html(__('You are not allowed to make changes to this document at this time'));
          return;
        }

        let doc_img_data = $('#user-doc-img-preview').data('selectimgdata');
        let doc_expiry_date = $('#save-doc-expiry-date').val();
        let doc_id_input = $('#save-doc-id-input').val();

        if(!doc_img_data && doc_item.u_doc_img == null){
          $('#savedocvalidationmsg').html(__('Document image is required'));
          return;
        }

        if(doc_item.doc_expiry == 1){
          if(!doc_expiry_date){
            $('#savedocvalidationmsg').html(__('Document expiry date is required'));
            return;
          }
        }


        if(doc_item.doc_id_num == 1){
          if(!doc_id_input){
            $('#savedocvalidationmsg').html(__('Required information missing'));
            return;
          }
        }



        loading.show();
          
        var post_data = {'action':'saveUserDoc','doc_id' : page.data.doc_id,'doc_img': doc_img_data, 'doc_expiry' : doc_expiry_date, 'doc_id_input' : doc_id_input};

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
                  $('#savedocvalidationmsg').html(data_obj.error);                  
                  return;
                }

                if(data_obj.hasOwnProperty('success')){

                  userprofileinfo.user_docs[page.data.doc_id]['u_doc_img'] = data_obj.doc_img_url;
                  userprofileinfo.user_docs[page.data.doc_id]['u_doc_expiry_date'] = doc_expiry_date;
                  userprofileinfo.user_docs[page.data.doc_id]['u_doc_id_num'] = doc_id_input;
                  userprofileinfo.user_docs[page.data.doc_id]['u_doc_status'] = 0;


                  $(`#doc-status-ind-${page.data.doc_id}`).css('color','black');
                  $(`#doc-status-ind-${page.data.doc_id}`).html(`<ons-icon icon='fa-clock' size='10px' style='color:#55557f;'></ons-icon> ${__('In review')}`); //update doc status indicator

                  document.querySelector('#myNavigator').popPage({animation: 'fade', callback : function(){

                    ons.notification.toast(__("Document information has been saved"),{
                        timeout: 1000
                    });

                    getUserDocs();
                  }});
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
    })

  },
  selectlang: function(page){

    translateElements('selectlang');

    let lang_list_items = "";
    available_langs.forEach(function(val,indx){
      let opt_sel = '';
      if(val.code == selected_lang.code){
        opt_sel = "<ons-icon icon='fa-check-circle' size='24px' style='color:green;'></ons-icon>";
      }
      
      lang_list_items += `<ons-list-item data-langname="${val.name.toLowerCase()}" data-langindx="${indx}" data-langcode="${val.code}" tappable class="default-language-items" style="cursor: pointer;min-height: 70px;" >
                          <div class="left">
                            <div class="iti__flag iti__${val.country}" style="background-color: white;transform:scale(1.5)"></div>
                          </div>
                          <div class="center">
                            <span style="font-size: 16px;font-weight: 500;">${val.name}</span>
                          </div>
                          <div class="right">
                              ${opt_sel}
                          </div>
                        </ons-list-item>`;
    
    })

    let lang_items_list_html = `<ons-list>${lang_list_items}</ons-list>`;
    $('#language-list-items').html(lang_items_list_html);

    $('#search-lang').off().on('keyup', function(){
        let content = $(this).val();
        if(!content){
          $('.default-language-items ').show(); 
          return;         
        }

        content = content.toLowerCase();

        if(!$(`.default-language-items[data-langname*=${content}]`).length)return;

        $('.default-language-items').hide();

        $(`.default-language-items[data-langname*=${content}]`).show(); 
        
    })

    $('.default-language-items').off().on('click', function(e){
      e.preventDefault();
      let sel_lang_indx = $(this).data('langindx');
      let sel_lang_code = $(this).data('langcode');

      if(selected_lang.code == sel_lang_code)return;

      selected_lang = available_langs[sel_lang_indx];

      localStorage.setObject('lang',selected_lang);
      
      //restart App

      window.location.reload();
      return;
    })

  },
  verifyemailcode: function(page){
    translateElements('verifyemail');
    $('#verifyemailpagetitle').html(__('Enter the code sent to you at {---1}',[page.data.email]));
  },

  verifyotpcode: function(page){
    translateElements('verifyotp');
    if(page.data.exists == 1){
      $('#verifyotppagetitle').html(__('Welcome back, {---1}',[page.data.user_firstname]));
      $('#log-in-pwd-btn-container').show();
    }else{
      $('#verifyotppagetitle').html('');
      $('#log-in-pwd-btn-container').hide();
    }

    if(page.data.whatsapp_auth_status == 1){
        $('#send-code-via-whatsapp-btn-container').show();
        $('#send-code-via-whatsapp-btn').data('wtsphonenum', page.data.whatsapp_auth_phonenum);
        $('#send-code-via-whatsapp-btn').data('wtsmsg', page.data.whatsapp_auth_msg);
        $('#send-code-via-whatsapp-btn').data('wtscode', page.data.whatsapp_auth_code);
    }else{
        $('#send-code-via-whatsapp-btn-container').hide();
    }
    
    $('#verifyotppagesubtitle').html(__('Enter the code sent to you at {---1}',[page.data.phone_num]));

    if(page.data.demo_otp == "123456"){
      $('#verifyotppagedemocode').show();
    }else{
      $('#verifyotppagedemocode').hide();
    }

    $('#resend-otp-btn').data('phonenumber',page.data.phone_num);

    $('#log-in-pwd-btn').data('cdc', page.data.country_dial_code);
    $('#log-in-pwd-btn').data('phonenuminp', page.data.phone_num_inp);
    $('#log-in-pwd-btn').data('phonenumnat', page.data.phone_num_nat);

          
    //initiate resend code button activate countdown    
    clearInterval(resend_code_countdown_timer_handle);
    var countdown = RESEND_CODE_COUNTDOWN_VALUE;
    resend_code_btn_status = 0;
    $('#resend-otp-btn').text(__('Resend Code') + " " + countdown);
    resend_code_countdown_timer_handle = setInterval(function(){
      countdown--;
      if(countdown < 1){
          countdown = 0;
          resend_code_btn_status = 1;
          $('#resend-otp-btn').text(__('Resend Code'));
          clearInterval(resend_code_countdown_timer_handle);
          return;
      }

      $('#resend-otp-btn').text(__('Resend Code') + " " + countdown);
    
    },1000);
    

    $('#resend-otp-btn').off().on('click', function(){
        if(page.data.service == "firebase"){
          resendOTPCodeFirebase();
        }else{
          resendOTPCode();
        }
    })

    



  },

  loginpwd: function(page){
    translateElements('loginpwd');
    $('#loginpwdinp').off().on('keyup paste', function(){
      setTimeout(function(){
        $('#loginpwderrormsg').html('');

        if($('#loginpwdinp').val()){
          $('#login-pwd-btn').prop('disabled', false);
        }else{
          $('#login-pwd-btn').prop('disabled', true);
        }
      },50);
    })

      $('#login-pwd-btn').off().on('click', function(){

        let country_call_code = $('#log-in-pwd-btn').data('cdc');
        let phone = $('#log-in-pwd-btn').data('phonenuminp');
        let phone_formatted = $('#log-in-pwd-btn').data('phonenumnat');
        var password = $("#loginpwdinp").val();

        let rem_pwd = 0;

        if($('#login-remember-user-pwd').prop('checked')){
            rem_pwd = 1;        
        }        

        user_login_options = {country_call_code: country_call_code, phone : phone, phone_formatted : phone_formatted, password : password, code : null, fb_user_details : null,remember_pwd: rem_pwd};
        login();

      })

  },

  signuppage1: function(page){
    translateElements('signuppage1');
  },
  signuppage2: function(page){
    translateElements('signuppage2');
    if(user_reg_data.firstname){
      $('#regfirstname').val(user_reg_data.firstname);
    }


    if(user_reg_data.lastname){
      $('#reglastname').val(user_reg_data.lastname);
    }
  },

  signuppage3: function(){
    translateElements('signuppage3');
    if(user_reg_data.password){
      $('#regpwdnew').val(user_reg_data.password);
      $('#regpwdconfirm').val(user_reg_data.password);
    }

    $('.reg-pwd-user-input').off().on('keyup', function(){
      $('#regpwderrormsg').html('');   
    });

  },

  signuppage4: function(){    
    translateElements('signuppage4');
  },

  notificationspage : function(){
        translateElements('notifpage');
  },

  banner : function(page){
    var banner_details_data = JSON.parse($('#banner-content-' + page.data.banner_id).text());
    $('#banner-page-title').html(banner_details_data.banner_title);
    $('#banner-page-fimg').attr('src',banner_details_data.feature_img);
    var banner_html_content = banner_details_data.banner_body;
    var entities_map = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'"
    };
  
    var banner_dec_html = banner_html_content.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m){return entities_map[m];});

    $('#banner-page-content').html(banner_dec_html);
    $('#banner-page-content').find('a').each(function(){
      var el = $(this);
      el.off('click').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();        
        let a_href = $(this).attr('href');
        //inappbrowser = cordova.InAppBrowser.open(a_href, "_blank", 'toolbarcolor=#0f5bbf,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncolor=#ffffff,zoom=no,location=yes,hidden=no,toolbar=yes,hidespinner=yes,hardwareback=yes');
        window.open(a_href, '_system', 'location=yes');
      })
    })    
  },
  bookingdetails: function(page){

    translateElements('bookdet');
    
    
    let touch_x_start;
    let touch_y_start;
    let touch_x_move;
    let touch_y_move;
    let animating = 0;
    let expanded = true;
    let allow_collapse = false;
    let scroll_block = false;


    let el_initial_top = Math.ceil($('#booking-details-map').outerHeight(true)) + Math.ceil($('#driver-details').outerHeight(true));

    $('#booking-details-data-container').css('top', el_initial_top + "px");
    $('#booking-details-data-container').scrollTop(0);
    $('#booking-details-data-container').css('transform','translateY(0)');
        

    document.getElementById('booking-details-data-container').addEventListener('touchstart', function(e){
        touch_x_start = e.touches[0].clientX;
        touch_y_start = e.touches[0].clientY;
    }, false);


    document.getElementById('booking-details-data-container').addEventListener('touchmove', function(e){

        if(animating)return;
        
        if(!touch_x_start || !touch_y_start)return;

        let container_top_pos = $('#booking-details-data-container').scrollTop();

        touch_x_move = e.touches[0].clientX;
        touch_y_move = e.touches[0].clientY;

        let dy = touch_y_start - touch_y_move;

        let el_pos_change = Math.abs(dy);

        if(dy < 0){
            //Swipe down
            if(container_top_pos < 3){
                expandbdmapview();
            }
             
                       
            
        }else{
            //Swipe up
            if(container_top_pos > 6){
              collapsebdmapview();
            }                    
            
        }

    }, false);

    document.getElementById('booking-details-data-container').addEventListener('touchcancel', function(e){
        touch_x_start = null;
        touch_y_start = null;
                        
    }, false); 


    document.getElementById('booking-details-data-container').addEventListener('touchend', function(e){
        touch_x_start = null;
        touch_y_start = null;
                        
    }, false)


    document.getElementById('booking-details-data-container').addEventListener('scroll', function(e){
        
                      
        let scroll_pos = e.target.scrollTop;
        

        if(scroll_pos < 3 && animating){
          e.target.scrollTop = 0;
          e.target.style.overflowY = "hidden";
        }

        if(scroll_pos > 6 && animating){
          e.target.scrollTop = 0;
          e.target.style.overflowY = "hidden";
        }
        
        setTimeout(function(){          
          e.target.style.overflowY = "auto";
        },200)

    }, false)


    function collapsebdmapview(){

        if(expanded == false)return;   
        
        expanded = false;

        animating = 1;
        $('#booking-details-data-container').scrollTop(0);        
        $('#booking-details-data-container').css('transform',`translateY(-${200}px)`);
        setTimeout(function(){
            animating = 0;
        },100);


    }

    function expandbdmapview(){

        if(expanded == true)return;

        expanded = true;

        animating = 1;
        $('#booking-details-data-container').scrollTop(0);
        $('#booking-details-data-container').css('transform',`translateY(-${0}px)`);

        setTimeout(function(){
            animating = 0; 
        },100);

    }

    var booking_details_data = JSON.parse($('#booking-list-item-data-' + page.data.bookid).html());
    
    if(booking_details_data.hasOwnProperty('booking_cost')){
      $('#bookride_cost_det').html(booking_details_data.booking_cost);
    }

    if(parseFloat(booking_details_data.paid_amount)){

      let paid_amount = Number(booking_details_data.paid_amount);
      let actual_cost = Number(booking_details_data.actual_cost);
      let discount = 0;
      let discount_percentage = 0;

      if(actual_cost && paid_amount < actual_cost){
          discount = actual_cost - paid_amount;
          discount_percentage = (discount / actual_cost) * 100;
      }

      $('#trip-discount').html(discount_percentage.toFixed(1) + "%");

    }

    if(booking_details_data.hasOwnProperty('booking_id')){
      $('#booking-details-title').html(__('Trip') + ': #' + booking_details_data.booking_id);
      $("#chat-driver-btn").data('bookingid', parseInt(booking_details_data.booking_id));
    }



    if(booking_details_data.hasOwnProperty('car_type')){
      $('#selected-ride').html(booking_details_data.car_type);
    }

    if(booking_details_data.hasOwnProperty('d_location')){
      $('#drop-off-address').html(booking_details_data.d_location);
    }


    if(booking_details_data.hasOwnProperty('p_location')){
      $('#pick-up-address').html(booking_details_data.p_location);
    }

    if(booking_details_data.hasOwnProperty('waypoint1_address') && booking_details_data.waypoint1_address != ""){
      $('#bk-det-waypoint1').show();
      $('#bk-det-waypoint1-address').html(booking_details_data.waypoint1_address);
    }

    if(booking_details_data.hasOwnProperty('waypoint2_address') && booking_details_data.waypoint2_address != ""){
      $('#bk-det-waypoint2').show();
      $('#bk-det-waypoint2-address').html(booking_details_data.waypoint2_address);
    }

    if(booking_details_data.hasOwnProperty('pick_up_time')){
      $('#puc_dt_det').html(booking_details_data.pick_up_time);
    }


    if(booking_details_data.hasOwnProperty('payment_type')){
      $('#payment-type-det').html(booking_details_data.payment_type);
    }


    if(booking_details_data.hasOwnProperty('car_image')){
      $('#route-ride-image').attr("src",booking_details_data.car_image);
    }


    if(booking_details_data.hasOwnProperty('car_desc')){
      $('#route-ride-desc-det').html(booking_details_data.car_desc);
    }

    if(booking_details_data.hasOwnProperty('coupon_code') && booking_details_data.coupon_code){
      $('#coupon-code-det').html(booking_details_data.coupon_code);
    }

    if(booking_details_data.hasOwnProperty('service_mode')){
      if(booking_details_data.service_mode == 0){
          $('#booking-service-type').html(__('Taxi'));
      }else if(booking_details_data.service_mode == 1){
          $('#booking-service-type').html(__('Quick-Ride'));
      }      
    }

    
    if(booking_details_data.hasOwnProperty('driver_name')){
            
      if(booking_details_data.driver_name !== 'N/A'){
          $('.driver-details').show();
          $('#driver-name').html(booking_details_data.driver_name);

          if(booking_details_data.hasOwnProperty('driver_phone') && booking_details_data.driver_phone != '' && (booking_details_data.booking_status == 0 || booking_details_data.booking_status == 1)){
            $('#contact-driver').css('display', 'flex');
            $('#call-driver-btn').data('number',booking_details_data.driver_phone);
            $('#sms-driver-btn').data('number',booking_details_data.driver_phone);
          }
          if(booking_details_data.hasOwnProperty('driver_image')){
            $('#driver-image-preload').attr("src",booking_details_data.driver_image);
          }
          if(booking_details_data.hasOwnProperty('driver_car_details')){
            $('#driver-car-details').html(booking_details_data.driver_car_details);
          }
          if(booking_details_data.hasOwnProperty('driver_plate_num')){
            $('#driver-plate-num').html(booking_details_data.driver_plate_num);
          }
          if(booking_details_data.hasOwnProperty('driver_rating')){
            $('#driver-rating').attr("src","img/rating-" + booking_details_data.driver_rating + ".png");
          }

      }      
    }

    if(booking_details_data.hasOwnProperty('booking_status')){    

        if(booking_details_data.booking_status == 3){
            $('.trip-completed').show(); 
            if(booking_details_data.hasOwnProperty('distance_travelled')){
              $('#trip-distance').html(booking_details_data.distance_travelled);
            } 
            
            if(booking_details_data.hasOwnProperty('ride_duration')){
              $('#trip-duration').html(booking_details_data.ride_duration);
            }

        }
    }

       

    

  },

  bookingpage: function(){
    translateElements('bookpage');   
    getbookings();
   
  },

  bookingpagecurrent: function(){
    //$('#booking-pend-onride').html(bookings_data['pend_onride']);
  },


  bookingpagecomplete: function(){
    //$('#booking-comp').html(bookings_data['completed']);
  },


  bookingpagecancel: function(){
    //$('#booking-canc').html(bookings_data['cancelled']);
  },

  locationmappage: function(){
    translateElements('locat');
  },

  pgateways: function(){
    translateElements('pgateways');

    let payment_gateways = app_settings.default_payment_gateway;
    let pg_list_items = "";

    payment_gateways.forEach(function(val,indx){
      pg_list_items += `<ons-list-item tappable style="cursor: pointer;min-height: 70px;" onclick="Vpay('${val}')">
                          <div class="left">
                            <img src="img/${val}.png" style="width:36px" />
                          </div>
                          <div class="center">
                            <span style="font-size: 16px;font-weight: 500;">${val}</span>
                          </div>
                          <div class="right">
                            <ons-icon icon='fa-chevron-right' size='14px' style='color:black;'></ons-icon> 
                          </div>
                      </ons-list-item>`;
    });
    
    
    
    

    let pg_items_list_html = `<ons-list>${pg_list_items}</ons-list>`;

    $('#pgateways-content').html(pg_items_list_html);
  },


  addresses: function(page){

    googlemap_autocomplete_session = Date.now(); //generate new session for google auto complete
    translateElements('addres');
    $("#address-input-p").val(pick_up_data.address);
    $("#address-input-d").val(drop_off_data.address);
    $("#address-input-ds1").val(multi_destinations['dest-1']['address']);
    $("#address-input-ds2").val(multi_destinations['dest-2']['address']);

    //hide other address inputs and favourites when in quick-ride mode

    if(service_mode == 1){
      $("#location-type-icon-ds1").hide();
      $("#location-type-icon-ds2").hide();
      $("#location-type-icon-d").hide();
      $("#fav-list").hide();
      $("#recent-list").hide();
      $("#add-stop-btn").hide();
    }else{
      $("#location-type-icon-ds1").show();
      $("#location-type-icon-ds2").show();
      $("#location-type-icon-d").show();
      $("#fav-list").show();
      $("#recent-list").show();
      $("#add-stop-btn").show();

    }

    
    multi_destinations['pickup']['address'] = pick_up_data.address;
    multi_destinations['pickup']['lat'] = pick_up_data.lat;
    multi_destinations['pickup']['lng'] = pick_up_data.lng;      
    

    
    multi_destinations['dropoff']['address'] = drop_off_data.address;
    multi_destinations['dropoff']['lat'] = drop_off_data.lat;
    multi_destinations['dropoff']['lng'] = drop_off_data.lng;
    
    
    $("#address-input-p").attr("placeholder",__("From"));
    $("#address-input-d").attr("placeholder",__("Where to"));
    $('#address-input-ds1').attr("placeholder",__("Add a stop"));
    $('#address-input-ds2').attr("placeholder",__("Add a stop"));
    $('#processmultidestbtn').text(__('Continue'));
    //console.log(page.data);
    $('#myfavbtn').css('visibility','hidden');//hide the favourite fab button 
    $("#fav-list").html(fav_list_items_string);
    $("#recent-list").html(recent_list_items_string);
    
    if(location_type_selected){
      //$("#location-type-icon").css("background-image","url(img/drop-off.png)");
      if(multi_destination_mode == 1){
        if(dest_location_type_selected == 0){
          $("#address-page-title").html(__("Add a stop"));
          setTimeout(() => {
            $("#address-input-ds1").focus();
          }, 800); 
          if(selected_lang.dir == "rtl"){
            $("#address-input-p").attr('dir','rtl');
            $("#address-input-d").attr('dir','rtl');
            $("#address-input-ds1").attr('dir','rtl');
            $("#address-input-ds2").attr('dir','rtl');
          }else{
            $("#address-input-p").attr('dir','ltr');
            $("#address-input-d").attr('dir','ltl');
            $("#address-input-ds1").attr('dir','ltr');
            $("#address-input-ds2").attr('dir','ltl');
          }
        }else if(dest_location_type_selected == 1){
          $("#address-page-title").html(__("Add a stop"));
          setTimeout(() => {
            $("#address-input-ds2").focus();
          }, 800); 
          if(selected_lang.dir == "rtl"){
            $("#address-input-p").attr('dir','rtl');
            $("#address-input-d").attr('dir','rtl');
            $("#address-input-ds1").attr('dir','rtl');
            $("#address-input-ds2").attr('dir','rtl');
          }else{
            $("#address-input-p").attr('dir','ltr');
            $("#address-input-d").attr('dir','ltl');
            $("#address-input-ds1").attr('dir','ltr');
            $("#address-input-ds2").attr('dir','ltl');
          }

        }else{
          $("#address-page-title").html(__("Dropoff location"));     
      
          setTimeout(() => {
            $("#address-input-d").focus();
          }, 800);
          if(selected_lang.dir == "rtl"){
            $("#address-input-p").attr('dir','rtl');
            $("#address-input-d").attr('dir','rtl');
            $("#address-input-ds1").attr('dir','rtl');
            $("#address-input-ds2").attr('dir','rtl');
          }else{
            $("#address-input-p").attr('dir','ltr');
            $("#address-input-d").attr('dir','ltl');
            $("#address-input-ds1").attr('dir','ltr');
            $("#address-input-ds2").attr('dir','ltl');
          }
        }
        

      }else{
      
        $("#address-page-title").html(__("Dropoff location"));      
        
        setTimeout(() => {
          $("#address-input-d").focus();
        }, 800);
        if(selected_lang.dir == "rtl"){
          $("#address-input-p").attr('dir','rtl');
          $("#address-input-d").attr('dir','rtl');
          $("#address-input-ds1").attr('dir','rtl');
          $("#address-input-ds2").attr('dir','rtl');
        }else{
          $("#address-input-p").attr('dir','ltr');
          $("#address-input-d").attr('dir','ltl');
          $("#address-input-ds1").attr('dir','ltr');
          $("#address-input-ds2").attr('dir','ltl');
        }
      }
      //$("#address-input").focus();
    }else{
        //$("#location-type-icon").css("background-image","url(img/pick-up.png)");
        $("#address-page-title").html(__("Pickup location"));
        setTimeout(() => {
          $("#address-input-p").focus();
        }, 800);
        
        if(selected_lang.dir == "rtl"){
          $("#address-input-p").attr('dir','rtl');
          $("#address-input-d").attr('dir','rtl');
          $("#address-input-ds1").attr('dir','rtl');
          $("#address-input-ds2").attr('dir','rtl');
        }else{
          $("#address-input-p").attr('dir','ltr');
          $("#address-input-d").attr('dir','ltl');
          $("#address-input-ds1").attr('dir','ltr');
          $("#address-input-ds2").attr('dir','ltl');
        }
        //$("#address-input").focus();
    }

      if(multi_destination_mode){
        $('#location-type-icon-ds1').hide();
        $('#location-type-icon-ds2').hide();
        $('#ds1-address-inp-remove-btn').hide();
        $('#ds2-address-inp-remove-btn').hide();
        //$('#add-stop-btn').show();
        $('#multidestconfirmbtn').show();

        if(destination_stop_inp1_shown == 1){
          $('#location-type-icon-ds1').show();          
          $('#location-type-icon-ds2').hide();
          $('#ds1-address-inp-remove-btn').show();
          $('#ds2-address-inp-remove-btn').hide();
          //$('#add-stop-btn').show();
          
        }
        
        if(destination_stop_inp2_shown == 1){          
          $('#location-type-icon-ds2').show();
          $('#ds1-address-inp-remove-btn').hide();
          $('#ds2-address-inp-remove-btn').show();
          //$('#add-stop-btn').hide();
          
        }
        
  
      }else{
        $('#location-type-icon-ds1').hide();
        $('#location-type-icon-ds2').hide();  
        $('#ds1-address-inp-remove-btn').hide();
        $('#ds2-address-inp-remove-btn').hide(); 
        $('#multidestconfirmbtn').hide();
        //$('#add-stop-btn').show();  
        
      }

      $('#add-stop-btn').off('click').on('click', function(){ 
        
        if(destination_stop_inp1_shown == 0){
          destination_stop_inp1_shown = 1;
          multi_destination_mode = 1;
          if(pick_up_data.address){
            multi_destinations['pickup']['address'] = pick_up_data.address;
            multi_destinations['pickup']['lat'] = pick_up_data.lat;
            multi_destinations['pickup']['lng'] = pick_up_data.lng;
            
          }

          if(drop_off_data.address){
            multi_destinations['dropoff']['address'] = drop_off_data.address;
            multi_destinations['dropoff']['lat'] = drop_off_data.lat;
            multi_destinations['dropoff']['lng'] = drop_off_data.lng;
          }

          $('#multidestconfirmbtn').show();
          $('#location-type-icon-ds1').show(); 
          $("#address-input-ds1").focus();         
          $('#location-type-icon-ds2').hide();
          $('#ds1-address-inp-remove-btn').show();
          $('#ds2-address-inp-remove-btn').hide();
          //$('#add-stop-btn').show();
          return;
        }
        
        if(destination_stop_inp2_shown == 0){
          destination_stop_inp2_shown = 1;
          $('#location-type-icon-ds2').show();
          $("#address-input-ds2").focus();  
          $('#ds1-address-inp-remove-btn').hide();
          $('#ds2-address-inp-remove-btn').show();
          //$('#add-stop-btn').hide();
          return;
        }

      })


      $('#ds1-address-inp-remove-btn').off('click').on('click', function(){
        destination_stop_inp1_shown = 0;
        multi_destinations['dest-1']['address'] = '';
        multi_destinations['dest-1']['lat'] = '';
        multi_destinations['dest-1']['lng'] = '';

        multi_destinations['dest-2']['address'] = '';
        multi_destinations['dest-2']['lat'] = '';
        multi_destinations['dest-2']['lng'] = '';

        multi_destinations['pickup']['address'] = '';
        multi_destinations['pickup']['lat'] = '';
        multi_destinations['pickup']['lat'] = '';

        multi_destinations['dropoff']['address'] = '';
        multi_destinations['dropoff']['lat'] = '';
        multi_destinations['dropoff']['lat'] = '';

        
        $('#address-input-ds1').val('');
        $('#location-type-icon-ds1').hide();
        $("#address-input-d").focus();  
        $('#ds1-address-inp-remove-btn').hide();
        $('#multidestconfirmbtn').hide();
        multi_destination_mode = 0;
        $("#address-input-d").val('');

        if(markerds1){
          markerds1.remove(); 
          markerds1 = null;
        }

        if(markerds2){
          markerds2.remove(); 
          markerds2 = null;
        }

        
      })


      $('#ds2-address-inp-remove-btn').off('click').on('click', function(){
        destination_stop_inp2_shown = 0;
        multi_destinations['dest-2']['address'] = '';
        multi_destinations['dest-2']['lat'] = '';
        multi_destinations['dest-2']['lng'] = '';
        $('#address-input-ds2').val('');
        $('#location-type-icon-ds2').hide();
        $("#address-input-ds1").focus();  
        $('#ds1-address-inp-remove-btn').show();
        $('#ds2-address-inp-remove-btn').hide();
        if(markerds2){
          markerds2.remove(); 
          markerds2 = null;
        }
        //$('#add-stop-btn').show();
      })




      $('#address-input-p').off('focus').on('focus', function(){
        $("#address-page-title").html(__("Pickup location"));
        location_type_selected = 0;

        $('#location-type-icon-p').addClass('address-input-selected');
        $('#location-type-icon-ds1').removeClass('address-input-selected');
        $('#location-type-icon-ds2').removeClass('address-input-selected');
        $('#location-type-icon-d').removeClass('address-input-selected');

        $('#p-address-inp-clear-btn').show();
        $('#d-address-inp-clear-btn').hide();
        $('#ds1-address-inp-clear-btn').hide();
        $('#ds2-address-inp-clear-btn').hide();
        address_input();

      })

      $('#address-input-d').off('focus').on('focus', function(){
        $("#address-page-title").html(__("Dropoff location"));
        location_type_selected = 1;
        dest_location_type_selected = 2;

        $('#location-type-icon-p').removeClass('address-input-selected');
        $('#location-type-icon-ds1').removeClass('address-input-selected');
        $('#location-type-icon-ds2').removeClass('address-input-selected');
        $('#location-type-icon-d').addClass('address-input-selected');
        
        $('#p-address-inp-clear-btn').hide();
        $('#d-address-inp-clear-btn').show();
        $('#ds1-address-inp-clear-btn').hide();
        $('#ds2-address-inp-clear-btn').hide();
        address_input();

      })

      $('#address-input-ds1').off('focus').on('focus', function(){
        $("#address-page-title").html(__("Add a stop"));
        location_type_selected = 1;
        dest_location_type_selected = 0;

        $('#location-type-icon-p').removeClass('address-input-selected');
        $('#location-type-icon-ds1').addClass('address-input-selected');
        $('#location-type-icon-ds2').removeClass('address-input-selected');
        $('#location-type-icon-d').removeClass('address-input-selected');

        $('#ds1-address-inp-clear-btn').show();
        $('#ds2-address-inp-clear-btn').hide();
        $('#p-address-inp-clear-btn').hide();
        $('#d-address-inp-clear-btn').hide();

        address_input();

      })

      $('#address-input-ds2').off('focus').on('focus', function(){
        $("#address-page-title").html(__("Add a stop"));
        location_type_selected = 1;
        dest_location_type_selected = 1;

        $('#location-type-icon-p').removeClass('address-input-selected');
        $('#location-type-icon-ds1').removeClass('address-input-selected');
        $('#location-type-icon-ds2').addClass('address-input-selected');
        $('#location-type-icon-d').removeClass('address-input-selected');
        
        $('#ds1-address-inp-clear-btn').hide();
        $('#ds2-address-inp-clear-btn').show();
        $('#p-address-inp-clear-btn').hide();
        $('#d-address-inp-clear-btn').hide();

        address_input();

      })

      $('#p-address-inp-clear-btn').off('click').on('click', function(){
        $('#address-input-p').val('');
        $('#address-input-p').focus();
      })

      $('#d-address-inp-clear-btn').off('click').on('click', function(){
        $('#address-input-d').val('');
        $('#address-input-d').focus();
      })

      $('#ds1-address-inp-clear-btn').off('click').on('click', function(){
        $('#address-input-ds1').val('');
        $('#address-input-ds1').focus();
      })

      $('#ds2-address-inp-clear-btn').off('click').on('click', function(){
        $('#address-input-ds2').val('');
        $('#address-input-ds2').focus();
      })


  }


  
 
};







