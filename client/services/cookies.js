(function() {
	'use strict';
	angular.module('services.cookies', ['ngCookies'])
		.factory('cookieFactory', ['$cookies', cookieFactoryHanlder]);

		function cookieFactoryHanlder($cookies) {
			var services = { 
					getCookies: getCookies 
			};
			
			function getCookies(key) {
				return $cookies.get(key);
			}

			return services;

		}
}());