(function() {
	'use strict';
	angular.module('services.AuthenticationFactory', ['ui.router'])
		.factory('AuthenticationFactory', ['$http', '$q', '$state', AuthFactory]);

			function AuthFactory($http, $q, $state) {
				
				var services = {
					signOut: signOut,
					signUp: signUp,
					login: login,
					checkLoggedIn: checkLoggedIn
				};

				function signOut() {
					var deferred = $q.defer();
					$http.get('/signOut').then(
						function(success) {
							console.log('hello world from auth, success response in signout post: ', success);
							deferred.resolve();
						}, 
						function(failure) {
							console.log('hello world from auth, failure response in signout post: ', failure);
							deferred.reject();
						});
					return deferred.promise;
				}
				

				function signUp(postData) {
					var deferred = $q.defer();
					$http.post('/signUp', postData).then(
						function(user) {
							console.log('hello world from authjs', user);
							//return user;
							deferred.resolve(user);
						}, 
						function(failureResponse) {
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

				function checkLoggedIn() {
					var deferred = $q.defer();
					$http.get('/checkLoggedIn').then(	//	because the response from server is always 200, it will never fail, thus no catch or failure  block
						function(user) {
							if (user && user.data._id) {
								console.log('success response from server in checkLoggedIn function of authjs: ', user);
								deferred.resolve(user);
							} else {
								console.log('there is no user: ', user)
								deferred.reject();
							}
						});
					return deferred.promise;
				}

				return services;
			}
}());