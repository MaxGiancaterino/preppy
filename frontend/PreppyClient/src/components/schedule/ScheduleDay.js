import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {scheduleStyles} from './ScheduleStyles';

import ScheduleItem from '../../models/ScheduleItem';

export default class ScheduleDay extends Component {

    constructor() {
        super();
    }

    render() {
        let key = 0;
        let items = this.props.items.map((item) => {
            return (
                <View key={key++}>
                    <Text>{item.recipe.name}</Text>
                </View>
            );
        });

        return(
            <View style={this.props.even ? scheduleStyles.dayContainerEven : scheduleStyles.dayContainerOdd}>
                <Text style={scheduleStyles.dateText}>{this.props.date}</Text>
                {items}
            </View>
        );
    }
}
