var express = require('express')
	, router = express.Router()
	, accountService = require('../services/account.service');

/*
	{
		"username": "-",
		"name": "-",
		"email": "-"
	}
*/

router.post('/', function (req, res) {
	var account = req.body;
	accountService.create(account);
});

router.get('/:user', function (req, res) {
	var username = req.params.user;
	accountService.get(username, function (snapshot) {
		res.send(snapshot);
	});
});

module.exports = router;