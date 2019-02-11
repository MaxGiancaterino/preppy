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
	accountService.removeRecipe(uid, recipeId, function(resp, error) {
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

router.get('/:uid/cart', function (req, res) {
  var uid = req.params.uid;
  accountService.getCart(uid, function(resp, error) {
    if (error) {
      res.send(error);
    } else {
      res.send(resp);
    }
  });
});

router.post('/:uid/cart', function (req, res) {
  var uid = req.params.uid;
  var cart = req.body.cart;
  accountService.updateCart(uid, cart, function(resp, error) {
    if (error) {
      res.send(error);
    } else {
      res.send(resp);
    }
  });
});

router.get('/:uid/pantry', function (req, res) {
  var uid = req.params.uid;
  accountService.getPantry(uid, function(resp, error) {
    if (error) {
      res.send(error);
    } else {
      res.send(resp);
    }
  });
});

router.post('/:uid/pantry', function (req, res) {
  var uid = req.params.uid;
  var pantry = req.body.pantry;
  accountService.updatePantry(uid, pantry, function(resp, error) {
    if (error) {
      res.send(error);
    } else {
      res.send(resp);
    }
  });
});

router.get('/:uid/schedule', function (req, res) {
  var uid = req.params.uid;
  accountService.getSchedule(uid, function(resp, error) {
    if (error) {
      res.send(error);
    } else {
      res.send(resp);
    }
  });
});

router.post('/:uid/schedule', function (req, res) {
  var uid = req.params.uid;
  var schedule = req.body.schedule;
  accountService.updateSchedule(uid, schedule, function(resp, error) {
    if (error) {
      res.send(error);
    } else {
      res.send(resp);
    }
  });
});

module.exports = router;