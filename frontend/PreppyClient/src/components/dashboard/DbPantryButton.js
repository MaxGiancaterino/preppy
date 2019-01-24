import React, {Component} from 'react';
import {Text, TouchableHighlight, ImageBackground} from 'react-native';
import {dashboardStyles} from './DashboardStyles';

export default class PantryButton extends Component {

    constructor() {
        super();
    }

    navigateToPantry = () => {
        this.props.navigation.navigate("Pantry")
    }

    render() {
        return(
            <TouchableHighlight
                style={dashboardStyles.pantryButton}
                onPress={this.navigateToPantry}
            >
                <ImageBackground
                    style={dashboardStyles.buttonImageRight}
                    // This is a PLACEHOLDER image
                    source={require("../../../assets/img/pantry.jpg")}
                >
                    <Text style={dashboardStyles.buttonText}>Pantry</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}