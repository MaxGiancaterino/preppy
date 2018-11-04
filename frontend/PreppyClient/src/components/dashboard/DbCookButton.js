import React, {Component} from 'react';
import {Text, TouchableHighlight, ImageBackground} from 'react-native';
import {dashboardStyles} from './DashboardStyles';

export default class CookButton extends Component {

    constructor() {
        super();
    }

    navigateToCooking = () => {
        this.props.navigation.navigate("Cook")
    }

    render() {
        return(
            <TouchableHighlight
                style={dashboardStyles.cookButton}
                onPress={this.navigateToCooking}
            >
                <ImageBackground
                    style={dashboardStyles.cookImage}
                    // This is a PLACEHOLDER image
                    source={require("../../../assets/img/cook.jpg")}
                >
                    <Text style={dashboardStyles.buttonText}>Cook</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}