var express = require('express')
	, router = express.Router()
	, recipeService = require('../services/recipe.service');

router.post('/', function (req, res) {
	var recipeFile = require('../models/recipes.json');
	var recipes = recipeFile.recipes;
	var idx = 0;
	recipes.forEach(function(recipe) {
		recipe.id = idx;
		idx++;
	});
	recipeService.upload(recipes, function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.get('/', function (req, res) {
	recipeService.all(function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.get('/queue', function(req, res) {
	var ids = req.body.queue;
	var list = [];
	recipeService.list(ids, function(data, error) {
		if (error) {
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