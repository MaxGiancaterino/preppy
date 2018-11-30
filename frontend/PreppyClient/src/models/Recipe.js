/*export default class Recipe {
    constructor() {
        this.id = -1;
        this.name="";
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
    }
}*/
export default class Recipe {

    constructor() {
        this.rid = -1;
        this.recipeName="";
        this.ingredients = [];
        this.prepSteps = [];
        this.prepTime = 0;
        this.numServings = 0;
        this.imageUrl = "";
        this.sourceUrl = "";
    }

    static getSampleRecipe(number = 0) {
        const NUM_SAMPLES = 2;
        var sampleRecipe = new Recipe();

        if (number % NUM_SAMPLES == 0) {
            sampleRecipe.rid = 266831;
            sampleRecipe.recipeName = "Coba Soba Noodle Salad";
            sampleRecipe.ingredients = [
                "1 (14 ounce) package dried soba noodles",
                "1 tablespoon toasted sesame oil",
                "5 (3-cup) storage containers",
                "1 cup shelled edamame",
                "1 large carrot, shredded",
                "4 green onions, thinly sliced",
                "1/2 cup chopped cilantro",
                "1 1/4 cups Thai peanut sauce",
                "5 (2-ounce) dressing containers"
            ];
            sampleRecipe.prepSteps = [
                "Fill a large pot with lightly salted water and bring to a rolling boil. Drop in soba noodles and return to a boil. Cook uncovered, stirring occasionally, until tender yet firm to the bite, about 7 minutes. Drain.",
                "Toss noodles with sesame oil in a medium bowl. Divide noodles evenly between the 5 containers.",
                "Top noodles with edamame, carrot, green onions, and cilantro, dividing them evenly between the 5 containers. Place lids on containers. Pour 1/4 cup peanut sauce into each dressing container. Refrigerate until ready to eat. Mix 1 dressing container with 1 serving of soba salad to serve."
            ];
            sampleRecipe.prepTime = 35;
            sampleRecipe.numServings = 5;
            sampleRecipe.imageUrl = "https://images.media-allrecipes.com/userphotos/720x405/5596504.jpg";
            sampleRecipe.sourceUrl = "https://www.allrecipes.com/recipe/266831/cold-soba-noodle-salad/";
        }
        else if (number % NUM_SAMPLES == 1) {
            sampleRecipe.rid = 26460;
            sampleRecipe.recipeName = "Quick and Easy Chicken Noodle Soup";
            sampleRecipe.ingredients = [
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
            ];
            sampleRecipe.prepSteps = [
                "In a large pot over medium heat, melt butter. Cook onion and celery in butter until just tender, 5 minutes. Pour in chicken and vegetable broths and stir in chicken, noodles, carrots, basil, oregano, salt and pepper. Bring to a boil, then reduce heat and simmer 20 minutes before serving." 
            ];
            sampleRecipe.prepTime = 20;
            sampleRecipe.numServings = 6;
            sampleRecipe.imageUrl = "https://images.media-allrecipes.com/userphotos/720x405/4545057.jpg";
            sampleRecipe.sourceUrl = "https://www.allrecipes.com/recipe/26460/quick-and-easy-chicken-noodle-soup/";
        }
        return sampleRecipe;
    }
}