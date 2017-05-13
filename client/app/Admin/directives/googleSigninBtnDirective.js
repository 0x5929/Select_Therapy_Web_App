(function() {

	'use strict';

	angular.module('myApp.admin')
		.directive('googleSigninBtn', googleSigninBtnHandler);

	function googleSigninBtnHandler () {
		var directive = {

			restrict: 'E',
			scope: {
				buttonID: '@',
				options: '&'
			},
			template: '<div></div>',
			link: function(scope, element, attrs) {
				var div = element.find('div')[0];
				div.id  = attrs.buttonID;
				gapi.signin2.render(div.id, scope.options());
			}			


		};

		return directive;
	}


//http://stackoverflow.com/questions/32625970/google-signin-button-in-angularjs-sometimes-does-not-show-up

}());