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
		service.sheetHelper.prototype.syncData    = syncDataHandler;
		service.sheetHelper.prototype.appendValue= appendValueHandler;
		service.sheetHelper.prototype.createSheet = createSheetHandler;

		//handers: 
		function sheetHelperHandler(accessToken) {
			var authClient   = new googleAuth();
			var auth         = new authClient.OAuth2();
			auth.credentials = {
				access_token: accessToken
			};
			this.service = googleapi.sheets({version: 'v4', auth: auth});
		};


		function syncDataHandler(spreadsheetID, sheetID, data, callback) {	//all params are passed in from routes after db query
																		//could technically also pass in the post data from routes for access here
			//google sheets api
			//following is spreadsheet.value.batchupdate
			//we need spreadsheet.batchupdate
			// var request = {
			// 	spreadsheetID: '',	//update placeholder value
			// 	resource: {
			// 		//how the input data should be interpreted
			// 		valueInputOption: '',//update placeholder value
			// 		data: []	// update placeholder value
			// 		//could add more desired properties to request body
			// 	},
			// 	//auth: taken care of in the this.service
			// };
			var requests = [];
			//resize the sheet, if necessary	WE SHOULD NEVER HAVE TO RESIZE THE SHEETS BECAUSE WHEN WE CREATE IT, EACH TIME IT WILL HAVE PLENTY OF ROOM FOR ALL ROWS, AND COLUMNS WILL ALWAYS STAY THE SAME
			// var updateSheetProperties = {
			// 	updateSheetProperties: {
			// 		properties: {
			// 			sheetId: sheetID,
			// 			gridProperties: {
			// 				rowCount: NaN, 
			// 				columnCount: NaN
			// 			}
			// 		},
			// 		fields: 'gridProperties(rowCount,columnCount)'
			// 	}
			// };

			//set cell values: 
			var updateCell = {
				updateCells: {
					start: {
						sheetId    : sheetID,
						rowIndex   : NaN,	//making sure that this row index correspond with user db google row value
						columnIndex: 0
					},
					rows: buildRowData(),
					fields: '*'	//for all fields, even the empty one will have an '' value
				}
			};

			this.service.batchUpdate(request, function(err, response) {
				if (err) {
					console.log('HELLO WORLD ERR AT GOOGLESHEETJS LINE 85: ', err);
					return callback(err);
				}
				return callback(null, response);
			});

		
		}

		function createSheetHandler() {	//TODO: fill in the handler for create sheet for the new year

		}

		function appendValueHandler(spreadsheetID, data, callback) {
			var valueInputOption = 'USER_ENTERED';
			var insertDataOption = 'OVERWRITE';	//it doesnt really matter with append, it will add new row and append data
			var range            = "'test'!A1:Z50000";	//give a huge range, so it will always append to the given table inside since there is only one
			var majorDimension   = 'ROWS';

			var request = {
				spreadsheetID   : spreadsheetID,
				range           : range,	//TODO: update placeholder value
				valueInputOption: valueInputOption,
				insertDataOption: insertDataOption,
				resource        : {
					range         : range,
					majorDimension: majorDimension,
					values        : appendValues(data)
				}
				// auth: authClient	//is this necessary?
			};	

			this.service.value.append(request, function(err, response) {
				if (err){
					console.log('HELLO WORLD ERR AT GOOGLESHEETS 101: ', err);
					return callback(err);
				}
				return callback(null, response);
			});

		}
		

		//buildRowData & createHeader functionalities
		function appendValues(data) {
			var values = [];	//declaration and initialization of returned value 
			for (var spreadSheetkey in data) {	
				if (spreadSheetkey === 'annualReport'){
					for (var annualReportKey in data[spreadSheetkey]){
						values.push(data[key][annualReportKey]);
					}	
				}
			}
			return values;	//values need to be in array for  //returned value
		}
		function buildRowData() {}
		function createHeader() {}

		return service;
	}


}());