(function() {
	'use strict';
	
	angular.module('myApp.userDropdown', ['services.looksIntegrationByUIB', 'services.AuthenticationFactory', 'services.modalService', 'ui.router'])
		.controller('userDropdownControl', ['$scope', dropdownCtrl])
		.controller('signInModalControl', ['$scope', 'modalService', signInModalControl])
		.controller('signUpModalControl', ['$scope', 'modalService', signUpModalControl])
		.controller('signInModalInstanceController', ['$scope', '$state', 'AuthenticationFactory', signInModalInstanceController])
		.controller('signUpModalInstanceController', ['$scope', '$state', 'AuthenticationFactory', signUpModalInstanceController]);

				//empty controller, needed for dropdown action
				function dropdownCtrl($scope) {
				}

				//controller function for signInModalInstanceController
				function signInModalInstanceController($scope, $state, AuthenticationFactory) {
					var signInModalInstanceCtrl = this;
					signInModalInstanceCtrl.cancel = $scope.$dismiss;

					signInModalInstanceCtrl.submit = function(email, password) {
						AuthenticationFactory.login(email, password).then(function(user){
							$scope.$close(user);	//user is passed to the result promise of the modal for assignCurrentUser function 
						});
					}
				}

				//controller function for signUpModalInstanceController
				function signUpModalInstanceController($scope, $state, AuthenticationFactory) {
					var signUpModalInstanceCtrl = this;
					signUpModalInstanceCtrl.cancel = $scope.$dismiss;
					signUpModalInstanceCtrl.ok = function() {
						var postData = {
							email: signUpModalInstanceCtrl.email,
							password: signUpModalInstanceCtrl.password,
							confirmPassword: signUpModalInstanceCtrl.confirmPassword
						};
						console.log('consolelog @ signUpModalInstanceCtrl', postData);
						AuthenticationFactory.signUp(postData).then(
								function(user) {
									$state.go('english.school');
									$scope.$close(user);
								},  
								function(failureResponse) {
									console.log('hello world from signUpModalInstanceCtrl Error Bitch : ', failureResponse);
									console.log('consolelog @ signUpModalInstanceCtrl', failureResponse);
						});
					};
					/*
					signUpModalInstanceCtrl.ok = function () {
						var postData = {
							email: signUpModalInstanceCtrl.email,
							password: signUpModalInstanceCtrl.password,
							confirmPassword: signUpModalInstanceCtrl.confirmPassword
						};
						$http.post('/signUp', postData).then(function(successResponse) {
							$state.go('english.school');
							$uibModalInstance.close('logged in');
						}, function(failureResponse) {
							//clearing the fields & adding message;
							signUpModalInstanceCtrl.message = 'Failed signUp';
							signUpModalInstanceCtrl.email = '';
							signUpModalInstanceCtrl.password = '';
							signUpModalInstanceCtrl.confirmPassword = '';
						});
					};
	*/
					
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