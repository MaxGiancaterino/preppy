import React, {Component} from 'react';
import {Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import {exploreStyles} from './ExploreStyles';
import RecipeService from '../../middleware/RecipeService';

export default class RecipeExplore extends Component {

    static navigationOptions = {
        title: "Recipe Explorer",
    };

    updateSearchString = (text) => {
        this.setState({searchedText: text});
    };

    searchRecipes = (searchString) => {
        RecipeService.findRecipesByName(this.state.searchedText, 5).then(recipes => {
            this.setState({foundRecipes: recipes});
        })
    };

    constructor() {
        super();
        this.state = {
            searchedText: "",
            foundRecipes: []
        }
    }

    render() {
        const recipes = this.state.foundRecipes.length == 0 ?
            <Text>No matching recipes found</Text> :
            recipeButtons = this.state.foundRecipes.map((recipe) =>
                <Text key={recipe.id}>{recipe.name}</Text>
            );
        return(
            <View style={exploreStyles.exploreMain}>
                <TextInput
                    style={exploreStyles.searchBar}
                    placeholder="Search for Recipes..."
                    onChangeText={this.updateSearchString}
                />
                <TouchableOpacity
                    style={exploreStyles.searchButton}
                    onPress={() => this.searchRecipes(this.state.searchedText)}
                >
                    <View style={exploreStyles.searchButton}>
                        <Text style={exploreStyles.searchButtonText}>
                            Search
                        </Text>
                    </View>
                </TouchableOpacity>
                {recipes}
            </View>
        );
    }
}
