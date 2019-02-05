

export const ITEM_TYPE = {
    MEAL: "Meal",
    COOK: "Cook"
}

// Applies for items of type MEAL. Those of type cook should have a meal type of N/A
export const MEAL_TYPE = {
    BREAKFAST: "Breakfast",
    LUNCH: "Lunch",
    DINNER: "Dinner",
    DESSERT: "Dessert",
    SNACK: "Snack",
    OTHER: "Other",
    NA: "Not a meal"
};

export default class ScheduleItem {
    
    // Recipe should maybe be made into a recipe id instead
    constructor(itemType, meal, time, recipe) {
        this.itemType = itemType;
        this.meal = meal;
        this.time = time;
        this.recipe = recipe;
    }
}