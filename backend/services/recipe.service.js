var database = require('../firebase/db');

exports.upload = function(recipeData, next) {
	recipeData.forEach(function(recipe) {
		database.ref('recipes/' + recipe.id).set({
			id: recipe.id,
			name: recipe.name,
			ingredients: recipe.ingredients,
			preparation: recipe.preparation,
			imgURL: recipe.imgURL,
			pageURL: recipe.pageURL,
			cookTime: recipe.cookTime,
			prepTime: recipe.prepTime,
			numServings: recipe.numServings,
			nutrition: recipe.nutrition,
			rating: recipe.rating,
			source: recipe.source
		});
	});
	next("success");
}

exports.get = function(id, next) {
	database.ref('/recipes/' + id)
			.once('value')
			.then(function(snapshot) {
				next(snapshot.val());
			});
}

exports.all = function(next) {
	database.ref('/recipes/')
		.once('value')
		.then(function(snapshot) {
			next(snapshot.val());
		});
}

exports.list = function(queue, next) {
	var list = [];
	database.ref('/recipes/')
		.once('value')
		.then(function(res) {
			res.forEach(function(item) {
				var recipe = item.val();
				if (queue.includes(recipe.id)) {
					list.push(recipe);
				}
			});
			next(list);
		});
}