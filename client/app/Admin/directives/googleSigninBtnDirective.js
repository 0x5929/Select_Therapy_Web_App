(function() {

	'use strict';

	angular.module('myApp.admin')
		.directive('googleSigninBtn', googleSigninBtnHandler);

	function googleSigninBtnHandler () {
		var directive = {

			restrict: 'E',
			scope: {
				buttonID: '@',	//attribute binding passing from directive attr to its scope
				options: '&'	//expression binding need to figure out why it works
			},
			template: '<div></div>',
			link: function(scope, element, attrs) {
				var div = element.find('div')[0];
				div.id  = attrs.buttonID;
				gapi.signin2.render(div.id, scope.options());	//if not called the obj only options get passed in and success handler wont be run
			}			


		};

		return directive;
	}


//http://stackoverflow.com/questions/32625970/google-signin-button-in-angularjs-sometimes-does-not-show-up

}());