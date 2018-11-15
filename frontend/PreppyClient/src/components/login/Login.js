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

	submit() {
		//TO DO
	}

	forgot_password() {
		//TO DO
	}

	create_account() {
		//TO DO
	}

    render() {
    	return(
    		<View style={loginStyles.loginMain}>

    			<View style={loginStyles.formContainer}>
 					<View style={loginStyles.inputBox}>
 						<TextInput style={loginStyles.input}
		    				onChangeText={(username) => this.setState({username})}
		    				placeholder='Username'
		    			/>
    				</View>
    				<View style={loginStyles.inputBox}>
 						<TextInput style={loginStyles.input}
		    				onChangeText={(password) => this.setState({password})}
		    				placeholder='Password'
		    			/>
    				</View>
    				<View style={loginStyles.forgotPasswordButton}>
	    				<Button
	    					title="Forgot your password?"
	    			 		onPress={this.forgot_password}
	    			 		color = "lightgray"
	    				/>
	    			</View>
	    			<View style={loginStyles.signInButton}>
	    				<Button
	    					onPress={this.submit}
		    				title="Sign in"
		    				color="#FFFFFF"
		    			/>
	    			</View>
	    			<View style={loginStyles.createAccountButton}>
	    				<Button
	    					onPress={this.create_account}
	    			 		title="Create account"
	    				/>
	    			</View>

    			</View>


    		</View>
        );
    }
}