import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';
import {headerStyles} from '../Styles';
import SidebarPopout from './SidebarPopout';

import UserData from "../UserData";

export class HeaderButton extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({active: false, profileUri: null});
        UserData.getUser().then((user) => {
            this.setState({profileUri: user.avatar})
        }).catch((error) => {
            console.log(error.message);
        });
    }

    deactivateMenu = () => {
        this.setState({active: false});
    }

    render() {
        let nav = this.props.navigation;
        const isActive = this.state.active;
        const uriObject = {uri: this.state.profileUri}

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
                            require("../../assets/img/profileTemp.png")
                        }
                        style={headerStyles.headerButton}/>
                </TouchableOpacity>
            </View>
        );
    }
}