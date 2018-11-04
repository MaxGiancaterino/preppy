import React, {Component} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';

export default class Cook extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View>
                <Text>This is the cooking page</Text>
                <Button
                    title="<="
                    onPress={() => {this.props.navigation.goBack()}}/>
            </View>
        );
    }
}
