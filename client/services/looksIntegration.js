(function(){
	"use strict";
	/* 
	For further encapsulation, I seperated
	UI bootstrap into its own module as a service
	(this service can be used for dropDownMenu, 
	and Modals, and other cool interative UIB components)
	and injected the module into our main app module. 
	This way in the future if we want to use another 
	looks intergration service such as angular strap, 
	we can do so by creating another module here for it, and
	injecting it into our main app module.
	-------------------------------------------------------------*/
	
	angular.module('looksIntegrationByUIB.services', ['ui.bootstrap']);
}());