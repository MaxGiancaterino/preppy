import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';

export default class Calendar extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        if (this.props.year) {
            year = this.props.year;
        }
        if (this.props.month) {
            month = this.props.month;
        }

        this.setState({year: year, month: month});
    }

    render() {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        let curMonth = months[this.state.month];
        return (
            <View>
                <Text>{curMonth + " " + this.state.year}</Text>
            </View>
        );
    }
}