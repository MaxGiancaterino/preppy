import React, {Component} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';

export default class Schedule extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View>
                <Text>This is the schedule</Text>
                <Button
                    title="<="
                    onPress={() => {this.props.navigation.goBack()}}/>
            </View>
        );
    }
}
