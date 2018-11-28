import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {dashboardStyles} from './DashboardStyles';

export default class RecommendedRecipe extends Component {

    constructor() {
        super();
    }

    navigateToRecipe = () => {
        this.props.navigation.navigate("Recipe", {
            // I'm passing the rid separately in case we decide we want to fetch recipe data
            // from the backend on the recipe page itself.
            recipeId: this.props.recipe.rid,
            recipe: this.props.recipe,
        });
    }

    render() {
        return(
            <TouchableOpacity
                style={dashboardStyles.recommendedRecipeItem}
                onPress={this.navigateToRecipe}
            >
                <Text style={dashboardStyles.recommendedRecipeTitle}>
                    {this.props.recipe.recipeName}
                </Text>
            </TouchableOpacity>
        );
    }
}