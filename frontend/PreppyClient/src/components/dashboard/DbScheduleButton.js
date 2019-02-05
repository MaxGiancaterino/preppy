import React, {Component} from 'react';
import {Text, TouchableHighlight, ImageBackground} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {dashboardStyles} from './DashboardStyles';

export default class ScheduleButton extends Component {

    constructor() {
        super();
    }

    navigateToSchedule = () => {
        this.props.navigation.navigate("SchedulePage");
    }

    render() {
        return(
            <TouchableHighlight
                style={dashboardStyles.scheduleButton}
                onPress={this.navigateToSchedule}
            >
                <ImageBackground
                    style={dashboardStyles.buttonImageRight}
                    // This is a PLACEHOLDER image
                    source={require("../../../assets/img/calendar.jpg")}
                >
                    <Text style={dashboardStyles.buttonText}>Schedule</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}