(function() {
	'use strict';
	angular.module('services.AuthenticationFactory', ['ui.router', 'services.cookies'])
		.factory('AuthenticationFactory', ['$http', '$q', '$state', 'cookieFactory', AuthFactoryHandler]);

			function AuthFactoryHandler($http, $q, $state, cookieFactory) {
				
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
							deferred.resolve();
						}, 
						function(failure) {
							deferred.reject();
						});
					return deferred.promise;
				}
				

				function signUp(postData) {
					var deferred = $q.defer();

					$http.post('/signUp', postData).then(
						function(user) {
								deferred.resolve(user);
						}, 
						function(failureResponse) {	//need to clear the fields & adding message;
							deferred.reject(failureResponse)
						});
					return deferred.promise;
				}

				function login(postData) {
					var deferred = $q.defer();

					if (!postData.remember)	//	check for setting if cookie is needed
						cookieFactory.removeCookies('rememberMeCookie');
					$http.post('/login', postData).then(
						function(user) {
							deferred.resolve(user);
						}, 
						function(badResposne) {
							deferred.reject(badResposne);
					});
					return deferred.promise;
				}

				function checkLoggedIn() {
					var deferred = $q.defer();

					$http.get('/checkLoggedIn').then(	
						function(user) {
							if (user && user.data._id) {
								deferred.resolve(user);
							}
						}, 
						function(failureResponse) {
							deferred.reject(failureResponse);
						});

					return deferred.promise;
				}

				return services;
			}
}());