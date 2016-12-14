(function() {
	'use strict';
	angular.module('myApp.footer')
		.controller('termsOfUseModalController', ['$scope', 'modalFactory', termsOfUseModalHandler]);

		function termsOfUseModalHandler($scope, modalFactory) {
			var termsOfUseModalCtrl = this;
			termsOfUseModalCtrl.openModal = function() {
				modalFactory.TermsOfUseModalService();
			}
		}
}());