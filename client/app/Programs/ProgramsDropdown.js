(function() {
	'use strict';
	
	angular.module('myApp.ProgramsDropdown', ['services.looksIntegrationByUIB'])

		.controller('ProgramsDropdownControl', ['$scope', DropdownCtrlHandler]);
	
	function DropdownCtrlHandler($scope) {
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
		
	}
}());