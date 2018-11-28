import React, {Component} from 'react';
import {Image, Stylesheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity} from 'react-native';
import Header, {HeaderButton} from '../Header';
import {pantryStyles} from './PantryStyles';
import {headerStyles} from '../../Styles';

export default class Pantry extends Component {

    static navigationOptions = {
        title: "Pantry",
    };

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return(
            <View style={pantryStyles.pantryMain}>

            </View>
        );
    }
}

