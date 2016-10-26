(function() {
	'use strict';

	angular.module('services.toastFactory', ['ngMaterial'])
		.factory('toastFactory', ['$mdToast', toastFactory]);

		function toastFactory($mdToast) {
			var services = {
				successRegistration: successRegistration,
				successLogin: successLogin
			};

			function successLogin() {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Welcome, you have successfully signed in!!')
						.position('top right')
						.hideDelay(5000)
					);
			}
			function successRegistration() {}
			return services;

		}
}());