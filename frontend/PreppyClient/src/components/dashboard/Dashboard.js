import React, {Component} from 'react';
import {Text, View, ScrollView, Button, StatusBar, AsyncStorage} from 'react-native';
import BudgetDisplay from './BudgetDisplay';
import {dashboardStyles} from './DashboardStyles';
import ScheduleButton from './DbScheduleButton';
import ExploreButton from './DbExploreButton';
import CookButton from './DbCookButton';
import PantryButton from './DbPantryButton';
import RecipeButton from '../common/RecipeButton';
import {HeaderButton} from '../common/Header';
import {headerStyles} from '../common/CommonStyles';

import UserData from '../../UserData';
import RecipeService from '../../middleware/RecipeService';
import User from '../../models/User';
import Recipe from '../../models/Recipe';


export default class Dashboard extends Component {

    static navigationOptions = {
        title: "Dashboard",
        headerLeft: null,
    };

    constructor() {
        super();
        this.state = {
            budget: 0,
            suggestedRecipes: undefined
        }
    }

    componentWillMount() {
        const user = UserData.getUser();
        const arbitraryRecipes = [15, 2, 3, 4];
        RecipeService.fetchRecipeQueue(arbitraryRecipes).then(recipes => {
            this.setState({
                budget: user.remainingBudget,
                suggestedRecipes: recipes
            });
            global.recipes = recipes;
        });
    }

    render() {
        const nav = this.props.navigation;
        let budget = this.state.budget;
        let recipeButtons = [];
        if (isNaN(budget)) {
            budget = 0;
        }
        if (this.state.suggestedRecipes) {
            recipeButtons = this.state.suggestedRecipes.map((recipe) =>
                <RecipeButton navigation={nav} recipe={recipe} key={recipe.id}/>
            );
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
                        <CookButton navigation={nav}/>
                    </View>
                    <PantryButton navigation={nav}/>
                    <ExploreButton navigation={nav}/>
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