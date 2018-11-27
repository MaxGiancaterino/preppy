import Recipe from "./Recipe";

export default class User {

    constructor(userData = {}) {
        this.userId = userData.hasOwnProperty("userId") ? userData.userId : -1;
        this.firstName = userData.hasOwnProperty("firstName") ? userData.firstName : "";
        this.lastName = userData.hasOwnProperty("lastName") ? userData.lastName : "";
        this.username = userData.hasOwnProperty("username") ? userData.username : "";
        this.avatar = userData.hasOwnProperty("avatar") ? userData.avatar : "";
        this.email = userData.hasOwnProperty("email") ? userData.email : "";
        this.weeklyBudget = userData.hasOwnProperty("weeklyBudget") ? userData.weeklyBudget : 0;
        this.remainingBudget = userData.hasOwnProperty("remainingBudget") ? userData.remainingBudget : 0;
    }

    getSuggestedRecipes() {
        return [Recipe.getSampleRecipe];
    }

    static getSampleUser() {
        var sampleUser = new User();
        sampleUser.userId = 0;
        sampleUser.firstName = "Joe";
        sampleUser.lastName = "Smith";
        sampleUser.username = "jsmith";
        sampleUser.avatar = "https://hungarytoday.hu/wp-content/uploads/2018/02/18ps27.jpg";
        sampleUser.email = "jtsmith@coolmathgames.com";
        sampleUser.weeklyBudget = 125.00;
        sampleUser.remainingBudget = 102.50;
        
        return sampleUser
    }
}