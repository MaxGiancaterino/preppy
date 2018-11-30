import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';

export default class RecipeExplore extends Component {

    static navigationOptions = {
        title: "Recipe Explorer",
    };

    constructor() {
        super();
    }

    render() {
        return(
            <View>
                <TextInput
                    placeholder="Search for Recipes..."
                />
            </View>
        );
    }
}
