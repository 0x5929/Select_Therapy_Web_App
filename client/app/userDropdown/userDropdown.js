(function() {
	'use strict';
	
	angular.module('myApp.userDropdown', ['services.looksIntegrationByUIB', 'services.AuthenticationFactory', 'services.modalService', 'services.toastFactory', 'ui.router'])
		.controller('userDropdownControl', ['$scope', dropdownCtrl])
		.controller('signInModalControl', ['$scope', 'modalService', signInModalControl])
		.controller('signUpModalControl', ['$scope', 'modalService', signUpModalControl])
		.controller('signInModalInstanceController', ['$scope', '$state', 'AuthenticationFactory', 'toastFactory', signInModalInstanceController])
		.controller('signUpModalInstanceController', ['$scope', '$state', 'AuthenticationFactory', 'toastFactory', signUpModalInstanceController]);

				//empty controller, needed for dropdown action
				function dropdownCtrl($scope) {
				}

				//controller function for signInModalInstanceController
				function signInModalInstanceController($scope, $state, AuthenticationFactory, toastFactory) {
					var signInModalInstanceCtrl = this;
					signInModalInstanceCtrl.showErrorMessage = false;
					signInModalInstanceCtrl.cancel = $scope.$dismiss;
					signInModalInstanceCtrl.refreshUponFailure = function(message) {
						signInModalInstanceCtrl.email = '';
						signInModalInstanceCtrl.password = '';
						signInModalInstanceCtrl.showErrorMessage = true;
						signInModalInstanceCtrl.message = message;
					};
					signInModalInstanceCtrl.ok = function(email, password) {
						var postData = {
							email: email,
							password: password
						};
						AuthenticationFactory.login(postData).then(function(user){
							$scope.$close(user);	//user is passed to the result promise of the modal for assignCurrentUser function 
							toastFactory.successLogin();
						}, function(failureResponse) {
							var message = failureResponse.data;
							signInModalInstanceCtrl.refreshUponFailure(message);
						});
					}
				}

				//controller function for signUpModalInstanceController
				function signUpModalInstanceController($scope, $state, AuthenticationFactory, toastFactory) {
					var signUpModalInstanceCtrl = this;
					signUpModalInstanceCtrl.showErrorMessage = false;
					signUpModalInstanceCtrl.cancel = $scope.$dismiss;
					signUpModalInstanceCtrl.refreshUponFailure = function(message) {	//clears the field and shows failure message
						signUpModalInstanceCtrl.email = '';
						signUpModalInstanceCtrl.password = '';
						signUpModalInstanceCtrl.confirmPassword = '';
						signUpModalInstanceCtrl.showErrorMessage = true;
						signUpModalInstanceCtrl.message = message;
					};
					signUpModalInstanceCtrl.ok = function() {
						var postData = {
							email: signUpModalInstanceCtrl.email,
							password: signUpModalInstanceCtrl.password,
							confirmPassword: signUpModalInstanceCtrl.confirmPassword
						};
						AuthenticationFactory.signUp(postData).then(
								function(user) {
									$scope.$close(user);
									toastFactory.successRegistration();
								},  
								function(failureResponse) {
									var message = failureResponse.data;
									signUpModalInstanceCtrl.refreshUponFailure(message);			
						});
					};			
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

}());