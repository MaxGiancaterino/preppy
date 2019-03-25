export default class Recipe {

    constructor(recipeJson) {
        this.id = -1;
        this.name= "";
        this.ingredients = [];
        this.preparation = [];
        this.imgURL = "";
        this.pageURL = "";
        this.cookTime = 0;
        this.prepTime = 0;
        this.numServings = 0;
        this.nutrition = [];
        this.rating = -1;
        this.source = "";

        if (arguments.length > 0) {
            this.id = recipeJson.id;
            this.name= recipeJson.name;
            this.ingredients = recipeJson.ingredients;
            this.preparation = recipeJson.preparation;
            this.imgURL = recipeJson.imgURL;
            this.pageURL = recipeJson.pageURL;
            this.cookTime = recipeJson.cookTime;
            this.prepTime = recipeJson.prepTime;
            this.numServings = recipeJson.numServings;
            this.nutrition = recipeJson.nutrition;
            this.rating = recipeJson.rating;
            this.source = recipeJson.source;
        }
    }

    static getSampleRecipe(sampleId = 0) {
        switch (sampleId) {
            case 0: return new Recipe({
                id: 0,
                name: "Coba Soba Noodle Salad",
                ingredients: [
                    {ingredient: "1 (14 ounce) package dried soba noodles"},
                    {ingredient: "1 tablespoon toasted sesame oil"},
                    {ingredient: "5 (3-cup) storage containers"},
                    {ingredient: "1 cup shelled edamame"},
                    {ingredient: "1 large carrot, shredded"},
                    {ingredient: "4 green onions, thinly sliced"},
                    {ingredient: "1/2 cup chopped cilantro"},
                    {ingredient: "1 1/4 cups Thai peanut sauce"},
                    {ingredient: "5 (2-ounce) dressing containers"}
                ],
                preparation: [
                    {text: "Fill a large pot with lightly salted water and bring to a rolling boil. Drop in soba noodles and return to a boil. Cook uncovered, stirring occasionally, until tender yet firm to the bite, about 7 minutes. Drain."},
                    {text: "Toss noodles with sesame oil in a medium bowl. Divide noodles evenly between the 5 containers."},
                    {text: "Top noodles with edamame, carrot, green onions, and cilantro, dividing them evenly between the 5 containers. Place lids on containers. Pour 1/4 cup peanut sauce into each dressing container. Refrigerate until ready to eat. Mix 1 dressing container with 1 serving of soba salad to serve."}
                ],
                imgURL: "https://images.media-allrecipes.com/userphotos/720x405/5596504.jpg",
                sourceURL: "https://www.allrecipes.com/recipe/266831/cold-soba-noodle-salad/",
                cookTime: 35,
                numServings: 5,
                nutrition: [],
                rating: 3
            });
            case 1: return new Recipe({
                id: 1,
                name: "Quick and Easy Chicken Noodle Soup",
                ingredients: [
                    {ingredient: "1 tablespoon butter"},
                    {ingredient: "1/2 cup chopped onion"},
                    {ingredient: "1/2 cup chopped celery"},
                    {ingredient: "4 (14.5 ounce) cans chicken broth"},
                    {ingredient: "1 (14.5 ounce) can vegetable broth"},
                    {ingredient: "1/2 pound chopped cooked chicken breast"},
                    {ingredient: "1 1/2 cups egg noodles"},
                    {ingredient: "1 cup sliced carrots"},
                    {ingredient: "1/2 teaspoon dried basil"},
                    {ingredient: "1/2 teaspoon dried oregano"},
                    {ingredient: "salt and pepper to taste"},
                ],
                preparation: [
                    {text: "In a large pot over medium heat, melt butter. Cook onion and celery in butter until just tender, 5 minutes. Pour in chicken and vegetable broths and stir in chicken, noodles, carrots, basil, oregano, salt and pepper. Bring to a boil, then reduce heat and simmer 20 minutes before serving."} 
                ],
                cookTime: 20,
                numServings: 6,
                imgURL: "https://images.media-allrecipes.com/userphotos/720x405/4545057.jpg",
                sourceURL: "https://www.allrecipes.com/recipe/26460/quick-and-easy-chicken-noodle-soup/",
                nutrition: [],
                rating: 3
            });
            case 2: return new Recipe({
                id: 2,
                name: "Test Recipe",
                ingredients: [{ingredient: "None"}],
                preparation: [{text: "None"}],
                imgURL: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
                sourceURL: "https://en.wikipedia.org/wiki/Existentialism",
                cookTime: 0,
                numServings: 0,
                nutrition: [],
                rating: 0
            });
            case 3: return new Recipe({
                id: 3,
                name: "Hot dog",
                ingredients: [
                    {ingredient: "Beef Frank"},
                    {ingredient: "Bun"},
                    {ingredient: "Ketchup (optional)"},
                    {ingredient: "Mustard (optional)"}
                ],
                preparation: [
                    {text: "In a small pot, bring 2 cups of water to a boil"},
                    {text: "Gently place the beef frank in the boiling water. Wait 5 minutes"},
                    {text: "Carefully remove the beef frank from the pot. Place it in the bun"},
                    {text: "Optionally, apply ketchup and/or mustard to the boiled frank"}
                ],
                imgURL: "https://media.wired.com/photos/5a3bf9025b461c24af9057f1/master/w_1164,c_limit/hotdog-ta.jpg",
                sourceURL: "https://en.wikipedia.org/wiki/Hot_dog",
                cookTime: 10,
                numServings: 1,
                nutrition: [],
                rating: 5,
            });
            case 4: return new Recipe({
                id: 4,
                name: "Froot Loops",
                ingredients: [
                    {ingredient: "Froot Loops"},
                    {ingredient: "2 cups 2% milk"}
                ],
                preparation: [
                    {text: "Add Froot Loops to bowl"},
                    {text: "Add milk to bowl. If you are a heathen, you may perform this step first"}
                ],
                imgURL: "https://i5.walmartimages.com/asr/16c8f5f4-b4af-400b-a175-20818eb8d972_1.5ce7dbb90e3f9edeb8449055da0c284e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                sourceURL: "https://en.wikipedia.org/wiki/Sucrose",
                cookTime: 1,
                numServings: 1,
                nutrition: [],
                rating: 3
            });
            case 5: return new Recipe({
                id: 5,
                name: "Chicken McNuggets",
                ingredients: [{ingredient: "None"}],
                preparation: [
                    {text: "Locate and travel to your nearest McDonalds"},
                    {text: "Order your nugs"},
                ],
                sourceURL: "https://en.wikipedia.org/wiki/Chicken_McNuggets",
                imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/McDonalds-Chicken-McNuggets.jpg/2560px-McDonalds-Chicken-McNuggets.jpg",
                cookTime: 0,
                numServings: 1,
                nutrition: [],
                rating: 4
            });
        }
    }

}