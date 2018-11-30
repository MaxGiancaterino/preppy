import React, {Component} from 'react';
import {Text, TouchableHighlight, ImageBackground} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {dashboardStyles} from './DashboardStyles';

// For now, I'm just replacing this button with something entirely different
// Once we have the schedule built, we should definitely restore this back
// to its original state and have the recipe list button elsewhere

export default class ScheduleButton extends Component {

    constructor() {
        super();
    }

    navigateToSchedule = () => {
        this.props.navigation.navigate("RecipeExplore");
        //this.props.navigation.navigate("Schedule");
    }

    render() {
        //navigateToSchedule();
        return(
            <TouchableHighlight
                style={dashboardStyles.scheduleButton}
                onPress={this.navigateToSchedule}
            >
                <ImageBackground
                    style={dashboardStyles.scheduleImage}
                    // This is a PLACEHOLDER image
                    source={require("../../../assets/img/recipes.jpg")}
                    //source={require("../../../assets/img/calendar.jpg")}
                >
                    <Text style={dashboardStyles.buttonText}>Explore Recipes</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}