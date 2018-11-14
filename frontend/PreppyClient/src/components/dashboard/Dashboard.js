import React, {Component} from 'react';
import {Text, View, ScrollView, Button, StatusBar, AsyncStorage} from 'react-native';
import BudgetDisplay from './BudgetDisplay';
import {dashboardStyles} from './DashboardStyles';
import {headerStyles} from '../../Styles';
import ScheduleButton from './DbScheduleButton';
import CookButton from './DbCookButton';
import RecommendedRecipe from './RecommendedRecipe';
import {HeaderButton} from '../Header';

import UserData from '../../UserData';

export default class Dashboard extends Component {

    static navigationOptions = {
        title: "Dashboard",
    };

    componentWillMount() {
        this.setState({budget: 0});
        UserData.getUser().then((user) => {
            this.setState({budget: user.remainingBudget})
        }).catch((error) => {
            console.log(error.message);
        });
    }

    constructor() {
        super();
    }

    render() {
        let nav = this.props.navigation;
        var budget = this.state.budget;
        if (isNaN(budget)) {
            budget = 0;
        }
        return(
            <View style={dashboardStyles.dashboardMain}>
                <StatusBar
                    barStyle="dark-content"
                />
                <ScrollView
                    showsVerticalScrollIndicator="false"
                    style={dashboardStyles.dashboardScroll}
                >
                    <BudgetDisplay amount={budget}/>
                    <View style={dashboardStyles.buttonContainer}>
                        <ScheduleButton navigation={nav}/>
                        <CookButton navigation={nav}/>
                    </View>
                    <View style={dashboardStyles.recipeListTitleContainer}>
                        <Text style={dashboardStyles.recipeListTitle}>
                            Recipes Recommended For You:
                        </Text>
                    </View>
                    <RecommendedRecipe recipeName = "Test Recipe"/>
                    <RecommendedRecipe recipeName = "Test Recipe"/>
                    <RecommendedRecipe recipeName = "Test Recipe"/>
                    <RecommendedRecipe recipeName = "Test Recipe"/>
                </ScrollView>
            </View>
        );
    }
}