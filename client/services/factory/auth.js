(function() {
	'use strict';
	angular.module('services.AuthenticationFactory', ['ui.router', 'services.cookies', 'services.ajaxService'])
		.factory('AuthenticationFactory', ['$q', '$state', 'cookieService', 'ajaxService', AuthFactoryHandler]);

			function AuthFactoryHandler($q, $state, cookieService, ajaxService) {
				
				var services = {
					signOut: signOut,
					signUp: signUp,
					login: login,
					checkLoggedIn: checkLoggedIn,
					csrfProtection: csrfProtection
				};

				function signOut() {
					var deferred = $q.defer();

					ajaxService.get('/signOut').then(
						function(successResponse) {
							deferred.resolve();	
						}, 
						function(failureResponse) {
							deferred.reject();
						});
					return deferred.promise;
				}
				

				function signUp(postData) {
					var deferred = $q.defer();

					ajaxService.post('/signUp', postData).then(
						function(user) {
							deferred.resolve(user);
						}, 
						function(failureResponse) {
							deferred.reject(failureResponse);
						});
					return deferred.promise;
				}

				function login(postData) {
					var deferred = $q.defer();

					if (!postData.remember)	//	check for setting if cookie is needed
						cookieService.removeCookies('rememberMeCookie');
					
					ajaxService.post('/login', postData).then(
						function(user) {
							deferred.resolve(user);
						}, 
						function(failureResponse) {
							deferred.reject(failureResponse);
						});
					return deferred.promise;
				}

				function checkLoggedIn() {
					var deferred = $q.defer();

					ajaxService.get('/checkLoggedIn').then(
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

				function csrfProtection() {
					var deferred = $q.defer();

					ajaxService.get('/csrfToken').then(
						function(success) {
							deferred.resolve(success);
						}, 
						function(failureResponse) {
							deferred.reject(failureResponse);
						});
					return deferred.promise;
				}

				return services;
			}
}());