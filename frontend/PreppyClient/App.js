import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity, AppRegistry, AsyncStorage} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Splash from './src/components/splash/Splash';
import Login from './src/components/login/Login';
import Dashboard from './src/components/dashboard/Dashboard';
import Schedule from './src/components/schedule/Schedule';
import Cook from './src/components/cook/Cook';
import Profile from './src/components/profile/Profile';
import RecipePage from './src/components/recipe_page/RecipePage';


import Header, {HeaderButton} from './src/components/Header';
import {headerStyles, mainStyle} from './src/Styles';

import User from './src/models/User';
import UserData from './src/UserData';

const RootStack = createStackNavigator(
    {
        Splash: {
            screen: Splash
        },
        Login: {
            screen: Login
        },
        Dashboard: {
            screen: Dashboard
        },
        Schedule: {
            screen: Schedule
        },
        Cook: {
            screen: Cook
        },
        Profile: {
            screen: Profile
        },
        Recipe: {
            screen: RecipePage
        },
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: headerStyles.headerMain,
            headerTitleStyle: headerStyles.headerTitle,
            headerTintColor: "#FFFFFF",

            headerRight: <HeaderButton type="profile" navigation={navigation}/>
        })
    },
 );

export default class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <RootStack/>
        );
    }
}

AppRegistry.registerComponent('App', () => App);