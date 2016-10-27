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
					signInModalInstanceCtrl.cancel = $scope.$dismiss;

					signInModalInstanceCtrl.ok = function(email, password) {
						var postData = {
							email: email,
							password: password
						};
						AuthenticationFactory.login(postData).then(function(user){
							$scope.$close(user);	//user is passed to the result promise of the modal for assignCurrentUser function 
							toastFactory.successLogin();
						});
					}
				}

				//controller function for signUpModalInstanceController
				function signUpModalInstanceController($scope, $state, AuthenticationFactory, toastFactory) {
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
									//var deferred = $q.deferred();
									//$state.go('english.school');	//because $scope.$close goes to a promise that does another function
									//and if that promise is finished later, and we go to state english school, it will not be authorized
									//temporay solution is to not go to english.school, and just close the modal promise with belows code
									//need to think of a way to run asyncly to wait until modal is finished closing and then go to state en school
									$scope.$close(user);
									toastFactory.successRegistration();
								},  
								function(failureResponse) {
									//clearing the fields & adding message;	//	adding message could be done with angular flash
									signUpModalInstanceCtrl.message = 'Failed signUp';
									signUpModalInstanceCtrl.email = '';
									signUpModalInstanceCtrl.password = '';
									signUpModalInstanceCtrl.confirmPassword = '';
									console.log('hello world from signUpModalInstanceCtrl Error Bitch : ', failureResponse);
									console.log('consolelog @ signUpModalInstanceCtrl', failureResponse);
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