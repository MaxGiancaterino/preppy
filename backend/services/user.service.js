var admin = require('../firebase/admin.js');

exports.create = function(user, next) {
	admin.auth().createUser({
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

exports.update = function() {
}

exports.get = function(uid, next) {
	admin.auth().getUser(uid)
  		.then(function(userRecord) {
    		console.log("Successfully fetched user data:", userRecord.toJSON());
    		next(userRecord);
  		})
  		.catch(function(error) {
    		console.log("Error fetching user data:", error);
  		});
}

exports.delete = function(id, next) {
	admin.auth().deleteUser(id)
	  	.then(function() {
	    	console.log("Successfully deleted user");
	    	next(null);
	  	})
	  	.catch(function(error) {
	    	console.log("Error deleting user:", error);
	    	next(error);
	  	});
}