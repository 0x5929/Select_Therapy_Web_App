(function() {
	'use strict';
	
	angular.module('myApp.userFunctionalities', ['services.looksIntegrationByUIB', 'services.AuthenticationFactory', 'services.modalService', 'services.toastFactory', 'services.cookies', 'ui.router'])
		.controller('userDropdownControl', ['$scope', dropdownCtrlHandler]);

				//userdropdownControll handler
		function dropdownCtrlHandler($scope) {
			var userDropdownCtrl = this;
			var flipableItems = [
				'showSignInCh', 
				'showSignUpCh', 
				'showSignOutCh'
			];
			userDropdownCtrl.flipTranslation = function(item) {
				flipableItems.forEach(handler);
				function handler(element) {
					if (element === item)
						userDropdownCtrl[element] = true;
					else
						userDropdownCtrl[element] = false;
				}

			};
			userDropdownCtrl.ensureEnglish = function() {
				flipableItems.forEach(handler);
				function handler(element) {
					userDropdownCtrl[element] = false;
				}
			};
			userDropdownCtrl.hideMenu = function() {
				var menu = angular.element(document.querySelector('.user-dropdown-menu'));
				menu.css('display', 'none');
			};
			userDropdownCtrl.showMenu = function() {
				var menu = angular.element(document.querySelector('.user-dropdown-menu'));
				menu.css('display', 'block');
			};
		}

}());