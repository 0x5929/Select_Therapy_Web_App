(function() {
	'use strict';
	angular.module('myApp.admin')
		.directive('maskedInput', maskedInputHandler);

	function maskedInputHandler() {
		var directive = {
			restrict: 'A',
			link: function(scope, element, attribute) {
				var targetMask = attribute.targetMask;
				var options = {placeholder: '*'};
				element.mask(targetMask, options);
			}
		};
		return directive;
	}

}());