(function() {
	'use strict';
	angular.module('myApp.ContactUs', ['services.toastFactory'])
		. controller('contactUsControl', ['$scope', '$http', 'toastFactory', ContactUsCtrl]);

		function ContactUsCtrl($scope, $http, toastFactory) {
			var contactUsCtrl = this;
			contactUsCtrl.refresh = function() {
				toastFactory.thankYouMessage(contactUsCtrl.fullName);	//toast
				contactUsCtrl.emailAddress = '';
				contactUsCtrl.message = '';
				contactUsCtrl.fullName = '';
			};
			contactUsCtrl.sendMessage = function() {
				var messageContent = {
					name: contactUsCtrl.fullName,
					email: contactUsCtrl.emailAddress,
					message: contactUsCtrl.message
				};
				console.log('button works!');	//button test
				if (messageContent.name && messageContent.email && messageContent.message) {
					$http.post('/sendMessage/', messageContent).success(function(response){
						console.log('once success, console log successfully sent message');	//signal test
						contactUsCtrl.refresh();	//refreshes the message text area box
					});
				}else
					toastFactory.errorToast('Please make sure you enter all your info before hitting send!');
			};
		}
}());