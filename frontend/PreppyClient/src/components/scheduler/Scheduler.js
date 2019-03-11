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
            selectedDate: new Date(),
            numServings: 1,
            mealDates: [],
            mealServings: [],
            remainingServings: 1,
            selectedServings: 0,
            phase: 0,
            recipe: null
        };
    }

    componentWillMount() {
        const recipe = this.props.navigation.getParam("recipe", null);
        this.setState({recipe: recipe});
    }

    progressPhase = () => {
        let currentPhase = this.state.phase;
        if (currentPhase > 0) {
            let datesArray = this.state.mealDates;
            let servingsArray = this.state.mealServings;
            datesArray[currentPhase - 1] = this.state.selectedDate;
            servingsArray[currentPhase - 1] = this.state.selectedServings;
            this.setState({mealServings: servingsArray, mealDates: datesArray});
        }
        let remaining = this.state.numServings;
        for (servings of this.state.mealServings) {
            remaining -= servings;
        }
        this.setState({phase: currentPhase + 1, remainingServings: remaining});
    }

    render() {

        const isIos = Platform.OS === 'ios';
        let datePickerCook = isIos ?
            <DatePickerIOS
                date={this.state.cookDate}
                onDateChange={(newDate) => {this.setState({cookDate: newDate})}}
                minimumDate={new Date()}
                minuteInterval={15}
            /> : []

        let datePickerMeal = isIos ?
            <DatePickerIOS
                date={this.state.cookDate}
                onDateChange={(newDate) => {this.setState({selectedDate: newDate})}}
                minimumDate={this.state.cookDate}
                minuteInterval={15}
            /> : []
            
        let scheduleCook = 
            <View>
                <Text style={buttonStyles.buttonTextNormal}>Scheduling {this.state.recipe.name}</Text>
                <Text>
                    When will you cook?
                </Text>
                {datePickerCook}
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

        let scheduleMeal = 
            <View>
                <Text>When will you eat?</Text>
                {datePickerMeal}
                <Text>Selected Servings: {this.state.selectedServings}</Text>
                <Slider
                    minimumValue={1}
                    maximumValue={this.state.remainingServings}
                    step={1}
                    onValueChange={(value) => {this.setState({selectedServings: value})}}
                />
                <TouchableOpacity disabled={this.state.remainingServings === 0} onPress={this.progressPhase}>
                    <Text>Schedule More Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Finish</Text>
                </TouchableOpacity>
                <Text>{this.state.remainingServings}</Text>
            </View>

        let display = this.state.phase === 0 ? scheduleCook : scheduleMeal;

        return(
            <View style={schedulerStyles.schedulerMain}>
                {display}
            </View>
        );
    }
}