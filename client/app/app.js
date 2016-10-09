(function() {	
	'use strict';
	//main app module
	//loading all custom and google dependency modules
	angular.module('myApp', [
		'myApp.userDropdown',
		'myApp.ProgramsDropdown',
		'myApp.About',
		'myApp.ContactUs',
		'services.looksIntegrationByUIB',
		'ui.router'])
//configuring how the application is routed, basically directly maps the webpage, 
//which its own properties, such as views security(auth) options and controllers that can have their own servcies they depend on
		.config(function($stateProvider, $urlRouterProvider){
			//intitialize page to redirect to home
			$urlRouterProvider.otherwise('/english');
			$stateProvider
				.state('english', {
					url: '/english',
					views: {
						'header': {
							templateUrl: 'app/headerNavFooter/view/english/header/header.html'
						},
						'mainNav': {
							templateUrl: 'app/headerNavFooter/view/english/main_nav/main_nav.html'
						},
						'content': {
							templateUrl: 'app/Home/view/english/Home.html'
						}
					}
				})
				.state('english.Home', {
					views: {
						'content@': {	//needed a '@' b/c this is a view within the english view, and the ui-view content is in html, needs to be referenced properly
							templateUrl: 'app/Home/view/english/Home.html'
						}
					}
				})
				.state('english.Class_Schedule', {
					views: {
						'content@': {
							templateUrl: 'app/Class_Schedule/view/english/Class_Schedule.html'
						}	
					}
				})
				.state('english.About', {
					views: {
						'content@': {
							templateUrl: 'app/About/view/english/About.html'
						}	
					},
					controller: 'AboutCtrl'
				})
				.state('english.Contact_Us', {
					views: {
						'content@': {
							templateUrl: 'app/Contact_Us/view/english/Contact_Us.html'
						}	
					},
					controller: 'ContactUsCtrl',
					controllerAs: 'contactControl'
				})
				.state('english.Nurse_Assistant_Training_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/english/Nurse_Assistant_Program/Nurse_Assistant_Training_Program.html'
						}	
					}
				})
				.state('english.Home_Health_Aid_Training_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/english/HHA_Program/Home_Health_Aid_Training_Program.html'
						}	
					}
				})
				.state('english.Security_Guard_Training_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/english/Security_Guard_Training_Program/Security_Guard_Training_Program.html'
						}	
					}
				})
				.state('english.CPR_BLS_HSFA_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/english/CPR_BLS_HSFA_Program/CPR_BLS_HSFA_Program.html'
						}	
					}
				})
				.state('english.English_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/english/English_Program/English_Program.html'
						}	
					}
				})
				.state('english.Acupuncture_CEU_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/english/Acupuncture_CEU_Program/Acupuncture_CEU_Program.html'
						}	
					}
				});
		});
}());
