import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {headerStyles} from '../Styles';

export default class Header extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={this.props.style}>
                {this.props.children[0]}
                <Text style={headerStyles.headerTitle}>{this.props.title}</Text>
                {this.props.children[1]}
            </View>
        );
    }
}