
export default class User {

    constructor() {
        this.userId = -1;
        this.firstName = "";
        this.lastName = "";
        this.username = "";
        this.avatar = null;
        this.remainingBudget = 0;
    }

    static getSampleUser() {
        var sampleUser = new User();
        sampleUser.userId = 0;
        sampleUser.firstName = "Joe";
        sampleUser.lastName = "Smith";
        sampleUser.username = "jsmith";
        sampleUser.avatar = "https://upload.wikimedia.org/wikipedia/en/b/b6/Dramatic_Chipmunk.png";
        sampleUser.remainingBudget = 102.50;
        
        return sampleUser
    }
}