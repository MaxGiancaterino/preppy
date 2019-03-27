import Recipe from '../models/Recipe';

/*
 * This module provides a clean interface for fetching recipes from the database.
 * Recently fetched recipes are cached to avoid fetching the same data multiple times,
 * but this functionality is encapsulated within the module.
 * These functions are asyncronous and expect a promise fufillment
 */

export default RecipeData = {

    /*
     * Returns a promise containing the recipe object fetched from firebase given the corresponding recipe id
     * If the id is invalid, the promise contains an empty recipe
     */
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
    },

    /*
     * Returns a promise containing an array of recipes given an array of recipe IDs
     * If the input is valid, the promise contains an empty array
     */
    fetchRecipeQueue: async(rids) => {
        const queueObj = Array.isArray(rids) ? {queue: rids} : {queue: []};
        return (
            fetch('http://preppy-dev.appspot.com/recipe/queue', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(queueObj)
            }).then(
                res => {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") == -1) {
                        return [];
                    }
                    return res.json().then(recipeJson => {
                        let recipes = [];
                        for (let key in recipeJson) {
                            recipes.push(new Recipe(recipeJson[key]))
                        }
                        return recipes;
                    })
                },
                res => {
                    return [];
                }
            )
        );
    },

    /*
     * Returns a promise containing a list of recipes whose name most strongly matches
     * the input string. The list may be smaller than the provided limit, or even empty,
     * if not enough matching recipes names can be found.
     */
    findRecipesByName: async(searchString, limit) => {
        return (
            fetch('http://preppy-dev.appspot.com/recipe/search/name', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({query: searchString})
            }).then(
                res => {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") == -1) {
                        return [];
                    }
                    return res.json().then(recipeJson => {
                        let recipes = [];
                        let curSize = 0;
                        for (let key in recipeJson) {
                            recipes.push(new Recipe(recipeJson[key]))
                            curSize++;
                            if (curSize >= limit) {
                                break;
                            }
                        }
                        return recipes;
                    })
                },
                res => {
                    return [];
                }
            )
        );
    },

    /*
     * Returns a list of recipes that contain the ingredients provided
     */
    findRecipesByIngredient: async(ingredients, limit) => {
        return (
            fetch('http://preppy-dev.appspot.com/recipe/search/ingredients', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({query: ingredients})
            }).then(
                res => {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") == -1) {
                        return [];
                    }
                    return res.json().then(recipeJson => {
                        let recipes = [];
                        let curSize = 0;
                        for (let key in recipeJson) {
                            recipes.push(new Recipe(recipeJson[key]))
                            curSize++;
                            if (curSize >= limit) {
                                break;
                            }
                        }
                        return recipes;
                    })
                },
                res => {
                    return [];
                }
            ).catch((error) => {
                console.log(error);
            })
        );
    }
}