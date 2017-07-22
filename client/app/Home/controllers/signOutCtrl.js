(function() {
	'use strict';
	angular.module('myApp.userFunctionalities')
		.controller('signOutControl', ['$rootScope', '$state', 'toastFactory', 'AuthenticationFactory', signOutControllerHandler]);

		function signOutControllerHandler($rootScope, $state, toastFactory, AuthenticationFactory) {
			var signOutCtrl = this;
			signOutCtrl.signOut = function() {
			//toast
				toastFactory.signOut();
			//authPost to server
				AuthenticationFactory.signOut().then(
					function(success) {
						$rootScope.currentUser = undefined;
						$state.go('Home');
					}, 
					function(failure) {
					//really this should never fail
						console.log('something terrible has happend signoutcntrl in userdropdownjs: ', failure);
					}
				);
			};
		}
}());