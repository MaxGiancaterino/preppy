import ScheduleItem, {MEAL_TYPE, ITEM_TYPE} from './ScheduleItem';
import Recipe from './Recipe';
import UserData from '../UserData';

export default class Schedule {

    constructor(json=false) {
        if (!json) {
            // The id of the user this schedule is associated with
            this.userId = UserData.getUser().userId;

            // An associative array mapping dates (specifically, date strings (Date.toDateString)) to
            // arrays of scheduleItems. These ScheduleItems can be cook or meal events.
            this.items = {};
        }
        else {
            this.userId = json.userId ? json.userId : UserData.getUser().userId;
            this.items = json.items ? json.items : {};
            for (let date in this.items) {
                let jsonItems = this.items[date];
                this.items[date] = jsonItems.map(item => ScheduleItem.fromJson(item));
            }
        }
    }

    /*
     * Schedules some ScheduleItem into this schedule appropriately. Returns true if successful.
     */
    static scheduleMeal(schedule, item) {

        if (!(item instanceof ScheduleItem)) {
            return false;
        }
        let date = item.time;
        if (!(date instanceof Date)) {
            return false;
        }

        const dateString = date.toDateString();
        if (!schedule.items[dateString]) {
            schedule.items[dateString] = [];
        }
        schedule.items[dateString].push(item);
        return true;
    }

    static removeItem(schedule, item) {
        let date = item.time;
        const dateString = date.toDateString();
        const idx = schedule.items[dateString].indexOf(item);
        if (idx >= 0) {
            if (schedule.items[dateString].length === 1) {
                delete schedule.items[dateString];
            }
            else {
                schedule.items[dateString].splice(idx, 1);
            }
            return true;
        }
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
        let success = Schedule.scheduleMeal(
            sample,
            new ScheduleItem(ITEM_TYPE.COOK, MEAL_TYPE.NA, new Date(2019, 1, 10, 20), Recipe.getSampleRecipe(1))
        );
        success = Schedule.scheduleMeal(
            sample,
            new ScheduleItem(ITEM_TYPE.COOK, MEAL_TYPE.NA, new Date(2019, 1, 10, 21), Recipe.getSampleRecipe(0))
        );
        success = Schedule.scheduleMeal(
            sample,
            new ScheduleItem(ITEM_TYPE.COOK, MEAL_TYPE.NA, new Date(2019, 1, 10, 22), Recipe.getSampleRecipe(3))
        );
        success = Schedule.scheduleMeal(
            sample,
            new ScheduleItem(ITEM_TYPE.COOK, MEAL_TYPE.NA, new Date(2019, 1, 12, 20), Recipe.getSampleRecipe(2))
        );
        return sample;
    }
}