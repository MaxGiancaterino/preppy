import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import Header, {HeaderButton} from '../Header';
import {createAccountStyles} from './CreateAccountStyles';
import {headerStyles} from '../../Styles';

export default class CreateAccount extends Component {

    static navigationOptions = {
        title: "CreateAccount",
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            phoneNumber: 0,
            password: "",
            displayName: "",
            //photoUrl: String,
        }
    }

    navigateToLogin = () => {
        this.props.navigation.navigate("Login")
    }

    create_account() {
        const user = {
            email: this.state.username,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
            displayName: this.state.displayName
        };
        fetch('http://preppy-dev.appspot.com/user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        }).then((res) => {
                UserData.setUser(res).then(() => {
                    this.props.navigation.navigate("Dashboard");
                });
            });
    }

    render() {

        return(
            <View style={createAccountStyles.createAccountMain}>


                <View style={createAccountStyles.formContainer}>
                    <View>
                        <Text style={createAccountStyles.appName}>
                            Preppy {'\n'}
                            <Text style={createAccountStyles.description}>
                            {'\n'}
                            Enter info to create a new account.
                            </Text>
                        </Text>
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            onChangeText={(username) => this.setState({email})}
                            placeholder='Email'
                        />
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            onChangeText={(password) => this.setState({password})}
                            placeholder='Password'
                        />
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            onChangeText={(username) => this.setState({phoneNumber})}
                            placeholder='Phone number'
                        />
                    </View>

                    <View style={createAccountStyles.inputBox}>
                        <TextInput style={createAccountStyles.input}
                            onChangeText={(username) => this.setState({displayName})}
                            placeholder='Full name'
                        />
                    </View>

                    <View style={createAccountStyles.createAccountButton}>
                        <Button
                            onPress={() => {this.create_account()}}
                            title="Create Account"
                            color="#FFFFFF"
                        />
                    </View>
                    
                    <View style={createAccountStyles.backButton}>
                        <Button
                            onPress={() => {this.navigateToLogin()}}
                            title="Back to Login"
                            color = "lightgray"
                        />
                    </View>

                </View>
            </View>
        );
    }
}