'use strict';

angular.module('gencorApp', [
    'ngRoute',
    'mobile-angular-ui',
    'mobile-angular-ui.touch',
    'mobile-angular-ui.scrollable'
  ]).run(function($rootScope) {
   
    $rootScope.$on("$routeChangeStart", function(){
      $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function(){
      $rootScope.loading = false;
    });

  })
  .config(function ($routeProvider) {
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
  })
  .factory("myService", function(){

    return {
      sharedObject: {
                      data : 'Joe',
                      data2 : 'amy'
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
});  

