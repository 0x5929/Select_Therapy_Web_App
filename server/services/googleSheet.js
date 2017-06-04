(function() {

	'use strict';

	module.exports = googleSheetService;

	function googleSheetService(googleapi, googleAuth) {
		var service = {
			sheetHelper: sheetHelperHandler	//constructor with google api sheets obj by using this.service
											//all newly constructed obj from sheethelper will have its own individual google sheet with its own auth token
											//but all newly constructed obj from sheethelper will share the protrotype functions such as create, and sync spreadsheet
		}
		function sheetHelperHandler(accessToken) {
			var authClient   = new googleAuth();
			var auth         = new authClient.OAuth2();
			auth.credentials = {
				access_token: accessToken
			};
			this.service = googleapi.sheets({version: 'v4', auth: auth});
		};

		//adding prototype for sheetHelper
		service.sheetHelper.prototype.syncData = syncDataHandler;

		function syncDataHandler(spreadsheetID, sheetID, callback) {
			//google sheets api
			var request = {
				spreadsheetID: '',	//update placeholder value
				resource: {
					//how the input data should be interpreted
					valueInputOption: '',//update placeholder value
					data: []	// update placeholder value
					//could add more desired properties to request body
				},
				//auth: taken care of in the this.service
			};

			this.service.batchUpdate(request, function(err, response) {
				if (err) {
					console.log('HELLO WORLD ERR AT GOOGLESHEETJS LINE 40: ', err);
					return callback(err);
				}
				return callback(null, response);
			});

		
		}

		return service;
	}


}());