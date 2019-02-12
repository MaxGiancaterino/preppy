import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import {loginStyles} from './LoginStyles';

import UserService from '../../middleware/UserService.js';

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
        	email: "",
       		password: "",
            message: "",
        }
    }

	submit() {
        UserService.attemptLogin(this.state.email, this.state.password).then(user => {
		    UserData.setUser(user).then(() => {
				this.props.navigation.navigate("Dashboard");
		    }).catch((error) => {
			    console.log(error.message);
			});
		}).catch((error) => {
            this.setState({message: error.message});
        });
	}

	forgot_password() {
		//TO DO
	}

	create_account() {
		this.props.navigation.navigate("CreateAccount");
	}

    render() {
        const errorBox = !this.state.message ?
            <View style={loginStyles.emptyBox}></View> :
            <View style={loginStyles.errorBox}>
                <Text style={loginStyles.errorText}>{this.state.message}</Text>
            </View>

    	return(
    		<View style={loginStyles.loginMain}>
    			<View style={loginStyles.formContainer}>

                    {errorBox}

 					<View style={loginStyles.inputBox}>
 						<TextInput style={loginStyles.input}
                            autoCapitalize='none'
		    				onChangeText={(email) => this.setState({email: email})}
		    				placeholder='Email'
		    			/>
    				</View>
    				<View style={loginStyles.inputBox}>
 						<TextInput style={loginStyles.input}
                            autoCapitalize='none'
                            secureTextEntry={true}
		    				onChangeText={(password) => this.setState({password: password})}
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