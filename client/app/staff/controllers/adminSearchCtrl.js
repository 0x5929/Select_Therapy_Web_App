(function() {
	'use strict';

	angular.module('myApp.admin', ['services.ajaxService', 'services.toastFactory'])
		.controller('adminSearchController', ['$rootScope', '$scope', 'ajaxService', adminSearchCtrlHandler])
	function adminSearchCtrlHandler($rootScope, $scope, ajaxService) {
		var admin_search_ctrl = this;
		admin_search_ctrl.message = '';
		admin_search_ctrl.data = [];	//this gets passed in to the view, need to be updated as data comes back from server
		admin_search_ctrl.editOn = false;
		admin_search_ctrl.putData = {
			name: '',
			phoneNumber: '',
			ssn: '',
			address: '',
			email: '',
			program: '',
			tuitionPaid: '',
			graduate: '',
			passedExam: '',
			passedOn1st: '',
			passedOn2nd: '',
			passedOn3rd: ''
		};

		admin_search_ctrl.delete = function() {
			//admin delete routes
		};

		admin_search_ctrl.edit = function() {
			admin_search_ctrl.editOn = true;
		};

		admin_search_ctrl.showDetail = function(student) {
			admin_search_ctrl.showFullDetail = true;
			admin_search_ctrl.studentDetail = student;
		};

		admin_search_ctrl.isAdmin = function() {
			if ($rootScope.currentUser.data.local.security === 'Admin')	return true;
			else return false;
		};

		admin_search_ctrl.putChangesFilter = function(data) {
			var putDataAfterFilter = {};
			for (var inputField in data) {	//first we filter through the fields that is being editted
				if (data[inputField] !== '')
					putDataAfterFilter[inputField] = data[inputField];
			}
			//this will convert false to empty string to be converted to boolean false or 0 value in the server side.
			if (putDataAfterFilter.program && putDataAfterFilter.program.toLowerCase() === 'false')	putDataAfterFilter.program = '';
			if (putDataAfterFilter.tuitionPaid && putDataAfterFilter.tuitionPaid.toLowerCase() === 'false')	putDataAfterFilter.tuitionPaid = '';
			if (putDataAfterFilter.graduate && putDataAfterFilter.graduate.toLowerCase() === 'false')	putDataAfterFilter.graduate = '';
			if (putDataAfterFilter.passedExam && putDataAfterFilter.passedExam.toLowerCase() === 'false')	putDataAfterFilter.passedExam = '';
			if (putDataAfterFilter.passedOn1st && putDataAfterFilter.passedOn1st.toLowerCase() === 'false')	putDataAfterFilter.passedOn1st = '';
			if (putDataAfterFilter.passedOn2nd && putDataAfterFilter.passedOn2nd.toLowerCase() === 'false')	putDataAfterFilter.passedOn2nd = '';
			if (putDataAfterFilter.passedOn3rd && putDataAfterFilter.passedOn3rd.toLowerCase() === 'false')	putDataAfterFilter.passedOn3rd = '';
			//need to attach the original name so the server can look it up and edit its contents
			putDataAfterFilter.originalName = admin_search_ctrl.studentDetail.name;
			//returning the filtered through obj
			return putDataAfterFilter;
		};

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
					admin_search_ctrl.data.push(successResponse.data);
					admin_search_ctrl.message = '';
					admin_search_ctrl.showResultTable = true;
				}, function(failureResponse) {
					admin_search_ctrl.data = [];
					admin_search_ctrl.message = failureResponse.data;
				});
		};

		admin_search_ctrl.submitChanges = function() {
			var data = admin_search_ctrl.putChangesFilter(admin_search_ctrl.putData);
			for (var key in admin_search_ctrl.putData) {	//clears all fields when submit is pressed
				admin_search_ctrl.putData[key] = '';
			}
			admin_search_ctrl.editOn = false;	//after clicking submit changes, edit is turned off

			ajaxService.put('/admin/modify/', data)
				.then(function(successResponse) {	//could add a success toast
					console.log(successResponse);
				}, function(failureResponse) {	//could add a failure toast
					console.log(failureResponse);
				});
		};
	}
}());