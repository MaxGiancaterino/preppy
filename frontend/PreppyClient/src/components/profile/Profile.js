import React, {Component} from 'react';
import {Text, View, ScrollView, Button, Image} from 'react-native';
import {profileStyles} from './ProfileStyles';
import Header, {HeaderButton} from '../common/Header';
import {headerStyles} from '../common/CommonStyles';

export default class Profile extends Component {
    static navigationOptions = {
        title: "My Profile",
    };

    componentWillMount() {
        this.setState({
            avatar: null,
            displayName: "",
            email: "",
            weeklyBudget: 0,
        });

        var user = UserData.getUser();
        if (user != null) {
            this.setState({
                avatar:        user.avatar,
                displayName:   user.displayName,
                email:         user.email,
                weeklyBudget:  user.weeklyBudget,
            });
        }
    }

    constructor() {
        super();
    }

    formatToMoney(value) {
        return "$" + value.toFixed(2);
    }

    render() {
        let nav = this.props.navigation;
        const uriObject = {uri: this.state.avatar}

        return(
            <View style={profileStyles.profileMain}>
                <ScrollView
                    showsVerticalScrollIndicator="false"
                    contentContainerStyle={profileStyles.profileScroll}
                >
                    <Image 
                        source={
                            this.state.avatar ?
                            uriObject : 
                            require("../../../assets/img/profileTemp.png")
                        }
                        style={profileStyles.profileAvatar}
                    />
                    <Text style={profileStyles.profileName}>{this.state.displayName}</Text>
                    <View style={profileStyles.profileInfoContainer}>
                        <View style={profileStyles.profileInfoLabels}>
                            <Text style={profileStyles.profileLabelText}>Email:</Text>
                            <Text style={profileStyles.profileLabelText}>Weekly Budget:</Text>
                        </View>
                        <View style={profileStyles.profileInfoValues}>
                            <Text style={profileStyles.profileValueText}>{this.state.email}</Text>
                            <Text style={profileStyles.profileValueText}>{this.formatToMoney(this.state.weeklyBudget)}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
