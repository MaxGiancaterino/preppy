import React, {Component} from 'react';
import {Text, TouchableHighlight, ImageBackground} from 'react-native';
import {dashboardStyles} from './DashboardStyles';
import Recipe from '../../models/Recipe';

export default class CookButton extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        if (!this.props.navigation.params) {
            this.props.navigation.state.params = {cookRecipe: null}
        }
    }

    navigateToCooking = () => {
        this.props.navigation.navigate("Cook");
    }

    render() {
        return(
            <TouchableHighlight
                style={dashboardStyles.cookButton}
                onPress={this.navigateToCooking}
            >
            <ImageBackground
                    style={dashboardStyles.buttonImageLeft}
                    // This is a PLACEHOLDER image
                    source={require("../../../assets/img/cook2.png")}
                >
                    <Text style={dashboardStyles.buttonTextLeft}>Cook</Text>
                </ImageBackground>
                
            </TouchableHighlight>
        );
    }
}