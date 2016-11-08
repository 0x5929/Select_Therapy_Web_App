(function() {
	'use strict';

	function errHandling(err, req, res, next) {
		  if (res.headersSent) 
    			return next(err);
		res.status(500).send(err);
	}
	module.exports = errHandling;
}());