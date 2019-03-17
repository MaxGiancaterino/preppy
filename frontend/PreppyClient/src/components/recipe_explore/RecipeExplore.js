import React, {Component} from 'react';
import {Text, View, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {exploreStyles} from './ExploreStyles';
import RecipeService from '../../middleware/RecipeService';
import RecipeButton from '../common/RecipeButton';


/*
 * Note that I am not using the React Native Tab Navigator, instead using my own system, because
 * the navigator is far too powerful for the needs of this page. The navigator would also require
 * the two search pages to be implemented as different subclasses, which would make the re-using
 * of components very tedious.
 */

const NAME_SEARCH = 0;
const INGREDIENT_SEARCH = 1;

export default class RecipeExplore extends Component {

    static navigationOptions = {
        title: "Recipe Explorer",
    };

    updateSearchString = (text) => {
        this.setState({
            searchedText: text,
            searchType: NAME_SEARCH,
        });
    };

    searchRecipes = (searchString) => {
        if (searchString.length < 3) {
            return;
        }
        RecipeService.findRecipesByName(this.state.searchedText, 5).then(recipes => {
            this.setState({foundNameRecipes: recipes, searchedBefore: true});
        })
    };

    constructor() {
        super();
        this.state = {
            searchedText: "",
            foundNameRecipes: [],
            searchedBefore: false,
            searchType: NAME_SEARCH
        }
    }

    render() {
        const nav = this.props.navigation;
        const searchByName = this.state.searchType === NAME_SEARCH;
        const recipes = this.state.foundNameRecipes.length > 0 && searchByName ?
            this.state.foundNameRecipes.map((recipe) =>
                <RecipeButton navigation={nav} recipe={recipe} key={recipe.id}/>
            )
            :
            <Text style={exploreStyles.noRecipeMessage}>
                {this.state.searchedBefore ? "No matching recipes found" : ""}
            </Text>

        return(
            <View style={exploreStyles.exploreMain}>
                <View style={exploreStyles.searchTabs}>

                    <View style={searchByName ? exploreStyles.tabSelected : exploreStyles.tabUnselected}>
                        <TouchableWithoutFeedback onPress={() => {this.setState({searchType: NAME_SEARCH})}}>
                            <Text style={searchByName ? exploreStyles.tabSelectedText : exploreStyles.tabUnselectedText}>
                                Search By Name
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={searchByName ? exploreStyles.tabUnselected : exploreStyles.tabSelected}>
                        <TouchableWithoutFeedback onPress={() => {this.setState({searchType: INGREDIENT_SEARCH})}}>
                            <Text style={searchByName ? exploreStyles.tabUnselectedText : exploreStyles.tabSelectedText}>
                                Search By Ingredient
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <TextInput
                    style={exploreStyles.searchBar}
                    placeholder={searchByName ? "Search for Recipes..." : "Search Ingredients..."}
                    onChangeText={this.updateSearchString}
                />
                <TouchableOpacity
                    style={
                        this.state.searchedText.length < 3 ?
                        exploreStyles.searchButtonDeactive :
                        exploreStyles.searchButton
                    }
                    onPress={() => this.searchRecipes(this.state.searchedText)}
                >
                    <Text style={exploreStyles.searchButtonText}>
                        Search Recipes
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