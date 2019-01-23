import React, {Component} from 'react';
import {Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {exploreStyles} from './ExploreStyles';
import RecipeService from '../../middleware/RecipeService';
import RecipeButton from '../common/RecipeButton';

export default class RecipeExplore extends Component {

    static navigationOptions = {
        title: "Recipe Explorer",
    };

    updateSearchString = (text) => {
        this.setState({searchedText: text});
    };

    searchRecipes = (searchString) => {
        if (searchString.length < 3) {
            return;
        }
        RecipeService.findRecipesByName(this.state.searchedText, 5).then(recipes => {
            this.setState({foundRecipes: recipes, searchedBefore: true});
        })
    };

    constructor() {
        super();
        this.state = {
            searchedText: "",
            foundRecipes: [],
            searchedBefore: false,
        }
    }

    render() {
        const nav = this.props.navigation;
        const recipes = this.state.foundRecipes.length == 0 ?
            <Text style={exploreStyles.noRecipeMessage}>{this.state.searchedBefore ? "No matching recipes found" : ""}</Text> :
            this.state.foundRecipes.map((recipe) =>
                <RecipeButton navigation={nav} recipe={recipe} key={recipe.id}/>
            );
        return(
            <View style={exploreStyles.exploreMain}>
                <TextInput
                    style={exploreStyles.searchBar}
                    placeholder="Search for Recipes..."
                    onChangeText={this.updateSearchString}
                />
                <TouchableOpacity
                    style={this.state.searchedText.length < 3 ? exploreStyles.searchButtonDeactive : exploreStyles.searchButton}
                    onPress={() => this.searchRecipes(this.state.searchedText)}
                >
                    <Text style={exploreStyles.searchButtonText}>
                        Search
                    </Text>
                </TouchableOpacity>
                <ScrollView
                    showsVerticalScrollIndicator="false"
                    style={exploreStyles.exploreScroll}
                >
                    {recipes}
                </ScrollView>
            </View>
        );
    }
}
