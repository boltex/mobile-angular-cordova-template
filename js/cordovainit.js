/*global $:false */
/*jshint unused:false*/
'use strict';

var buffermessage = [];

var pushNotification;
var tokenHandler =function(result) {
        console.log('PUSH token: '+ result);
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
    };
var successHandler = function(result) {
         console.log('PUSH success:'+ result);
    };
var errorHandler = function(error) {
         console.log('PUSH error:'+ error );
    };
// handle APNS notifications for iOS
var onNotificationAPN = function(e) {
        if (e.alert) {
              console.log('push-notification: ' + e.alert);
             navigator.notification.alert(e.alert);
        }
        if (e.sound) {
            var snd = new Media(e.sound);
            snd.play();
        }
        if (e.badge) {
            pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
        }
    }
    // handle GCM notifications for Android
var onNotificationGCM= function(e) {
        console.log('EVENT RECEIVED is' + e.event );
        var bufferentry = {};

        switch( e.event )
        {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                 console.log('REGISTERED REGID is' + e.regid );
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
                /*
                $http.post('http://10.10.1.148/gcm/register.php', { name: 'roger', email:'roger@oceanex.com', regId:e.regid }).success(function(response) {
                  console.log('Back from register ' + response );
                });
*/
			bufferentry.message='registered';
			bufferentry.payload = e.regid;
			angular.bootstrap(document, ['gencorApp']);
            }
        break;
        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
                 console.log('INLINE NOTIFICATION' );
                bufferentry.message='inline';
                // if the notification contains a soundname, play it.
                //var my_media = new Media("/android_asset/www/"+e.soundname);
                //my_media.play();
            }
            else
            {   // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart){
                    console.log('COLDSTART NOTIFICATION' );
                    bufferentry.message='coldstart';
                }else{
                    console.log('BACKGROUND NOTIFICATION' );
                    bufferentry.message='background';
                }
            }
                
             console.log('MESSAGE MSG is ' + e.payload.message );
            //android only
             console.log('MESSAGE MSGCNT is ' + e.payload.msgcnt );
            //amazon-fireos only
             console.log('MESSAGE TIMESTAMP is ' + e.payload.timeStamp );
             bufferentry.payload = e.payload;
        break;
        
        case 'error':
             console.log('ERROR MSG is ' + e.msg);
            bufferentry.message='error';
			bufferentry.payload = e.msg;
        break;
        
        default:
             console.log('EVENT Unknown, an event was received and we do not know what it is');
             bufferentry.message='unknown';
			 bufferentry.payload = 'unknown';
        break;
        }
        buffermessage.push(bufferentry);
         // get Angular scope from the known DOM element
	    //e = document.getElementById('body');
	     

		if (typeof angular.element(document).scope() != "undefined") {
		   angular.element(document).scope().$apply();
		}

    }
 
var CordovaInit = function() {
 
	var onDeviceReady = function() {
		receivedEvent('deviceready');
	};
 
	var receivedEvent = function(event) {
		//	console.log('Start event received, bootstrapping application setup.');

	// START PUSH BOOTSTRAP
	// 
	 //console.log('Trying to setup PUSH');
	    try 
	    { 
	        pushNotification = window.plugins.pushNotification;
	        if (device.platform == 'android' || device.platform == 'Android' ||
	          device.platform == 'amazon-fireos' ) {
	          //console.log('registering ' + device.platform);
	          pushNotification.register(successHandler, errorHandler, {"senderID":"37525779694","ecb":"onNotificationGCM"});     // required!
	        } else {
	          console.log('registering iOS');
	          pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});    // required!
	        }
	        
	    }
	    catch(err) 
	    { 
	       var txt="There was an error on this page.\n\n"; 
	        txt+="Error description: " + err.message + "\n\n"; 
	        alert(txt); 
	    } 
	    // END PUSH BOOTSTRAP
		
};
 
	this.bindEvents = function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	};
 
	//If cordova is present, wait for it to initialize, otherwise just try to
	//bootstrap the application.
	if (window.cordova !== undefined) {
		//console.log('Cordova found, wating for device.');
		this.bindEvents();
	} else {
		console.log('Cordova not found, booting application');
		receivedEvent('manual');
	}
};
 
angular.element(document).ready(function() {
	//console.log('Bootstrapping!');
	new CordovaInit();
});