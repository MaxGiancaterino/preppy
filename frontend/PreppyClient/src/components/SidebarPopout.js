import React, {Component} from 'react';
import {Text, View, Modal, Animated, Button} from 'react-native';
import {sidebarStyles} from '../Styles';


export default class SidebarPopout extends Component {

    constructor() {
        super();
        this.state = {
            posAnim: new Animated.Value(-100),
        };
    }

    componentDidMount() {
        Animated.timing(this.state.posAnim, {
            toValue: 0,
            duration: 200,
        }).start();
    }

    render() {
        let {posAnim} = this.state;
        const closeMenu = () => {
            Animated.timing(this.state.posAnim, {
                toValue: -100,
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
                    <Button title="View Profile" onPress={closeMenu}/>
                    <Button title="Edit Profile" onPress={closeMenu}/>
                    <Button title="Logout" onPress={closeMenu}/>
                 </Animated.View>
            </Modal>
        );
    }


}