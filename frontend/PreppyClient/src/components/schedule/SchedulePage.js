import React, {Component} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';

import {scheduleStyles} from './ScheduleStyles';

import ScheduleDay from './ScheduleDay';

import Schedule from '../../models/Schedule';

import UserData from '../../UserData';

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
        const propSchedule = UserData.getUser().schedule;
        this.setState({schedule: propSchedule});
    }

    render() {
        const nav = this.props.navigation;
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
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

        // Move all the dates to a numerical array so they can be properly sorted
        let dates = [];
        for (let d in this.state.schedule.items) {
            if (!this.state.schedule.items.hasOwnProperty(d)) {
                continue;
            }
            dates.push(new Date(d));
        }
        dates.sort(function(a, b) {
            return a - b;
        });
        let scheduleComponents = dates.map((date) => {
            const dateString = date.toDateString();
            const weekday = days[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const dateTitle = [weekday, month, getOrdinalForm(day)].join(" ");

            // We have to sort the individual items as well
            let dateItems = this.state.schedule.items[dateString];
            dateItems.sort(function(a, b) {
                return a.compare(b);
            });
            return (
                <ScheduleDay
                    navigation={nav}
                    date={dateTitle}
                    items={dateItems}
                    key={key++}
                    even={key % 2}
                />
            );
        })

        //if (this.state.schedule && this.state.schedule.getSize() == 0) {
        //    scheduleComponents = <Text>You have no upcoming meals scheduled</Text>;
        //}
        alert(JSON.stringify(UserData.getUser()));

        return(
            <View style={scheduleStyles.scheduleMain}>
                <ScrollView>
                    {scheduleComponents}
                </ScrollView>
            </View>
        );
    }
}
