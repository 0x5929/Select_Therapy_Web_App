(function() {
	'use strict';
	angular.module('myApp.ContactUs', ['services.toastFactory'])
		. controller('contactUsControl', ['$scope', '$http', 'toastFactory', ContactUsCtrl]);

		function ContactUsCtrl($scope, $http, toastFactory) {
			var contactUsCtrl = this;
			contactUsCtrl.sendMessage = function() {
				var messageContent = {
					name: contactUsCtrl.fullName,
					email: contactUsCtrl.emailAddress,
					message: contactUsCtrl.message
				};
			// clears the input text boxes for refresh purposes, and set up toast for toasting purposes
			contactUsCtrl.refresh = function() {
				toastFactory.thankYouMessage(contactUsCtrl.fullName);
				contactUsCtrl.emailAddress = '';
				contactUsCtrl.message = '';
				contactUsCtrl.fullName = '';
			};
				console.log('button works!');	//button test
				$http.post('/sendMessage/', messageContent).success(function(response){
					console.log('once success, console log successfully sent message');	//signal test
					contactUsCtrl.refresh();	//refreshes the message text area box
				});
			};
		}
}());