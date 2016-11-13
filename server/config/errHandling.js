(function() {
	'use strict';

	function errHandling(err, req, res, next) {
		  if (res.headersSent) 
    			return next(err);
    	console.log(err);
		res.status(500).send(err.msg);
	}
	module.exports = errHandling;
}());