export default class Ingredient {

    constructor() {
        this.ingredient = "";
        this.unit = "";
        this.amount = 1;
    }

    //populates pantry page with ingredients 
    // NOTE: need to account for quantity
    // consider a can of salt vs. a cup of chicken broth
    static getSampleIngredients() {
        ingredients = [
            {
                "name": "butter",
                "amount": 1,
            },
            {
                "name": "onion",
                "amount": 2,
            },
            {
                "name": "celery",
                "amount": 1,
            },
            {
                "name": "chicken broth",
                "amount": 1,
            },
            {
                "name": "vegetable broth",
                "amount": 1,
            },
            {
                "name": "chicken broth",
                "amount": 1,
            },
            {
                "name": "egg noodles",
                "amount": 1,
            },
            {
                "name": "carrots",
                "amount": 1,
            },
            {
                "name": "dried basil",
                "amount": 1,
            },
            {
                "name": "dried oregano",
                "amount": 1,
            },
            {
                "name": "salt",
                "amount": 1,
            },
            {
                "name": "pepper",
                "amount": 1,
            },
        ];
        // ingredients = ["butter",
        //         "onion",
        //         "celery",
        //         "chicken broth",
        //         "vegetable broth",
        //         "chicken breast",
        //         "egg noodles",
        //         "carrots",
        //         "dried basil",
        //         "dried oregano",
        //         "salt",
        //         "pepper",
        //     ];
        return ingredients;
    }
}