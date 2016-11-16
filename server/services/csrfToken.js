(function() {
	'use strict';
	var csrfTokenService = {
			csrfTokenAssignment: csrfTokenAssignment,
			invalidCsrfTokenErr: invalidCsrfTokenErr
	};

	function csrfTokenAssignment(req, res, next){
		res.locals.csrfTokenFunction = req.csrfToken;
		next();
	}

	function invalidCsrfTokenErr(err, req, res, next) {
		if (err.code !== 'EBADCSRFTOKEN')	next(err);
		res.status(403).send('forms tampered with');
	}

	module.exports = csrfTokenService;
}());