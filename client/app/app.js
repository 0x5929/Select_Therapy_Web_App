(function() {	
	'use strict';
	//main app module
	//loading all custom and google dependency modules
	angular.module('myApp', [
		'myApp.LanguageDropdown',
		'myApp.ProgramsDropdown',
		'myApp.About',
		'myApp.ContactUs',
		'services.looksIntegrationByUIB',
		'ui.router'])
//configuring how the application is routed, basically directly maps the webpage, 
//which its own properties, such as views security(auth) options and controllers that can have their own servcies they depend on
		.config(function($stateProvider, $urlRouterProvider){
			//intitialize page to redirect to home
			$urlRouterProvider.otherwise('Home');
			$stateProvider
				.state('Home', {
					url: '/Home',
					templateUrl: 'app/Home/Home.html'
				})
				.state('Class_Schedule', {
					url: '/Class_Schedule',
					templateUrl: 'app/Class_Schedule/Class_Schedule.html'
				})
				.state('About', {
					url: '/About',
					templateUrl: 'app/About/About.html',
					controller: 'AboutCtrl'
				})
				.state('Contact_Us', {
					url: '/Contact_Us',
					templateUrl: 'app/Contact_Us/Contact_Us.html'
				})
				.state('Nurse_Assistant_Training_Program', {
					url: '/Nurse_Assistant_Training_Program',
					templateUrl: 'app/Programs/Nurse_Assistant_Program/Nurse_Assistant_Training_Program.html'
				})
				.state('Home_Health_Aid_Training_Program', {
					url: '/Home_Health_Aid_Training_Program',
					templateUrl: 'app/Programs/HHA_Program/Home_Health_Aid_Training_Program.html'
				})
				.state('Security_Guard_Training_Program', {
					url: '/Security_Guard_Training_Program',
					templateUrl: 'app/Programs/Security_Guard_Training_Program/Security_Guard_Training_Program.html'
				})
				.state('CPR_BLS_HSFA_Program', {
					url: '/CPR_BLS_HSFA_Program',
					templateUrl: 'app/Programs/CPR_BLS_HSFA_Program/CPR_BLS_HSFA_Program.html'
				})
				.state('English_Program', {
					url: '/English_Program',
					templateUrl: 'app/Programs/English_Program/English_Program.html'
				})
				.state('Acupuncture_CEU_Program', {
					url: '/Acupuncture_CEU_Program',
					templateUrl: 'app/Programs/Acupuncture_CEU_Program/Acupuncture_CEU_Program.html'
				});
		});
}());
