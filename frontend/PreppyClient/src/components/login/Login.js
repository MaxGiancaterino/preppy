import React, {Component} from 'react';
import {
    Image,
    Stylesheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Button,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
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
            loading: false
        }
    }

	submit() {
        this.setState({loading: true});
        UserService.attemptLogin(this.state.email, this.state.password).then(async (user) => {
            if (!user) {
                throw new Error("Something went wrong. Please try again later");
            }
            await UserData.setUser(user);
		}).then(() => {
            this.setState({loading: false});
            this.props.navigation.navigate("Dashboard");
            return true;
        }).catch((error) => {
            this.setState({loading: false});
            this.setState({message: error.message});
            return false;
        }).then(async (success) => {
            if (success) {
                let uid = UserData.getUser().userId;
                let promise = UserService.attemptFetchSchedule(uid);
                return promise;
            }
            return false;
        }).then((res) => {
            if (res !== false) {
                UserData.updateSchedule(res.schedule);
            }
        }).catch((error) => {
            console.log(error);
            alert("Error Retrieving Schedule. Attempting to alter your schedule now\
                   could have unpredictable results. Error: " + error.message);
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

                    <View>
                        <Text style={loginStyles.appName}>
                            Preppy
                        </Text>

                        {errorBox}

                    </View>


 					<View style={loginStyles.inputBox}>
 						<TextInput style={loginStyles.input}
                            autoCapitalize='none'
		    				onChangeText={(email) => this.setState({email: email})}
		    				placeholder='Email'
                            placeholderTextColor="#FDB52B"
		    			/>
    				</View>
    				<View style={loginStyles.inputBox}>
 						<TextInput style={loginStyles.input}
                            autoCapitalize='none'
                            secureTextEntry={true}
		    				onChangeText={(password) => this.setState({password: password})}
		    				placeholder='Password'
                            placeholderTextColor="#FDB52B"
		    			/>
    				</View>
    				<View style={loginStyles.forgotPasswordButton}>
	    				<Button
	    					title=""//"Forgot your password?"
	    			 		onPress={this.forgot_password}
	    			 		color = "#FDB52B"
	    				/>
	    			</View>
                    {!this.state.loading ? 
    	    			<View style={loginStyles.signInButton}>
    	    				<Button
    	    					onPress={() => {this.submit()}}
    		    				title="Sign in"
    		    				color="#FFFFFF"
    		    			/>
    	    			</View>
                        :
                        <ActivityIndicator/>
                    }
	    			<View style={loginStyles.createAccountButton}>
	    				<Button
	    					onPress={() => {this.create_account()}}
	    			 		title="Create account"
                            color = "#F95D45"
	    				/>
	    			</View>

    			</View>


    		</View>
        );
    }
}