import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";

export const profileStyles = StyleSheet.create({
    
    profileMain: {
        backgroundColor: "#FFFFFF",
        height: Dimensions.get('window').height,
        borderTopWidth: 3,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    profileScroll: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    profileAvatar: {
        width: "80%",
        aspectRatio: 1,
        marginVertical: 20,
        borderWidth: 10,
        borderColor: PreppyOrange
    }
});