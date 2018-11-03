import React, {Component} from 'react';
import {Text, View} from 'react-native';

class BudgetDisplay extends Component {

    constructor() {
        super();
    }

    render() {
        var dollars = this.props
        return(
            <View>
                <Text>Your Remaining Weekly Budget:</Text>
            </View>
        );
    }
}

export default BudgetDisplay;