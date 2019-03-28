import User from '../models/User';
import UserData from '../UserData';

export default UserService = {

    /*
     * Logs the user into their account, and, if successful, returns a promise that resolves with
     * an appropriate User object. If it fails, it will return a promise that rejects with an error
     * message that can be displayed to the user.
     */
    attemptLogin: async(email, password) => {
        const credentials = {
            "email": email.toLowerCase(),
            "password": password
        };

        if (!email) {
            return new Promise((resolve, reject) => {throw new Error("Please enter an email")});
        }
        if (!password) {
            return new Promise((resolve, reject) => {throw new Error("Please enter a password")});
        }

        return (
            fetch('http://preppy-dev.appspot.com/user/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }).then(res => {
                if (!res.ok) {
                    throw new Error("Cannot find server. Please try again later");
                }
                return res.json();
            }).then(res => {
                if(!res.user || !res.user.uid) {
                    throw new Error("Incorrect email or password");
                }
                const uid = res.user.uid;
                let user = null;
                return (
                    fetch('http://preppy-dev.appspot.com/account/' + uid, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })
                );
            }).then(res => {
                if (!res.ok) {
                    throw new Error("Cannot fetch user data. Please try again later");
                }
                return res.json()
            }).then(res => {
                return new User(res);
            }).catch((error) => {throw error})
        );
    },

    /*
     * Attempts to create an account, and logs the user in if successful, returning a promise that
     * resolves with an appropriate user object. If unsuccessful, it returns a promise that rejects
     * with an error message designed to be displayed to the user.
     */
    attemptCreateAccount: async(email, password, phone, displayName) => {
        const user = {
            email: email,
            phoneNumber: phone,
            password: password,
            displayName: displayName
        };
        if (phone.substring(0, 2) !== "+1") {
            user.phoneNumber = "+1" + user.phoneNumber;
        }

        if (!email) {
            return new Promise((resolve, reject) => {throw new Error("Please enter an email address")});
        }
        if (!password) {
            return new Promise((resolve, reject) => {throw new Error("Please enter a password")});
        }
        if (!phone) {
            return new Promise((resolve, reject) => {throw new Error("Please enter a phone number")});
        }
        if (!displayName) {
            return new Promise((resolve, reject) => {throw new Error("Please enter your name")});
        }

            return (
            fetch('http://preppy-dev.appspot.com/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => {
                if (!res) {
                    throw new Error("Error creating account. Make sure all information is entered correctly");
                }
                if (!res.ok) {
                    throw new Error("Cannot find server. Please try again later");
                }
                return res.json();
            }).then(user => {
                if (user["message"]) {
                    throw new Error(user.message);
                }
                else {
                    return new User(user);
                }
            }).catch(error => {
                throw error;
            })
        );
    },

    /*
     * Attempts to retrieve the given user's schedule from the backend. Returns a promise that resolves
     * with said schedule's raw JSON. Does not automatically update the schedule in the local cache.
     */
    attemptFetchSchedule: async(uid) => {
        return (
            fetch('http://preppy-dev.appspot.com/account/' + uid + '/schedule', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                if (res && res.ok) {
                    return res.json()
                }
                return {};
            }).catch((error) => {
                console.log(error);
            })
        );
    },

    /*
     * Attempts to update the given user's schedule on the backend, given the JSON of its local copy
     * of the schedule.
     */
    attemptUpdateSchedule: async(uid, s) => {
        return (
            fetch('http://preppy-dev.appspot.com/account/' + uid + '/schedule', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({schedule: s})
            }).catch((error) => {
                console.log(error);
            })
        );
    }
}