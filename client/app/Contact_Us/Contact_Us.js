(function() {
	'use strict';
	angular.module('myApp.ContactUs', [])
		. controller('ContactUsCtrl', ['$scope', '$http', ContactUsCtrl]);

		function ContactUsCtrl($scope, $http) {
			$scope.SendMessage = function() {
				var messageContent = {
					name: $scope.fullName,
					email: $scope.emailAddress,
					message: $cope.message
				};
				$http.post('/sendMessage', messageContent).success(function(){
					console.log('once success, console log successfully sent message');
				});
			};
		}
}());