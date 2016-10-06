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
				console.log('botton works!');
				$http.post('/sendMessage/', messageContent).success(function(response){
					console.log('once success, console log successfully sent message');
					self.fullName = '';
					self.emailAddress = '';
					self.message = '';
				});
			};
		}
}());