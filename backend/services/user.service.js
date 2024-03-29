var admin = require('../firebase/admin.js');
var database = require('../firebase/db');
var firebase = require('../firebase/firebase');

exports.create = function(user, next) {
	admin.admin.auth().createUser({
		email: user.email,
		emailVerified: false,
		phoneNumber: user.phoneNumber,
		password: user.password,
		displayName: user.displayName,
		photoUrl: user.photoUrl,
		disabled: false
		})
		.then(function(userRecord) {
			console.log("Successfully created new user:", userRecord.uid);
			next(userRecord);
		})
		.catch(function(error) {
			console.log("Error creating new user:", error);
			next(null, error);
		});
}

exports.get = function(uid, next) {
	admin.admin.auth().getUser(uid)
  		.then(function(userRecord) {
    		console.log("Successfully fetched user data:", userRecord.toJSON());
    		next(userRecord);
  		})
  		.catch(function(error) {
    		console.log("Error fetching user data:", error);
  		});
}

exports.login = function(email, password, next) {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(user) {
			next(user);
		})
		.catch(function(error) {
			console.log("Error logging in");
			next(null, error);
		})
}
