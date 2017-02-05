(function() {
	'use strict';
	angular.module('services.ajaxService', [])
		.service('ajaxService', ['$http', '$q', ajaxServiceHandler]);

		function ajaxServiceHandler($http, $q) {

			this.get = function(route, optObj) {
				var deferred = $q.defer();
				if (optObj){
					$http.get(route, optObj)
						.then(function(success) {
							deferred.resolve(success);
						}, 
						function(failure) {
							deferred.reject(failure);
						});
				}else{
					$http.get(route)
						.then(function(success) {
							deferred.resolve(success);
						}, 
						function(failure) {
							deferred.reject(failure);
						});
				}
				return deferred.promise;
			};
			
			this.post = function(route, data) {
				var deferred = $q.defer();
				
				$http.post(route, data)
					.then(function(success) {
						deferred.resolve(success);
					}, 
					function(failure) {	
						deferred.reject(failure);
					});
				return deferred.promise;
			};

			this.put = function(route, data) {
				var deferred = $q.defer();

				$http.put(route, data)
					.then(function(success) {
						deferred.resolve(success);
					}, 
					function(failure) {
						deferred.resolve(failure);
					});
				return deferred.promise;
			};
		}
}());