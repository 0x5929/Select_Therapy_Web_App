(function() {
	'use strict';
	angular.module('services.AuthenticationFactory', ['ui.router'])
		.factory('AuthenticationFactory', ['$http', '$q', '$state', AuthFactory]);

			function AuthFactory($http, $q, $state) {
				
				var services = {
					checkLoggedin: checkLoggedin,
					signUp: signUp,
					login: login
				};

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
				}
				

				function signUp(postData) {
					var deferred = $q.defer();
					console.log(postData);
					$http.post('/signUp', postData).then(
						function(user) {
							console.log('hello world from authjs', user);
							//return user;
							deferred.resolve(user);
					}, function(failureResponse) {
							//need to clear the fields & adding message;
							console.log('hello world from authjs', failureResponse);
							deferred.reject(failureResponse);
					});
					return deferred.promise;
				}

				function login(postData) {
					var deferred = $q.defer();

					$http.post('/login', postData).then(
						function(user) {
							console.log('hello world from auth.login: ', user);
							deferred.resolve(user);
						},
						function(failureResponse) {
							console.log('hello world from auth.login: ', failureResponse);
							deferred.reject(failureResponse);
					});
					return deferred.promise;
				}

				return services;
			}
}());