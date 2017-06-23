(function() {

	'use strict';

	module.exports = googleSheetService;

	function googleSheetService(googleapi, googleAuth) {
		var service = {
			sheetHelper: sheetHelperHandler	//constructor with google api sheets obj by using this.service
											//all newly constructed obj from sheethelper will have its own individual google sheet with its own auth token
											//but all newly constructed obj from sheethelper will share the protrotype functions such as create, and sync spreadsheet
		};

		var COLUMNS = {	//TODO: replace the placeholders for each columns with format: [{field: '', header: ''}]
			CNAPerformance: [],
			HHAPerformance: [],
			SGPerformance : [],
			CNASTRF       : [],
			HHASTRF       : [],
			SGSTRF        : []
		};


		//adding prototype for sheetHelper
		service.sheetHelper.prototype.syncData      = syncDataHandler;
		service.sheetHelper.prototype.appendValue   = appendValueHandler;
		service.sheetHelper.prototype.createSheet   = createSheetHandler;
		// service.sheethelper.prototype.dataOrganizer = dataOrganizerHandler;

		//handers: 
		function sheetHelperHandler(accessToken) {
			var authClient   = new googleAuth();
			var auth         = new authClient.OAuth2();
			auth.credentials = {
				access_token: accessToken
			};
			this.service = googleapi.sheets({version: 'v4', auth: auth});
		};


		function syncDataHandler(spreadsheetID, range, data, callback) {	//all params are passed in from routes after db query
																		//could technically also pass in the post data from routes for access here
			var valueInputOption = 'USER_ENTERED';	
			var range            = range;	//give a huge range, so it will always append to the given table inside since there is only one
			var majorDimension   = 'ROWS';

			var request = {
				spreadsheetId: spreadsheetID,
				resource: {
					valueInputOption: valueInputOption,
					data            : [
						{
							range         : range,
							majorDimension: majorDimension,
							values        : [
								[
									//this is the row of data
								]
							]
						}
					]
				}

			};
			 
			this.service.spreadsheets.value.batchUpdate(request, function(err, response) {
				if (err) {
					console.log('HELLO WORLD ERR AT GOOGLESHEETJS LINE 85: ', err);
					return callback(err);
				}
				return callback(null, response);
			});

		
		}

		function createSheetHandler() {	//TODO: fill in the handler for create sheet for the new year

		}

		function appendValueHandler(data, callback) {
			var valueInputOption = 'USER_ENTERED';
			var insertDataOption = 'INSERT_ROWS';	//it doesnt really matter with append, it will add new row and append data
			var range            = "Sheet1!A1:Q50000";	//give a huge range, so it will always append to the given table inside since there is only one
			var majorDimension   = 'ROWS';
			var spreadsheetID    = data[0]['spreadsheetID'];
			var postData         = data[0];

			var request = {
				spreadsheetId   : spreadsheetID,
				range           : range,	//TODO: update placeholder value
				valueInputOption: valueInputOption,
				insertDataOption: insertDataOption,
				resource        : {
					range         : range,
					majorDimension: majorDimension,
					values        : appendValues(postData, spreadsheetID)
				}
				// auth: authClient	//is this necessary?
			};	
			console.log('HELLO WORLD TESTING: ', this.service);
			this.service.spreadsheets.values.append(request, function(err, response) {
				if (err){
					console.log('HELLO WORLD ERR AT GOOGLESHEETS 101: ', err);
					return callback(err);
				}
				return callback(null, response);
			});

		}


		/**
		* ORGANIZES THE DATA PASSED IN FROM CLIENT SIDE, ESPEICALLY THE COURSE TITLE, AND ADDED IN A SPREADSHEETID
		* maybe this whole functin needs to be a route middleware, so it can properly pass in course spreadsheetID
		* @PARAMS data passed in from client side
		* @RETURN data in array form with course properly organized, and spreadID as well
		*/
		
		function dataOrganizerHandler(data) {
			//first: grab all the course in course arr
			// for (var spreadSheetkey in data) {
			// 	if (spreadSheetkey === 'annualReport') {
			// 		for (var annualReportKey in data[spreadSheetkey]){
			// 			if (annualReportKey === 'course'){
			// 				data[spreadSheetkey][annualReportKey] = data[spreadSheetkey][annualReportKey][0];	//setting data to CNA atm
			// 				//NEED TO FIGURE OUT A BETTER WAY TO HAVE ALL THE SHEETS TO BE ORGANIZED BY ITS PROGRAM NAME 
			// 			}
			// 		}
			// 	}
			// }
			var returnedData = [];
			var performanceReport = data.annualReport;
			var STRF = data.STRF;
			if (data.annualReport && data.annualReport.course){
				for (var i = 0; i < data.annualReport.course.length; i++){
					if (data.annualReport.course[i] === 'Nurse Assistant'){
						performanceReport.course           = 'Nurse Assistant';
						performanceReport.spreadsheetID    = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';		//this can be switched to spreadsheet ID
						STRF.course                        = 'Nurse Assistant';
						STRF.spreadsheetID                 = '';
						STRF.spreadSheetTitle              = 'Nurse Assistant';
					}else if (data.annualReport.course[i] === 'Home Health Aide'){

					}else if (data.annualReport.course[i] === 'Security Guard'){

					}else if (data.annualReport.course[i] === 'ESOL'){

					}
				}
			}
			returnedData.push(performanceReport);
			returnedData.push(STRF); 	//this can be improved to have the returned data indicate which spreadsheet
										//possibly by using a switch statement
			return returnedData;
		}

		//buildRowData & createHeader functionalities
		function appendValues(data, spreadsheetID) {
			var values = [];	//declaration and initialization of returned value 
			var row = [];
			// for (var spreadSheetkey in data) {	
			// 	if (spreadSheetkey === 'annualReport'){
			// 		for (var annualReportKey in data[spreadSheetkey]){
			// 			row.push(data[spreadSheetkey][annualReportKey]);
			// 		}	
			// 	}
			// }
			// for (var spreadsheetIndex = 0; spreadsheetIndex < data.length; spreadsheetIndex++){
			// 	if (data[spreadsheetIndex]['spreadsheetID'] === spreadsheetID){
			// 		for (var propertyKey in data[spreadsheetIndex]){
			// 			if (data[spreadsheetIndex][propertyKey] === 'spreadsheetID')	continue;
			// 			row.push(data[spreadsheetIndex][propertyKey]);
			// 		}
			// 	}
			// }
			for (var key in data) {
				if (key === 'spreadsheetID')	continue;
				row.push(data[key]);
			}

			values.push(row);
			console.log(values);
			return values;	//values need to be in array for  //returned value
		}
		function buildRowData() {}
		function createHeader() {}

		return service;
	}


}());