(function() {
	'use strict';
	angular.module('services.ajaxService', [])
		.service('ajaxService', ['$http', '$q', ajaxServiceHandler]);

		function ajaxServiceHandler($http, $q) {
			this.get = function(route) {
				var deferred = $q.defer();

				$http.get(route).then(
					function(success) {
						deferred.resolve(success);
					}, 
					function(failure) {
						deferred.reject(failure);
					});
				return deferred.promise;
			};
			this.post = function(route, data) {
				var deferred = $q.defer();
				
				$http.post(route, data).then(
					function(success) {
						deferred.resolve(success);
					}, 
					function(failure) {	
						deferred.reject(failure);
					});
				return deferred.promise;
			};
		}
}());