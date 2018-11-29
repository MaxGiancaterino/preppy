import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {pantryStyles} from './PantryStyles';

export default class IngredientItem extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={pantryStyles.ingredientItemMain}>
                <Text style={pantryStyles.ingredientItemText}>
                    {this.props.itemText}
                </Text>
            </View>
        );
    }
}