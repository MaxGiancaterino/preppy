export default class Recipe {

    constructor(recipeJson) {
        this.id = -1;
        this.name= "";
        this.ingredients = [];
        this.preparation = [];
        this.imgUrl = "";
        this.pageUrl = "";
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
            this.imgUrl = recipeJson.imgUrl;
            this.pageUrl = recipeJson.pageUrl;
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
            case 0: return {
                id: 0,
                name: "Coba Soba Noodle Salad",
                ingredients: [
                    "1 (14 ounce) package dried soba noodles",
                    "1 tablespoon toasted sesame oil",
                    "5 (3-cup) storage containers",
                    "1 cup shelled edamame",
                    "1 large carrot, shredded",
                    "4 green onions, thinly sliced",
                    "1/2 cup chopped cilantro",
                    "1 1/4 cups Thai peanut sauce",
                    "5 (2-ounce) dressing containers"
                ],
                preparation: [
                    "Fill a large pot with lightly salted water and bring to a rolling boil. Drop in soba noodles and return to a boil. Cook uncovered, stirring occasionally, until tender yet firm to the bite, about 7 minutes. Drain.",
                    "Toss noodles with sesame oil in a medium bowl. Divide noodles evenly between the 5 containers.",
                    "Top noodles with edamame, carrot, green onions, and cilantro, dividing them evenly between the 5 containers. Place lids on containers. Pour 1/4 cup peanut sauce into each dressing container. Refrigerate until ready to eat. Mix 1 dressing container with 1 serving of soba salad to serve."
                ],
                imgUrl: "https://images.media-allrecipes.com/userphotos/720x405/5596504.jpg",
                sourceUrl: "https://www.allrecipes.com/recipe/266831/cold-soba-noodle-salad/",
                cookTime: 35,
                numServings: 5,
                nutrition: [],
                rating: 3
            };
            case 1: return {
                id: 1,
                name: "Quick and Easy Chicken Noodle Soup",
                ingredients: [
                    "1 tablespoon butter",
                    "1/2 cup chopped onion",
                    "1/2 cup chopped celery",
                    "4 (14.5 ounce) cans chicken broth",
                    "1 (14.5 ounce) can vegetable broth",
                    "1/2 pound chopped cooked chicken breast",
                    "1 1/2 cups egg noodles",
                    "1 cup sliced carrots",
                    "1/2 teaspoon dried basil",
                    "1/2 teaspoon dried oregano",
                    "salt and pepper to taste",
                ],
                preparation: [
                    "In a large pot over medium heat, melt butter. Cook onion and celery in butter until just tender, 5 minutes. Pour in chicken and vegetable broths and stir in chicken, noodles, carrots, basil, oregano, salt and pepper. Bring to a boil, then reduce heat and simmer 20 minutes before serving." 
                ],
                cookTime: 20,
                numServings: 6,
                imgUrl: "https://images.media-allrecipes.com/userphotos/720x405/4545057.jpg",
                sourceUrl: "https://www.allrecipes.com/recipe/26460/quick-and-easy-chicken-noodle-soup/",
                nutrition: [],
                rating: 3
            };
            case 2: return {
                id: 2,
                name: "Test Recipe",
                ingredients: ["None"],
                preparation: ["None"],
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
                sourceUrl: "https://en.wikipedia.org/wiki/Existentialism",
                cookTime: 0,
                numServings: 0,
                nutrition: [],
                rating: 0
            };
            case 3: return {
                id: 3,
                name: "Hot dog",
                ingredients: [
                    "Beef Frank",
                    "Bun",
                    "Ketchup (optional)",
                    "Mustard (optional"
                ],
                preparation: [
                    "In a small pot, bring 2 cups of water to a boil",
                    "Gently place the beef frank in the boiling water. Wait 5 minutes",
                    "Carefully remove the beef frank from the pot. Place it in the bun",
                    "Optionally, apply ketchup and/or mustard to the boiled frank"
                ],
                imgUrl: "https://media.wired.com/photos/5a3bf9025b461c24af9057f1/master/w_1164,c_limit/hotdog-ta.jpg",
                sourceUrl: "https://en.wikipedia.org/wiki/Hot_dog",
                cookTime: 10,
                numServings: 1,
                nutrition: [],
                rating: 5,
            }
            case 4: return {
                id: 4,
                name: "Froot Loops",
                ingredients: [
                    "Froot Loops",
                    "2 cups 2% milk"
                ],
                preparation: [
                    "Add Froot Loops to bowl",
                    "Add milk to bowl. If you are a heathen, you may perform this step first"
                ],
                imgUrl: "https://i5.walmartimages.com/asr/16c8f5f4-b4af-400b-a175-20818eb8d972_1.5ce7dbb90e3f9edeb8449055da0c284e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                sourceUrl: "https://en.wikipedia.org/wiki/Sucrose",
                cookTime: 1,
                numServings: 1,
                nutrition: [],
                rating: 3
            };
            case 5: return {
                id: 5,
                name: "Chicken McNuggets",
                ingredients: ["None"],
                preparation: [
                    "Locate and travel to your nearest McDonalds",
                    "Order your nugs",
                ],
                sourceUrl: "https://en.wikipedia.org/wiki/Chicken_McNuggets",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/McDonalds-Chicken-McNuggets.jpg/2560px-McDonalds-Chicken-McNuggets.jpg",
                cookTime: 0,
                numServings: 1,
                nutrition: [],
                rating: 4
            }
        }
    }

}