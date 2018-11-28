import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {splashStyles} from './SplashStyles';

import UserData from '../../UserData';

import User from '../../models/User';

/*
 * The splash screen allows us to load in user data from disk (and potentially the database
 * later on if we find that necessary) without staggering the rendering of any other screen.
 * Once the data is loaded, we can safely navigate to the appropriate screen.
 */
export default class Splash extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
    }

    componentDidMount() {
        // Load the current user from disk, if there is one
        let nav = this.props.navigation;
        UserData.loadUser().then(() => {
            // The asyncronous call might not take very long, which can make the splash
            // screen feel like a strange blink, so we force the splashscreen to remain
            // for at least a couple seconds.
            setTimeout(() => {
                // Redirect the user to the dashboard or the login screen depending
                // on whether they're already logged in or not
                if (UserData.isLoggedIn()) {
                    nav.navigate("Dashboard");
                }
                else {
                    nav.navigate("Login");
                }
            }, 1000);
        }).catch((error) => {
            console.log(error.message);
        });
    }

    render() {
        return(
            <View style={splashStyles.splashMain}>
                <Text style={splashStyles.splashText}>Preppy</Text>
            </View>
        );
    }
}