(function() {
	'use strict';

	//NOTE: THIS CONTORLLER IS ACTUALLY NOT NECESSARY, 
	//IT CAN ACTUALLY SHARE THE SAME CONTROLLER SCOPE WITH ITS PARENT CONTROLLER SCOPE, 
	//JUST USE THAT SCOPE TO PASS IN DATA, THIS WAY IS MORE COMPLICATED, 
	//BUT ONCE HOOKED UP CORRECTLY, IT WILL FUCNTION PROPERLY
	angular.module('myApp.userFunctionalities')
		.controller('signInModalInstanceController', ['$scope', '$state', 'AuthenticationFactory', 'toastFactory', 'cookieService', signInModalInstanceControllerHandler]);

		function signInModalInstanceControllerHandler($scope, $state, AuthenticationFactory, toastFactory, cookieService) {
			var signInModalInstanceCtrl = this;
			signInModalInstanceCtrl.showErrorMessage = false;
			signInModalInstanceCtrl.cancel = $scope.$dismiss;

			if (cookieService.getCookies('rememberMeCookie')) {
				var cookie = JSON.parse(cookieService.getCookies('rememberMeCookie').replace('j:', ''));
				if (cookie) {
					signInModalInstanceCtrl.email = cookie.email;
					signInModalInstanceCtrl.password = cookie.pw;
					signInModalInstanceCtrl.remember = true;
				}	
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
					//go to state admin
					$state.go('Admin');
					toastFactory.successLogin();
				}, function(failureResponse) {
					var message = failureResponse.data;
					signInModalInstanceCtrl.refreshUponFailure(message);
				});
			}	
		}
}());