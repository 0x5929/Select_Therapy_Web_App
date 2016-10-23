(function() {
	'use strict';
	angular.module('services.AuthenticationFactory', ['ui.router']).factory('AuthenticationFactory', ['$http', '$q', '$state', AuthFactory]);
	function AuthFactory($http, $q, $state) {
		var checkLoggedin = function () {
			var deferred = $q.defer();
			$http.get('/loggedIn').then(function(user) {
				if (user !== '0')
					deferred.resolve('bad login');
				else{
					deferred.reject();
					$state.go('english.home');

				}
			}, function(failureResponse) {
				console.log(failureResponse);
			});

			return deferred.promise;
		};

		return {
			checkLoggedin: checkLoggedin
		};	
	}
}());