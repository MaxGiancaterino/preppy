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
import {schedulerStyles} from './SchedulerStyles';
import {buttonStyles} from '../common/CommonStyles';

export default class Scheduler extends Component {

    static navigationOptions = {
        title: "Schedule Recipe",
    };

    constructor(props) {
        super(props);
        this.state = {
            cookDate: new Date(),
            numServings: 1,
            phase: 0,
            recipe: null
        };
    }

    componentWillMount() {
        const recipe = this.props.navigation.getParam("recipe", null);
        this.setState({recipe: recipe});
    }

    progressPhase = () => {
        this.setState({phase: this.state.phase + 1});
    }

    render() {


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
                <Text style={buttonStyles.buttonTextNormal}>Scheduling {this.state.recipe.name}</Text>
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
                <TouchableOpacity onPress={this.progressPhase}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>

        let display = this.state.phase === 0 ? scheduleCook : []

        return(
            <View style={schedulerStyles.schedulerMain}>
                {display}
            </View>
        );
    }
}