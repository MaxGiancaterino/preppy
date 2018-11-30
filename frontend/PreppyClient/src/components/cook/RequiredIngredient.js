import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {cookStyles} from './CookStyles';

export default class RequiredIngredient extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={cookStyles.requiredIngredient}>
                <Text style={cookStyles.requiredIngredientText}>{this.props.ingredient}</Text>
            </View>
        );
    }
}