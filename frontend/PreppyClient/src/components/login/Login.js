import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import {loginStyles} from './LoginStyles';
import UserData from '../../UserData';
import User from '../../models/User';
import axios from 'axios';

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
		var credentials = {
			username: this.state.username,
			password: this.state.password
		}
		fetch('http://preppy-dev.appspot.com/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ credentials })
        }).then(res => {
        	fetch('http://preppy-dev.appspot.com/account/' + res.uid, {
	            method: 'POST',
	            headers: {
	                Accept: 'application/json',
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({ })
        	}).then(res => {
					UserData.setUser(res).then(() => {
						this.props.navigation.navigate("Dashboard");
					}).catch((error) => {
						console.log(error.message);
					});
				});
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
		    				placeholder='Email'
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