(function() {
	'use strict';

	angular.module('myApp.admin', ['services.ajaxService', 'services.toastFactory'])
		.controller('adminSearchController', ['$scope', 'ajaxService', adminSearchCtrlHandler])
	function adminSearchCtrlHandler($scope, ajaxService) {
		var admin_search_ctrl = this;
		admin_search_ctrl.message = '';
		admin_search_ctrl.data = null;	//this gets passed in to the view, need to be updated as data comes back from server

		admin_search_ctrl.submit = function () {
			var config;
			config = {
				params: {
					parameter: admin_search_ctrl.searchParameter,
					input: admin_search_ctrl.searchInput
				}
			};

			ajaxService.get('/admin/search/', config)
				.then(function(successResponse) {
					admin_search_ctrl.data = successResponse.data;
				}, function(failureResponse) {
					admin_search_ctrl.message = 'failure response from server, need to err handle';
				});
		};
	}
}());