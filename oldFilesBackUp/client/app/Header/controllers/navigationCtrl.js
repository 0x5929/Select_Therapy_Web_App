(function() {
	'use strict';
	angular.module('myApp.mainNav', [])
		.controller('mainNavControl', ['$scope', '$location', '$anchorScroll', mainNavCtrlHandler]);

		function mainNavCtrlHandler($scope, $location, $anchorScroll) {
			var mainNavCtrl = this;
			var flipTranslationElements = [
				'showHomeCh',
				'showClassScheduleCh',
				'showProgramsCh',
				'showAboutCh',
				'showContactUsCh'
			];
			mainNavCtrl.ensureEnglish = function() {
				flipTranslationElements.forEach(handler);
				function handler(element) {
					mainNavCtrl[element] = false;
				}
			};
			mainNavCtrl.scrollTo = function(locationID) {
				$location.hash(locationID);
				$anchorScroll.yOffset = 150;
				$anchorScroll();
			};
		}
}());