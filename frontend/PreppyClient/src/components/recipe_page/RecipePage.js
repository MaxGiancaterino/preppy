import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';

import {recipePageStyles} from './RecipePageStyles';
import RecipeItem from './RecipeItem';

import User from '../../models/User';
import Recipe from '../../models/Recipe';

import RecipeService from '../../middleware/RecipeService'

export default class RecipePage extends Component {
    static navigationOptions = {
        title: "Recipe",
    };

    constructor() {
        super();
        this.state = {recipe: undefined, recipeId : -1};
    }

    componentWillMount() {
        const rid = this.props.navigation.getParam("recipeId", -1);
        if (rid == -1) {
            const propRecipe = this.props.navigation.getParam("recipe", new Recipe());
            this.setState({
                recipe: propRecipe,
                recipeId : rid,
            });
        }
        else {
            RecipeService.fetchRecipeById(rid).then(fetchedRecipe => {
                this.setState({
                    recipe: fetchedRecipe,
                    recipeId : fetchedRecipe.id,
                });
            })
        }
    }

    render() {
        if (!this.state.recipe) {
            return null;
        }
        const recipe = this.state.recipe;

        const uriObject = {uri: recipe.imgURL};
        const dishImage = recipe.imgURL ?
            <View style={recipePageStyles.imageContainer}>
                <Image 
                    source={uriObject}
                    style={recipePageStyles.recipeImage}
                />
            </View> :
            <View></View>;

        var iKey = 0;
        const ingredients = recipe.ingredients.map(ingredient =>
            <RecipeItem itemText={ingredient.ingredient} key={iKey++}/>
        );
        var sKey = 0;
        const steps = this.state.recipe.preparation.map(step => 
            <RecipeItem itemText={step.text} key={sKey++}/>
        );

        return (
            <View style={recipePageStyles.recipeMain}>
                <ScrollView
                    style={recipePageStyles.recipeScroll}
                    showsVerticalScrollIndicator="false"
                >
                    <Text style={recipePageStyles.recipeTitle}>{recipe.name}</Text>
                    {dishImage}
                    <Text style={recipePageStyles.sectionTitle}>Ingredients</Text>
                    {ingredients}
                    <Text style={recipePageStyles.sectionTitle}>Preparation</Text>
                    {steps}

                </ScrollView>
            </View>
        );
    }
}