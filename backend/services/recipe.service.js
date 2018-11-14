var database = require('../firebase/db');

exports.input = function(recipeData, next) {
	database.ref('recipes/' + recipeData.id).set({
		id: recipeData.id,
		name: recipeData.name,
		ingredients: recipeData.ingredients,
		prepSteps: recipeData.prepSteps,
		imageURL: recipeData.imageURL,
		sourceURL: recipeData.sourceURL,
		prepTime: recipeData.prepTime,
		numServings: recipeData.numServings,
		nutrition: recipeData.nutrition
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


/*
	
  id: Integer,
  name: String,
  ingredients: 
    [ { ingredientName: String,
        unit: String,
        quantity: Integer } ],
  prepSteps : [ { 
    step: Integer,
    stepText: String} ],
  imageLink: String,
  sourceURL: String,
  prepTime: 
  { count: Integer,
    units: String },
  numServings: Integer

*/