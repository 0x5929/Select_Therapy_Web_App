(function(){
	'use strict';

	angular.module('services.refreshFactory', [/*dependcies each refresh needs*/])
		.factory('refreshFactory', ['$scope', /*dependcies each refresh needs*/refreshFactoryHandler]);

		function refreshFactoryHandler (/*dependencies*/$scope) {
			var services = {
				//each refresh needed for each individual controllers.
						//ready for encapsulation:
						//first need to find all dependencies for each refresh 
						//then cp all code over
						//ensure logic flow is correct calling each service from the controller
			};
			return services;
		}
}());