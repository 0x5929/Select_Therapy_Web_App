(function() {
	'use strict';

	angular.module('myApp.admin', ['services.ajaxService', 'services.toastFactory'])
		.controller('adminSearchController', ['$scope', 'ajaxService', adminSearchCtrlHandler]);

	function adminSearchCtrlHandler($scope, ajaxService) {
		var admin_search_ctrl = this;
		admin_search_ctrl.message = '';
		admin_search_ctrl.data = [];	//this gets passed in to the view, need to be updated as data comes back from server

		admin_search_ctrl.showDetail = function(student) {
			admin_search_ctrl.showFullDetail = true;	//turning on showing full detail
			admin_search_ctrl.studentDetail = student;	//passing along the single student selected to show full detail in another controller obj
		};

		admin_search_ctrl.submitBtn = function () {
			var config = {
				params: {
					parameter: admin_search_ctrl.searchParameter,
					input: admin_search_ctrl.searchInput,
					program: admin_search_ctrl.searchProgram,
					rotation: admin_search_ctrl.searchRotation
				}
			};

			ajaxService.get('/admin/search/', config)
				.then(function(successResponse) {
					console.log(successResponse);
					admin_search_ctrl.showFullDetail = false;
					if (Array.isArray(successResponse.data)){	//need to account for when an array of users is returned from server for findAll method in db
						successResponse.data.forEach(function(student) {	//each student from the response will map their program to only its name
																			//then having the array of mapped results to be joined so it returns strings of names only
							student.programViewForResultsTable = student.program.map(function(program) {
								return program.programName;
							}).join();
						});	
						admin_search_ctrl.data = successResponse.data;	//data is used for iteration in ng-repeat
						admin_search_ctrl.message = '';	//clearing the messsage variable
						admin_search_ctrl.showResultTable = true;	//turning on results table for search results
					}
					else {	//the condition where only one student is the result
						admin_search_ctrl.data = [];	//ensure data arr is avaliable 
						successResponse.data.programViewForResultsTable = successResponse.data.program.map(function(program) {
							return program.programName;
						}).join();	//maping and joining program names for one student's program array property
						admin_search_ctrl.data.push(successResponse.data);	//pushing the single student obj into the data arr
						admin_search_ctrl.message = '';	//clearing mesesage
						admin_search_ctrl.showResultTable = true;	//turning on the results table
					}
				}, function(failureResponse) {
					console.log(failureResponse);
					admin_search_ctrl.data = [];	//failed response, ensure data is empty, so previous results wont show
					admin_search_ctrl.showFullDetail = false;	//turning off full detail view
					admin_search_ctrl.message = failureResponse.data;	//setting error message to the failure response data message
				});
		};

	}
}());