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
import Recipe from '../../models/Recipe';


export default class Dashboard extends Component {

    static navigationOptions = {
        title: "Dashboard",
        headerLeft: null,
    };

    constructor() {
        super();
        this.state = {budget: 0, suggestedRecipes: undefined}
    }

    componentWillMount() {
        var user = UserData.getUser();
        alert(JSON.stringify(user));
        var randomRecipes = {queue: [15, 2, 3, 4]};
        fetch('http://preppy-dev.appspot.com/recipe/queue', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(randomRecipes)
        }).then(res => res.json()).then(recipes => {
                this.setState({
                    budget: user.remainingBudget,
                    suggestedRecipes: recipes
                });
                global.recipes = recipes;
        });
    }

    render() {
        const nav = this.props.navigation;
        var budget = this.state.budget;
        if (isNaN(budget)) {
            budget = 0;
        }
        if (this.state.suggestedRecipes) {
            var recipeButtons = this.state.suggestedRecipes.map((recipe) =>
                <RecommendedRecipe navigation={nav} recipe={recipe} key={recipe.id}/>
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