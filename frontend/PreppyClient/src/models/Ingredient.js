export default class Ingredient {

    constructor() {
        this.ingredient = "";
        this.unit = "";
        this.amount = "";
    }

    //populates pantry page with ingredients 
    // NOTE: need to account for quantity
    // consider a can of salt vs. a cup of chicken broth
    static getSampleIngredients() {
        ingredients = ["butter",
                "onion",
                "celery",
                "chicken broth",
                "vegetable broth",
                "chicken breast",
                "egg noodles",
                "carrots",
                "dried basil",
                "dried oregano",
                "salt",
                "pepper",
            ];
        return ingredients;
    }
}