var database = require('../firebase/db');
var firebase = require('../firebase/firebase');
var admin = require('../firebase/admin');
module.exports = {
	isAuthenticated: function (req, res, next) {
		var user = firebase.auth().currentUser;
		if (user !== null) {
			req.user = user;
			next();
		} else {
			res.send("User not permitted");
		}
	}
}