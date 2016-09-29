(function() {	
	'use strict';
	
	angular.module('myApp', ['myApp.languageDropdown',
		'services.looksIntegrationByUIB',
		'ui.router'])

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
				.state('Programs', {
					url: '/Programs',
					templateUrl: 'app/Programs/Programs.html'
				});
		});
}());
