import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import BudgetDisplay from './BudgetDisplay';
import {dashboardStyles} from './DashboardStyles';

export default class Dashboard extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={dashboardStyles.dashboardMain}>
                <ScrollView>
                    <BudgetDisplay amount="98.01"/>
                </ScrollView>
            </View>
        );
    }
}