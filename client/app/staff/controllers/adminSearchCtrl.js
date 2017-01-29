(function() {
	'use strict';

	angular.module('myApp.admin', ['services.ajaxService'])
		.controller('adminSearchController', ['$scope', 'ajaxService', adminSearchCtrlHandler])
	function adminSearchCtrlHandler($scope, ajaxService) {
		var admin_search_ctrl = this;

		admin_search_ctrl.submit = function () {
			var postData;
			postData = {
				parameter: admin_search_ctrl.searchParameter,
				input: admin_search_ctrl.searchInput
			};

			ajaxService.post('/adminSearch/', postData)
				.then(function(successResponse) {
					console.log(successResponse);
				}, function(failureResponse) {
					console.log(failureResponse);
				});
		};
	}
}());