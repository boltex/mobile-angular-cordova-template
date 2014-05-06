'use strict';


angular.module('gencorApp', [
    'ngRoute',
    'mobile-angular-ui',
    'mobile-angular-ui.touch',
    'mobile-angular-ui.scrollable'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/page2', {
        templateUrl: 'views/page2.html',
        controller: 'Page2Ctrl'
      })
      .when('/dtbs', {
        templateUrl: 'views/dtbs.html',
        controller: 'DtbsCtrl'
      })
      .when('/scroll', {
        templateUrl: 'views/scroll.html',
        controller: 'ScrollCtrl'
      })
      .when('/form', {
        templateUrl: 'views/form.html',
        controller: 'FormCtrl'
      })
      .when('/swipe', {
        templateUrl: 'views/swipe.html',
        controller: 'SwipeCtrl'
      })
      .when('/tabs', {
        templateUrl: 'views/tabs.html',
        controller: 'TabsCtrl'
      })
      .when('/accord', {
        templateUrl: 'views/accord.html',
        controller: 'AccordCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

 // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];


  })
  .factory("myService", function(){

    return {
      sharedObject: {
                      data : 'Joe',
                      data2 : 'amy',
                      loglist : ['item1', 'item2']
                    }
    };

  })
.directive( "carouselExampleItem", function($rootScope, $swipe){
  return function(scope, element, attrs){
      var startX = null;
      var startY = null;
      var endAction = "cancel";
      var carouselId = element.parent().parent().attr("id");

      var translateAndRotate = function(x, y, z, deg){
        element[0].style["-webkit-transform"] = "translate3d("+x+"px,"+ y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-moz-transform"] = "translate3d("+x+"px," + y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-ms-transform"] = "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-o-transform"] = "translate3d("+x+"px," + y  + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["transform"] = "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
      }

      $swipe.bind(element, {
        start: function(coords) {
          startX = coords.x;
          startY = coords.y;
        },

        cancel: function(e) {
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        end: function(coords, e) {
          if (endAction == "prev") {
            $rootScope.carouselPrev(carouselId);
          } else if (endAction == "next") {
            $rootScope.carouselNext(carouselId);
          }
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        move: function(coords) {
          if( startX != null) {
            var deltaX = coords.x - startX;
            var deltaXRatio = deltaX / element[0].clientWidth;
            if (deltaXRatio > 0.3) {
              endAction = "next";
            } else if (deltaXRatio < -0.3){
              endAction = "prev";
            }
            translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
          }
        }
      });
    }
})
.run(function( $window, $rootScope, myService, $http) {
   
    $rootScope.$on("$routeChangeStart", function(){
      $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function(){
      $rootScope.loading = false;
    });

    myService.sharedObject.loglist.push("Hola3");

//PUSH INSERT
    var pushNotification;

    myService.sharedObject.loglist.push('Trying to setup PUSH');

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

    try 
    { 
        pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android' ||
          device.platform == 'amazon-fireos' ) {
          myService.sharedObject.loglist.push('registering ' + device.platform);
          pushNotification.register(successHandler, errorHandler, {"senderID":"37525779694","ecb":"onNotificationGCM"});     // required!
        } else {
          myService.sharedObject.loglist.push('registering iOS');
          pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});    // required!
        }
        
    }
    catch(err) 
    { 
       var txt="There was an error on this page.\n\n"; 
        txt+="Error description: " + err.message + "\n\n"; 
        alert(txt); 
    } 
    
    
    // handle APNS notifications for iOS
    $window.onNotificationAPN = function(e) {
        if (e.alert) {
              myService.sharedObject.loglist.push('push-notification: ' + e.alert);
             navigator.notification.alert(e.alert);
             $rootScope.$digest();
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
    $window.onNotificationGCM= function(e) {
        myService.sharedObject.loglist.push('EVENT RECEIVED is' + e.event );
        
        switch( e.event )
        {
            case 'registered':
            if ( e.regid.length > 0 )
            {
                 myService.sharedObject.loglist.push('REGISTERED REGID is' + e.regid );
                  
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                console.log("regID = " + e.regid);
                $http.post('http://fmalboeuf/gcm/register.php', { name: 'roger', email:'roger@oceanex.com', regId:e.regid }).success(function(response) {
                  myService.sharedObject.loglist.push('Back from register ' + response );
                  
                });



            }
            break;
            
            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (e.foreground)
                {
                     myService.sharedObject.loglist.push('INLINE NOTIFICATION' );
                    
                    // if the notification contains a soundname, play it.
                    //var my_media = new Media("/android_asset/www/"+e.soundname);
                    //my_media.play();
                }
                else
                {   // otherwise we were launched because the user touched a notification in the notification tray.
                    if (e.coldstart){
                         myService.sharedObject.loglist.push('COLDSTART NOTIFICATION' );
                         

                    }else{
                     myService.sharedObject.loglist.push('BACKGROUND NOTIFICATION' );
                      
                    }
                }
                    
                 myService.sharedObject.loglist.push('MESSAGE MSG is ' + e.payload.message );
                //android only
                 myService.sharedObject.loglist.push('MESSAGE MSGCNT is ' + e.payload.msgcnt );
                //amazon-fireos only
                 myService.sharedObject.loglist.push('MESSAGE TIMESTAMP is ' + e.payload.timeStamp );
                  
            break;
            
            case 'error':
                 myService.sharedObject.loglist.push('ERROR MSG is ' + e.msg);
                  
            break;
            
            default:
                 myService.sharedObject.loglist.push('EVENT Unknown, an event was received and we do not know what it is');
                  
            break;
        }
        $rootScope.$digest();
    }

// END OF PUSH INSERT
  });  

