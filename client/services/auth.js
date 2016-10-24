(function() {
	'use strict';
	angular.module('services.AuthenticationFactory', ['ui.router']).factory('AuthenticationFactory', ['$http', '$q', '$state', AuthFactory]);
	function AuthFactory($http, $q, $state) {
		function checkLoggedin() {
			var deferred = $q.defer();
			$http.get('/loggedIn').then(function(user) {
				if (user !== '0'){
					deferred.resolve('welcome');
				}
				else{
					deferred.reject();
					$state.go('english.Home');
	
				}
			}, function(failureResponse) {
				console.log(failureResponse);
			});

			return deferred.promise;
		};
		function resolvedCheckLoggedIn() {
			return checkLoggedin().then(function() {return true}, function() {return false});
		}

		return {
			checkLoggedin: checkLoggedin,
			resolvedCheckLoggedIn: resolvedCheckLoggedIn
		};	
	}
}());