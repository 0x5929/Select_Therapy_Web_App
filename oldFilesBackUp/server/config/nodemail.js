(function() {
	'use strict';
	
	var smtpConfig = {
		    host: 'smtp.gmail.com',
		    port: 465,	//default port
		    secure: true, // use SSL
		    auth: {
		        user: 'work.kevin.ren@gmail.com',
		        pass: 'jordan45'
		    }
	};


	var configs = {
		smtpConfig: smtpConfig
	};
	//exposing configurations
	module.exports = configs;
}());