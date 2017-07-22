(function() {
	'use strict';
	angular.module('myApp.userFunctionalities')
		.controller('signUpModalInstanceController', ['$scope', 'AuthenticationFactory', 'toastFactory', signUpModalInstanceControllerHandler]);

		function signUpModalInstanceControllerHandler($scope, AuthenticationFactory, toastFactory) {
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
						toastFactory.successRegistration();
					},  
					function(failureResponse) {
						var messages = [];
						if (typeof failureResponse.data === 'string'){
							messages.push(failureResponse.data);
							signUpModalInstanceCtrl.refreshUponFailure(messages);
						}else {
							messages = failureResponse.data;
							signUpModalInstanceCtrl.refreshUponFailure(messages);
						}		
					}
				);
			};			
		}
}());