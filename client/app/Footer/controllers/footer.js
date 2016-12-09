(function() {
	'use strict';
	angular.module('myApp.footer', [])
		.controller('footerController', ['$scope', myfooterCtrlHandler]);

		function myfooterCtrlHandler($scope) {
			var footerctrl = this;
			footerctrl.submit = function() {
				footerctrl.promoEmailInput = '';
				
			};
		}
}());