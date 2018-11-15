import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import Header, {HeaderButton} from '../Header';
import {loginStyles} from './LoginStyles';
import {headerStyles} from '../../Styles';

export default class Login extends Component {

	static navigationOptions = {
        title: "Login",
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