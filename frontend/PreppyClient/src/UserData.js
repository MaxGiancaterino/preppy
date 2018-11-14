import {AsyncStorage} from 'react-native';

export default UserData = {

    getUser: async () => {
        try {
            const value = await AsyncStorage.getItem('key_user');
            if (value !== null) {
                return JSON.parse(value);
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

    setUser: async (user) => {
        try {
            var json = JSON.stringify(user);
            const value = await AsyncStorage.setItem('key_user', json);
        }
        catch (error) {
            console.log(error.message);
        }
    }
        
}