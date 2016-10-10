(function() {
	'use strict';
	
	angular.module('myApp.ProgramsDropdown', ['services.looksIntegrationByUIB'])

		.controller('ProgramsDropdownCtrl', ['$scope', DropdownCtrl]);
	
	function DropdownCtrl($scope) {
		//empty controller, but needed for the dropdown action
	}
}());