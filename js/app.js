'use strict';

angular
  .module('gencorApp', [
    'ngRoute',
    'mobile-angular-ui',
    'mobile-angular-ui.touch',
    'mobile-angular-ui.scrollable'
  ])
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

  });

