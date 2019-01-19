var database = require('../firebase/db');

exports.upload = function(recipeData, micro, next) {
  recipeData.forEach(function(recipe) {
    var ingredients = [];
    recipe.ingredients.forEach(function(ing) {
      ingredients.push(ing.ingID);
    });
    database.ref('micro/' + recipe.id).set({
      id: recipe.id,
      name: recipe.name,
      imgURL: recipe.imgURL,
      contains: ingredients
    });
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
  }
});
	next("success");
}

exports.get = function(id, micro, next) {
  if (micro) {
    database.ref('/micro/' + id)
        .once('value')
        .then(function(snapshot) {
          next(snapshot.val());
        });
  } else {
  	database.ref('/recipes/' + id)
  			.once('value')
  			.then(function(snapshot) {
  				next(snapshot.val());
  			});
  }
}

exports.list = function(queue, micro, next) {
	var list = [];
  if (micro) {
    database.ref('/micro/')
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
  } else {
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
}
