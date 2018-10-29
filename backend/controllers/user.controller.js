var express = require('express')
	, router = express.Router()
	, userService = require('../services/user.service');

/*	{	email: String,
		phoneNumber: String,
		password: String,
		displayName: String,
		photoUrl: String, 	}
*/

router.post('/', function (req, res) {
	var user = req.body;
	console.log(user);
	userService.create(user, function(user, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(user);
		}
	});
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