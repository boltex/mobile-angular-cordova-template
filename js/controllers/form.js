'use strict';

angular.module('gencorApp')
  .controller('FormCtrl', function ($scope) {

  	$scope.message = "Form page ready";
  	
	$scope.invoice = {paid: true};

  });