(function() {
	'use strict';
	angular.module('services.cookies', ['ngCookies'])
		.factory('cookieFactory', ['$cookies', cookieFactoryHanlder]);

		function cookieFactoryHanlder($cookies) {
			var services = { 
					getCookies: getCookies,
					removeCookies: removeCookies
			};
			
			function getCookies(key) {
				return $cookies.get(key);
			}

			function removeCookies(key) {
				return $cookies.remove(key);
			}

			return services;

		}
}());