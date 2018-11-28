import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import {loginStyles} from './LoginStyles';
import UserData from '../../UserData';

import User from '../../models/User';

export default class Login extends Component {

	static navigationOptions = {
        title: "Login",
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
        	username: "",
       		password: "",
        }
    }

	submit() {
        // TODO: Replace the sample user with the actual user data found
        // in Firebase. The following UserData.setUser call is used to
        // pass this data to the front end and shouldn't be changed 
        var user = User.getSampleUser();

        UserData.setUser(user).then(() => {
            this.props.navigation.navigate("Dashboard");
        }).catch((error) => {
            console.log(error.message);
        });
	}

	forgot_password() {
		//TO DO
	}

	create_account() {
		this.props.navigation.navigate("CreateAccount");
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
	    					onPress={() => {this.submit()}}
		    				title="Sign in"
		    				color="#FFFFFF"
		    			/>
	    			</View>
	    			<View style={loginStyles.createAccountButton}>
	    				<Button
	    					onPress={() => {this.create_account()}}
	    			 		title="Create account"
	    				/>
	    			</View>

    			</View>


    		</View>
        );
    }
}