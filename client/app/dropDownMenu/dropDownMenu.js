(function(){
	"use strict"
		app.module("myApp").
	controller('DropdownCtrl', ['$scope', DropdownCtrl]);
	
	function DropdownCtrl($scope) {
		$scope.status = {
			isopen: false
		}
	}



}());