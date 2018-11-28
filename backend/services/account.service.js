var database = require('../firebase/db');

/*

	"users": {
		"nalvelo": {
			"name": "Nikolas Alvelo",
			"email": "nalvelo@seas.upenn.edu",
			""
		}
	}


*/

exports.create = function(userData, next) {
	var user = {
		name: userData.displayName,
		email: userData.email,
		phoneNumber: userData.phoneNumber,
		cookingQueue: [-1],
		weeklyBudget: 0.00,
		photoUrl: userData.photoURL,
		uid: userData.uid
	};
	database.ref('users/' + userData.uid)
		.set(user)
		.then(function(acc) {
			next(user);
		}).catch(function(err) {
			next(null, err);
		});
}

exports.get = function(uid, next) {
	database.ref('/users/' + uid)
			.once('value')
			.then(function(snapshot) {
				next(snapshot.val());
			});
}