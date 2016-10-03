//Set Up
// need to read more about express and its functions. 10/01/2016
var express = require('express'); //requiring the express module
var app = express(); //creating our application with express
var port = process.env.PORT || 8080; //set the port
//Configuration
app.use(express.static("../client")); //setting up the static file location
//GET REQUESTS FOR PDF FILES
app.get('/About/:id', function(req, res) {
	var id = req.params.id; //grabbing the ID, ie: School_Catalog
	console.log(id);//Terminal: School_Catalog
	//now just got to fetch the PDF based on the ID
	//and send it back to client
});
//listen (starting our application with node server.js)
app.listen(port);
console.log("magic happens on port: " + port);