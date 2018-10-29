var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.use(require('./controllers'));
var admin = require('./firebase/admin.js');

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("server listening at http://%s:%s", host, port);
});