import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';
import {headerStyles} from '../Styles';
import SidebarPopout from './SidebarPopout';

export default class Header extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={{flex: 1, maxHeight: 85}}>
                <StatusBar barStyle="light-content"/>
                <View style={headerStyles.statusBar}/>
                <View style={headerStyles.headerMain}>
                    {this.props.children[0]}
                    <Text style={headerStyles.headerTitle}>{this.props.title}</Text>
                    {this.props.children[1]}
                </View>
            </View>
        );
    }
}

export class HeaderButton extends Component {

    constructor() {
        super();
        this.state = {active: false};
    }

    deactivateMenu = () => {
        this.setState({active: false});
    }

    render() {
        const isActive = this.state.active;

        return(
            <View style={headerStyles.headerButtonContainer}>
                {isActive ? <SidebarPopout onClose={this.deactivateMenu}/> : null}
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