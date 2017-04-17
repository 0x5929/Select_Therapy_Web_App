(function() {
	'use strict';
	//this whole route can be encapsulated into smaller files
	module.exports = adminRouterHandler;
	function adminRouterHandler (express, app, path, bodyParser, officeGenDocx) {

		var adminRoute = express.Router();	//initialize router
		var STIDbStudentCollection = require(path.join(__dirname, '../../models/students.js'));	//load database collection
		//set up tools
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		//main Routes and Methods
		adminRoute.get('/search', adminSearchGetHandler);
		adminRoute.get('/search/generateSignIn', headerMiddleware, officeGenMiddleware, finalHandler);
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
			//setting the content type, and content disposition
			res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');	//setting the content type to header 
			res.setHeader('Content-disposition', 'attachment; filename=Sign_In_Sheet.docx');
			next();			
		}

		function officeGenMiddleware(req, res, next) {
			//this is the middleware to do all the work with officegen
			var studentNames = req.query.studentNames;
			console.log('testing in server to see if array came thru: ', studentNames);	//test success, it did came thru
			//using officeGenDocx to add paragraphs, and tables for sign in sheet
			officeGenDocx.setDocSubject('Sign_In_Sheet');
			officeGenDocx.setDocKeywords('Sign_In_Sheet');
			officeGenDocx.setDescription('Sign_In_Sheet');
			//header paragraph
			var headerParagraph = officeGenDocx.createP();
			headerParagraph.options.align = 'center';
			headerParagraph.addText('Select Therapy Institute, Inc', {bold: true, font_face: 'Times New Roman', font_size: 20});
			headerParagraph.addLineBreak();
			// headerParagraph.addText('2209 N. San Gabriel Blvd., Suite C ', {font_face: 'Times New Roman', font_size: 16});
			// headerParagraph.addLineBreak();
			// headerParagraph.addText('Rosemead, CA 91770', {font_face: 'Times New Roman', font_size: 16});
			// headerParagraph.addLineBreak();
			// headerParagraph.addText('Tel: 626-572-7231 Fax: 626-572-7377', {font_face: 'Times New Roman', font_size: 16});
			// headerParagraph.addLineBreak();
			// headerParagraph.addText('E-mail: selecttherapyinstitute@gmail.com', {font_face: 'Times New Roman', font_size: 16});
			// headerParagraph.addLineBreak();
			// headerParagraph.addLineBreak();
			headerParagraph.addText('Sign-In Sheet for Nurse Assistant Program', {bold: true, font_face: 'Times New Roman', font_size: 18});
			headerParagraph.addLineBreak();
			// need to make two tables

			/******************************************************************************
				OFFICE GEN DOCX TABLE RULE
				[
					[
						{FIRST ROW FIRST CELL}, {FIRST ROW SECOND CELL}
					],[
						{SECOND ROW FIRST CELL}, {SECOND ROW SECOND CELL}
					],[
						{THIRD ROW FIRST CELL}, {THIRD ROW SECOND CELL}
					]... ETC
				]

				EACH CONTENT OBJ HAVE VAL, AND OPT PROPERTIES

				EACH TABLE STYLE OBJ IS FIRST EVALUATED WITH ITS TABLE COLUMN WIDTH,
				THEN IF THERE ARE SPECIAL WIDTH, IT NEEDS TO BE SPECIFIED IN THE CONTENT OBJ
			*********************************************************************************/


			var headerTable = [	//header table content
				[{	//first row first cell
					val: 'Date',
					opts: {
						cellColWidth: 1800,	
						rowHeight: 10000,
						// b: true,	//need to toggle to figure out what it is
						sz: 21,	//font size
						fontFamily: "Arial",
						align: 'right'
					}
				}, {	//first row second cell
					val: '',
					opts: {
						cellColWidth: 3000
					}
				}], 
				[{	//second row first cell
					val: 'Class', 
					opts: {
						cellColWidth: 1800,
						sz: 21,
						fontFamily: "Arial",
						align: "right"
					}
				}, {	//second row second cell
					val: '',
					opts: {
						cellColWidth: 3000
					}
				}],	
				[{	//third row first cell
					val: 'Time Schedule',
					opts: {
						cellColWidth: 1800,
						sz: 21,
						fontFamily: "Arial",
						align: "right"
					}
				}, {	//third row second cell
					val: '',
					opts: {
						cellColWidth: 3000
					}
				}], 
				[{	//fourth row first cell
					val: 'Instructor',
					opts: {
						cellColWidth: 1800,
						sz: 21,
						fontFamily: "Arial",
						align: "right"
					}
				}, {	//fourth row second cell
					val: '',
					opts: {
						cellColWidth: 3000
					}
				}]];

			var headerTableStyle = {	//header table style
				// tableColWidth: 2500,	//commented this out so lets see if it affects the table style
				rowHeight: "1000",
				tableSize: 500,
				tableAlign: "left",
				borders: true
			};

			officeGenDocx.createTable(headerTable, headerTableStyle);	//header table generate

			var bodyTable = [	//body tables
				[{	//first row first cell
					val: '',
					opts: {
						cellColWidth: 100
					}
				},{	//first row second cell
					val: "Student's Name",
					opts: {
						cy: 0,
						cellColWidth: 2000,
						sz: 21,
						fontFamily: 'Arial'
					},
				},{	//first row third cell
					val: "Student's Signature",
					opts: {
						cellColWidth: 2500,
						sz: 21,
						fontFamily: 'Arial'
					}
				},{
					val: "Time In",
					opts: {
						cellColWidth: 1000,
						sz: 18,
						fontFamily: 'Arial'
					}
				},{
					val: "Student's Signature",
					opts: {
						cellColWidth: 2000,
						sz: 18,
						fontFamily: 'Arial'
					}
				},{
					val: "Time Out",
					opts: {
						cellColWidth: 1000,
						sz: 18,
						fontFamily: 'Arial'
					}
				}
				],['1', '', '', '', '', ''],
				['2', '', '', '', '', ''],
				['3', '', '', '', '', ''],
				['4', '', '', '', '', ''],
				['5', '', '', '', '', ''],
				['6', '', '', '', '', ''],
				['7', '', '', '', '', ''],
				['8', '', '', '', '', ''],
				['9', '', '', '', '', ''],
				['10', '', '', '', '', ''],
				['11', '', '', '', '', ''],
				['12', '', '', '', '', ''],
				['13', '', '', '', '', ''],
				['14', '', '', '', '', ''],
				['15', '', '', '', '', ''],
				['16', '', '', '', '', '']];

			var bodyTableStyle = {	//body table styles
				// tableColWidth: 500,
				tableAlign: "center",
				borders: true
			};
		/**
		Table styles: 
		the table colwidth is evaluated first,
		then put specific cell colwidth for specific columns for custom width
		*/


			var spacingParagraph = officeGenDocx.createP();

			// spacingParagraph.addLineBreak();

			officeGenDocx.createTable(bodyTable, bodyTableStyle);	//body table generate
			next();
		}



		function finalHandler(req, res, next) {



			officeGenDocx.generate(res);	

			setTimeout(function() {	//setting timeout for res signal to end after 3 seconds, 
									//so the document can be finished building and wont be corrupted sending to client
				res.end();
			}, 3000);	
			// res.end();	//ending signal ** note, cannot call res.end() right away because it will 
												//end the signal before doc is created, 
												//and the doc will be corrupted in the front end b/c of that
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