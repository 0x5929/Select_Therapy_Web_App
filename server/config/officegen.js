(function() {
	'use strict';

	


	// function officeGenConfigHandler(officeGenerator){


	// 	//exposed to server.js

	// 	var configs = {

	// 		docxConfig: docxConfig,
	// 		officeGenSetup : officeGenSetup
	// 	};

	// 	return configs;

	// }
	//docx configurations
	var docxConfig = {
		'type': 'docx',
		'onend': onEndHandler,
		'onerr': onErrorHandler
	}

	//the config object exposed to server
	//could also include, powerpoint, excel configs as well
	var configs = {
		docxConfig: docxConfig
	};

	//hander functions
	function onEndHandler(written) {
		console.log('Congrats, finished creating docx, total bytes created: ', written);
	} 

	function onErrorHandler(err) {
		console.log('Oops, an error had occured: ', err);
	}

	//exposing configurations to serverjs
	module.exports = configs;

}());