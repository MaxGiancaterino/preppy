export default class Ingredient {

    constructor() {
        this.name = "";
        this.calories = 0;
        this.price = 0;
        this.quantity = 0;
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