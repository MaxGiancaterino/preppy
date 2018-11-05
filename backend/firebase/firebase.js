var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyD-xiLUjS8VXNlgNNEihib4osYLDpFU130",
    authDomain: "preppy-dev.firebaseapp.com",
    databaseURL: "https://preppy-dev.firebaseio.com",
    projectId: "preppy-dev",
    storageBucket: "preppy-dev.appspot.com",
    messagingSenderId: "642737532604"
};
firebase.initializeApp(config);

module.exports = firebase;
