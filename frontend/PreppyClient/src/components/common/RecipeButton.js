import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {recipeButtonStyles} from './CommonStyles';

export default class RecipeButton extends Component {

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
                style={recipeButtonStyles.recipeButtonItem}
                onPress={this.navigateToRecipe}
            >
                <Text style={recipeButtonStyles.recipeButtonTitle}>
                    {this.props.recipe.name}
                </Text>
            </TouchableOpacity>
        );
    }
}