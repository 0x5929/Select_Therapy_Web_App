(function() {
	'use strict';
	angular.module('services.cookies', ['ngCookies'])
		.factory('cookieService', ['$scope', '$cookies', cookieService]);

		function cookieService($scope, $cookies) {
			
		}
}());