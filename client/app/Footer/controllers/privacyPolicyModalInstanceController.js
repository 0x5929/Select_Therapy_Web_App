(function() {
	'use strict';
	angular.module('myApp.footer')
		.controller('privacyPolicyModalInstanceController', ['$scope', '$uibModalInstance', privacyPolicyModalInstanceHandler]);
		function privacyPolicyModalInstanceHandler($scope, $uibModalInstance) {
			var privacyPolicyModalInstanceCtrl = this;
			privacyPolicyModalInstanceCtrl.ok = function() {
				$uibModalInstance.close();
			};
			privacyPolicyModalInstanceCtrl.cancel = function() {
				$uibModalInstance.dismiss();
			};
		}
}());