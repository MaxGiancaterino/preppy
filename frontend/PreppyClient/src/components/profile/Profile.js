import React, {Component} from 'react';
import {Text, View, ScrollView, Button, Image} from 'react-native';
import Header, {HeaderButton} from '../Header';
import {profileStyles} from './ProfileStyles';
import {headerStyles} from '../../Styles';

export default class Profile extends Component {
    static navigationOptions = {
        title: "My Profile",
    };

    componentWillMount() {
        this.setState({
            avatar: null,
            firstName: "",
            lastName: "",
            username: "",
            email: ""
        });
        UserData.getUser().then((user) => {
            this.setState({
                avatar: user.avatar,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email
            });
        }).catch((error) => {
            console.log(error.message);
        });
    }

    constructor() {
        super();
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
                    <Text>{this.state.firstName}</Text>
                    <Text>{this.state.lastName}</Text>
                </ScrollView>
            </View>
        );
    }
}
