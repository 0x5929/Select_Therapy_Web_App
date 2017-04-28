(function() {
	'use strict';

	//exposing configurations to serverjs
	module.exports = officeGenConfigHandler;
	
	function officeGenConfigHandler(officeGenModule) {
		//docx configurations
		var docxConfig = {
			'type' : 'docx',
			'onend': onEndHandler,
			'onerr': onErrorHandler
		}

		//adding excel sheets config
		var xlsxConfig = {
			'type' : 'xlsx',
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
			docxConfig: docxConfig,	//add excel sheet config into the obj to be exposed
			xlsxConfig: xlsxConfig
		};		

		return configs;
	}


}());