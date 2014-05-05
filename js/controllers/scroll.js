'use strict';

angular.module('gencorApp')
  .controller('ScrollCtrl', function ($scope) {
    
  var scrollItems = [];
  for (var i=1; i<=100; i++) {
  scrollItems.push("Dummy" + i);
  }
  $scope.scrollItems = scrollItems;

  });