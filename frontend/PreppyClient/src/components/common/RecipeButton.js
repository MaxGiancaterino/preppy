import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {recipeButtonStyles} from './CommonStyles';

export default class RecipeButton extends Component {

    constructor() {
        super();
    }

    navigateToRecipe = () => {
        this.props.navigation.navigate({
            routeName: "Recipe",
            params: {
                recipeId: this.props.recipe.id,
                recipe: this.props.recipe,
            }
        });
    }

    render() {
        if (!this.props.buttonType || this.props.buttonType == 1) {
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
        else if (this.props.buttonType == 2) {
            return(
                <TouchableOpacity
                    style={recipeButtonStyles.recipeButtonItemAlt}
                    onPress={this.navigateToRecipe}
                >
                    <Text style={recipeButtonStyles.recipeButtonTitleAlt}>
                        View Recipe
                    </Text>
                </TouchableOpacity>
            );
        }
    }
}