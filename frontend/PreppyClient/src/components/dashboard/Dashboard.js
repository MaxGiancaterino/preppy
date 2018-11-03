import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import BudgetDisplay from './BudgetDisplay';

export default class Dashboard extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View>
                <ScrollView>
                    <BudgetDisplay/>
                </ScrollView>
            </View>
        );
    }
}