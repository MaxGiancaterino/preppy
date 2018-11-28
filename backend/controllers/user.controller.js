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
					console.log(account);
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

router.post('/logout', function (req, res) {
	userService.logout(function (resp, err) {
		if (err) {
			console.log(err);
			res.send(err); 
		} else {
			res.send(resp.user);
		}
	})
});

router.get('/:uid', function (req, res) {
	var uid = req.params.uid;
  	console.log("Getting User: %s", uid);
  	userService.get(uid, function(user, error) {
  		if (error) {
  			console.log(error);
  			res.send(error);
  		} else {
  			res.send(user);
  		}
  	});
});

router.delete('/:uid', function (req, res) {
	var uid = req.params.uid;
	console.log("Deleting User: %s", uid);
	userService.delete(uid, function(error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send("Deleted User");
		}
	});
});



module.exports = router;