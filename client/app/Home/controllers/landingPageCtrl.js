(function() {

	'use strict';

	/**
	*  myApp.userFunctionalities module: 
	*	
	*	this module will contain controllers: 1. landing page control -> to flip translations of buttons	
	*										  2. userSignin/Signout/SignupModals
	* 
	*/
	angular.module('myApp.userFunctionalities', ['services.AuthenticationFactory', 'services.modalService', 
		'services.toastFactory', 'services.cookies', 'ui.router',])
		.controller('landingPageController', ['$scope', landingPageCtrlHandler]);

		function landingPageCtrlHandler($scope) {
			var landingPageCtrl = this;

			var flipableItems = [
				'showSignInCh', 
				'showSignUpCh', 
				'showSignOutCh'
			];

			landingPageCtrl.flipTranslation = function(item) {
				flipableItems.forEach(handler);
				function handler(element) {
					if (element === item)
						landingPageCtrl[element] = true;
					else
						landingPageCtrl[element] = false;
				}

			};
			landingPageCtrl.ensureEnglish = function() {
				flipableItems.forEach(handler);
				function handler(element) {
					landingPageCtrl[element] = false;
				}
			};
		}

}());