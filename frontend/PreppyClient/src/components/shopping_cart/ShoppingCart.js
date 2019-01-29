import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import {shoppingCartStyles} from './ShoppingCartStyles';
import Header, {HeaderButton} from '../common/Header';
import {headerStyles} from '../common/CommonStyles';

import IngredientItem from './IngredientItem';

import User from '../../models/User';
import Ingredient from '../../models/Ingredient';

export default class shoppingCart extends Component {

    static navigationOptions = {
        title: "shoppingCart",
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
            <View style={shoppingCartStyles.shoppingCartMain}>
                
                <View style={shoppingCartStyles.addIngredientButton}>
                    <Button
                        onPress={() => {this.add_ingredient()}}
                        title="Add ingredient"
                        color="#FDB52B"
                    />
                </View>

                <View style={shoppingCartStyles.inputBox}>
                    <TextInput style={shoppingCartStyles.input}
                        onChangeText= { 
                            (input) => this.inputIngredient((input))
                        } 
                        placeholder='new ingredient'
                    />
                </View>

                <ScrollView
                    style={shoppingCartStyles.shoppingCartScroll}
                    showsVerticalScrollIndicator="false"
                >

                    <Text style={shoppingCartStyles.sectionTitle}>Ingredients to Buy</Text>
                    {ingredients}

                </ScrollView>

            </View>
        );
    }
}

