import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';
import {headerStyles} from '../Styles';

export default class Header extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={{flex: 1, maxHeight: 75}}>
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
    }

    render() {

        return(
            <TouchableOpacity
                style={headerStyles.headerButtonContainer}
                underlayColor="#FFFFFF"
                onPress = {this.props.onPress}
            >
                <Image 
                    source={
                        this.props.type === "profile" ?
                        require("../../assets/img/profileTemp.png") :
                        null
                    }
                    style={headerStyles.headerButton}/>
            </TouchableOpacity>
        );
    }
}