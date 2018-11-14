import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity, AppRegistry, AsyncStorage} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Dashboard from './src/components/dashboard/Dashboard';
import Schedule from './src/components/schedule/Schedule';
import Cook from './src/components/cook/Cook';
import Profile from './src/components/profile/Profile';
import Login from './src/components/login/Login';

import Header, {HeaderButton} from './src/components/Header';
import {headerStyles, mainStyle} from './src/Styles';

import User from './src/models/User';
import UserData from './src/UserData';

const RootStack = createStackNavigator(
    {
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
        Login: {
            screen: Login
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: headerStyles.headerMain,
            headerTitleStyle: headerStyles.headerTitle,
            headerTintColor: "#FFFFFF",

            headerRight: <HeaderButton type="profile" navigation={navigation}/>
        })
    },
    {
        intitialRouteName: "Dashboard",
    },
 );

export default class App extends Component {

    componentWillMount() {
        // Note: This is just for testing purposes. Please don't leave this in
        var sampleUser = User.getSampleUser();
        UserData.setUser(sampleUser);
    }

    render() {
        return (
            <RootStack/>
        );
    }
}

AppRegistry.registerComponent('App', () => App);