export default class Recipe {

    constructor() {
        this.id = -1;
        this.name="";
        this.ingredients = [];
        this.prepSteps = [];
        this.prepTime = 0;
        this.numServings = 0;
        this.imageUrl = "";
        this.sourceUrl = "";
    }

    static getSampleRecipe() {
        var sampleRecipe = new Recipe();
        sampleRecipe.id = 266831;
        sampleRecipe.name = "Coba Soba Noodle Salad";
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
            "Fill a large pot with lightly salted water and bring to a rolling boil. Drop in soba noodles and return to a boil. \
            Cook uncovered, stirring occasionally, until tender yet firm to the bite, about 7 minutes. Drain.",
            "Toss noodles with sesame oil in a medium bowl. Divide noodles evenly between the 5 containers.",
            "Top noodles with edamame, carrot, green onions, and cilantro, dividing them evenly between the 5 containers. \
            Place lids on containers. Pour 1/4 cup peanut sauce into each dressing container. Refrigerate until ready to eat.\
            Mix 1 dressing container with 1 serving of soba salad to serve."
        ];
        sampleRecipe.prepTime = 35;
        sampleRecipe.numServings = 5;
        sampleRecipe.imageUrl = "https://images.media-allrecipes.com/userphotos/720x405/5596504.jpg";
        sampleRecipe.sourceUrl = "https://www.allrecipes.com/recipe/266831/cold-soba-noodle-salad/";
        return sampleRecipe;
    }
}