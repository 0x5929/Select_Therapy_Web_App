(function() {
	'use strict';



	function officeGenConfigHandler(officeGenModule) {
		//docx configurations
		var docxConfig = {
			'type': 'docx',
			'onend': onEndHandler,
			'onerr': onErrorHandler
		}

		//hander functions
		function onEndHandler(written) {
			console.log('Congrats, finished creating docx, total bytes created: ', written);
		} 

		function onErrorHandler(err) {
			console.log('Oops, an error had occured: ', err);
		}

		var configs = {
			officeGen : officeGenModule,
			docxConfig: docxConfig
		};		

		return configs;
	}


	//exposing configurations to serverjs
	module.exports = officeGenConfigHandler;

}());