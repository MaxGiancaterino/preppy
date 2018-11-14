var express = require('express')
	, router = express.Router()
	, recipeService = require('../services/recipe.service');

router.post('/:id', function (req, res) {
	var recipe = req.body;
	console.log(recipe);
	recipeService.input(recipe, function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.get('/:id', function (req, res) {
	var id = req.params.id;
	recipeService.get(id, function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	})
});

module.exports = router;