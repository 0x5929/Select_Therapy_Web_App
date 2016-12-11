(function() {
	'use strict';
	angular.module('myApp.userFunctionalities')
		.controller('signInModalControl', ['$scope', 'modalFactory', signInModalControlHandler]);

		function signInModalControlHandler($scope, modalFactory) {
			var signInModalCtrl = this;
			signInModalCtrl.openModal = function() {
				modalFactory.loginModalService();
			};		
		}
}());