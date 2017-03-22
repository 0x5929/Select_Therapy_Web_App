(function() {
	'use strict';
	angular.module('myApp.admin')
		.directive('maskedInput', maskedInputHandler);

	function maskedInputHandler() {
		var directive = {
			restrict: 'A',
			link: function(scope, element, attribute) {
				element.mask("(777) 777-7777");
			}
		};
		return directive;
	}

}());