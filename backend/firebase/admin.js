var admin = require("firebase-admin");
var serviceAccount = require("./preppy-key.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://preppy-dev.firebaseio.com", 
});

module.exports = admin;