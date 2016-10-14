(function() {
	'use strict';

	var LocalStrategy = require('passport-local').Strategy,
		User = require('../models/users.js');
//exposing the passport configuration back to the server
	module.exports = function(passport) {

		//passport session set up
		//used for persistent log in sessions
		passport.serializeUser(function(user, done) {
			done(null, user.id);
		});
		passport.deserializeUser(function(id, done) {
			User.findById(id, function(err, user) {
				done(err, user);
			});
		});

		//local sign up configuration
		passport.use('local-signup', new LocalStrategy({
			//overiding passport default with options obj
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true //passes the req obj to the callback in LocalStrategy
		}, 
			function(req, email, password, done) {
			//async usage of process.nextTick, think about why we need it? 
				process.nextTick(function() {
					User.findOne({'local.email': email}, function(err, user) {
						if (err)	//server error
							return done(err);
						if (user){
							return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
						} else {
							var newUser = new User();
							newUser.save(function(err) {
								if (err) 
									throw err;
								return done(null, newUser);
							});
						}
					});
				});	
			}
		));

		//local sign in configuration
		passport.use('local-signin', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
			function(req, email, password, done) {
				User.findOne({'local.email': email}, function(err, user){
					if (err)
						return done(err);
					if (!user)
						return done(null, false, req.flash('loginMessage', 'No User Found!'));
					if (!user.validPassword(password))
						return done(null, false, req.flash('loginMessage', 'Invalid Password!'));
					return done(null, user);
				});
			}
		));
	};
}());