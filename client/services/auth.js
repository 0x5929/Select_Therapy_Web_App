(function() {
	'use strict';
	angular.module('services.AuthenticationFactory', ['ui.router'])
		.factory('AuthenticationFactory', AuthFactory);
	function AuthFactory($http, $q, $state) {
		function checkLoggedin() {
			var deferred = $q.defer();
			$http.get('/loggedIn').then(function(user) {
				if (user !== '0')
					deferred.resolve();
				else{
					deferred.reject();
					$state.go('english.home');

				}
			}, function(failureResponse) {

			});

			return deferred.promise;
		}

		return {
			checkLoggedin: checkLoggedin
		};	
	}
}());