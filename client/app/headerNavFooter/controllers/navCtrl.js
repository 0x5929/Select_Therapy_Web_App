(function() {
	'use strict';
	angular.module('myApp.mainNav', [])
		.controller('mainNavControl', ['$scope', '$location', '$anchorScroll', mainNavCtrlHandler]);

		function mainNavCtrlHandler($scope, $location, $anchorScroll) {
			var mainNavCtrl = this;
			mainNavCtrl.scrollTo = function(locationID) {
				$location.hash(locationID);
				$anchorScroll.yOffset = 150;
				$anchorScroll();
			};
		}
}());