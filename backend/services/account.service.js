var database = require('../firebase/db');

/*

	"users": {
		"nalvelo": {
			"name": "Nikolas Alvelo",
			"email": "nalvelo@seas.upenn.edu"
		}
	}


*/

exports.create = function(userData) {
	database.ref('users/' + userData.username).set({
		name: userData.name,
		email: userData.email,
	});
}

exports.get = function(username, next) {
	database.ref('/users/' + username)
			.once('value')
			.then(function(snapshot) {
				next(snapshot.val());
			});
}