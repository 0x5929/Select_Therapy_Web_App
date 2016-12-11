(function() {
	'use strict';

	
	module.exports = passportConfigHandler;
//exposing the passport for configuration in server, this function is to be run while required in server, 
//and b/c it doesnt hae a returned value, thus all the following code will configure passport configs
	function passportConfigHandler(passport, path) {	
			var LocalStrategy = require('passport-local').Strategy,
				User = require(path.join(__dirname, '../models/users.js'));	//note this is called, and model has already been initialize and connected with db in the db config 
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
				//async usage of process.nextTick, this following function wont fire unless req is passed
					process.nextTick(function() {
						User.findOne({'local.email': email}, function(err, user) {
							//server error
							if (err)	return done(err);	
							//if user already exists err	
							if (user)	return done(null, false, { message: 'Email Already Taken, please try again!'});	
							else {	//create new user
								var newUser = new User();
								//set new user credentials
								newUser.local.email = email;
								newUser.local.password = newUser.generateHash(password);
								newUser.local.security = req.body.signUpAs;
								//save new user
								newUser.save(function(err) {
									if (err) 
										return done(err);	//	this needs to be better implemented
									return done(null, newUser);
								});		
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
					//async usage of process.nextTick, this following function wont fire unless req is passed
					process.nextTick(function() {
						User.findOne({'local.email': email}, function(err, user){
							//server error
							if (err)	return done(err);
							//user does not exist err
							if (!user)	return done(null, false, { message: 'User email not found, please try again!'});
							//user invalid password erre
							if (!user.validPassword(password))	return done(null, false, { message: 'Invalid password, please try again!'});
							//if no errors exist, return user as authenticated
							return done(null, user);
						});
					});
				}));
	};
}());