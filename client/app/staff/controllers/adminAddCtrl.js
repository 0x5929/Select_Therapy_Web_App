(function() {

//NEED TO ADD ERROR HANDLING FOR THESE ADD FIELDS, CANCEL SUBMIT AND PROMPT ERR TOAST MESSAGE

	'use strict';
	angular.module('myApp.admin')
		.controller('adminAddController', ['$scope', 'ajaxService', 'toastFactory', adminAddControllerHandler]);

		function adminAddControllerHandler($scope, ajaxService, toastFactory) {
			var admin_add_ctrl = this;
			var postData = null;
			
			admin_add_ctrl.noErrorCheck = function(dataTobeChecked) {	//commented out the radio buttons because I want to put dropdown select/option instead of radio button
				//err conditions
				if (!isNaN(dataTobeChecked.name)){
					toastFactory.errorToast("please check the student's first and last name input");
					return false;
				}
				if (isNaN(dataTobeChecked.phoneNumber) || dataTobeChecked.phoneNumber.length !== 10){
					toastFactory.errorToast("please check the student's phone number input");
					return false;
				}
				if (isNaN(dataTobeChecked.ssn) || dataTobeChecked.ssn.length !== 9){
					toastFactory.errorToast("please check the student's ssn input");
					return false;
				}
				if (!isNaN(dataTobeChecked.address)){
					toastFactory.errorToast("please check the student's address input");
					return false;
				}
				if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(dataTobeChecked.email))) {
					toastFactory.errorToast("please enter a valid email");
					return false;
				}
				for (var i = 0; i < dataTobeChecked.program.length; i++){
					if (dataTobeChecked.program[i]['programName']){
						toastFactory.errorToast("make sure you choose a valid program name");
					}
					if (isNaN(dataTobeChecked.program[i]['programRotation'])){
						toastFactory.errorToast("make sure you enter a valid program rotation number")
						return false;
					}
				}
				// if (!(dataTobeChecked.graduate)){
				// 	toastFactory.errorToast("please check the graduate field");
				// 	return false;
				// }
				// if (dataTobeChecked.tuitionPaid){
				// 	toastFactory.errorToast("please check the tuition field");
				// 	return false;
				// }
				// if (dataTobeChecked.jobPlaced){
				// 	toastFactory.errorToast("please check the job placed field");
				// 	return false;
				// }
				// if (dataTobeChecked.fullTimePos){
				// 	toastFactory.errorToast("please check the full time position field");
				// 	return false;
				// }
				// if (dataTobeChecked.partTimePos){
				// 	toastFactory.errorToast("please check the part time position field");
				// 	return false;
				// }
				if (isNaN(dataTobeChecked.payRate)){
					toastFactory.errorToast("please enter a valid pay rate");
					return false;
				}
				if (dataTobeChecked.jobDescription){
					toastFactory.errorToast("please check the job description field");
					return false;
				}
				if (dataTobeChecked.noJobReason){
					toastFactory.errorToast("please check the unemployed reason field");
					return false;
				}
				// if (dataTobeChecked.passedExam){
				// 	toastFactory.errorToast("please check the passed exam field");
				// 	return false;
				// }
				// if (dataTobeChecked.passedOn1st){
				// 	toastFactory.errorToast("please check the 1st time passing field");
				// 	return false;
				// }
				// if (dataTobeChecked.passedOn2nd){
				// 	toastFactory.errorToast("please check the 2nd time passing field");
				// 	return false;
				// }
				// if (dataTobeChecked.passedOn3rd){
				// 	toastFactory.errorToast("please check the 3rd time passing field");
				// 	return false;
				}
				//returns true for ajax to be run if none of the above err conditions are met
				return true;
			};


			admin_add_ctrl.submit = function() {
				
				postData = {
				name: admin_add_ctrl.firstName + ' ' + admin_add_ctrl.lastName,
				phoneNumber: admin_add_ctrl.phoneNumber,
				ssn: admin_add_ctrl.ssn,
				address: admin_add_ctrl.address,
				email: admin_add_ctrl.email,
				program: [{
					programName: admin_add_ctrl.FirstprogramName,
					programRotation: admin_add_ctrl.FirstprogramRotation
				}, {
					programName: admin_add_ctrl.SecondprogramName,
					programRotation: admin_add_ctrl.SecondprogramRotation
				}, {
					programName: admin_add_ctrl.ThirdprogramName,
					programRotation: admin_add_ctrl.ThirdprogramRotation
				}, {
					programName: admin_add_ctrl.ForthprogramName,
					programRotation: admin_add_ctrl.ForthprogramName
				}, {
					programName: admin_add_ctrl.FifthprogramName,
					programRotation: admin_add_ctrl.FifthprogramRotation
				}],
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
				passedOn3rd: admin_add_ctrl.passedOn3rd,
				marketingSurvey: admin_add_ctrl.marketingSurvey
			};
			//below is to ensure if the 3rd or 2nd program is empty, they will be ignored when input into the db
				postData.program = postData.program
					.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
					return eachProgram.programName && eachProgram.programRotation;
				});

				if (admin_add_ctrl.noErrorCheck(postData)){
					console.log(postData);
					ajaxService.post('/admin/add/', postData)
					.then(function(successResponse) {
						toastFactory.successAdd(postData.name);
						admin_add_ctrl.refresh();
						console.log(successResponse);
					}, 
					function(failureResposne) {
						console.log(failureResposne);
					});
				} 
				
			};


			admin_add_ctrl.refresh = function() {	
//strings and Numbers				
				admin_add_ctrl.firstName = '';
				admin_add_ctrl.lastName = '';
				admin_add_ctrl.phoneNumber = '';
				admin_add_ctrl.ssn = '';
				admin_add_ctrl.address = '';
				admin_add_ctrl.email = '';
				admin_add_ctrl.payRate = '';
				admin_add_ctrl.jobDescription = '';
				admin_add_ctrl.noJobReason = '';
				admin_add_ctrl.FirstprogramRotation = '';
				admin_add_ctrl.SecondprogramRotation = '';
				admin_add_ctrl.ThirdprogramRotation = '';
				admin_add_ctrl.ForthprogramRotation = '';
				admin_add_ctrl.FifthprogramRotation = '';

//setting the necessary ng-if to false	
				admin_add_ctrl.showAddProgramInput1 = false;
				admin_add_ctrl.showAddProgramInput2 = false;
				admin_add_ctrl.showAddProgramInput3 = false;
				admin_add_ctrl.showAddProgramInput4 = false;
				admin_add_ctrl.showAddProgramInput5 = false;			

//Boolean Values
				var graduate = document.getElementsByName('graduate');
				var tuitionPaid = document.getElementsByName('tuitionPaid');
				var jobPlaced = document.getElementsByName('jobPlaced');
				var fullTimePos = document.getElementsByName('fullTimePos');
				var partTimePos = document.getElementsByName('partTimePos');
				var passedExam = document.getElementsByName('passedExam');
				var passedOn1st = document.getElementsByName('passedOn1st');
				var passedOn2nd = document.getElementsByName('passedOn2nd');
				var passedOn3rd = document.getElementsByName('passedOn3rd');


				graduate.forEach(function(input) {
					input.checked = false;
				});
				tuitionPaid.forEach(function(input) {
					input.checked = false;
				});
				jobPlaced.forEach(function(input) {
					input.checked = false;
				});
				fullTimePos.forEach(function(input) {
					input.checked = false;
				});
				partTimePos.forEach(function(input) {
					input.checked = false;
				});
				passedExam.forEach(function(input) {
					input.checked = false;
				});
				passedOn1st.forEach(function(input) {
					input.checked = false;
				});
				passedOn2nd.forEach(function(input) {
					input.checked = false;
				});
				passedOn3rd.forEach(function(input) {
					input.checked = false;
				});

//option value
				admin_add_ctrl.marketingSurvey = '';
				admin_add_ctrl.FirstprogramName = '';
				admin_add_ctrl.SecondprogramName = '';
				admin_add_ctrl.ThirdprogramName = '';
				admin_add_ctrl.ForthprogramName = '';
				admin_add_ctrl.FifthprogramName = '';

			};
		};
}());