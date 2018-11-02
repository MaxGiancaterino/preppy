import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {headerStyles} from '../Styles';

export default class Header extends Component {

    constructor() {
        super();
    }

    render() {
        return(
            <View style={this.props.style}>
                {this.props.children[0]}
                <Text style={headerStyles.headerTitle}>{this.props.title}</Text>
                {this.props.children[1]}
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
                underlayColor='#fff'
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