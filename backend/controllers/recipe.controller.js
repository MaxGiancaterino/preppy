var express = require('express')
	, router = express.Router()
	, recipeService = require('../services/recipe.service');

router.post('/', function (req, res) {
	var recipeFile = require('../models/recipes.json');
	var recipes = recipeFile.recipes;
	recipeService.upload(recipes, false, function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.post('/queue', function(req, res) {
	var ids = req.body.queue;
	var list = [];
	recipeService.list(ids, false, function(data, error) {
		if (error) {
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.get('/:id', function (req, res) {
	var id = req.params.id;
	recipeService.get(id, false, function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	})
});

router.get('/micro/all', function (req, res) {
	recipeService.all(function(data) {
		res.send(data);
	});
});

router.post('/micro', function (req, res) {
	var recipeFile = require('../models/microrecipes.json');
	var recipes = recipeFile.recipes;
	recipeService.upload(recipes, true, function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.post('/ingredients', function (req, res) {
	var ingredientFile = require('../models/ingredients.json');
	var ingredients = ingredientFile.ingredients;
	recipeService.uploadIngredients(ingredients, function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.post('/micro/queue', function(req, res) {
	var ids = req.body.queue;
	recipeService.list(ids, true, function(data, error) {
		if (error) {
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.get('/micro/:id', function (req, res) {
	var id = req.params.id;
	recipeService.get(id, true, function(data, error) {
		if (error) {
			console.log(error);
			res.send(error);
		} else {
			res.send(data);
		}
	})
});

router.post('/search/name', function (req, res) {
	var query = req.body.query;
	recipeService.searchByName(query, function(data, error) {
		if (error) {
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

router.post('/search/ingredients', function(req, res) {
	var list = req.body.query;
	recipeService.searchByIngredients(list, function(data, error) {
		if (error) {
			res.send(error);
		} else {
			res.send(data);
		}
	});
});

module.exports = router;
