(function() {
	'use strict';
	angular.module('myApp')
		.directive('myFooter', myFooterHandler);

		function myFooterHandler() {
			//initializing the directive
			var directive = {};
			//setting the directive settings
			directive.templateUrl = "/app/Footer/view/footer.html";	//might need to switch to base relative url
			//returning the directive
			return directive;
		}
}());