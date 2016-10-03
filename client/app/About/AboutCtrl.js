(function() {
	'use strict';

	angular.module('myApp.About', [])
		.controller('AboutCtrl', ['$scope', '$http', AboutCtrl]);
		
		function AboutCtrl($scope, $http) {
		$scope.openPDF = function(PDFID) {
			$http.get('/About' + PDFID).then(function(data) {
				$window.open(data);
			});
	};
	}
}());