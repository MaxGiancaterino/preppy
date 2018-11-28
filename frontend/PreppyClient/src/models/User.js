
export default class User {

    constructor() {
        this.userId = -1;
        this.firstName = "";
        this.lastName = "";
        this.username = "";
        this.avatar = null;
        this.email = "";
        this.weeklyBudget = 0;
        this.remainingBudget = 0;
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