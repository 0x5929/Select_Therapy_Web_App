(function() {	
	'use strict';
	//main app module
	//loading all custom and google dependency modules
	angular.module('myApp', [
		'ui.router',
		'ngMaterial',
		'ngCookies',
		'services.looksIntegrationByUIB',
		'services.AuthenticationFactory',
		'services.toastFactory',
		'services.modalService',
		'services.cookies',
		'myApp.userDropdown',
		'myApp.mainNav',
		'myApp.ProgramsDropdown',
		'myApp.About',
		'myApp.ContactUs'])
//configuring how the application is routed, basically directly maps the webpage, 
//which its own properties, such as views security(auth) options and controllers that can have their own servcies they depend on
		.config(['$stateProvider', '$urlRouterProvider', stateRouteConfiguration])
		.config(['$httpProvider', httpConfiguration])
		.run(['$rootScope', '$state', '$timeout', '$cookies', '$http', 'AuthenticationFactory', 'modalService', 'toastFactory', appRunConfiguration])
		/*.directive('myHeader', function () {
			//initializing the directive
			var directive = {};
			//setting the directive settings
			directive.template = "HELLO WORLD"
			//returning the directive
			return directive;
		})*/;

		function stateRouteConfiguration($stateProvider, $urlRouterProvider){
			//intitialize page to redirect to home
			$urlRouterProvider.otherwise('/homePage');
			$stateProvider
				.state('homePage', {
					url: '/homePage',
					templateUrl: 'app/Home/view/english/Home.html'/*
					views: {/*
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
					*/
				})//i want to get rid of this chinese link
				.state('Home', {
					templateUrl: 'app/Home/view/english/Home.html'
					/*views: {
						'content@': {	//needed a '@' b/c this is a view within the english view, and the ui-view content is in html, needs to be referenced properly
							templateUrl: 'app/Home/view/english/Home.html'
						}
					}*/
				})
				/*
				.state('chinese.Home', {
					views: {
						'content@': {
							templateUrl: 'app/Home/view/chinese/Home.html'
						}
					}
				})
				.state('homePage.Class_Schedule', {
					views: {
						'content@': {
							templateUrl: 'app/Class_Schedule/view/english/Class_Schedule.html'
						}	
					}
				})
				.state('chinese.Class_Schedule', {
					views: {
						'content@': {
							templateUrl: 'app/Class_Schedule/view/chinese/Class_Schedule.html'
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
				.state('chinese.About', {
					views: {
						'content@': {
							templateUrl: 'app/About/view/chinese/About.html'
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
				.state('chinese.Contact_Us', {
					views: {
						'content@': {
							templateUrl: 'app/Contact_Us/view/chinese/Contact_Us.html'
						}
					},
					controller: 'ContactUsCtrl',
					controllerAs: 'contactControl'
				})*/
				.state('school', {
					templateUrl: 'app/school/view/english/school.html',/*
					views: {
						'content@': {
							templateUrl: 'app/school/view/english/school.html'
						}
					},
					*/
					data: { securityLevel: 'Student' },
					authenticate: true
				})
				.state('staff', {
					templateUrl: 'app/staff/view/english/staff.html',/*
					views: {
						'content@': {
							templateUrl: 'app/staff/view/english/staff.html'
						}
					},
					*/
					data: { securityLevel: 'Staff' },
					authenticate: true
				})
				/*
				.state('english.Nurse_Assistant_Training_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/english/Nurse_Assistant_Program/Nurse_Assistant_Training_Program.html'
						}	
					}
				})
				.state('chinese.Nurse_Assistant_Training_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/chinese/Nurse_Assistant_Program/Nurse_Assistant_Training_Program.html'
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
				.state('chinese.Home_Health_Aid_Training_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/chinese/HHA_Program/Home_Health_Aid_Training_Program.html'
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
				.state('chinese.Security_Guard_Training_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/chinese/Security_Guard_Training_Program/Security_Guard_Training_Program.html'
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
				.state('chinese.CPR_BLS_HSFA_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/chinese/CPR_BLS_HSFA_Program/CPR_BLS_HSFA_Program.html'
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
				.state('chinese.English_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/chinese/English_Program/English_Program.html'
						}
					}
				})
				.state('english.Acupuncture_CEU_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/english/Acupuncture_CEU_Program/Acupuncture_CEU_Program.html'
						}	
					}
				})
				.state('chinese.Acupuncture_CEU_Program', {
					views: {
						'content@': {
							templateUrl: 'app/Programs/view/chinese/Acupuncture_CEU_Program/Acupuncture_CEU_Program.html'
						}
					}
				})*/;
		}


		function httpConfiguration($httpProvider) {		//	handling rejection from server b/c unauthorized, etc..
			$httpProvider.interceptors.push(function($q, $injector) {
				return {
					responseError: function(rejection) {
						if (rejection.status === 401){
							console.log('hello world from httpConfiguration', rejection);
							$injector.get('$state').transitionTo('Home');
							return $q.reject(rejection); 
						}
						else
							return $q.reject(rejection);
					}
				};
			});
		}


		function appRunConfiguration($rootScope, $state, $timeout, $cookies, $http, AuthenticationFactory, modalService, toastFactory) {
			//get and set header for csrf token from server for csrf protection
			AuthenticationFactory.csrfProtection();

    		AuthenticationFactory.checkLoggedIn().then(
    			function(user) {
    				//set rootscope.currentuser
    				console.log(user);
    				$rootScope.currentUser = user;
    			}, 
    			function() {
    				$rootScope.currentUser = undefined;
    			});	

			$rootScope.$on('$stateChangeStart', function(event, toState) {
				var loginRequired = toState.authenticate,
				currentUser = $rootScope.currentUser,
				securityAccess = [],
				securityLevel,
				errMsg;

				//assign security level
				if (toState.data && toState.data.securityLevel) securityLevel = toState.data.securityLevel;
				//assign security access
				if (currentUser && currentUser.data.local.security) {
					securityAccess.push(currentUser.data.local.security);
					//if logged in as admin, you need access to staff level pages too
					if (securityAccess.indexOf('Admin') > -1)	securityAccess.push('Staff');		
				}

				if (loginRequired && securityLevel === 'Student') {	//first level of security = students
					if (typeof currentUser === 'undefined'){	//if no user signed in
						event.preventDefault();
						modalService.loginModalService().then(function(user) {	//success student login will redirect user to school for students
							$state.go('school');
						}).catch(function(failureResponse) {	//if somehow log in fails, user is redirected back to home.
							$state.go('Home');
						});
					}	//the above if block ensures that anybody logs in is able to view student (school) page
				}else if (loginRequired && securityLevel === 'Staff') {	// second level of security = staff
					if (typeof currentUser === 'undefined') {	//if no user signed in
						event.preventDefault();
						modalService.loginModalService().then(function(user) {
							var userSecurityAccess = user.data.local.security;
							securityAccess.push(userSecurityAccess);
							//if user security is admin, add staff access as well
							if (securityAccess.indexOf('Admin') > -1)	securityAccess.push('Staff');
							//if after log in you have enough access	
							if (securityAccess.indexOf(securityLevel) > -1)	$state.go('staff');
							//if not enough access, then user is redirected to home
							else $state.go('school');
						})
						.catch(function(failureResponse) {	//if login failed, redirect user to home
							$state.go('Home');
						}); 
					}else if (securityAccess.indexOf(securityLevel) === -1) {	//scenario when you are logged in, but not enough access
						errMsg = 'Sorry, you need to be signed in as Admin to access the Admin page!';
						event.preventDefault();
						$timeout(toastFactory.errorToast(errMsg), 3250);	//all error message needs to be fired with set time out function longer than the toast length, because you dont want overlap glitch
						$state.go('Home');
					}
				}
			});
		}


		
}());
