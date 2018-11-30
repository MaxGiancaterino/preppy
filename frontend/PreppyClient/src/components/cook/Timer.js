import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {cookStyles} from './CookStyles';

export default class Timer extends Component {

    constructor() {
        super();
        this.state = {
            startTime: 0,   // The last time the timer started to run
            displayTime: 0, // The time currently being displayed by the timer
            addedTime: 0,   // The time that was on the timer before its last activation
            active: false   // Whether or not the timer should currently run
        };
    }

    getCurrentTime() {
        return (new Date()).getTime();
    }

    componentDidMount() {
        this.mounted = true;
        this.updateTimer();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateTimer = () => {
        if (this.mounted && this.state.active) {
            this.setState({displayTime: this.getCurrentTime() - this.state.startTime + this.state.addedTime});
            setTimeout(this.updateTimer, 50);
        }
    }

    activateTimer = () => {
        this.setState(
            {
                startTime: this.getCurrentTime(),
                active: true
            },
            this.updateTimer
        );
    }

    deactivateTimer = () => {
        this.setState({
            addedTime: this.state.addedTime + this.getCurrentTime() - this.state.startTime,
            active: false
        });

    }

    resetTimer = () => {
        this.setState({
            active: false,
            displayTime: 0,
            addedTime: 0,
        });
    }

    reset() {
        this.resetTimer();
    }

    render() {
        const elapsedTime = (this.state.displayTime) ;
        const dSeconds = Math.floor((elapsedTime % 1000) / 100);
        const seconds = Math.floor(elapsedTime / 1000.0) % 60;
        const minutes = Math.floor(elapsedTime / 60000.0) % 60;
        const hours = Math.floor(elapsedTime / 3600000.0);
        return(
            <View style={cookStyles. cookTimer}>
                <View style={cookStyles.cookTimerClock}>
                    <Text style={cookStyles.cookTimerText}>{("0" + hours).slice(-2)}</Text>
                    <Text style={cookStyles.cookTimerText}>:{("0" + minutes).slice(-2)}</Text>
                    <Text style={cookStyles.cookTimerText}>:{("0" + seconds).slice(-2)}</Text>
                    <Text style={cookStyles.cookTimerTextTiny}>:{dSeconds}</Text>
                </View>
                <View style={cookStyles.cookTimerButtons}>
                    <TouchableOpacity
                        onPress={this.state.active ? this.deactivateTimer : this.activateTimer}
                        style={this.state.active ? cookStyles.cookTimerStopButton : cookStyles.cookTimerStartButton}
                    >
                        <Text style={cookStyles.cookTimerButtonText}>
                            {this.state.active ? "Stop" : "Start"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.resetTimer}
                        style={cookStyles.cookTimerResetButton}
                    >
                        <Text style={cookStyles.cookTimerButtonText}>
                            Reset
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}