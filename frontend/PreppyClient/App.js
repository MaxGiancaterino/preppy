import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import Dashboard from './src/components/dashboard/Dashboard';
import Header from './src/components/Header';
import {headerStyles} from './src/Styles';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content"/>
                <Header style={headerStyles.headerMain} title={"Dashboard"}>
                    <Text style={headerStyles.headerLeftButton}>1</Text>
                    <Text style={headerStyles.headerRightButton}>2</Text>
                </Header>
                <Dashboard/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
