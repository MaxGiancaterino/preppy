import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Button, ScrollView} from 'react-native';

import {cookStyles} from './CookStyles';
import SuggestedDish from './SuggestedDish';
import RequiredIngredient from './RequiredIngredient';
import Timer from './Timer';

import User from '../../models/User';
import Recipe from '../../models/Recipe';
import UserData from '../../UserData';

export default class Cook extends Component {

    static navigationOptions = {
        title: "Cook",
    };

    constructor() {
        super();

        // The cooking page has different content depending on its phase
        // Phase 0: Select a recipe to cook
        // Phase 1: Go over ingredients, make substitutions, determine number of servings
        // Phase 2: Prepare the food, 1 step at a time
        this.state = {phase: 0, step: 0, recipe: null};
    }

    componentWillMount() {
        // If the navigation was passed a recipe, we can skip phase 0
        const recipeToCook = this.props.navigation.getParam("cookRecipe", null);
        if (recipeToCook && recipeToCook != null) {
            this.setState({phase: 1, recipe: recipeToCook});
        }
    }

    setSelectedRecipe = (recipe) => {
        this.setState({recipe: recipe});
    }

    selectRecipe = () => {
        if (this.state.recipe != null) {
            this.progressPhase();
        }
    }

    progressPhase = () => {
        const totalSteps = this.state.recipe == null ? 0 : this.state.recipe.preparation.length;
        if (this.state.phase == 2 && this.state.step < totalSteps - 1) {
            this.setState({step: this.state.step + 1});
        }
        else {
            this.setState({phase: this.state.phase + 1});
        }

        if(this.timer){
            this.timer.resetTimer();
        }
    }

    goBackStep = () => {
        if (this.state.phase == 2 && this.state.step > 0) {
            this.setState({step: this.state.step - 1});
        }
        else {
            this.setState({phase: this.state.phase - 1});
        }

        if(this.timer){
            this.timer.resetTimer();
        }
    }

    finishCooking = () => {
        this.props.navigation.goBack();
        // TODO: Update the user's pantry and schedule upon completion
    }

    render() {
        var currentView;
        if (this.state.phase == 0) {

            /* ---------------------------------------------------- *
             *  Phase 0
             * ---------------------------------------------------- */

            let upcoming = UserData.getUpcomingMeals(5).map(
                meal => {
                    let recipe = meal.recipe;
                    const isSelected = this.state.recipe && this.state.recipe.id === recipe.id;
                    return (
                        <TouchableOpacity
                            onPress={() => this.setSelectedRecipe(recipe)}
                            style={isSelected ? cookStyles.recipeSelectButton : cookStyles.recipeButtonUnselected}
                            key={recipe.id}
                        >
                            <Text style={isSelected ? cookStyles.recipeButtonText : cookStyles.recipeButtonTextUnselected}>
                                {recipe.name}
                            </Text>
                        </TouchableOpacity>
                    );
                }
            );

            if (upcoming.length === 0) {
                upcoming =
                    <Text>
                        You don't have any upcoming meal preps scheduled.
                        Head to the Recipe Exploreer and find something to cook.
                    </Text>
            }
            currentView =
                <View style={cookStyles.cookMain}>

                    <Text style={cookStyles.cookTitle}>Choose a Recipe to Cook</Text>
                    <Text style={cookStyles.cookSubtitle}>Your Upcoming Meals</Text>
                    {upcoming}
                    <Text style={cookStyles.cookSubtitle}></Text>
                    <Text>{this.state.recipe == null ? "Please select a recipe to cook" : "Selected Recipe:"}</Text>
                    <View>
                        <Text>{this.state.recipe == null ? "" : this.state.recipe.name}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.selectRecipe}
                        activeOpacity={this.state.recipe == null ? 1.0 : 0.5}
                    >
                        <View
                            style={this.state.recipe == null ? cookStyles.cookButtonDeactive: cookStyles.cookButtonActive}
                        >
                            <Text style={cookStyles.cookButtonText}>Start Cooking</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            
        }
        else if (this.state.phase == 1) {

            /* ---------------------------------------------------- *
             *  Phase 1
             * ---------------------------------------------------- */

            var key = 0;
            const requiredIngredients = this.state.recipe.ingredients.map((ing) => 
                <RequiredIngredient ingredient={ing.ingredient} key={key++}/>
            );

            currentView =
                <ScrollView
                    contentContainerStyle={cookStyles.cookMain}
                    showsVerticalScrollIndicator="false"
                >

                    <TouchableOpacity onPress={this.goBackStep}>
                        <View style={cookStyles.cookButtonActive}>
                            <Text style={cookStyles.cookButtonText}>
                                Go Back
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={cookStyles.cookTitle}>Required Ingredients</Text>
                    {requiredIngredients}

                    <TouchableOpacity onPress={this.progressPhase}>
                        <View style={cookStyles.cookButtonActive}>
                            <Text style={cookStyles.cookButtonText}>
                                Prep
                            </Text>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
        }
        else if (this.state.phase == 2) {

            /* ---------------------------------------------------- *
             *  Phase 2
             * ---------------------------------------------------- */

            const finished = this.state.step >= this.state.recipe.preparation.length - 1;

            currentView = 
                <ScrollView
                    contentContainerStyle={cookStyles.cookMain}
                    showsVerticalScrollIndicator="false"
                >

                    <TouchableOpacity onPress={this.goBackStep}>
                        <View style={cookStyles.cookButtonActive}>
                            <Text style={cookStyles.cookButtonText}>Go Back</Text>
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Timer ref={timer => {this.timer = timer}}/>
                    </View>

                    <Text style={cookStyles.cookTitle}>{"Step " + (this.state.step + 1)}</Text>
                    <Text style={cookStyles.recipeStepText}>
                        {this.state.recipe.preparation[this.state.step].text}
                    </Text>

                    <TouchableOpacity onPress={finished ? this.finishCooking : this.progressPhase}>
                        <View style={cookStyles.cookButtonActive}>
                            <Text style={cookStyles.cookButtonText}>
                                {finished ? "Finish" : "Next Step"}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
        }

        return(
            currentView
        );
    }
}
