var express = require('express')
	, router = express.Router()
	, userService = require('../services/user.service')
	, accountService = require('../services/account.service');

router.post('/', function (req, res) {
	var user = req.body;
	user.photoUrl = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
	userService.create(user, function(user, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			accountService.create(user, function(account, err) {
				if (err) {
					res.send(err);
				} else {
					res.send(account);
				}
			});
		}
	});
});

router.post('/login', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	userService.login(email, password, function(account, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(account);
		}
	});
});

router.get('/:uid', function (req, res) {
	var uid = req.params.uid;
  	userService.get(uid, function(user, error) {
  		if (error) {
  			console.log(error);
  			res.send(error);
  		} else {
  			res.send(user);
  		}
  	});
});

module.exports = router;