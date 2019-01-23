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
        // this.state = {
        //     username: "",
        //     password: ""
        // }
        this.state = {ingredients: null};
    }

    componentWillMount() {
        var user = UserData.getUser();
        this.setState({
            ingredients: user.getSampleIngredients(),
        });
    }

    add_ingredient() {
        // TO DO
        
    }

    render() {

        var iKey = 0;
        const ingredients = this.state.ingredients.map(ingredient => 
            <IngredientItem itemText={ingredient} key={iKey++}/>
        );

        return(
            <View style={pantryStyles.pantryMain}>
                
                <View style={pantryStyles.addIngredientButton}>
                    <Button
                        onPress={() => {this.add_ingredient()}}
                        title="Add ingredient"
                        color="#FDB52B"
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

