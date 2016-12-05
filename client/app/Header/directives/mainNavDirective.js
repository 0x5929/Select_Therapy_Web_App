(function() {
	'use strict';

	angular.module('myApp')
		.directive('mainNav', mainNavDirectiveHandler);

		function mainNavDirectiveHandler() {
			//initialize directive
			var directive = {};
			//directive set up
			directive.templateUrl = '/app/Header/view/english/main_nav/main_nav.html';
			directive.scope = {};
			//return directive
			return directive;
		}
}());