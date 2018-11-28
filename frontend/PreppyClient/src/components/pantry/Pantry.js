import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import Header, {HeaderButton} from '../Header';
import {pantryStyles} from './PantryStyles';
import {headerStyles} from '../../Styles';

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

    add_ingredient() {
        // TO DO
        
    }

    render() {
        const recipe = this.state.recipe;

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

                </ScrollView>

            </View>
        );
    }
}

