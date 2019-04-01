import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';
import {headerStyles} from './CommonStyles';
import SidebarPopout from './SidebarPopout';

import UserData from "../../UserData";

export class HeaderButton extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({loggedIn: false});
        var user = UserData.getUser();
        if (user != null) {
            this.setState({loggedIn: UserData.isLoggedIn()});
        }
    }

    deactivateMenu = () => {
        this.setState({active: false});
    }

    navigateToLogin = () => {
        UserData.logout().then(() => {
            this.props.navigation.navigate("Login");
        }).catch((error) => {
            console.log(error.message);
        });
    }

    navigateBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        let text = [];
        let buttonPress = () => {}; 

        if (this.props.type === 'logout') {
            text = <Text style={headerStyles.logout}>Logout</Text>
            buttonPress = this.navigateToLogin;
        }
        else if (this.props.type === "back") {
            console.log(this.props.navigation.state);
            text = <Text style={headerStyles.back}>{"< Back"}</Text>
            buttonPress = this.navigateBack;
        }

        return (
            <TouchableOpacity onPress={buttonPress}>
                {text}
            </TouchableOpacity>
        );
    }
}