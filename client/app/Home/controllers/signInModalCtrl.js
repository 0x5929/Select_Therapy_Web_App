(function() {
	'use strict';
	angular.module('myApp.userFunctionalities')
		.controller('signInModalControl', ['$scope', 'modalFactory', signInModalControlHandler]);

		function signInModalControlHandler($scope, modalFactory) {
			var signInModalCtrl = this;
			signInModalCtrl.openModal = function() {
				modalFactory.signInModalService().then(function(successResponse) {
					console.log('HELLO FROM SIGN IN MODAL CTRL, INDICATING THE TEST WORKED, ALSO successResponse SHOULD BE USER, B/C THE PROMISE IN FACTORY RETURNs the user after success promise', successResponse);
				});
			};		
		}
}());