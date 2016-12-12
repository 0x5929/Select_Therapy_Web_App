(function() {
	'use strict';
	
	angular.module('myApp.ProgramsDropdown', ['services.looksIntegrationByUIB'])

		.controller('ProgramsDropdownControl', ['$scope', '$location', '$anchorScroll', DropdownCtrlHandler]);
	
	function DropdownCtrlHandler($scope, $location, $anchorScroll) {
		var ProgramsDropdownCtrl = this;
		var flipTranslationMenuElements = [
			'showNACh',
			'showHHAch',
			'showSGCh',
			'showCPRCh',
			'showESLCh',
			'showAcuCh'
		];
		ProgramsDropdownCtrl.flipTranslation = function(translationID) {
			flipTranslationMenuElements.forEach(handler);
			function handler(element) {
				if (element === translationID)
					ProgramsDropdownCtrl[element] = true;
				else
					ProgramsDropdownCtrl[element] =false;
			}
		};
		ProgramsDropdownCtrl.ensureEnglish = function() {
			flipTranslationMenuElements.forEach(handler);
			function handler(element) {
				ProgramsDropdownCtrl[element] = false;
			}
		};
		ProgramsDropdownCtrl.scrollTo = function(locationID) {
				$location.hash(locationID);
				$anchorScroll.yOffset = 150;
				//ProgramsDropdownCtrl.status.isOpen = !ProgramsDropdownCtrl.status.isOpen;
				$anchorScroll();
		};
		ProgramsDropdownCtrl.hideMenu = function() {
			var menu = angular.element(document.querySelector('.dropdown-menu'));
			menu.css('display', 'none');
		};
		ProgramsDropdownCtrl.showMenu = function() {
			var menu = angular.element(document.querySelector('.dropdown-menu'));
			menu.css('display', 'block');
		};
	}
}());