(function() {

//NEED TO ADD ERROR HANDLING FOR THESE ADD FIELDS, CANCEL SUBMIT AND PROMPT ERR TOAST MESSAGE

	'use strict';
	angular.module('myApp.admin')
		.controller('adminAddController', ['$scope', 'ajaxService', 'toastFactory', adminAddControllerHandler]);

		function adminAddControllerHandler($scope, ajaxService, toastFactory) {

			var admin_add_ctrl = this;
			var postData = null;

			admin_add_ctrl.programInputCount = 0
			
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
					if (!(dataTobeChecked.program[i]['programName'])){
						toastFactory.errorToast("make sure you choose a valid program name");
						return false;
					}
					if (isNaN(dataTobeChecked.program[i]['programRotation'])){
						console.log(isNaN(dataTobeChecked.program[i]['programRotation']));
						console.log(dataTobeChecked.program[i]['programRotation']);
						console.log((dataTobeChecked.program[i]['programName']));
						console.log(dataTobeChecked.program);
						toastFactory.errorToast("make sure you enter a valid program rotation number")
						return false;
					}
				}
				if (dataTobeChecked.graduate === 'noneSelected'){
					toastFactory.errorToast("please check the graduate field");
					return false;
				}
				if (dataTobeChecked.tuitionPaid === 'noneSelected'){
					toastFactory.errorToast("please check the tuition field");
					return false;
				}
				if (dataTobeChecked.graduate === 'true' && dataTobeChecked.jobPlaced === 'noneSelected'){
					toastFactory.errorToast("please check the job placed field");
					return false;
				}
				if (dataTobeChecked.jobPlaced === 'true' && dataTobeChecked.weeklyWorkHours === 'noneSelected'){
					toastFactory.errorToast("please check the weekly hours field");
					return false;
				}
				if (dataTobeChecked.jobPlaced === 'true' && isNaN(dataTobeChecked.payRate)){
					toastFactory.errorToast("please enter a valid pay rate");
					return false;
				}
				if (dataTobeChecked.jobPlaced === 'true' && !(dataTobeChecked.jobDescription)){
					toastFactory.errorToast("please check the job description field");
					return false;
				}
				if (dataTobeChecked.jobPlaced === '' && !(dataTobeChecked.noJobReason)){
					toastFactory.errorToast("please check the unemployed reason field");
					return false;
				}
				if (dataTobeChecked.graduate === 'true' && dataTobeChecked.passedExam === 'noneSelected'){
					toastFactory.errorToast("please check the passed exam field");
					return false;
				}
				if (dataTobeChecked.graduate === '' && dataTobeChecked.notGraduatingReason === 'noneSelected'){
					toastFactory.errorToast("please check the no gradute field");
					return false;
				}
				if (dataTobeChecked.passedExam === 'true' && isNaN(dataTobeChecked.numberOfTries)){
					toastFactory.errorToast("please check the exam num of tries field");
					return false;
				}
				if (dataTobeChecked.passedExam === '' && dataTobeChecked.noPassReason === 'noneSelected'){
					toastFactory.errorToast("please check the no pass reason field");
					return false;
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
				notGraduatingReason: admin_add_ctrl.notGraduatingReason,
				tuitionPaid: admin_add_ctrl.tuitionPaid,
				jobPlaced: admin_add_ctrl.jobPlaced,
				weeklyWorkHours: admin_add_ctrl.weeklyWorkHours,
				payRate: admin_add_ctrl.payRate,
				jobDescription: admin_add_ctrl.jobDescription,
				noJobReason: admin_add_ctrl.noJobReason,
				passedExam: admin_add_ctrl.passedExam,
				numberOfTries: admin_add_ctrl.numberOfTries,
				noPassReason: admin_add_ctrl.noPassReason,
				marketingSurvey: admin_add_ctrl.marketingSurvey
			};
			//below is to ensure if the 3rd or 2nd program is empty, they will be ignored when input into the db
				postData.program = postData.program
					.filter(function(eachProgram) {	//filters each program input so only the submitted values are submitted to the db
					return eachProgram.programName !== 'noneSelected' && eachProgram.programRotation;
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


//option value
				admin_add_ctrl.marketingSurvey = 'noneSelected';
				admin_add_ctrl.graduate = 'noneSelected';
				admin_add_ctrl.notGraduatingReason = 'noneSelected';
				admin_add_ctrl.tuitionPaid = 'noneSelected';
				admin_add_ctrl.jobPlaced = 'noneSelected';
				admin_add_ctrl.weeklyWorkHours = 'noneSelected';
				admin_add_ctrl.passedExam = 'noneSelected';
				admin_add_ctrl.numberOfTries = 'noneSelected';
				admin_add_ctrl.noPassReason = 'noneSelected';
				admin_add_ctrl.FirstprogramName = 'noneSelected';
				admin_add_ctrl.SecondprogramName = 'noneSelected';
				admin_add_ctrl.ThirdprogramName = 'noneSelected';
				admin_add_ctrl.ForthprogramName = 'noneSelected';
				admin_add_ctrl.FifthprogramName = 'noneSelected';

			};

			admin_add_ctrl.addProgramInput = function(counter) {
				var maxProgramCount = 4;
				var humanCount = counter + 1;

				//update counter
				if (counter < maxProgramCount)	admin_add_ctrl.programInputCount++;
				//set visual to true
				admin_add_ctrl['showAddProgramInput' + humanCount] = true;
				//stopping condition with err message
				if (counter == maxProgramCount)	toastFactory.errorToast("You can only enter up to 5 programs for now");
			};

			admin_add_ctrl.clearProgramInput = function(counter) {
				var minCount = -1;
				var humanCount = counter + 1;
				var ngModels = [
					['FirstprogramName', 'FirstprogramRotation'],
					['SecondprogramName', 'SecondprogramRotation'],
					['ThirdprogramName', 'ThirdprogramRotation'],
					['ForthprogramName', 'ForthprogramRotation'],
					['FifthprogramName', 'FifthprogramRotation']
				];
				var specificNgModelProgramName = ngModels[counter][0];
				var specificNgModelProgramRotation = ngModels[counter][1];

				//update counter
				if (counter > minCount + 1)	admin_add_ctrl.programInputCount--;
				//clear data
				admin_add_ctrl[specificNgModelProgramName] = 'noneSelected';	//for programName
				admin_add_ctrl[specificNgModelProgramRotation] = '';	//for programRotation
				//turn visual off
				admin_add_ctrl['showAddProgramInput' + humanCount] = false;
				//stopping condition with err message
				if (counter == minCount + 1)	toastFactory.errorToast("okay, you can add new programs now");
			};
		}
}());