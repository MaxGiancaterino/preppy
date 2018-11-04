import React, {Component} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';
import BudgetDisplay from './BudgetDisplay';
import {dashboardStyles} from './DashboardStyles';
import ScheduleButton from './DbScheduleButton';
import CookButton from './DbCookButton';
import RecommendedRecipe from './RecommendedRecipe';


export default class Dashboard extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={dashboardStyles.dashboardMain}>
                <ScrollView
                    showsVerticalScrollIndicator="false"
                    style={dashboardStyles.dashboardScroll}
                >
                    <BudgetDisplay amount="98.01"/>
                    <View style={dashboardStyles.buttonContainer}>
                        <ScheduleButton/>
                        <CookButton/>
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