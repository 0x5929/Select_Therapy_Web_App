(function() {
	'use strict';
	angular.module('myApp.userFunctionalities')
		.controller('signUpModalControl', ['$scope', 'modalFactory', signUpModalControlHandler]);

		function signUpModalControlHandler($scope, modalFactory) {
			var signUpModalCtrl = this;
			signUpModalCtrl.openModal = function() {
				modalFactory.signUpModalService();
			};
		}
}());