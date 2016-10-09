(function() {
	'use strict';
	
	angular.module('myApp.userDropdown', [])

		.controller('userDropdownCtrl', ['$scope', dropdownCtrl]);
	
	function dropdownCtrl($scope) {
		//empty controller, needed for dropDown action
	}
}());