import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity, AppRegistry} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Dashboard from './src/components/dashboard/Dashboard';
import Schedule from './src/components/schedule/Schedule';
import Cook from './src/components/cook/Cook';
import Header, {HeaderButton} from './src/components/Header';
import {headerStyles, mainStyle} from './src/Styles';

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
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    },
    {
        intitialRouteName: "Dashboard",
    },
 );

export default class App extends Component {
    render() {
        return <RootStack/>;
      }
}

AppRegistry.registerComponent('App', () => App);