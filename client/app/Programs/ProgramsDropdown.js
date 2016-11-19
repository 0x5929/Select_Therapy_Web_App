(function() {
	'use strict';
	
	angular.module('myApp.ProgramsDropdown', ['services.looksIntegrationByUIB'])

		.controller('ProgramsDropdownControl', ['$scope', DropdownCtrl]);
	
	function DropdownCtrl($scope) {
		//empty controller, but needed for the dropdown action
		//ProgramsDropdownCtrl.option = false;
	}
}());