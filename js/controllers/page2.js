'use strict';

angular.module('gencorApp')
  .controller('Page2Ctrl', function ($scope, myService) {

 	$scope.standardVar = "some value";

  	$scope.myVar = myService.sharedObject;


  });
