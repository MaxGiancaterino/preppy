import React, {Component} from 'react';
import {
    Platform,
    Text,
    View,
    Slider,
    TouchableWithoutFeedback,
    TouchableOpacity,
    DatePickerIOS,
    DatePickerAndroid,
} from 'react-native';
import {schedulerStyles} from './SchedulerWidgetStyles';
import {buttonStyles} from '../common/CommonStyles';

export default class SchedulerWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            cookDate: new Date(),
            numServings: 1,
            phase: 0
        };
    }

    render() {

        let closed = 
            <Text style={buttonStyles.buttonTextNormal}> Schedule Recipe </Text>;

        let datePicker = Platform.OS === 'ios' ?
            <DatePickerIOS
                date={this.state.cookDate}
                onDateChange={(newDate) => {this.setState({cookDate: newDate})}}
            /> :
            <DatePickerAndroid
                date={this.state.cookDate}
                onDateChange={(newDate) => {this.setState({cookDate: newDate})}}
            />
            
        let scheduleCook = 
            <View>
                <Text style={buttonStyles.buttonTextNormal}>Scheduling {this.props.recipe.name}</Text>
                <Text>
                    When will you cook?
                </Text>
                {datePicker}
                <Text>Number of Servings: {this.state.numServings}</Text>
                <Slider
                    minimumValue={1}
                    maximumValue={9}
                    step={1}
                    onValueChange={(value) => {this.setState({numServings: value})}}
                />
                <TouchableOpacity>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>

        let open = this.state.phase === 0 ? scheduleCook : []

        return(
            <TouchableWithoutFeedback
                onPress={() => {this.setState({open: true})}}
            >
                <View style={schedulerStyles.schedulerMain}>
                    {this.state.open ? open : closed}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}