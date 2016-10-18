(function (){
	'use strict';

	module.exports = function(express, fs) {
		//initialize router
		var aboutUsPDFRoute = express.Router();
		//config routes for router
		aboutUsPDFRoute.get('/:id', function(req, res) {
			var id = req.params.id; 	//grabbing the ID parameter
			console.log(id);	//signal test Terminal logs: School_Catalog
			var filename = __dirname + '/../../../client/app/About/' + id + '/' + id + '.pdf';		//creates the file name
			var PDFReadstream = fs.createReadStream(filename);	//create a read stream for the file
			res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');	//setting the header, content disposition, and open new tab option with inline, or download option with attachment
			res.setHeader('Content-type', 'application/pdf');	//setting the content type to header
			//use the read stream created by fs and pipe through the write stream object in response read stream obj,
			// which sends(writes) the actually data to client to be rendered. 
			PDFReadstream.pipe(res);
		});
		//expose router and all of its configed routes back to routesjs to be used in serverjs
		return aboutUsPDFRoute;
	};
}());