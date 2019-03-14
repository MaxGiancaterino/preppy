import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';

import RecipeButton from '../common/RecipeButton';
import UserData from '../../UserData';

import {scheduleStyles} from './ScheduleStyles';

import ScheduleItem, {ITEM_TYPE, MEAL_TYPE} from '../../models/ScheduleItem';
import Schedule from '../../models/Schedule';

function getTimeString(date) {
    const rawHour = date.getHours();
    const minute = date.getMinutes();
    const period = rawHour < 12 ? "am" : "pm";
    const hour = rawHour % 12 == 0 ? 12 : rawHour % 12;
    return hour + ":" + (minute < 10 ? "0" : "") + minute + " " + period;
}

export default class ScheduleDay extends Component {

    constructor() {
        super();
    }

    unscheduleItem = (item) => {
        Schedule.removeItem(UserData.getUser().schedule, item);
        this.forceUpdate();
        this.props.parent.forceUpdate();
        UserData.updateUser();
    }

    removeItem = (item) => {
        Alert.alert(
            "Remove Item?",
            "Are you sure you want to remove this item from your schedule?",
            [
                {text: "Yes", onPress: () => this.unscheduleItem(item)},
                {text: "No"}
            ],
        );
    }

    render() {
        const nav = this.props.navigation;

        let key = 0;
        let items = this.props.items.map((item) => {

            if (item && item.itemType == ITEM_TYPE.COOK) {
                return (
                    <View style={scheduleStyles.scheduleItem} key={key++}>
                        <Text style={scheduleStyles.itemTime}>{getTimeString(item.time)}</Text>
                        <Text style={scheduleStyles.itemText}>{"Prepare " + item.recipe.name}</Text>
                        <RecipeButton
                            recipe={item.recipe}
                            buttonType={2}
                            navigation={nav}
                        />
                        <TouchableOpacity style={scheduleStyles.removeButton} onPress={() => {this.removeItem(item)}}>
                            <Text style={scheduleStyles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                );
            }

            else if (item && item.itemType == ITEM_TYPE.MEAL) {
                return (
                    <View style={scheduleStyles.scheduleItem} key={key++}>
                        <Text style={scheduleStyles.itemTime}>{getTimeString(item.time)}</Text>
                        <Text style={scheduleStyles.itemText}>{"Have " + item.recipe.name + " for " + item.meal}</Text>
                        <TouchableOpacity style={scheduleStyles.removeButton} onPress={() => {this.removeItem(item)}}>
                            <Text style={scheduleStyles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                );
            }

            else {
                return (<Text key={key++}>Error</Text>)
            }
        });

        return(
            <View style={this.props.even ? scheduleStyles.dayContainerEven : scheduleStyles.dayContainerOdd}>
                <Text style={scheduleStyles.dateText}>{this.props.date}</Text>
                {items}
            </View>
        );
    }
}
