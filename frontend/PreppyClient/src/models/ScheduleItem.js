export const MEAL_TYPES = {
    BREAKFAST: "Breakfast",
    LUNCH: "Lunch",
    DINNER: "Dinner",
    DESSERT: "Dessert",
    SNACK: "Snack",
    OTHER: "Other",
    NA: "Not a meal"
};

export const ITEM_TYPE = {
    MEAL: "Meal",
    COOK: "Cook"
}

export default class ScheduleItem {
    
    constructor(itemType, meal, time) {
        this.itemType = itemType;
        this.meal = meal;
        this.time = time;
    }
}