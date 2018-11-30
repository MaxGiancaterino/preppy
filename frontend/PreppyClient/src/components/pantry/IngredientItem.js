import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

import {pantryStyles} from './PantryStyles';

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
            <View style={pantryStyles.ingredientItemMain}>

                <View style={pantryStyles.ingredientNameContainer}>
                    <Text style={pantryStyles.ingredientItemText}>
                        {this.props.itemText}
                    </Text>
                </View>


                <View style={pantryStyles.changeAmountButton}>
                    <Button
                        onPress={() => {this.removeIngredient()}}
                        title="-"
                    />
                </View>

                <View style={pantryStyles.changeAmountButton}>
                    <Button
                        onPress={() => {this.addIngredient()}}
                        title="+"
                    />
                </View>

            </View>
        );
    }
}