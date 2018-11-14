import React, {Component} from 'react';
import {Text, View, Modal, Animated, Button, TouchableOpacity, Dimensions} from 'react-native';
import {sidebarStyles} from '../Styles';


export default class SidebarPopout extends Component {

    constructor() {
        super();
        this.state = {
            posAnim: new Animated.Value(Dimensions.get("window").width),
        };
    }

    navigateToProfile = () => {
        this.props.navigation.navigate("Profile");
        this.props.onClose();
    }

    navigateToLogin = () => {
        this.props.navigation.navigate("Login");
        this.props.onClose();
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
                    <TouchableOpacity style={sidebarStyles.sidebarItemOdd} onPress={closeMenu}>
                        <Text style={sidebarStyles.sidebarText}> View Profile </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sidebarStyles.sidebarItemEven} onPress={closeMenu}>
                        <Text style={sidebarStyles.sidebarText}> Edit Profile </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={sidebarStyles.sidebarItemOdd} onPress={closeMenu}>
                        <Text style={sidebarStyles.sidebarText}> Logout </Text>
                    </TouchableOpacity>
                 </Animated.View>
            </Modal>
        );
    }


}
