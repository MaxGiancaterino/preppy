import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {dashboardStyles} from './DashboardStyles';

export default class RecommendedRecipe extends Component {

    constructor() {
        super();
    }

    navigateToRecipe = () => {
        this.props.navigation.navigate("Recipe", {
            recipeId: this.props.recipe.id,
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
                    {this.props.recipe.name}
                </Text>
            </TouchableOpacity>
        );
    }
}