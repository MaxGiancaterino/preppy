var admin = require('./admin');
var firebase = require('./firebase');
firebase.database();
var firestore = admin.database;

module.exports = firestore;