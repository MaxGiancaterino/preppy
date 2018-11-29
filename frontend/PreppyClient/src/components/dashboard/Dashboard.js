import React, {Component} from 'react';
import {Text, View, ScrollView, Button, StatusBar, AsyncStorage} from 'react-native';
import BudgetDisplay from './BudgetDisplay';
import {dashboardStyles} from './DashboardStyles';
import {headerStyles} from '../../Styles';
import ScheduleButton from './DbScheduleButton';
import CookButton from './DbCookButton';
import PantryButton from './DbPantryButton';
import RecommendedRecipe from './RecommendedRecipe';
import {HeaderButton} from '../Header';

import UserData from '../../UserData';
import User from '../../models/User';

export default class Dashboard extends Component {

    static navigationOptions = {
        title: "Dashboard",
        headerLeft: null,
    };

    componentWillMount() {
        var user = UserData.getUser();
        this.setState({
            budget: user.remainingBudget,
            suggestedRecipes: user.getSuggestedRecipes()
        });
    }

    constructor() {
        super();
    }

    render() {
        const nav = this.props.navigation;
        var budget = this.state.budget;
        if (isNaN(budget)) {
            budget = 0;
        }

        const recipeButtons = this.state.suggestedRecipes.map((recipe) =>
            <RecommendedRecipe navigation={nav} recipe={recipe} key={recipe.rid} />);

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
                    <PantryButton navigation={nav}/>
                    <View style={dashboardStyles.recipeListTitleContainer}>
                        <Text style={dashboardStyles.recipeListTitle}>
                            Recipes Recommended For You:
                        </Text>
                    </View>

                    {recipeButtons}
                    <View style={{height: 10}}/>
                </ScrollView>
            </View>
        );
    }
}