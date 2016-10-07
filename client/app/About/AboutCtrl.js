(function() {
	'use strict';

	angular.module('myApp.About', [])
		.controller('AboutCtrl', ['$scope', '$http', AboutCtrl]);

		//we should use controller as syntax for all controllers, fix it when have time
		function AboutCtrl($scope, $http) {
		$scope.openPDF = function(PDFID) {
			/*The response type needs to be set here because default is json
			and if not json data type then the pdf file will not properly.
			Now we set the responseType to arraybuffer becuase now it will buffer 
			the sets of data or data in an array <-- i think lol 
			*/
			//THIS SERVICE COULD BE MORE ENCAPSULATED WITH A FACTORY? <-- which will do the service a controller needs!!
			//$http.get method's first parameter sends the get signal to server for what path, and the PdfID is passed in from about.html
			$http.get('/About' + PDFID, {responseType: 'arraybuffer'}).success(function(data) {
				//lets create a blob object with the response data from server, and indicate the type
				var file = new Blob([data], {type: 'application/pdf'});
				//now lets create a random URL for that var file of blob object of our pdf file
				var fileURL = URL.createObjectURL(file);
				//now lets open this file's url in another tab; using window.open(url Path);
				window.open(fileURL);
					/*this will be blocked by Ad blockers, so must think of a smooth solution
				where it can work around it. such as alert before or after to user to add
				webstite to their good list.*/
			});
	};
	}
}());