import React, {Component} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';
import Header, {HeaderButton} from '../Header';
import {profileStyles} from './ProfileStyles';
import {headerStyles} from '../../Styles';

export default class Profile extends Component {
    static navigationOptions = {
        title: "My Profile",
    };

    constructor() {
        super();
    }

    render() {
        let nav = this.props.navigation;
        return(
            <View style={profileStyles.profileMain}>
                <ScrollView
                    showsVerticalScrollIndicator="false"
                    style={profileStyles.profileScroll}
                >
                    <Text>This is the profile</Text>
                </ScrollView>
            </View>
        );
    }
}
