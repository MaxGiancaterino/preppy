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

    /*render() {
        let nav = this.props.navigation;
        const isActive = this.state.active;
        const uriObject = {uri: this.state.profileUri}

        if (this.state.loggedIn) {
            return(
                <View style={headerStyles.headerButtonContainer}>
                    {isActive ? <SidebarPopout onClose={this.deactivateMenu} navigation={nav}/> : null}
                    <TouchableOpacity
                        underlayColor="#FFFFFF"
                        onPress = {() => {this.setState({active: true})}}
                    >
                        <Image 
                            source={
                                this.state.profileUri ?
                                uriObject : 
                                require("../../../assets/img/profileTemp.png")
                            }
                            style={headerStyles.headerButton}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return(<View></View>);
        }
    }*/
    render() {
        return (
            <TouchableOpacity onPress={this.navigateToLogin}>
                <Text style={headerStyles.logout}>Logout</Text>
            </TouchableOpacity>
        );
    }
}