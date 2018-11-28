import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {recipePageStyles} from './RecipePageStyles';

import User from '../../models/User';
import Recipe from '../../models/Recipe';

export default class RecipePage extends Component {
    static navigationOptions = {
        title: "Recipe",
    };

    constructor() {
        super();
        this.state = {recipe: null, recipeId : -1};
    }

    componentWillMount() {
        var fetchedRecipe = this.props.navigation.getParam("recipe", new Recipe());
        var rid = this.props.navigation.getParam("recipeId", -1);
        this.setState({
            recipe: fetchedRecipe,
            recipeId : rid,
        });
    }

    render() {
        const recipeName = this.state.recipe.recipeName;
        return (
            <View style={recipePageStyles.recipeMain}>
                <Text>{recipeName}</Text>
            </View>
        );
    }
}