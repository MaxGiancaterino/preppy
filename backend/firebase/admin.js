var admin = require("firebase-admin");
var serviceAccount = require("./preppy-key.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

var firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
exports.database = firestore;
exports.admin = admin;