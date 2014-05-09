'use strict';

angular.module('gencorApp')
  .controller('MainCtrl', function ($rootScope, $scope, $window, $http) {

   $rootScope.$on("$routeChangeStart", function(){
      $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function(){
      $rootScope.loading = false;
    });

    $scope.invoice = {paid: true};
    $scope.driver = {
                    ocxdriverid:"",
                    ocxdriverpassword:"",
                    errormessage:""
                    };

    var scrollItems = [];
    for (var i=1; i<=100; i++) {
    scrollItems.push("Dummy" + i);
    }
    $scope.scrollItems = scrollItems;

    $scope.myVar = {
                      data : 'Joe',
                      data2 : 'amy',
                      loglist : ['item1', 'item2']
                    };

// ************************************** init storage instance

 var storage = window['localStorage'];

// ******************************* LOG IN
    
    $scope.log = "Log In"; // Log in if not logged!
    $scope.ocxlogged = false;

    $scope.gcmregistered = false;
    $scope.gcmregid = ""  ;

    $scope.trylogin = function(){
        //console.log("try to LOGIN !!! "+$scope.driver.ocxdriverid+"  " +$scope.driver.ocxdriverpassword);
        $http.post('http://10.10.1.148/gcm/register.php', { driverid:$scope.driver.ocxdriverid, password:$scope.driver.ocxdriverpassword, regId:$scope.gcmregid }).success(function(response) {
        console.log('Back from register ' + response.message );
        if( response.message =='Logged In'){
            $scope.log = "Log Out"; // Log in if not logged!
            $scope.ocxlogged = true;
            $scope.driver.errormessage = "";
        }else{
            $scope.driver.errormessage = "Loggin Error";
        }
        });
    };

    $scope.trylogoff = function(){
        console.log('Tried to LOGOFF');
       $http.post('http://10.10.1.148/gcm/logoff.php', { driverid:$scope.driver.ocxdriverid, password:$scope.driver.ocxdriverpassword, regId:$scope.gcmregid }).success(function(response) {
        console.log('Back from logoff ' + response.message );
        if( (response.message =='deleted2') || (response.message =='deleted') ){
            $scope.log = "Log In"; // Log in if not logged!
            $scope.ocxlogged = false;
            $scope.driver.errormessage = "";
            $scope.driver.ocxdriverid="";
            $scope.driver.ocxdriverpassword="";
        }else{
            $scope.driver.errormessage = "Loggout Error";
        }
        });

    };

// **************************************************** Handle Messages
    $scope.messagelist = $window.buffermessage;
    $scope.counter = $window.buffermessage.length;
    $scope.$watch(
             // This is the listener function
             function() { return $window.buffermessage.length; },
             // This is the change handler
             function(newValue, oldValue) {
                console.log("changed!");
               if ( newValue !== oldValue ) {
                // Only increment the counter if the value changed
                $scope.counter = $window.buffermessage.length;
                // GOT A NEW MESSAGE.
                var lastmessage = $window.buffermessage[$window.buffermessage.length-1];
                if (lastmessage.message==='registered'){
                    $scope.myVar.loglist.push(lastmessage.message  );
                    $scope.gcmregid = lastmessage.payload ;
                    $scope.gcmregistered = true;
                    storage.setItem('regid', lastmessage.payload );
                }else{
                    switch(lastmessage.payload.message) {
                        case 'Logged Out':
                            $scope.log = "Log In"; // Log in if not logged!
                            $scope.ocxlogged = false;
                            $scope.driver.errormessage = "";
                            $scope.driver.ocxdriverid="";
                            $scope.driver.ocxdriverpassword="";
                            break;
                        default:
                            $scope.myVar.loglist.push(lastmessage.message + " : " + lastmessage.payload.message );
                    }
                }
               }
             }
           );

    // init from STARTUP if already notifications received
    for (var index = 0; index < $window.buffermessage.length; ++index) {
                var lastmessage = $window.buffermessage[index].message;
                if (lastmessage.message==='registered'){
                    $scope.myVar.loglist.push(lastmessage.message  );
                    $scope.gcmregid = lastmessage.payload ;
                    //$scope.gcmregistered = true;
                    storage.setItem('regid', lastmessage.payload );
                }else{
                    switch(lastmessage.payload.message) {
                        case 'Logged Out':
                            $scope.log = "Log In"; // Log in if not logged!
                            $scope.ocxlogged = false;
                            $scope.driver.errormessage = "";
                            $scope.driver.ocxdriverid="";
                            $scope.driver.ocxdriverpassword="";
                            break;
                        default:
                            $scope.myVar.loglist.push(lastmessage.message + " : " + lastmessage.payload.message );
                    }
                }
    }

    
    // INIT STORAGE
    if (storage.getItem('regid')) {
        //on a un regid
        $scope.gcmregid = storage.getItem('regid');
        $scope.gcmregistered = true;

    }else{
        // on a PAS de regid
         $scope.gcmregid = "";
        $scope.gcmregistered = false;
    }





  });
