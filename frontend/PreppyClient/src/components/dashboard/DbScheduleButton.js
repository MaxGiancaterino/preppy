import React, {Component} from 'react';
import {Text, TouchableHighlight, ImageBackground} from 'react-native';
import {dashboardStyles} from './DashboardStyles';

export default class ScheduleButton extends Component {

    constructor() {
        super();
    }

    navigateToSchedule() {

    }

    render() {
        return(
            <TouchableHighlight
                style={dashboardStyles.scheduleButton}
                onPress={this.navigateToSchedule}
            >
                <ImageBackground
                    style={dashboardStyles.scheduleImage}
                    // This is a PLACEHOLDER image
                    source={require("../../../assets/img/calendar.jpg")}
                >
                    <Text style={dashboardStyles.buttonText}>Schedule</Text>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}