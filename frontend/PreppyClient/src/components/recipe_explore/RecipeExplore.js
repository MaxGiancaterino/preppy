import React, {Component} from 'react';
import Autocomplete from 'react-native-autocomplete-input'
import {Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {exploreStyles} from './ExploreStyles';
import RecipeService from '../../middleware/RecipeService';
import RecipeButton from '../common/RecipeButton';

import ingredientData from '../../data/ingredientData';

/*
 * Note that I am not using the React Native Tab Navigator, instead using my own system, because
 * the navigator is far too powerful for the needs of this page. The navigator would also require
 * the two search pages to be implemented as different subclasses, which would make the re-using
 * of components very tedious.
 */

const NAME_SEARCH = 0;
const INGREDIENT_SEARCH = 1;

const possibleIngredients = ingredientData.ingredients;

export default class RecipeExplore extends Component {

    static navigationOptions = {
        title: "Recipe Explorer",
    };

    constructor() {
        super();
        this.state = {
            searchedText: "",
            searchedIngredients: [],
            foundNameRecipes: [],
            foundIngredientRecipes: [],
            nameSearchedBefore: false,
            ingredientSearchedBefore: false,
            searchType: NAME_SEARCH
        }
    }

    updateSearchString = (text) => {
        this.setState({
            searchedText: text.toLowerCase(),
        });
    };

    searchRecipes = (searchString, scroll) => {
        if (this.state.searchType === NAME_SEARCH) {
            if (searchString.length < 3) {
                return;
            }
            RecipeService.findRecipesByName(this.state.searchedText, 100).then(recipes => {
                this.setState({
                    foundNameRecipes: recipes,
                    nameSearchedBefore: true,
                });
            })
        }
        else if (this.state.searchType === INGREDIENT_SEARCH) {
            let ingredients = this.state.searchedIngredients;
            if (ingredients.length === 0) {
                return;
            }
            RecipeService.findRecipesByIngredient(ingredients, 100).then(recipes => {
                this.setState({
                    foundIngredientRecipes: recipes,
                    ingredientSearchedBefore: true,
                    searchedIngredients: [],
                });
            });
        }
        if (this.scroll) {
            this.scroll.scrollToIndex({
                animated: false,
                index: 0,
                viewOffset: 0
            })
        }
    };

    addIngredient = (ingredient) => {
        let ingredients = this.state.searchedIngredients;
        if (ingredients.indexOf(ingredient) == -1) {
            ingredients.push(ingredient);
        }
        this.setState({searchedIngredients: ingredients, searchedText: ""});
        this.textInput.clear();
    };

    removeIngredient = (ingredient) => {
        let ingredients = this.state.searchedIngredients;
        const idx = ingredients.indexOf(ingredient);
        if (idx > -1) {
            ingredients.splice(idx, 1);
            this.setState({searchedIngredients: ingredients});
        }
    };

    render() {
        const nav = this.props.navigation;
        const searchByName = this.state.searchType === NAME_SEARCH;
        let suggested = [];
        let query = this.state.searchedText;

        const enableSearch = searchByName ? query.length >= 3 : this.state.searchedIngredients.length > 0;

        if (!searchByName) {
            for (let i = 0; i < possibleIngredients.length; i++) {
                let ingredient = possibleIngredients[i];
                if (ingredient.indexOf(query) > -1 && query.length >= 3) {
                    suggested.push(ingredient);
                }
            }
        }

        const noRecipes =
            (this.state.nameSearchedBefore && searchByName && this.state.foundNameRecipes.length === 0) ||
            (this.state.ingredientSearchedBefore && !searchByName && this.state.foundIngredientRecipes.length === 0);

        /*const recipes = this.state.foundNameRecipes.length > 0 && searchByName ?
            this.state.foundNameRecipes.map((recipe) =>
                <RecipeButton navigation={nav} recipe={recipe} key={recipe.id}/>
            )
            :
            <Text style={exploreStyles.noRecipeMessage}>
                {noRecipes ? "No matching recipes found" : ""}
            </Text>
        */
        const recipes =
            (!this.state.nameSearchedBefore && searchByName) || (!this.state.ingredientSearchedBefore && !searchByName) ?
                []
            : noRecipes ?
                <Text style={exploreStyles.noRecipeMessage}>
                    {noRecipes ? "No matching recipes found" : ""}
                </Text>
            :
                <FlatList
                    showsVerticalScrollIndicator="false"
                    style={exploreStyles.exploreScroll}
                    contentContainerStyle={{paddingBottom: 100}}
                    data={this.state.foundNameRecipes}
                    ref={(c) => {this.scroll = c}}
                    renderItem={
                        (entry) => {
                            const recipe = entry.item;
                            return <RecipeButton navigation={nav} recipe={recipe} key={recipe.id}/>
                        }
                    }
                />

        let idx = 0;
        const selectedIngredients = this.state.searchedIngredients.map(ingredient => {
            const ingredientName = ingredient.replace(/(^|\s)\S/g, l => l.toUpperCase());
            return (
                <View key={++idx} style={exploreStyles.ingredientItem}>
                    <Text style={exploreStyles.ingredientText}>{ingredientName}    </Text>
                    <TouchableWithoutFeedback onPress={() => {this.removeIngredient(ingredient)}}>
                        <Text style={{fontSize: 24}}>×</Text>
                    </TouchableWithoutFeedback>
                </View>
            );
        });
        const ingredientComp = 
            <View style={{flex: 0, flexDirection: "row", flexWrap: "wrap", marginTop: 10}}>
                {selectedIngredients}
            </View>

        return(
            <View style={exploreStyles.exploreMain}>
                <View style={exploreStyles.searchTabs}>

                    <View style={searchByName ? exploreStyles.tabSelected : exploreStyles.tabUnselected}>
                        <TouchableWithoutFeedback onPress={() => {this.setState({searchType: NAME_SEARCH})}}>
                            <Text style={searchByName ? exploreStyles.tabSelectedText : exploreStyles.tabUnselectedText}>
                                Search by name
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={searchByName ? exploreStyles.tabUnselected : exploreStyles.tabSelected}>
                        <TouchableWithoutFeedback onPress={() => {this.setState({searchType: INGREDIENT_SEARCH})}}>
                            <Text style={searchByName ? exploreStyles.tabUnselectedText : exploreStyles.tabSelectedText}>
                                Search by ingredient
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <Autocomplete
                    inputContainerStyle={{borderWidth: 0}}
                    data={suggested}
                    renderTextInput={() => {return(
                        <TextInput
                            style={exploreStyles.searchBar}
                            placeholder={searchByName ? "Search for Recipes..." : "Search Ingredients..."}
                            onChangeText={this.updateSearchString}
                            ref={input => {this.textInput = input}}
                            placeholderTextColor="#F95D45"
                        />
                    )}}
                    renderItem={(ingredient) =>
                        <View style={exploreStyles.ingredientListItem}>
                            <TouchableOpacity onPress={()=>{this.addIngredient(ingredient)}}>
                                <Text style={exploreStyles.ingredientListText}>
                                    {ingredient.replace(/(^|\s)\S/g, l => l.toUpperCase())}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                />

                <TouchableOpacity
                    style={
                        enableSearch ?
                        exploreStyles.searchButton :
                        exploreStyles.searchButtonDeactive
                        
                    }
                    onPress={() => this.searchRecipes(this.state.searchedText)}
                >
                    <Text style={exploreStyles.searchButtonText}>
                        Search Recipes
                    </Text>
                </TouchableOpacity>

                {!searchByName && ingredientComp}
                {recipes}
                
            </View>
        );
    }
}