'use strict';

angular.module('gencorApp')
  .controller('MainCtrl', function ($scope, myService) {

    $scope.isconnected = true;

  	$scope.myVar = myService.sharedObject;


  });
