var firebase = require('firebase');
var config = {
    apiKey: "/* api key here */",
    authDomain: "preppy-dev.firebaseapp.com",
    databaseURL: "https://preppy-dev.firebaseio.com",
    projectId: "preppy-dev",
    storageBucket: "preppy-dev.appspot.com",
    messagingSenderId: "642737532604"
};
firebase.initializeApp(config);
