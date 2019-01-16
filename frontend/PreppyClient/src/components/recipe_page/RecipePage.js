import React, {Component} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';

import {recipePageStyles} from './RecipePageStyles';
import RecipeItem from './RecipeItem';

import User from '../../models/User';
import Recipe from '../../models/Recipe';

export default class RecipePage extends Component {
    static navigationOptions = {
        title: "Recipe",
    };

    constructor() {
        super();
        this.state = {recipe: undefined, recipeId : -1};
    }

    componentWillMount() {
        const recipe = this.props.navigation.getParam("recipe", new Recipe());
        const rid = this.props.navigation.getParam("recipeId", -1);
        fetch("http://preppy-dev.appspot.com/recipe/" + rid, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(rec => { 
                this.setState({
                    recipe: rec,
                    recipeId : rec.id,
                });
        });

    }

    render() {
        if (!this.state.recipe) {
            return null;
        }
        const recipe = this.state.recipe;

        const uriObject = {uri: recipe.imgUrl};
        const dishImage = recipe.imgUrl ?
            <View style={recipePageStyles.imageContainer}>
                <Image 
                    source={uriObject}
                    style={recipePageStyles.recipeImage}
                />
            </View> :
            <View></View>;

        var iKey = 0;
        const ingredients = this.state.recipe.ingredients.map(ingredient => 
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