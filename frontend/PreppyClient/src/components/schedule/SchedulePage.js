import React, {Component} from 'react';
import {scheduleStyles} from './ScheduleStyles';
import {Text, View, ScrollView, Button} from 'react-native';
import Schedule from '../..//models/Schedule';

function getOrdinalForm(num) {
    let suffix = "";
    if (num % 100 === 11 || num % 100 === 12 || num % 100 === 13) {
        suffix = "th";
    }
    else if (num % 10 == 1) {
        suffix = "st";
    }
    else if (num % 10 == 2) {
        suffix = "nd";
    }
    else if (num % 10 == 3) {
        suffix = "rd";
    }
    else {
        suffix = "th";
    }
    return num + suffix;
}

export default class SchedulePage extends Component {

    static navigationOptions = {
        title: "Schedule",
    };

    constructor(props) {
        super(props);
        this.state = {schedule: null};
    }

    componentWillMount() {
        const propSchedule = this.props.navigation.getParam("schedule", Schedule.getSampleSchedule());
        this.setState({schedule: propSchedule});
    }

    render() {

        let scheduleComponents = [];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        // The key just gets rid of a RN warning. Don't worry too much about it
        let key = 0;

        // Create a new component for every day we have something scheduled, and
        // every event (cooking or meals) we have scheduled.
        for (let dateString in this.state.schedule.items) {
            if (!this.state.schedule.items.hasOwnProperty(dateString)) {
                continue;
            }

            // The displayed date reads like "Monday February 4th"
            let date = new Date(dateString);
            const weekday = days[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const dateTitle = [weekday, month, getOrdinalForm(day)].join(" ");
            scheduleComponents.push(
                <View key={key++}>
                    <Text>{dateTitle}</Text>
                </View>
            );
            for (let i in this.state.schedule.items[dateString]) {
                const item = this.state.schedule.items[dateString][i];
                scheduleComponents.push(
                    <View key={key++}>
                        <Text>{item.recipe.name}</Text>
                    </View>
                );
            }
        }
        return(
            <View style={scheduleStyles.scheduleMain}>
                <View style={scheduleStyles.layoutBar}>
                    <Text>List View</Text>
                </View>
                <ScrollView>
                    {scheduleComponents}
                </ScrollView>
            </View>
        );
    }
}
