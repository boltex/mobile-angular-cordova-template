/*global $:false */
/*jshint unused:false*/
'use strict';
 
var CordovaInit = function() {
 
	var onDeviceReady = function() {
		receivedEvent('deviceready');
	};
 
	var receivedEvent = function(event) {
		console.log('Start event received, bootstrapping application setup.');
		//angular.bootstrap($('body'), ['gencorApp']);
		angular.bootstrap(document, ['gencorApp']);
	};
 
	this.bindEvents = function() {
		document.addEventListener('deviceready', onDeviceReady, false);
	};
 
	//If cordova is present, wait for it to initialize, otherwise just try to
	//bootstrap the application.
	if (window.cordova !== undefined) {
		console.log('Cordova found, wating for device.');
		this.bindEvents();
	} else {
		console.log('Cordova not found, booting application');
		receivedEvent('manual');
	}
};
 
angular.element(document).ready(function() {
	console.log('Bootstrapping!');
	new CordovaInit();
});