import ScheduleItem from './ScheduleItem';

/* 
 * This class contains the schedule items the user has chosen for themselves for a particular week
 * By making this schedule per week instead of for all time, we can easily only display weeks for 
 * which something is scheduled (and we don't have to worry about bookkeeping the Schedule object
 * to remove entries whose dates have already passed). The actual events are stored per day as arrays
 * of ScheduleItems.
 */
export default class Schedule {

    constructor() {
        // The id of the user this schedule is associated with
        this.userId = -1;

        // The Date of the sunday this week starts on. The h/m/s can be igonred
        this.weekOf = null;

        // An array of schedule items for each day of the week
        this.items = {
            "sunday"    : [],
            "monday"    : [],
            "tuesday"   : [],
            "wednesday" : [],
            "thursday"  : [],
            "friday"    : [],
            "saturday"  : []
        }
    }

    /*
     * Schedules some ScheduleItem into this weekly schedule. It does so asyncronously to
     * allow users to click through confirmations, etc (TODO). Returns true if successful.
     */
    scheduleMeal(day, item) {

        if (!(item instanceof ScheduleItem)) {
            return false;
        }

        const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        let dayString = "";
        if (typeof(day) === "number") {
            day = Math.floor(day);
            if (day >= 0 && day < 7) {
                dayString = weekdays[day];
            }
            else {
                return false;
            }
        }
        else if (typeof(day) === "string") {
            day = day.toLowerCase();
            if (weekdays.includes(day)) {
                dayString = day;
            }
            else {
                return false;
            }
        }
        else if (day instanceof Date && this.weekOf instanceof Date) {
            this.weekOf.setHours(0, 0, 0, 0);
            let modifiedDay = new Date(day.getTime());
            modifiedDay.setHours(0, 0, 0, 0);
            const dayDiff = (day.getTime() - this.weekOf.getTime()) / (1000 * 60 * 60 * 24);
            if (dayDiff >= 0 && dayDiff < 7) {
                dayString = weekdays[dayDiff]
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }

        (this.items)[dayString].push(item);
        return true;
    }
}