import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {dashboardStyles} from './DashboardStyles';

export default class RecommendedRecipe extends Component {

    constructor(props) {
        super(props);
    }

    navigateToRecipe() {

    }

    render() {
        return(
            <TouchableOpacity
                style={dashboardStyles.recommendedRecipeItem}
                onPress={this.navigateToRecipe}
            >
                <Text style={dashboardStyles.recommendedRecipeTitle}>
                    {this.props.recipeName}
                </Text>
            </TouchableOpacity>
        );
    }
}