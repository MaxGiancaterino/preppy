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
                    style={dashboardStyles.buttonImageBottom}
                    // This is a PLACEHOLDER image
                    source={require("../../../assets/img/explore.png")}
                >
                    <Text style={dashboardStyles.buttonTextBottom}>Explore Recipes</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}