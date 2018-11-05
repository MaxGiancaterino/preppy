var database = require('../firebase/db');
var firebase = require('../firebase/firebase');
var admin = require('../firebase/admin');
module.exports = function(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.status(401).end();
	}
}