import React, {Component} from 'react';
import {Text, TouchableHighlight, ImageBackground} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {dashboardStyles} from './DashboardStyles';

export default class ExploreButton extends Component {

    constructor() {
        super();
    }

    navigateToExplore = () => {
        this.props.navigation.navigate("RecipeExplore");
    }

    render() {
        return(
            <TouchableHighlight
                style={dashboardStyles.exploreButton}
                onPress={this.navigateToExplore}
            >
                <ImageBackground
                    style={dashboardStyles.buttonImageLeft}
                    // This is a PLACEHOLDER image
                    source={require("../../../assets/img/recipes.jpg")}
                >
                    <Text style={dashboardStyles.buttonText}>Explore Recipes</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}