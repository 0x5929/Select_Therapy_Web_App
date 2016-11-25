(function() {
	'use strict';
	angular.module('myApp.mainNav', [])
		.controller('mainNavControl', ['$scope', '$location', '$anchorScroll', mainNavCtrlHandler]);

		function mainNavCtrlHandler($scope, $location, $anchorScroll) {
			var mainNavCtrl = this,
				hasProgramBtnClicked;
			mainNavCtrl.scrollTo = function(locationID) {
				$location.hash(locationID);
				$anchorScroll.yOffset = 150;
				$anchorScroll();
			};
			/*
			mainNavCtrl.programBtnClicked = function() {
				mainNavCtrl.showProgramsCh = false;
				hasProgramBtnClicked = true;
			};
			mainNavCtrl.showProgramsChCheck = function() {
				if (mainNavCtrl.hasProgramBtnClicked){
					mainNavCtrl.showProgramsCh = false;
					mainNavCtrl.hasProgramBtnClicked = false;
				}
				else
					mainNavCtrl.showProgramsCh = true;
			};
			*/
		}
}());