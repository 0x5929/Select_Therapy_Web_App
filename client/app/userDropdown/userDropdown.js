(function() {
	'use strict';
	
	angular.module('myApp.userDropdown', ['services.looksIntegrationByUIB', 'services.AuthenticationFactory', 'ui.router'])
		.factory('modalService', ['$rootScope', '$uibModal', modalService])
		.controller('userDropdownControl', ['$scope', dropdownCtrl])
		.controller('signInModalControl', ['$scope', 'modalService', signInModalControl])
		.controller('signUpModalControl', ['$scope', 'modalService', signUpModalControl])
		.controller('signInModalInstanceController', ['$scope', '$state', 'AuthenticationFactory', signInModalInstanceController])
		.controller('signUpModalInstanceController', ['$scope', '$state', 'AuthenticationFactory', signUpModalInstanceController]);
				//ModalService function
				function modalService($rootScope, $uibModal) {

					function assignCurrentUser(user) {
						$rootScope.currentUser = user;
						return user;
					}

					function loginModalService () {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/userDropdown/view/english/signIn/signInModal.html', 
					      controller: 	'signInModalInstanceController',
					      controllerAs: 'signInModalInstanceCtrl',
					      size: 'lg'
						});

						return modalInstance.result.then(assignCurrentUser);
					}

					function signUpModalService () {
						var modalInstance = $uibModal.open({
						  animation: true,
					      ariaLabelledBy: 'modal-title',
					      ariaDescribedBy: 'modal-body',
					      templateUrl: 'app/userDropdown/view/english/signUp/signUpModal.html', 
					      controller: 	'signUpModalInstanceController',
					      controllerAs: 'signUpModalInstanceCtrl',
					      size: 'lg'
						});

						return modalInstance.result.then(assignCurrentUser);
					}

					return {
						loginModalService: loginModalService,
						signUpModalService: signUpModalService
					};
				}

				//empty controller, needed for dropdown action
				function dropdownCtrl($scope) {
				}

				//controller function for signInModalInstanceController
				function signInModalInstanceController($scope, $state, AuthenticationFactory) {
					var signInModalInstanceCtrl = this;
					signInModalInstanceCtrl.cancel = $scope.$dismiss;

					signInModalInstanceCtrl.submit = function(email, password) {
						AuthenticationFactory.login(email, password).then(function(user){
							$scope.$close(user);
						});
					}
				}

				//controller function for signUpModalInstanceController
				function signUpModalInstanceController($scope, $state, AuthenticationFactory) {
					var signUpModalInstanceCtrl = this;

					signUpModalInstanceCtrl.cancel = $scope.$dismiss;
					signUpModalInstanceCtrl.ok = function(postData) {
						AuthenticationFactory.signUp(postData).then(function(user) {
							$scope.$close(user);
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