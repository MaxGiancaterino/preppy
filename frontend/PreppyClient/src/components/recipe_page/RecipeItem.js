import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {recipePageStyles} from './RecipePageStyles';

export default class RecipeItem extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={recipePageStyles.recipeItemMain}>
                <Text style={recipePageStyles.recipeItemText}>
                    {this.props.itemText}
                </Text>
            </View>
        );
    }
}