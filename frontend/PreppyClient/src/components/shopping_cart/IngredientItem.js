import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

import {shoppingCartStyles} from './ShoppingCartStyles';

export default class IngredientItem extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            amount: this.props.itemAmount, 
            render: true
        };
        //this.state = { amount: 3};
    }

    removeIngredient() {
        this.setState({render : false });
    }
    
    subtractIngredient() {
        if (!this.state.amount == 0) {
            this.setState({ amount: this.state.amount - 1 }); 
        }
    }


    addIngredient() {
        this.setState({ amount: this.state.amount + 1 }); 
    }

    render() {
        const { input } = this.state
        if (!this.state.render) return null;

        return(
            <View style={shoppingCartStyles.ingredientItemMain}>

                <View style={shoppingCartStyles.ingredientNameContainer}>
                    <Text style={shoppingCartStyles.ingredientItemText}>
                        {this.props.itemText}
                    </Text>
                </View>

                <View style={shoppingCartStyles.amountContainer}>
                    <Text style={shoppingCartStyles.ingredientItemText}>
                        {this.state.amount}
                    </Text>
                </View>

                <View style={shoppingCartStyles.changeAmountButton}>
                    <Button
                        onPress={() => {this.subtractIngredient()}}
                        title="-"
                    />
                </View>

                <View style={shoppingCartStyles.changeAmountButton}>
                    <Button
                        onPress={() => {this.addIngredient()}}
                        title="+"
                    />
                </View>

                <View style={shoppingCartStyles.changeAmountButton}>
                    <Button
                        onPress={() => {this.removeIngredient()}}
                        title="x"
                    />
                </View>

            </View>
        );
    }
}