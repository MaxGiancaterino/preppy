import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity, AppRegistry, AsyncStorage} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Splash from './src/components/splash/Splash';
import Login from './src/components/login/Login';
import Dashboard from './src/components/dashboard/Dashboard';
import SchedulePage from './src/components/schedule/SchedulePage';
import Cook from './src/components/cook/Cook';
import Profile from './src/components/profile/Profile';
import RecipePage from './src/components/recipe_page/RecipePage';
import Pantry from './src/components/pantry/Pantry';
import CreateAccount from './src/components/create_account/CreateAccount';
import RecipeExplore from './src/components/recipe_explore/RecipeExplore';
import ShoppingCart from './src/components/shopping_cart/ShoppingCart';
import Scheduler from './src/components/scheduler/Scheduler';


import Header, {HeaderButton} from './src/components/common/Header';
import {headerStyles, mainStyle} from './src/components/common/CommonStyles';

import User from './src/models/User';
import UserData from './src/UserData';

console.disableYellowBox = true;

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
        SchedulePage: {
            screen: SchedulePage
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
        Pantry: {
            screen: Pantry
        }, 
        CreateAccount: {
            screen: CreateAccount
        },
        RecipeExplore: {
            screen: RecipeExplore
        }, 
        ShoppingCart: {
            screen: ShoppingCart
        },
        Scheduler: {
            screen: Scheduler
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: headerStyles.headerMain,
            headerTitleStyle: headerStyles.headerTitle,
            headerTintColor: "blue",

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