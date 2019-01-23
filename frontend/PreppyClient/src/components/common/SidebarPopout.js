import React, {Component} from 'react';
import {Text, View, Modal, Animated, Button, TouchableOpacity, Dimensions} from 'react-native';
import {sidebarStyles} from './CommonStyles';

import UserData from '../../UserData';

export default class SidebarPopout extends Component {

    constructor() {
        super();
        this.state = {
            posAnim: new Animated.Value(Dimensions.get("window").width),
        };
    }

    navigateToProfile = () => {
        this.props.onClose();
        this.props.navigation.navigate("Profile");
    }

    // In addition to returning the user to the login screen, this function
    // also wipes the user data from the front-end, logging them out
    navigateToLogin = () => {
        this.props.onClose();
        UserData.logout().then(() => {
            this.props.navigation.navigate("Login");
        }).catch((error) => {
            console.log(error.message);
        });
    }

    navigateToShoppingCart = () => {
        this.props.onClose();
        this.props.navigation.navigate("ShoppingCart");
    }

    componentDidMount() {
        Animated.timing(this.state.posAnim, {
            toValue: Dimensions.get("window").width - 150,
            duration: 200,
        }).start();
    }

    render() {
        let {posAnim} = this.state;

        const closeMenu = () => {
            Animated.timing(this.state.posAnim, {
                toValue: Dimensions.get("window").width,
                duration: 200,
            }).start(() => {
                this.props.onClose();
            });
        }

        return(
            <Modal
                animationType="none"
                transparent={true}
                visible={true}
             >
                <Animated.View style={{
                    ...sidebarStyles.sidebarMain,
                    left: posAnim}}>
                    <TouchableOpacity style={sidebarStyles.sidebarItemEven} onPress={closeMenu}>
                        <Text style={sidebarStyles.sidebarText}> Back </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sidebarStyles.sidebarItemEven} onPress={this.navigateToShoppingCart}>
                        <Text style={sidebarStyles.sidebarText}> Shopping Cart </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sidebarStyles.sidebarItemOdd} onPress={this.navigateToProfile}>
                        <Text style={sidebarStyles.sidebarText}> View Profile </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sidebarStyles.sidebarItemEven} onPress={closeMenu}>
                        <Text style={sidebarStyles.sidebarText}> Edit Profile </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sidebarStyles.sidebarItemOdd} onPress={this.navigateToLogin}>
                        <Text style={sidebarStyles.sidebarText}> Logout </Text>
                    </TouchableOpacity>
                 </Animated.View>
            </Modal>
        );
    }


}
