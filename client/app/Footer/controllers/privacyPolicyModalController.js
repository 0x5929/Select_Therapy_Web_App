(function() {
	'use strict';
	angular.module('myApp.footer')
		.controller('privacyPolicyModalController', ['$scope', 'modalFactory', privacyPolicyModalHandler]);

		function privacyPolicyModalHandler($scope, modalFactory) {
			var privacyPolicyModalCtrl = this;
			privacyPolicyModalCtrl.openModal = function() {
				modalFactory.PrivacyPolicyModalService();
			};
		}
}());