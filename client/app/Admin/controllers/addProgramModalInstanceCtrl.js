(function() {

	'use strict';

	angular.module('myApp.admin')
		.controller('addProgramModalInstanceController', ['$scope', addProgramModalInstanceControllerHandler]);

		function addProgramModalInstanceControllerHandler($scope) {
			//something with a promise
			var addProgramModalInstanceCtrl = this;

			addProgramModalInstanceCtrl.cancel = $scope.$dismiss;
		}

}())