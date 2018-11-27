import {AsyncStorage} from 'react-native';
import User from './models/User';

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

 // We should possibly consider using all user-management endpoints within this module
export default UserData = {

    // Load the current user data from AsyncStorage
    loadUser: async () => {
        try {
            const value = await AsyncStorage.getItem('key_user');
            if (value !== null) {
                global.currentUser = new User(JSON.parse(value));
                global.isLoggedIn = true;
                return global.currentUser;
            }
            else {
                return null;
            }
        }
        catch (error) {
            return null;
            console.log(error.message);
        }
    },

    // Set the current user
    setUser: async (user) => {
        try {
            if (user != null) {
                var json = JSON.stringify(user);
                const value = await AsyncStorage.setItem('key_user', json);
                global.currentUser = new User(user);
                global.isLoggedIn = true;
            }
        }
        catch (error) {
            console.log(error.message);
        }
    },

    // Remove the current user's data from AsyncStorage
    logout: async() => {
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
        
}