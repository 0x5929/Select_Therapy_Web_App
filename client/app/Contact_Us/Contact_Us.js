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
				//below can be used in a modal servce as well! 
				this.emailAddress = '';
				this.message = 'Thank you ' + this.fullName + ', you rock! Your message will be evaluated and responded to shortly!';
				this.fullName = '';
			};
				console.log('button works!');	//button test
				$http.post('/sendMessage/', messageContent).success(function(response){
					console.log('once success, console log successfully sent message');	//signal test
					self.refresh();	//refreshes the message text area box
				});
			};
		}
}());