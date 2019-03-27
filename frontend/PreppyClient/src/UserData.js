import {AsyncStorage} from 'react-native';
import User from './models/User';
import Schedule from './models/Schedule';
import ScheduleItem, {ITEM_TYPE} from './models/ScheduleItem';

/*
 * UserData serves as an interface to React Native's AsyncStorage class. AsyncStorage can store data
 * on the user's disk in the form of key-value pairs. This data is unencrypted, so none of it should
 * be sensitive. By storing persistant user data, the user can stay logged in even if the app is
 * closed. However, retreiving data from disk is inefficent (and cumbersome), so we also store the
 * current user as a global variable that can be retrieved synchronously, and avoid the asychronous
 * calls wherever possible.
 * Note that this means the user data is stored in 3 separate places (RAM, Disk, and Firebase).
 * Caution must be taken when updating any of these to ensure that they are synchronized to an
 * appropriate extent 
 */

export default UserData = {

    // Load the current user data from AsyncStorage
    loadUser: async () => {
        try {
            const value = await AsyncStorage.getItem('key_user');
            if (value !== null) {
                global.currentUser = new User(JSON.parse(value));
                global.currentUser.schedule = new Schedule(global.currentUser.schedule);
                global.isLoggedIn = true;
                return global.currentUser;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error.message);
            return null;
        }
    },

    // Set the current user
    setUser: async (user) => {
        try {
            if (user) {
                var json = JSON.stringify(user);
                const value = await AsyncStorage.setItem('key_user', json);
                if (user instanceof User) {
                    global.currentUser = user;
                }
                else {
                    global.currentUser = new User(user);
                }
                global.isLoggedIn = true;
            }
        }
        catch (error) {
            console.log(error.message);
        }
    },

    // Updates the cached user, including the schedule
    updateUser: async () => {
        try {
            if (global.isLoggedIn && global.currentUser) {
                var json = JSON.stringify(global.currentUser);
                const value = await AsyncStorage.setItem('key_user', json);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    },

    // Remove the current user's data from AsyncStorage
    logout: async () => {
        try {
            await AsyncStorage.removeItem('key_user');
            global.isLoggedIn = false;
            global.currentUser = null;
        }
        catch(error) {
            console.log(error.message);
        }
    },

    // Determine if a user is logged in
    isLoggedIn: () => {
        return global.isLoggedIn;
    },

    // Get the current user data
    getUser: () => {
        if (global.currentUser == null) {
            return new User();
        }
        else {
            return global.currentUser;
        }
    },

    // Update the current user's schedule
    updateSchedule: (schedule) => {
        if (global.currentUser && schedule) {
            global.currentUser.schedule = new Schedule(schedule);
        }
        else {
            console.log("Error");
        }
    },

    // Gets the user's next meals to cook, determined by their schedule
    getUpcomingMeals: (number) => {
        if (!global.currentUser || !global.currentUser.schedule) {
            return [];
        }
        let schedule = global.currentUser.schedule;
        let dates = [];
        for (let d in schedule.items) {
            if (!schedule.items.hasOwnProperty(d)) {
                continue;
            }
            dates.push(new Date(d));
        }
        dates.sort(function(a, b) {
            return a - b;
        });

        let upcomingMeals = [];
        let ids = [];
        for (let date of dates) {
            let dateString = date.toDateString();
            let dateItems = schedule.items[dateString];
            dateItems.sort(function(a, b) {
                return a.compare(b);
            });
            for (item of dateItems) {
                if (ids.indexOf(item.recipe.id) === -1 && item.itemType === ITEM_TYPE.COOK) {
                    upcomingMeals.push(item);
                    ids.push(item.recipe.id);
                    if (upcomingMeals.length === number) {
                        return upcomingMeals;
                    }
                }
            }
        }
        return upcomingMeals;
    }
        
}