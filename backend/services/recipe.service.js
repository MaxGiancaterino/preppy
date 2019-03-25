var database = require('../firebase/db');
var algolia = require('../firebase/algolia');

exports.upload = function(recipeData, micro, next) {
  if (micro) {
      recipeData.forEach(function(recipe) {
          database.doc("recipe/micro/data/" + recipe.ID).set({
              id: recipe.ID,
              name: recipe.name,
              imgURL: recipe.imgURL,
              contains: recipe.ingredientIDs
          });
      });
  } else {
      recipeData.forEach(function(recipe) {
          database.doc('recipe/full/data/' + recipe.id).set({
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
  }
  next("success");
};


exports.uploadIngredients = function(list, next) {
    list.forEach(function(ing) {
       database.doc("recipe/ingredients/data/" + ing.ID).set({
          id: ing.ID,
          recipes: ing.recipes
       });
    });
    next("success");
};

exports.get = function(id, micro, next) {
  if (micro) {
    database.doc('recipe/micro/data/' + id)
        .get()
        .then(function(doc) {
          next(doc.data());
        });
  } else {
  	database.doc('recipe/full/data/' + id)
  			.get()
  			.then(function(doc) {
  				next(doc.data());
  			});
  }
}

async function asyncForEach(array, micro, callback) {
  var list = [];
  for (let index = 0; index < array.length; index++) {
    if (micro) {
      await database.doc('recipe/micro/data/' + array[index])
                    .get()
                    .then(function(res) {
                      list.push(res.data());
                    });
    } else {
      await database.doc('recipe/full/data/' + array[index])
                    .get()
                    .then(function(res) {
                      list.push(res.data());
                    });
    }
  }
  callback(list);
}

exports.list = function(queue, micro, next) {
	asyncForEach(queue, micro, next);
}

exports.searchByName = function(query, next) {
  algolia.search({
    query
  })
  .then(function(response) {
    var results = [];
    response.hits.forEach(function(hit) {
      results.push({
        id: hit.id,
        name: hit.name,
        imgURL: hit.imgURL
      });
    });
    next(results);
  });
};

exports.searchByIngredients = function(list, next) {
    asyncIngredients(list, function(ingredients) {
        var first = list[0].recipes;
        for (let index = 1; index < array.length; index++) {
            first.filter(value => -1 !== array[index].recipes.indexOf(value));
        }
    });
};

async function asyncIngredients(array, callback) {
    var list = [];
    for (let index = 0; index < array.length; index++) {
            await database.doc('recipe/ingredients/data/' + array[index])
                .get()
                .then(function(res) {
                    list.push(res.data());
                });
    }
    callback(list);
}

exports.all = function(next) {
  database.collection('recipe/micro/data/')
          .get()
          .then(function(coll) {
            var data = [];
            coll.forEach((doc) => data.push(doc.data()));
            next(data);
          });
};
