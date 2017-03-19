(function() {
	'use strict';

	var Errservices = {
			initialErrHandler: initialErrHandler,
			finalErrHandler: finalErrHandler
	};

	function initialErrHandler(err, req, res, next) {
		  if (res.headersSent) 
    			return next(err);
    	console.log(err);
    	return next();
	}

	function finalErrHandler(err, req, res, next) {
		return res.status(500).send(err.msg).end();
	}

	module.exports = Errservices;
}());