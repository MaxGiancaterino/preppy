import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Dashboard from './src/components/dashboard/Dashboard';
import Header, {HeaderButton} from './src/components/Header';
import {headerStyles} from './src/Styles';

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={{backgroundColor: "black"}}>
                <StatusBar barStyle="light-content"/>
                <Header style={headerStyles.headerMain} title={"Dashboard"}>
                    <HeaderButton
                        buttonText="Menu"
                        type="profile"
                     />
                    <HeaderButton
                        buttonText="Profile"
                     />
                </Header>
                <Dashboard/>
            </View>
        );
    }
}