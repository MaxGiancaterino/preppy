export default class Recipe {
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
}