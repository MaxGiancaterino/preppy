import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';
import {headerStyles} from '../Styles';
import SidebarPopout from './SidebarPopout';

export class HeaderButton extends Component {

    constructor() {
        super();
        this.state = {active: false};
    }

    deactivateMenu = () => {
        this.setState({active: false});
    }

    render() {
        let nav = this.props.navigation;
        const isActive = this.state.active;

        return(
            <View style={headerStyles.headerButtonContainer}>
                {isActive ? <SidebarPopout onClose={this.deactivateMenu} navigation={nav}/> : null}
                <TouchableOpacity
                    underlayColor="#FFFFFF"
                    onPress = {() => {this.setState({active: true})}}
                >
                    <Image 
                        source={
                            this.props.type === "profile" ?
                            require("../../assets/img/profileTemp.png") :
                            null
                        }
                        style={headerStyles.headerButton}/>
                </TouchableOpacity>
            </View>
        );
    }
}