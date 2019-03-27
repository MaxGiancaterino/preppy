import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import {createAccountStyles} from './CreateAccountStyles';
import Header, {HeaderButton} from '../common/Header';
import {headerStyles} from '../common/CommonStyles';

import UserService from '../../middleware/UserService.js';

export default class CreateAccount extends Component {

    static navigationOptions = {
        title: "CreateAccount",
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phoneNumber: 0,
            password: "",
            confirmPassword: "",
            displayName: "",
            message: ""
            //photoUrl: String,
        }
    }

    navigateToLogin = () => {
        this.props.navigation.navigate("Login")
    }

    create_account() {
        UserService.attemptCreateAccount(
            this.state.email,
            this.state.password,
            this.state.phoneNumber,
            this.state.displayName
        ).then(user => {
            UserData.setUser(user)
        }).then(() => {
            this.props.navigation.navigate("Dashboard");
        }).catch(error => {
            this.setState({message: error.message});
        })
    }

    validateInput = () => {
        if (!this.state.email || !this.state.phoneNumber || !this.state.password ||
            !this.state.confirmPassword || !this.state.displayName
        ) {
            return false;
        }
        return this.state.confirmPassword === this.state.password;
    }

    render() {

        const validInput = this.validateInput();

        const errorBox = !this.state.message ?
            <View style={createAccountStyles.emptyBox}></View> :
            <View style={createAccountStyles.errorBox}>
                <Text style={createAccountStyles.errorText}>{this.state.message}</Text>
            </View>

        return(
            <View style={createAccountStyles.createAccountMain}>
                <View style={createAccountStyles.formContainer}>
                    <View>
                        <Text style={createAccountStyles.appName}>
                            Preppy
                        </Text>

                        {errorBox}

                        <Text style={createAccountStyles.description}>
                            Enter info to create a new account.
                        </Text>
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            autoCapitalize='none'
                            onChangeText={(username) => this.setState({email: username})}
                            placeholder='Email'
                            placeholderTextColor="#FDB52B"
                        />
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password: password})}
                            placeholder='Password'
                            placeholderTextColor="#FDB52B"
                        />
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({confirmPassword: password})}
                            placeholder='Confirm Password'
                            placeholderTextColor="#FDB52B"
                        />
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            autoCapitalize='none'
                            onChangeText={(username) => this.setState({phoneNumber: username})}
                            placeholder='Phone number'
                            placeholderTextColor="#FDB52B"
                        />
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            autoCapitalize='none'
                            onChangeText={(username) => this.setState({displayName: username})}
                            placeholder='Full name'
                            placeholderTextColor="#FDB52B"
                        />
                    </View>

                    <View style={validInput ? createAccountStyles.createAccountButton : createAccountStyles.disabledButton}>
                        <Button
                            onPress={() => {validInput ? this.create_account() : {}}}
                            title="Create Account"
                            color="#FFFFFF"
                        />
                    </View>
                    
                    <View style={createAccountStyles.backButton}>
                        <Button
                            onPress={() => {this.navigateToLogin()}}
                            title="Back to Login"
                            color="#F95D45"
                        />
                    </View>

                </View>
            </View>
        );
    }
}