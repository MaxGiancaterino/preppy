var express = require('express')
	, router = express.Router()
	, accountService = require('../services/account.service');

router.post('/', function (req, res) {
	var account = req.body;
	accountService.create(account);
});

router.get('/:uid', function (req, res) {
	var username = req.params.uid;
	accountService.get(username, function (snapshot) {
		res.send(snapshot);
	});
});

router.delete('/:uid/recipe/:id', function (req, res) {
	var uid = req.params.uid;
	var recipeId = req.params.id;
	accountService.removeRecipe(uid, recipeId, function(error) {
		if (error) {
			res.send(error);
		} else {
			res.send("Removed recipe "+ recipeId + " from queue");
		}
	});
});

router.post('/:uid/recipe/:id', function (req, res) {
	var uid = req.params.uid;
	var recipeId = req.params.id;
	accountService.addRecipe(uid, recipeId, function(resp, error) {
		if (error) {
			res.send(error);
		} else {
			res.send(resp);
		}
	});
});


module.exports = router;