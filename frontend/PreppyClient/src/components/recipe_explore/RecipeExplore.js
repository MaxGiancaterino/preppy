import React, {Component} from 'react';
import Autocomplete from 'react-native-autocomplete-input'
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

const possibleIngredients = ["eggs", "butter", "rice", "chicken"];

export default class RecipeExplore extends Component {

    static navigationOptions = {
        title: "Recipe Explorer",
    };

    updateSearchString = (text) => {
        this.setState({
            searchedText: text.toLowerCase(),
        });
    };

    searchRecipes = (searchString) => {
        if (this.state.searchType === NAME_SEARCH) {
            if (searchString.length < 3) {
                return;
            }
            RecipeService.findRecipesByName(this.state.searchedText, 5).then(recipes => {
                this.setState({foundNameRecipes: recipes, searchedBefore: true});
            })
        }
        else if (this.state.searchType === INGREDIENT_SEARCH) {
            let ingredients = this.state.searchedIngredients;
            if (ingredients.length === 0) {
                return;
            }
            else {
                return;
            }
        }
    };

    addIngredient = (ingredient) => {
        let ingredients = this.state.searchedIngredients;
        if (ingredients.indexOf(ingredient) == -1) {
            ingredients.push(ingredient);
        }
        this.setState({searchedIngredients: ingredients, searchedText: ""});
        this.textInput.clear();
    }

    constructor() {
        super();
        this.state = {
            searchedText: "",
            searchedIngredients: [],
            foundNameRecipes: [],
            searchedBefore: false,
            searchType: NAME_SEARCH
        }
    }

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

        const recipes = this.state.foundNameRecipes.length > 0 && searchByName ?
            this.state.foundNameRecipes.map((recipe) =>
                <RecipeButton navigation={nav} recipe={recipe} key={recipe.id}/>
            )
            :
            <Text style={exploreStyles.noRecipeMessage}>
                {this.state.searchedBefore ? "No matching recipes found" : ""}
            </Text>

        let idx = 0;
        const selectedIngredients = this.state.searchedIngredients.map(ingredient =>
            <View key={++idx} style={exploreStyles.ingredientItem}>
                <Text style={{fontFamily: "Raleway"}}>{ingredient}</Text>
            </View>
        )
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
                <Autocomplete
                    inputContainerStyle={{borderWidth: 0}}
                    data={suggested}
                    renderTextInput={() => {return(
                        <TextInput
                            style={exploreStyles.searchBar}
                            placeholder={searchByName ? "Search for Recipes..." : "Search Ingredients..."}
                            onChangeText={this.updateSearchString}
                            ref={input => {this.textInput = input}}
                        />
                    )}}
                    renderItem={(ingredient) =>
                        <View>
                            <TouchableOpacity onPress={()=>{this.addIngredient(ingredient)}}>
                                <Text>{ingredient}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />

                {!searchByName && ingredientComp}

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