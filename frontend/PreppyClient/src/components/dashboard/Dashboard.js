import React, {Component} from 'react';
import {Text, View, ScrollView, Button, StatusBar} from 'react-native';
import BudgetDisplay from './BudgetDisplay';
import {dashboardStyles} from './DashboardStyles';
import {headerStyles} from '../../Styles';
import ScheduleButton from './DbScheduleButton';
import CookButton from './DbCookButton';
import RecommendedRecipe from './RecommendedRecipe';
import {HeaderButton} from '../Header';

export default class Dashboard extends Component {

    static navigationOptions = {
        title: "Dashboard",
    };

    constructor() {
        super();
    }

    render() {
        let nav = this.props.navigation;
        return(
            <View style={dashboardStyles.dashboardMain}>
                <StatusBar
                    barStyle="dark-content"
                />
                <ScrollView
                    showsVerticalScrollIndicator="false"
                    style={dashboardStyles.dashboardScroll}
                >
                    <BudgetDisplay amount="98.01"/>
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