(function() {
	'use strict';
	angular.module('myApp.footer')
		.controller('termsOfUseModalInstanceController', ['$scope', '$uibModalInstance', termsOfUseModalInstanceHandler]);

		function termsOfUseModalInstanceHandler($scope, $uibModalInstance) {
			var termsOfUseModalInstanceCtrl = this;
			termsOfUseModalInstanceCtrl.ok = function() {
				$uibModalInstance.close();
			};
			termsOfUseModalInstanceCtrl.cancel = function() {
				$uibModalInstance.dismiss();
			};
		}
}());