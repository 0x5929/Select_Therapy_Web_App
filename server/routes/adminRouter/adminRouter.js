(function() {
	'use strict';
	//this whole route can be encapsulated into smaller files
	module.exports = adminRouterHandler;
	function adminRouterHandler (express, app, path, bodyParser, officeGenDocxConstruct, configOG, 
								signInSheetService, contactListService, examEmploymentService) {

		var adminRoute = express.Router();	//initialize router
		var STIDbStudentCollection = require(path.join(__dirname, '../../models/students.js'));	//load database collection
		//set up tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		//main Routes and Methods
		adminRoute.get('/search', adminSearchGetHandler);
		adminRoute.get('/search/generateSignIn', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.get('/search/generateContactList', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.get('search/generateExamEmploymentSheet', headerMiddleware, officeGenGetHandlerMiddleware);
		adminRoute.post('/add', adminAddPostParseMiddleware, adminAddPostHandler);
		adminRoute.put('/modify', adminModifyPutHandler);
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
					STIDbStudentCollection.findOne({'name': searchInput}, function(err, user) {
						if (err) return next(err);
						if (user) return res.status(200).send(user).end();
						if (!user) return res.status(400).send('nope no user here').end();
					});
				}else if (searchParameter === 'email') {
						STIDbStudentCollection.findOne({'email': searchInput}, function(err, user) {
						if (err) return next(err);
						if (user) return res.status(200).send(user).end();
						if (!user) return res.status(400).send('nope no user here').end();
					});
				}else if (searchParameter === 'Phone number'){
						STIDbStudentCollection.find({'phoneNumber': searchInput}, function(err, users) {
						if (err) return next(err);
						if (users) return res.status(200).send(users).end();
						if (!user) return res.status(400).send('nope no user here').end();
					});
				}				
			}else if (searchProgram && searchRotation){	//if searching by program info
				STIDbStudentCollection.find()
					.elemMatch('program', {'programName': searchProgram, 'programRotation': searchRotation})
						.exec(function(err, results) {
							if (err) return next(err);
							if (results) return res.status(200).send(results).end();
							console.log('testing @ adminRouter, for searching by program rotations: ', results);
						});				
			}else return res.status(400).send('invalid entry').end();	//last condition for err handle
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
			else if (functionality === 'examEmploymentSheet') {
				res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');	//setting the content type to header 
				res.setHeader('Content-disposition', 'attachment; filename=Exam_Employment.xlsx');		
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

			}else if (functionality === 'examEmploymentSheet') {
				//office gen material for exam employment sheet
				var examEmploymentSheet = new officeGenDocxConstruct(configOG.officeGen, configOG.xlsxConfig).myDoc();
				var currentSheet = examEmploymentSheet.makeNewSheet();	
				//two dimensional array currentSheet[0] = [] init
				//currentSheet[0][0] = ...setting each cells 
				//create a service that encapsulate the data in the sheet making process, and pass in student names
				setTimeout(function() {	
					res.status(200).end();
				}, 3000);	
				examEmploymentSheet.generate(res);
			}else if (functionality === 'clinicalChecklist') {
				//office gen material for clinical checklist
			}
			
		}




/**********************************************************
ADMIN ADD HANDLER + PARSE MIDDLEWARE
REST: ADD
***********************************************************/

		function adminAddPostParseMiddleware(req, res, next) {
			var requestBody = req.body;
			//parse all neccessary fields to be correctly input into db
			requestBody.name = requestBody.name.toLowerCase();	//make sure the input names are lowercase into the database
			requestBody.phoneNumber = Number(requestBody.phoneNumber);
			requestBody.ssn = Number(requestBody.ssn);
			requestBody.payRate = Number(requestBody.payRate);
			requestBody.numberOfTries = Number(requestBody.numberOfTries);
			requestBody.graduate = Boolean(requestBody.graduate);
			requestBody.tuitionPaid = Boolean(requestBody.tuitionPaid);
			requestBody.jobPlaced = Boolean(requestBody.jobPlaced);
			requestBody.passedExam = Boolean(requestBody.passedExam);
			requestBody.program.forEach(function(eachProgram) {	//this is to ensure all programs entered into db is capitalized
				eachProgram.programName = eachProgram.programName.toUpperCase();
			});
			//calling next to further handle request
			next();
		}

		function adminAddPostHandler(req, res, next) {
			STIDbStudentCollection.findOne({'name': req.body.name}, function(err, user) {
				if (err) return next(err);
				if (user) return res.status(400).send('This user already exists!').end();
				if (!user) {	//if no user, then save all the creditials from client side
					var newStudent = new STIDbStudentCollection();
					newStudent.enrollmentDate = req.body.enrollmentDate;
					newStudent.name = req.body.name;
					newStudent.phoneNumber = req.body.phoneNumber;
					newStudent.ssn = req.body.ssn;
					newStudent.address = req.body.address;
					newStudent.email = req.body.email;
					newStudent.program = req.body.program;
					newStudent.graduate = req.body.graduate;
					newStudent.tuitionPaid = req.body.tuitionPaid;
					newStudent.marketingSurvey = req.body.marketingSurvey;		
//depending on whether or not the student graduated, we save the necessary things to the db and check for pass exam and job place condition, 
//and depending on those conditions we save the necessary data into db	
					if (req.body.graduate){	//graduate condition
						newStudent.passedExam = req.body.passedExam;	//saving necesasry properties
						newStudent.jobPlaced = req.body.jobPlaced;	//saving necesasry properties
						if (req.body.passedExam)	newStudent.numberOfTries = req.body.numberOfTries;	//saving necessary properties depending on pass exam condidtion
						else	newStudent.noPassReason = req.body.noPassReason;	//saving necessary properties depending on pass exam condidtion
						if (req.body.jobPlaced){
							newStudent.weeklyWorkHours = req.body.weeklyWorkHours;	//depending on whether or not the student is employed, we save the necessary things from front end into the db
							newStudent.payRate = req.body.payRate;
							newStudent.jobDescription = req.body.jobDescription;
						}else	newStudent.noJobReason = req.body.noJobReason;	
					}
					else	newStudent.notGraduatingReason = req.body.notGraduatingReason;	//if graduate condition is not met, we then save the none graduate reason
					//save the new student
					newStudent.save(function(err) {
						if (err) return next(err);
					});
				}
			})
			return res.status(200).send('newStudent added').end();
		}




/********************************************************************************************
ADMIN MODIFY MODIFY HANDLER
REST: PUT..........................** NEED TO SEE IF WE NEED TO CHANGE THAT TO PATCH INSTEAD
*********************************************************************************************/

		function adminModifyPutHandler(req, res, next) {
			console.log(req.body);
			var requestBody = req.body;
			var modifyingKeys = Object.keys(requestBody);
			STIDbStudentCollection.findOne({'name': requestBody.originalName}, function(err, user) {
				if (err) return next(err);
				if (!user) return res.status(500).send("Database or Client side err, cannot find the user's originalName in db").end();
				if (user) {
					modifyingKeys.forEach(function(key) {
						if (key === "originalName") return;	//skipping the original name key
						user[key] = requestBody[key];	//updating the keys
						user.save(function(err, updatedUser) {
							if (err) return next(err);
						});
					});
					return res.send('updatedUser').end();			
				}
			});
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