import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import Header, {HeaderButton} from '../Header';
import {pantryStyles} from './CreateAccountStyles';
import {headerStyles} from '../../Styles';

export default class CreateAccount extends Component {

    static navigationOptions = {
        title: "CreateAccount",
    };

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return(
            <View style={CreateAccountStyles.createAccountMain}>

            </View>
        );
    }
}