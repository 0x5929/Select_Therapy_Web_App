(function() {
	'use strict';
	angular.module('myApp.ContactUs', [])
		. controller('ContactUsCtrl', ['$scope', '$http', ContactUsCtrl]);

		function ContactUsCtrl($scope, $http) {
			var self = this;
			this.sendMessage = function() {
				var messageContent = {
					name: this.fullName,
					email: this.emailAddress,
					message: this.message
				};
			// clears the input text boxes for refresh purposes
			this.refresh = function() {
				this.fullName = '';
				this.emailAddress = '';
				this.message = '';
			};
				console.log('button works!');	//button test
				$http.post('/sendMessage/', messageContent).success(function(response){
					console.log('once success, console log successfully sent message');	//signal test
					self.refresh();	//refreshes the message text area box
				});
			};
		}
}());