(function() {
	'use strict';
	angular.module('myApp.ContactUs', ['services.toastFactory', 'services.ajaxService'])
		. controller('contactUsControl', ['$scope', 'toastFactory', 'ajaxService', ContactUsCtrl]);

		function ContactUsCtrl($scope, toastFactory, ajaxService) {
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
					/*
					$http.post('/sendMessage/', messageContent).success(function(response){
						console.log('once success, console log successfully sent message');	//signal test
						contactUsCtrl.refresh();	//refreshes the message text area box
					});*/
					ajaxService.post('/adminSearch/', messageContent)
						.then(function(successResponse) {
							console.log('once success, console log successfully sent message');	//signal test
							contactUsCtrl.refresh();	//refreshes the message text area box
						}, function(failureResponse) {
							console.log(failureResponse);
							console.log('this really shouldnt be messing up, please check');
						});
				}else
					toastFactory.errorToast('Please make sure you enter all your info before hitting send!');
			};
		}
}());