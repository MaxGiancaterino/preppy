import ScheduleItem, {MEAL_TYPE, ITEM_TYPE} from './ScheduleItem';
import Recipe from './Recipe';

export default class Schedule {

    constructor() {
        // The id of the user this schedule is associated with
        this.userId = -1;

        // An associative array mapping dates (specifically, date strings (Date.toDateString)) to
        // arrays of scheduleItems. These ScheduleItems can be cook or meal events.
        this.items = {};
    }

    /*
     * Schedules some ScheduleItem into this schedule appropriately. Returns true if successful.
     */
    scheduleMeal(date, item) {

        if (!(item instanceof ScheduleItem)) {
            return false;
        }
        if (!(date instanceof Date)) {
            return false;
        }

        const dateString = date.toDateString();
        if (!this.items[dateString]) {
            this.items[dateString] = [];
        }
        this.items[dateString].push(item);
        return true;
    }

    static getSize(s) {
        let size = 0;
        for (let date in s.items) {
            size += s.items[date].length;
        }
        return size;
    }

    static getSampleSchedule() {
        let sample = new Schedule();
        let success = sample.scheduleMeal(
            new Date(2019, 1, 10, 20),
            new ScheduleItem(ITEM_TYPE.COOK, MEAL_TYPE.NA, new Date(2019, 1, 10, 20), Recipe.getSampleRecipe(1))
        );
        success = sample.scheduleMeal(
            new Date(2019, 1, 10, 21),
            new ScheduleItem(ITEM_TYPE.COOK, MEAL_TYPE.NA, new Date(2019, 1, 11, 20), Recipe.getSampleRecipe(0))
        );
        success = sample.scheduleMeal(
            new Date(2019, 1, 12, 20),
            new ScheduleItem(ITEM_TYPE.COOK, MEAL_TYPE.NA, new Date(2019, 1, 12, 20), Recipe.getSampleRecipe(2))
        );
        return sample;
    }
}