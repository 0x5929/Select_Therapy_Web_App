(function() {
	'use strict';

	angular.module('services.toastFactory', ['ngMaterial'])
		.factory('toastFactory', ['$mdToast', toastFactory]);

		function toastFactory($mdToast) {
			var services = {
				successRegistration: successRegistration,
				successLogin: successLogin,
				thankYouMessage: thankYouMessage
			};

			function successRegistration() {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Congrats! You have successfully registered, and now logged in!!')
						.position('top right')
						.hideDelay(5000)
					);
			}

			function successLogin() {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Welcome! You have successfully signed in!!')
						.position('top right')
						.hideDelay(5000)
					);
			}

			function thankYouMessage(name) {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Thank you ' + name + ', you rock! Your message will be evaluated and responded to shortly!')
						.position('top right')
						.hideDelay(5000)
					);			
			}
			
			return services;

		}
}());