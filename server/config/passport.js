(function() {
	'use strict';

	var LocalStrategy = require('passport-local').Strategy,
		User = require('../models/users.js');	//note this is called, and model has already been initialize and connected with db in the db config 
	module.exports = function(passport) {	//exposing the passport for configuration in server, this function is to be run while required in server, and will thus all the following code will configure passport configs
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
					console.log(req.body);
					process.nextTick(function() {
						User.findOne({'local.email': email}, function(err, user) {
							if (err){
								console.log('hello world from server error');
								return done(err);	//server error
							}
							if (user){
								console.log('hello world from already taken user');
								return done(null, false, { message: 'Email Already Taken, please try again!'});	// req.flash fucked up the status code, beware
							}else if (password === req.body.confirmPassword) {	//	need to seperate this into validator middleware
									console.log('hello world from new user');
									//create new user
									var newUser = new User();
									//set new user credentials
									console.log('hello world from new user created');
									newUser.local.email = email;
									console.log(newUser.local.email);
									newUser.local.password = newUser.generateHash(password);
									console.log(newUser.local.password);
									//save new user
									newUser.save(function(err) {
										if (err) 
											handleError(err);
										return done(null, newUser);
									});		
							}else {
								console.log('hello world from mismatch password');
								return done(null, false, { message: 'Oops, your passwords are not matching, please try again!'});
							}
						});
					});
				}));
					
		

			//local sign in configuration
			passport.use('local-signin', new LocalStrategy({
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},
				function(req, email, password, done) {
					User.findOne({'local.email': email}, function(err, user){
						if (err){
							console.log('hello world from passportjs signin server err: ', err);
							return done(err);
						}
						if (!user){
							console.log('hello world from passporjs signin user not found err');
							return done(null, false, { message: 'User email not found, please try again!'});
						}
						if (!user.validPassword(password)){
							console.log('hello world from passporjs signin invalid password err');
							return done(null, false, { message: 'Invalid password, please try again!'});
						}
						return done(null, user);
					});
				}));
	};
}());