import React, {Component} from 'react';
import {Text, View, Modal, Animated, Button, Dimensions} from 'react-native';
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

    componentDidMount() {
        Animated.timing(this.state.posAnim, {
            toValue: Dimensions.get("window").width - 100,
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
                    <Button title="Back" onPress={closeMenu}/>
                    <Button title="View Profile" onPress={this.navigateToProfile}/>
                    <Button title="Edit Profile" onPress={closeMenu}/>
                    <Button title="Logout" onPress={closeMenu}/>
                 </Animated.View>
            </Modal>
        );
    }


}