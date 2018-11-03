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
        return(
            <View style={dashboardStyles.budgetMain}>
                <Text style={dashboardStyles.budgetTextSmall}>
                    Your Remaining Weekly Budget:
                </Text>
                <View style={dashboardStyles.budgetNumberContainer}>
                    <Text style={dashboardStyles.budgetTextMed}>
                        $
                    </Text>
                    <Text style={dashboardStyles.budgetTextBig}>
                        {dollars}.
                    </Text>
                    <Text style={dashboardStyles.budgetTextMed}>
                        {cents}
                    </Text>
                </View>
            </View>
        );
    }
}

export default BudgetDisplay;