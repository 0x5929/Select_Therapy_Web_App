(function() {
	'use strict';
	//this whole route can be encapsulated into smaller files
	module.exports = adminRouterHandler;
	function adminRouterHandler (express, app, path, bodyParser, officeGenDocxConstruct, configOG, 
								signInSheetService, contactListService, googleSheetService) {

		var adminRoute = express.Router();	//initialize router
		var STIDbStudentCollection = require(path.join(__dirname, '../../models/students.js'));	//load database collection
		//set up tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		//main Routes and Methods
		adminRoute.get('/search', adminSearchGetHandler);
		adminRoute.get('/search/generateSignIn', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.get('/search/generateContactList', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.post('/add', adminAddPostParseMiddleware, googleDataOrganizerMiddleware, adminAddPostHandler);
		adminRoute.delete('/delete/:id', adminModifyDeleteHandler);
		
		//handler and middleware functions used in routes


/**********************************************************
ADMIN SEARCH GET HANDLER
REST: GET
***********************************************************/
		function adminSearchGetHandler(req, res, next) {
			var searchParameter = req.query.parameter;
			var searchInput = req.query.input;
			var searchProgram = req.query.program;
			var searchRotation = req.query.rotation;

			if (searchParameter && searchInput){	//if searching by student info
				if (searchParameter === 'Name') {
					searchInput = searchInput.toLowerCase();
					STIDbStudentCollection.findOne({'name': searchInput}, findNameHandler);
				}else if (searchParameter === 'email') {
						STIDbStudentCollection.findOne({'email': searchInput}, findEmailHandler);
				}else if (searchParameter === 'Phone number'){
						STIDbStudentCollection.find({'phoneNumber': searchInput}, findPhoneNumberHandler);
				}				
			}else if (searchProgram && searchRotation){	//if searching by program info
				STIDbStudentCollection.find()
					.elemMatch('program', {'programName': searchProgram, 'programRotation': searchRotation})
						.exec(findByProgramHandler);				
			}else return res.status(400).send('invalid entry').end();	//last condition for err handle

			//callback handlers
			function findNameHandler(err, user) {
				if (err) return next(err);
				if (user) return res.status(200).send(user).end();
				if (!user) return res.status(400).send('nope no user here').end();
			}

			function findEmailHandler(err, user) {
				if (err) return next(err);
				if (user) return res.status(200).send(user).end();
				if (!user) return res.status(400).send('nope no user here').end();
			}

			function findPhoneNumberHandler(err, users) {
				if (err) return next(err);
				if (users) return res.status(200).send(users).end();
				if (!users) return res.status(400).send('nope no user here').end();
			}

			function findByProgramHandler(err, results) {
				if (err) return next(err);
				if (results) return res.status(200).send(results).end();
				if (!results)	return res.status(400).send('oops, something went wrong here in server/db').end();

			}

		}




/*********************************************************************************
ADMIN SEARCH GET SIGN IN SHEET HANDLER + HEADER MIDDLEWARE + OFFICEGEN MIDDLEWARE
REST: GET
**********************************************************************************/

		function headerMiddleware(req, res, next) {
			//grabbing functionality params
			var functionality = req.query.functionality;
			//route check
			if (functionality === 'signInSheet') {
				//setting the content type, and content disposition
				res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');	//setting the content type to header 
				res.setHeader('Content-disposition', 'attachment; filename=Sign_In_Sheet.docx');				
			}else if (functionality === 'contactList') {
				res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');	//setting the content type to header 
				res.setHeader('Content-disposition', 'attachment; filename=Contact_List.docx');				
			}
			

			next();			
		}


		function officeGenGetHandlerMiddleware(req, res, next) {
			//grabbing all params from client
			var studentNames    = req.query.studentNames;	
			var programName     = req.query.programName;
			var programRotation = req.query.programRotation;
			var functionality   = req.query.functionality;
			
			//document settings: 
			var documentSetting = {
				signInSheetDocDescription: 'Sign_In_Sheet',
				signInSheetDocSubject    : 'Sign_In_Sheet',
				signInSheetDocKeywords   : 'Sign_In_Sheet',
				contactListDocDescription: 'Contact_List',
				contactListDocSubject    : 'Contact_List',
				contactListDocDescription: 'Contact_List',
				examEmploymentSheetName  : 'Exam_Employment'
			};

			//headParagraph setting
			var headerParagraphSetting = {
				alignment  : 'center',
				boldSetting: true,
				fontFace   : 'Times New Roman',
				fontSize   : 20,	//MS Font size standard,,
				companyName: 'Select Thearpy Instiute, Inc',
				title      : evaluateTitle
			};

			function evaluateTitle(evaulatedProgramName) {
				switch (evaulatedProgramName) {
					case 'CNA' :	return 'Nurse Assistant Program';
					case 'HHA' :	return 'Home Health Aide Program';
					case 'SG'  :	return 'Security Guard Program';
					case 'ESOL':	return 'ESOL Program';
				}
			}			

			if (functionality === 'signInSheet') {
				var signInSheetDoc = new officeGenDocxConstruct(configOG.officeGen, configOG.docxConfig).myDoc();
				signInSheetDoc.setDocSubject(documentSetting.signInSheetDocDescription);
				signInSheetDoc.setDocKeywords(documentSetting.signInSheetDocSubject);
				signInSheetDoc.setDescription(documentSetting.signInSheetDocKeywords);	

				var headerParagraph           = signInSheetDoc.getHeader().createP();
				headerParagraph.options.align = headerParagraphSetting.alignment;
				headerParagraph.addText(headerParagraphSetting.companyName, //select therapy institute, inc
					{
						bold: headerParagraphSetting.boldSetting, 
						font_face: headerParagraphSetting.fontFace, 
						font_size: headerParagraphSetting.fontSize
					});
				headerParagraph.addLineBreak();
				headerParagraph.addText('Sign-In Sheet for ' + headerParagraphSetting.title(programName), 
					{
						bold: headerParagraphSetting.boldSetting, 
						font_face: headerParagraphSetting.fontFace, 
						font_size: headerParagraphSetting.fontSize
					});

				//fetch table service:
				var signInSheetHeaderTable = signInSheetService.signInSheetHeaderTable();			
				signInSheetDoc.createTable(signInSheetHeaderTable.tableContent, signInSheetHeaderTable.tableStyle);	//header table generate
				var spacingParagraph       = signInSheetDoc.createP();		// spacingParagraph.addLineBreak();
				var signInSheetBodyTable   = signInSheetService.signInSheetBodyTable(studentNames);
				signInSheetDoc.createTable(signInSheetBodyTable.tableContent, signInSheetBodyTable.tableStyle);	//body table generate'			
			
				signInSheetDoc.generate(res);	

				setTimeout(function() {	
					res.status(200).end();
				}, 3000);	

			}else if (functionality === 'contactList') {
				var contactListDoc = new officeGenDocxConstruct(configOG.officeGen, configOG.docxConfig).myDoc();
				contactListDoc.setDocSubject(documentSetting.contactListDocDescription);
				contactListDoc.setDocKeywords(documentSetting.contactListDocSubject);
				contactListDoc.setDescription(documentSetting.contactListDocDescription);

				//header paragraph
				var headerParagraph           = contactListDoc.getHeader().createP();
				headerParagraph.options.align = headerParagraphSetting.alignment;
				headerParagraph.addText(headerParagraphSetting.companyName, //select therapy institute, inc
					{
						bold: headerParagraphSetting.boldSetting, 
						font_face: headerParagraphSetting.fontFace, 
						font_size: headerParagraphSetting.fontSize
					});
				headerParagraph.addLineBreak();
				headerParagraph.addText('Rotation #' + programRotation + ' Contact List', 
					{
						bold: headerParagraphSetting.boldSetting, 
						font_face: headerParagraphSetting.fontFace, 
						font_size: headerParagraphSetting.fontSize
					});	
				//fetch table service:	
				var bodyTable = contactListService.contactListBodyTable(studentNames);
				contactListDoc.createTable(bodyTable.tableContent, bodyTable.tableStyle);
				contactListDoc.generate(res);	

				setTimeout(function() {	
					res.status(200).end();
				}, 3000);	

			}	

		}

/**********************************************************
ADMIN ADD HANDLER + PARSE MIDDLEWARE
REST: ADD
***********************************************************/

/*
	THE LOGIC AS FOLLOWS: 
		1. GOOGLE AUTH FIRST
		2. DATA SENT BACK TO SERVER
		3. SYNC WITH GOOGLE SHEET: APPEND
		4. GRAB RESPOND BODY: ROW NUMBER
		5. SAVE ROW NUMBER AND ALL OTHER KEYS TO DB
		6. ONCE MODIFYING, GRAB ROW NUMBER, AND SYNC GOOGLE: UPDATE
		7. ONCE NEW YEAR, SYNC GOOGLE: CREATE NEW SHEET FOR THE YEAR
*/


		function adminAddPostParseMiddleware(req, res, next) {
			var requestBody           = req.body;
			//parse all neccessary fields to be correctly input into db
			requestBody.firstName     = requestBody.firstName.toLowerCase();	//make sure the input names are lowercase into the database
			requestBody.lastName      = requestBody.lastName.toLowerCase();	
			requestBody.phoneNumber   = Number(requestBody.phoneNumber);
			requestBody.ssn           = Number(requestBody.ssn);
			requestBody.payRate       = Number(requestBody.payRate);
			requestBody.numberOfTries = Number(requestBody.numberOfTries);
			requestBody.graduate      = Boolean(requestBody.graduate);
			requestBody.tuitionPaid   = Boolean(requestBody.tuitionPaid);
			requestBody.jobPlaced     = Boolean(requestBody.jobPlaced);
			requestBody.passedExam    = Boolean(requestBody.passedExam);
			if (requestBody.originalName)
				requestBody.originalName = requestBody.originalName.toLowerCase();
			else requestBody.originalName = requestBody.firstName + ' ' + requestBody.lastName;
			requestBody.program.forEach(function(eachProgram) {	//this is to ensure all programs entered into db is capitalized
				eachProgram.programName = eachProgram.programName.toUpperCase();
			});
			//calling next to further handle request
			next();
		}

		//regardless whether it was new or existing students, there will always be a set of google data
		function googleDataOrganizerMiddleware(req, res, next) {	// ALL DATA FROM CLIENT NEEDS TO BE FORMATTED IN HERE TO BE SYNCED WITH GOOGLE
																	//COULD BE PLACED IN GOOGLE'S SERVICE
			var returnedData = [];
			var googleData = req.body.googlePostData;
			console.log(googleData);
			//clean up google data
			//get spreadSheet data
			var performanceReport = googleData.annualReport;	//[] form
			var STRF = googleData.STRF;	// [] form
			// var course = performanceReport.course;	//[] form
			for (var index = 0; index < performanceReport.length; index++){	// FOR PERFORMANCE REPORTS
				if (performanceReport[index]['course'] === 'Nurse Assistant'){
					//initialize sheet data
					var CNAPerformanceReport           = performanceReport[index];
					//set appropriate fields
					CNAPerformanceReport.title         = 'CNAPerformance';
					CNAPerformanceReport.spreadsheetID = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';	//need to be changed for production mode	
					//push data to returned
					returnedData.push(CNAPerformanceReport);
				}else if (performanceReport[index]['course'] === 'Home Health Aide'){
					var HHAPerformanceReport           = performanceReport[index];
					HHAPerformanceReport.title 		   = 'HHAPerformance';
					HHAPerformanceReport.spreadsheetID = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';	//need to be changed for production mode	
					//push data into returned array
					returnedData.push(HHAPerformanceReport);
				}else if (performanceReport[index]['course'] === 'Security Guard'){
					var SGPerformanceReport           = performanceReport[index];
					SGPerformanceReport.title         = 'SGPerformance';
					SGPerformanceReport.spreadsheetID = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';
					//push data into returned array
					returnedData.push(SGPerformanceReport);
				}else if (performanceReport[index]['course'] === 'ESOL'){
					var ESOLPerformanceReport           = performanceReport[index];
					ESOLPerformanceReport.title         = 'ESOLPerformance';
					ESOLperformanceReport.spreadsheetID = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';
					//push data into returned array
					returnedData.push(ESOLPerformanceReport);
				}				
			}
			for (var i = 0; i < STRF.length; i++){	//FOR STRF
				if (STRF[i]['course'] === 'Nurse Assistant'){
					//initialize sheet data
					var CNASTRF                        = STRF[i];
					//set appropriate fields
					CNASTRF.title 					   = 'CNASTRF';
					CNASTRF.spreadsheetID              = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';
					//push data to returned
					returnedData.push(CNASTRF);
				}else if (STRF[i]['course'] === 'Home Health Aide'){
					var HHASTRF                        = STRF[i];	
					HHASTRF.title                      = 'HHASTRF';
					HHASTRF.spreadsheetID              = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';
					//push data to be returned
					returnedData.push(HHASTRF);
				}else if (STRF[i]['course'] === 'Security Guard'){
					var SGSTRF                        = STRF[i];
					SGSTRF.title                      = 'SGSTRF';
					SGSTRF.spreadsheetID              = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';
					//push data to be returned
					returnedData.push(SGSTRF);
				}else if (STRF[i]['course'] === 'ESOL'){
					var ESOLSTRF                        = STRF[i];
					ESOLSTRF.title                      = 'ESOLSTRF';
					ESOLSTRF.spreadsheetID              = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';
					//push data to be returned
					returnedData.push(ESOLSTRF);
				}				
			}
			//calling next
			req.adminPost = {};
			req.adminPost.googleData = returnedData;
			console.log(returnedData);
			next();
		}

		function adminAddPostHandler(req, res, next) {
			var SheetHelper = googleSheetService.sheetHelper;
			var auth        = req.get('Authorization');
			var googleData  = req.adminPost.googleData;	//format: [{cnaperformance}, {cnastrf}, {hhaperformance}, {hhastrf}, ...]
			// var sheetID     = '1b1POFNjX4xlzbtplTZoDwhStOnPajx78Aebmjdvj4wo';
			if (!auth)	return next('error: Authorization required');
			var accessToken = auth.split(' ')[1]; 	//grabbing token after bearer
				//loading google helper
			var helper = new SheetHelper(accessToken);	//need to create sheethelper and load it in routes

			console.log('HELLO WORLD ORIGINAL NAME: ', req.body.originalName);

			STIDbStudentCollection.findOne({'name': req.body.originalName}, databaseQueryHandler);

			//callback handlers
			function databaseQueryHandler(err, user) {
				if (err) return next(err);
				if (user) {
					var DBgoogleData = user.googleData; //[] form
					helper.syncData(googleData, DBgoogleData, googleSyncDataHandler, dbUpdateHandler);
				}
				if (!user) {	
					//this needs to depend on how many sheets needs to be appended
					//adding google data [] for db onto request body
					console.log('DOES THIS GET RUN? 348', googleData);
					req.body.google = [];
					helper.appendValue(googleData,	googleAppendValueHandler, dbAddHandler);
				}

				function googleSyncDataHandler(err, successResponse) {
					if (err) next(err);
					console.log('YAYY SUCCESS RESPOSNE: ', successResponse);
				}

				function dbUpdateHandler(dataLengh, index) {
					if (index === (dataLengh - 1)){
						for (var userKey in user){	//update user
							for (var requestKey in req.body){
								if (userKey === requestKey)
									user[userKey] = req.body[requestKey];
							}
							if (userKey === 'name')	//updating the name property
								user[userKey] = req.body.firstName + ' ' + req.body.lastName;
						}
						user.save(userUpdatedHandler);
					}
	
					function userUpdatedHandler (err) {
						if (err)	return next(err);
						else return res.status(200).send('STUDENT UPDATED').end();
					}

				}


				function googleAppendValueHandler (err, successResponse, googleDataforDB) {
					if (err) return next(err);
					console.log(successResponse);
					var updatedRange = successResponse.updates.updatedRange;
					googleDataforDB.range = updatedRange;
					//adding google data in request body
					console.log('HELLO WORLD GOOGLE DB STUFF: ', googleDataforDB);
					return req.body.google.push(googleDataforDB);
				}

				function dbAddHandler(dataLength, index) {
					if (index === (dataLength - 1)){
						//initiate db call
						var newStudent           	   = new STIDbStudentCollection();
							newStudent.enrollmentDate  = req.body.enrollmentDate;
							newStudent.studentID       = req.body.studentID;
							newStudent.firstName       = req.body.firstName;
							newStudent.lastName        = req.body.lastName;
							newStudent.name            = req.body.firstName + ' ' + req.body.lastName;
							newStudent.phoneNumber     = req.body.phoneNumber;
							newStudent.ssn             = req.body.ssn;
							newStudent.address         = req.body.address;
							newStudent.email           = req.body.email;
							newStudent.program         = req.body.program;	//will include everything else such as graduate, exam status, payment status
							newStudent.marketingSurvey = req.body.marketingSurvey;	
							newStudent.googleData      = req.body.google;	
						//save the new student
						newStudent.save(newUserSavedHandler);
							console.log('HELLO WORLD NEW STUDENT: ', newStudent);
						function newUserSavedHandler (err) {
							if (err) return next(err);
							else return res.status(200).send('newStudent added').end();	
						}
					}else 	return;

				}

			}
		}

/**********************************************************
ADMIN MODIFY DELETE HANDLER
REST: DELETE
***********************************************************/

		function adminModifyDeleteHandler(req, res, next) {
			var deleteID = req.params.id;
			
			STIDbStudentCollection.findByIdAndRemove(deleteID, function(err) {
				if (err)	return next(err);
				res.status(200).send('testing signal success').end();
			});

		}



		return adminRoute;

	}
	
}());