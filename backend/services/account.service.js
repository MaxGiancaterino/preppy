var database = require('../firebase/db');
var admin = require('../firebase/admin.js');

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
	database.doc('user/' + userData.uid + '/data/data').set(user).then();
	var cart = {cart: [{ingredient: "null", count: -1, unit: "null"}]};
	database.doc('user/' + userData.uid + '/data/cart').set(cart).then();
    var pantry = {pantry: [{ingredient: "null", count: -1, unit: "null"}]};
    database.doc('user/' + userData.uid + '/data/pantry').set(pantry).then();
    var schedule = {schedule: [{itemType: "null", mealType: "null", recipeId: -1, scheduledDate: "null"}]};
    database.doc('user/' + userData.uid + '/data/schedule').set(schedule).then();
    next(user);
}

exports.get = function(uid, next) {
	database.doc('user/' + uid + '/data/data')
			.get()
			.then(function(doc) {
				next(doc.data());
			});
};


exports.removeRecipe = function(uid, id, next) {
	if (id === "-1") {
		return next(null, "Invalid id");
	} else {
		database.doc('/user/' + uid + '/data/data')
				.update( {
					cookingQueue: admin.admin.firestore.FieldValue.arrayRemove(id)
				});
		next(id);
	}
};

exports.addRecipe = function(uid, id, next) {
	if (id === -1) {
		return next(null, "Invalid id");
	}
	database.doc('/user/' + uid + '/data/data')
			.update({
				cookingQueue: admin.admin.firestore.FieldValue.arrayUnion(id)
			});
};

exports.getCart = function(uid, next) {
  database.doc('/user/' + uid + '/data/cart')
          .get()
          .then(function(doc) {
            next(doc.data(), null);
          })
          .catch(function(err) {
            next(null, err);
          });
};

exports.updateCart = function(uid, cart, next) {
  database.doc('/user/' + uid + '/data/cart')
          .update({cart: cart}).then(next(cart));
};

exports.getPantry = function(uid, next) {
  database.doc('/user/' + uid + '/data/pantry')
          .get()
          .then(function(doc) {
            next(doc.data(), null);
          })
          .catch(function(err) {
            next(null, err);
          });
};

exports.updatePantry = function(uid, pantry, next) {
  database.doc('/user/' + uid + '/data/pantry')
          .update({pantry: pantry}).then(next(pantry));
};

exports.getSchedule = function(uid, next) {
	database.doc('/user/' + uid + '/data/schedule')
			.get()
			.then(function(doc) {
				next(doc.data(), null);
			})
			.catch(function(err) {
				next(null, err);
			});
};

exports.updateSchedule = function(uid, schedule, next) {
	database.doc('/user/' + uid + '/data/schedule')
			.update({schedule: schedule}).then(next(schedule));
};