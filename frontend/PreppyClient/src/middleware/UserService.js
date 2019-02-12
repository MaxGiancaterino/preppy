import User from '../models/User';

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
                if (!res.ok || !res.user || !res.user.uid) {
                    throw new Error("Incorrect email or password");
                }
                const uid = res.user.uid;
                    fetch('http://preppy-dev.appspot.com/account/' + uid, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                    }).then(res => {
                        if (!res.ok) {
                            throw new Error("Cannot fetch user data. Please try again later");
                        }
                        return res.json()
                    }).then(
                        res => (new User(res))
                    )
                }
            ).catch((error) => {throw error})
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

        fetch('http://preppy-dev.appspot.com/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (!res.ok) {
                throw new Error("Cannot find server. Please try again later");
            }
            return res.json();
        }).then(user => {
            return new User(res);
        }).catch(error => {
            throw error;
        })
    }
}