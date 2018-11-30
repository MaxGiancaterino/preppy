import Recipe from "./Recipe";
import Ingredient from "./Ingredient";

export default class User {

    constructor(userData = {}) {
        this.userId = userData.hasOwnProperty("userId") ? userData.userId : -1;
        this.displayName = userData.hasOwnProperty("firstName") ? userData.displayName : "";
        this.username = userData.hasOwnProperty("username") ? userData.username : "";
        this.avatar = userData.hasOwnProperty("avatar") ? userData.avatar : "";
        this.email = userData.hasOwnProperty("email") ? userData.email : "";
        this.weeklyBudget = userData.hasOwnProperty("weeklyBudget") ? userData.weeklyBudget : 0;
        this.remainingBudget = userData.hasOwnProperty("remainingBudget") ? userData.remainingBudget : 0;
        this.cookingQueue = userData.hasOwnProperty("cookingQueue") ? userData.cookingQueue : [-1];
    }

    getSuggestedRecipes() {
        return [Recipe.getSampleRecipe(0), Recipe.getSampleRecipe(1)];
    }

    getUpcomingMeals(amount) {
        return [Recipe.getSampleRecipe(0)];
    }

    getFavoritedRecipes() {
        return [Recipe.getSampleRecipe(1)];
    }

    getSampleIngredients() {
        return Ingredient.getSampleIngredients();
    }

    static getSampleUser() {
        var sampleUser = new User();
        sampleUser.userId = 0;
        sampleUser.displayName = "Joe Smith";
        sampleUser.username = "jsmith";
        sampleUser.avatar = "https://hungarytoday.hu/wp-content/uploads/2018/02/18ps27.jpg";
        sampleUser.email = "jtsmith@coolmathgames.com";
        sampleUser.weeklyBudget = 125.00;
        sampleUser.remainingBudget = 102.50;
        sampleUser.cookingQueue = [-1, 0, 1];
        return sampleUser
    }
}