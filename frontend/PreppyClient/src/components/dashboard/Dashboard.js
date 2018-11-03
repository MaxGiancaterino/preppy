import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import BudgetDisplay from './BudgetDisplay';
import {dashboardStyles} from './DashboardStyles';
import ScheduleButton from './DbScheduleButton';
import CookButton from './DbCookButton';


export default class Dashboard extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={dashboardStyles.dashboardMain}>
                <ScrollView>
                    <BudgetDisplay amount="98.01"/>
                    <View style={dashboardStyles.buttonContainer}>
                        <ScheduleButton/>
                        <CookButton/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}