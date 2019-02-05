import Recipe from './Recipe';

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
        if (time instanceof Date) {
            this.time = time;
        }
        if (recipe instanceof Recipe) {
            this.recipe = recipe;
        }
    }

    /*
     * Compares this schedule item to another, by date. If this item occurs before the other, 
     * the return value is negative. If it occurs after, it's positive. If they occur at the 
     * same exact millisecond, it's zero. It the other item isn't a ScheduleItem, NaN is
     * returned instead.
     */
    compare(otherItem) {
        if (!(oherItem instanceof ScheduleItem)) {
            return 0/0; // NaN
        }
        return this.time.getTime() - otherItem.getTime();
    }
}