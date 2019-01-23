import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

import {shoppingCartStyles} from './ShoppingCartStyles';

export default class IngredientItem extends Component {

    constructor() {
        super();
    }

    
    removeIngredient() {
        // TO DO 
    }


    addIngredient() {
        // TO DO 

    }

    render() {
        return(
            <View style={shoppingCartStyles.ingredientItemMain}>

                <View style={shoppingCartStyles.ingredientNameContainer}>
                    <Text style={shoppingCartStyles.ingredientItemText}>
                        {this.props.itemText}
                    </Text>
                </View>


                <View style={shoppingCartStyles.changeAmountButton}>
                    <Button
                        onPress={() => {this.removeIngredient()}}
                        title="-"
                    />
                </View>

                <View style={shoppingCartStyles.changeAmountButton}>
                    <Button
                        onPress={() => {this.addIngredient()}}
                        title="+"
                    />
                </View>

            </View>
        );
    }
}