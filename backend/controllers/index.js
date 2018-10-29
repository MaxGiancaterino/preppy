var express = require('express')
	, router = express.Router()
	, User = require('../models/user.model');

router.use('/user', require('./user.controller'));

router.get('/', function(req, res) {
	console.log("Welcome to Preppy's Backend API!");
  	res.send("Welcome to Preppy's Backend API!");
});

module.exports = router;