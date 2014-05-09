'use strict';

var app = angular.module('gencorApp', [
    'ngRoute',
    'mobile-angular-ui',
    'mobile-angular-ui.touch',
    'mobile-angular-ui.scrollable'
  ]);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
        //controller: 'MainCtrl'
      })
      .when('/page2', {
        templateUrl: 'views/page2.html'
        //controller: 'Page2Ctrl'
      })
      .when('/dtbs', {
        templateUrl: 'views/dtbs.html'
        //controller: 'DtbsCtrl'
      })
      .when('/scroll', {
        templateUrl: 'views/scroll.html'
        //controller: 'ScrollCtrl'
      })
      .when('/form', {
        templateUrl: 'views/form.html'
        //controller: 'FormCtrl'
      })
      .when('/swipe', {
        templateUrl: 'views/swipe.html'
        //controller: 'SwipeCtrl'
      })
      .when('/tabs', {
        templateUrl: 'views/tabs.html'
        //controller: 'TabsCtrl'
      })
      .when('/accord', {
        templateUrl: 'views/accord.html'
        //controller: 'AccordCtrl'
      })

      .when('/accord', {
        templateUrl: 'views/accord.html'
        //controller: 'AccordCtrl'
      })
      .when('/log', {
        templateUrl: 'views/log.html'
        //controller: 'AccordCtrl'
      })
      .when('/todo', {
        templateUrl: 'views/todo.html'
        //controller: 'AccordCtrl'
      })
      .when('/done', {
        templateUrl: 'views/done.html'
        //controller: 'AccordCtrl'
      })
      .when('/options', {
        templateUrl: 'views/options.html'
        //controller: 'AccordCtrl'
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

  });


app.directive( "carouselExampleItem", function($rootScope, $swipe){
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
