var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.use(require('./controllers'));
var admin = require('./firebase/admin.js');
var firebase = require('./firebase/firebase.js');
var algolia = require('./firebase/algolia.js');

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server listening at http://%s:%s", host, port);
});