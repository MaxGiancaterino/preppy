import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import {pantryStyles} from './PantryStyles';
import Header, {HeaderButton} from '../common/Header';
import {headerStyles} from '../common/CommonStyles';

import IngredientItem from './IngredientItem';

import User from '../../models/User';
import Ingredient from '../../models/Ingredient';

export default class Pantry extends Component {

    static navigationOptions = {
        title: "Pantry",
    };

    constructor() {
        super();

        this.state = {
                ingredients: null, 
                newIngredient: null,
            };
    }

    componentWillMount() {
        var user = UserData.getUser();
        this.setState({
            ingredients: user.getSampleIngredients(),
        });
    }

    inputIngredient(newName) {
        this.setState({newIngredient: {"name": newName, "amount": 1}});
    }

    add_ingredient() {
        if (this.state.newIngredient) {
            var newList = this.state.ingredients;
            newList.unshift(this.state.newIngredient);
            this.setState({ingredients: newList});
            this.state.newIngredient = null;
        }  
    }

    render() {

        var iKey = 0;
        var ingredients = this.state.ingredients.map(ingredient => 
            <IngredientItem itemText={ingredient.name} itemAmount={ingredient.amount} ikey={iKey++}/>
        );

        return(
            <View style={pantryStyles.pantryMain}>
                
                <View style={pantryStyles.addIngredientButton}>
                    <Button
                        onPress={() => {this.add_ingredient()}}
                        title="Add ingredient"
                        color="#FFFFFF"
                    />
                </View>

                <View style={pantryStyles.inputBox}>
                    <TextInput style={pantryStyles.input}
                        onChangeText= { 
                            (input) => this.inputIngredient((input))
                        } 
                        placeholder='new ingredient'
                    />
                </View>

                <ScrollView
                    style={pantryStyles.pantryScroll}
                    showsVerticalScrollIndicator="false"
                >

                    <Text style={pantryStyles.sectionTitle}>My Ingredients</Text>
                    {ingredients}

                </ScrollView>

            </View>
        );
    }
}

