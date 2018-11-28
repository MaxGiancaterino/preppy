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

module.exports = router;