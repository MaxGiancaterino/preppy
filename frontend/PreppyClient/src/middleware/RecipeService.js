import Recipe from '../models/Recipe';

/*
 * This module provides a clean interface for fetching recipes from the database.
 * Recently fetched recipes are cached to avoid fetching the same data multiple times,
 * but this functionality is encapsulated within the module.
 * These functions are asyncronous and expect a promise fufillment
 */

export default RecipeData = {

    fetchRecipeById: async(rid) => {
        if (!Number.isInteger(rid) || rid < 0) {
            return new Promise((resolve, reject) => resolve(new Recipe()))
        }
        else {
            return (
                fetch('http://preppy-dev.appspot.com/recipe/' + rid).then(
                    res => {
                        // If the response isn't json, handle by returning a blank recipe
                        // This usually happens if the index is too high
                        const contentType = res.headers.get("content-type");
                        if (contentType && contentType.indexOf("application/json") == -1) {
                            return new Recipe()
                        }
                        return res.json().then(recipeJson => {
                            const recipe = new Recipe(recipeJson);
                            return recipe
                        })
                    },
                    res => {
                        return new Recipe()
                    }
                )
            );
        }
    }
}