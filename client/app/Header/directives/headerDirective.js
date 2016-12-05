(function() {
	'use strict';
	angular.module('myApp')
		.directive('myHeader', myHeaderHandler);

		function myHeaderHandler() {
			//initializing the directive
			var directive = {};
			//setting the directive settings
			directive.templateUrl = "/app/Header/view/english/header/header.html";	//might need to switch to base relative url
			//returning the directive
			return directive;
		}
}());