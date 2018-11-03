import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {dashboardStyles} from './DashboardStyles';

class BudgetDisplay extends Component {

    constructor() {
        super();
    }

    render() {
        var dollars = Math.floor(this.props.amount);
        var cents = Math.round((this.props.amount - dollars) * 100)
        if (cents < 10) {
            cents = "0" + cents;
        }
        return(
            <View style={dashboardStyles.budgetMain}>
                <Text style={dashboardStyles.budgetTextSmall}>
                    Your Remaining Weekly Budget:
                </Text>
                <View style={dashboardStyles.budgetNumberContainer}>
                    <Text style={dashboardStyles.budgetTextMed}>
                        $
                    </Text>
                    <View style={dashboardStyles.underline}>
                        <Text style={dashboardStyles.budgetTextBig}>
                            {dollars}.
                        </Text>
                    </View>
                    <Text style={dashboardStyles.budgetTextMed}>
                        {cents}
                    </Text>
                </View>
            </View>
        );
    }
}

export default BudgetDisplay;