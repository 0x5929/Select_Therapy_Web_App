(function() {
	'use strict';
	angular.module('myApp.admin')
		.controller('adminAddController', ['$scope', 'ajaxService', adminAddControllerHandler]);

		function adminAddControllerHandler($scope, ajaxService) {
			var admin_add_ctrl = this;
			admin_add_ctrl.postData = null;
			admin_add_ctrl.submit = function() {
				
				admin_add_ctrl.postData = {
				name: admin_add_ctrl.name,
				phoneNumber: admin_add_ctrl.phoneNumber,
				ssn: admin_add_ctrl.ssn,
				address: admin_add_ctrl.address,
				email: admin_add_ctrl.email,
				program: admin_add_ctrl.program,
				graduate: admin_add_ctrl.graduate,
				tuitionPaid: admin_add_ctrl.tuitionPaid,
				jobPlaced: admin_add_ctrl.jobPlaced,
				fullTimePos: admin_add_ctrl.fullTimePos,
				partTimePos: admin_add_ctrl.partTimePos,
				payRate: admin_add_ctrl.payRate,
				jobDescription: admin_add_ctrl.jobDescription,
				noJobReason: admin_add_ctrl.noJobReason,
				passedExam: admin_add_ctrl.passedExam,
				passedOn1st: admin_add_ctrl.passedOn1st,
				passedOn2nd: admin_add_ctrl.passedOn2nd,
				passedOn3rd: admin_add_ctrl.passedOn3rd
			};

				ajaxService.post('/admin/add/', admin_add_ctrl.postData)
				.then(function(successResponse) {
					/* refresh purposes, doesnt work yet, needs more work
					for (var key in admin_add_ctrl.postData) {
						key = '';
					}
					*/
					console.log(successResponse);
				}, 
			function(failureResposne) {
					console.log(failureResposne);
				});
			};
		};
}());