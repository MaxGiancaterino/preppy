import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {cookStyles} from './CookStyles';

export default class SuggestedDish extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <TouchableOpacity
                onPress={() => this.props.onPress(this.props.recipe)}
                style={cookStyles.recipeSelectButton}
            >
                <Text style={cookStyles.recipeSelectButtonText}>
                    {this.props.recipe.recipeName}
                </Text>
            </TouchableOpacity>
        );
    }
}