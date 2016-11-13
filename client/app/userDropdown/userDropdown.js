(function() {
	'use strict';
	
	angular.module('myApp.userDropdown', ['services.looksIntegrationByUIB', 'services.AuthenticationFactory', 'services.modalService', 'services.toastFactory', 'services.cookies', 'ui.router'])
		.controller('userDropdownControl', ['$scope', dropdownCtrl])
		.controller('signInModalControl', ['$scope', 'modalService', signInModalControl])
		.controller('signUpModalControl', ['$scope', 'modalService', signUpModalControl])
		.controller('signInModalInstanceController', ['$scope', 'AuthenticationFactory', 'toastFactory', 'cookieFactory', signInModalInstanceController])
		.controller('signUpModalInstanceController', ['$scope', 'AuthenticationFactory', 'toastFactory', signUpModalInstanceController])
		.controller('signOutControl', ['$rootScope', '$state', 'toastFactory', 'AuthenticationFactory', signOutController]);

				//empty controller, needed for dropdown action
				function dropdownCtrl($scope) {
				}

				//function for signInModalControl
				function signInModalControl($scope, modalService) {
					var signInModalCtrl = this;
					signInModalCtrl.openModal = function() {
						modalService.loginModalService();
					};		
				}

				//function for signUpModalControl
				function signUpModalControl($scope, modalService) {
					var signUpModalCtrl = this;
					signUpModalCtrl.openModal = function() {
						modalService.signUpModalService();
					};
				}

				//controller function for signInModalInstanceController
				function signInModalInstanceController($scope, AuthenticationFactory, toastFactory, cookieFactory) {
					var signInModalInstanceCtrl = this;
					signInModalInstanceCtrl.showErrorMessage = false;
					signInModalInstanceCtrl.cancel = $scope.$dismiss;

					if (cookieFactory.getCookies('rememberMeCookie'))
						var cookie = JSON.parse(cookieFactory.getCookies('rememberMeCookie').replace('j:', ''));
						if (cookie) {
						signInModalInstanceCtrl.email = cookie.email;
						signInModalInstanceCtrl.password = cookie.pw;
						signInModalInstanceCtrl.remember = true;
						}	

					signInModalInstanceCtrl.refreshUponFailure = function(message) {
						signInModalInstanceCtrl.email = '';
						signInModalInstanceCtrl.password = '';
						signInModalInstanceCtrl.showErrorMessage = true;
						signInModalInstanceCtrl.message = message;
					};
					signInModalInstanceCtrl.ok = function(email, password, remember) {
						var postData = {
							email: email,
							password: password,
							remember: remember
						};
						AuthenticationFactory.login(postData).then(function(user){
							$scope.$close(user);	//user is passed to the result promise of the modal for assignCurrentUser function 
							toastFactory.successLogin();
							console.log('THIS IS DOCUMENT COOKIE: ', document.cookie);
						}, function(failureResponse) {
							var message = failureResponse.data;
							signInModalInstanceCtrl.refreshUponFailure(message);
						});
					}
				}

				//controller function for signUpModalInstanceController
				function signUpModalInstanceController($scope, AuthenticationFactory, toastFactory) {
					var signUpModalInstanceCtrl = this;
					signUpModalInstanceCtrl.showErrorMessage = false;
					signUpModalInstanceCtrl.cancel = $scope.$dismiss;
					signUpModalInstanceCtrl.refreshUponFailure = function(message) {	//clears the field and shows failure message
						signUpModalInstanceCtrl.email = '';
						signUpModalInstanceCtrl.password = '';
						signUpModalInstanceCtrl.confirmPassword = '';
						signUpModalInstanceCtrl.pin ='';
						signUpModalInstanceCtrl.showErrorMessage = true;
						signUpModalInstanceCtrl.messages = message;	//	this is going to be an array
					};
					signUpModalInstanceCtrl.ok = function() {
						var postData = {
							email: signUpModalInstanceCtrl.email,
							password: signUpModalInstanceCtrl.password,
							confirmPassword: signUpModalInstanceCtrl.confirmPassword,
							signUpAs: signUpModalInstanceCtrl.signUpAs,
							pin: signUpModalInstanceCtrl.pin
						};
						AuthenticationFactory.signUp(postData).then(
								function(user) {
									$scope.$close(user);
									console.log('AND THIS IS THE COOKIE AFTER SIGN UP: ', document.cookie);
									toastFactory.successRegistration();
								},  
								function(failureResponse) {
									var messages = [];
									if (typeof failureResponse.data === 'string'){
										messages.push(failureResponse.data);
										signUpModalInstanceCtrl.refreshUponFailure(messages);
										;
									}else {
										messages = failureResponse.data;
										signUpModalInstanceCtrl.refreshUponFailure(messages);
									}		
						});
					};			
				}

				//controller function for signOutControl
				function signOutController($rootScope, $state, toastFactory, AuthenticationFactory) {
					var signOutCtrl = this;
					signOutCtrl.signOut = function() {
						//toast
						toastFactory.signOut();
						//authPost to server
						AuthenticationFactory.signOut().then(
							function(success) {
								console.log('hello world');
								$rootScope.currentUser = undefined;
								$state.go('english.Home');
							}, 
							function(failure) {
								//really this should never fail
								console.log('something terrible has happend signoutcntrl in userdropdownjs: ', failure);
							});
					};
				}

}());