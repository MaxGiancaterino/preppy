var database = require('../firebase/db');

exports.create = function(userData, next) {
	var user = {
		displayName: userData.displayName,
		username: userData.email,
		phoneNumber: userData.phoneNumber,
		cookingQueue: [-1],
		weeklyBudget: 0,
		remainingBudget: 0,
		avatar: userData.photoURL,
		userId: userData.uid
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


exports.removeRecipe = function(uid, id, next) {
	if (id === "-1") {
		return next(null, "Invalid id");
	} else {
		database.ref('/users/' + uid + '/cookingQueue')
				.once('value')
				.then(function(snapshot) {
					var queue = snapshot.val();
					var ix = parseInt(id, 10);
					var newQueue = queue.filter(rid => rid !== ix);
					database.ref('/users/' + uid + '/cookingQueue')
							.set(newQueue)
							.then(function(res) {
								next(newQueue);
							}).catch(function(err) {
								next(null, err);
							});
				});
	}
}

exports.addRecipe = function(uid, id, next) {
	if (id === -1) {
		return next(null, "Invalid id");
	}
	database.ref('/users/' + uid + '/cookingQueue')
			.once('value')
			.then(function(snapshot) {
				var queue = snapshot.val();
				if (queue.includes(parseInt(id, 10))) {
					next(null, "Duplicate id");
				} else {
					queue.push(parseInt(id, 10));
					queue.sort();
					database.ref('/users/' + uid + '/cookingQueue')
						.set(queue)
						.then(function(res) {
							next(queue);
						}).catch(function(err) {
							next(null, err);
						});
				}
			});
}