(function() {
	'use strict';
	angular.module('myApp.footer', ['services.ajaxService', 'services.toastFactory', 'services.modalService'])
		.controller('footerController', ['$scope', 'ajaxService', 'toastFactory', myfooterCtrlHandler]);

		function myfooterCtrlHandler($scope, ajaxService, toastFactory) {
			var footerctrl = this;
			footerctrl.submit = function(email) {
				//ajax to server
				var postData = {
					promoEmail: email
				};
				
				ajaxService.post('/promoEmail', postData).then(
					function(success) {
						toastFactory.promoEmail();
					}, 
					function(failure) {
						toastFactory.errorToast(failure.data);
					}
				);
				//clear input
				footerctrl.promoEmailInput = '';
				
			};
		}
}());