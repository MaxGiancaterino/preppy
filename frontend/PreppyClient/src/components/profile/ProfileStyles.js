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
    },
    profileName: {
        fontFamily: "Raleway",
        fontWeight: "bold",
        fontSize: 36
    },
    profileInfoContainer: {
        width: "100%",
        paddingTop: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    profileInfoLabels: {
        maxWidth:"30%",
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
    },
    profileInfoValues: {
        paddingLeft: 3,
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    profileLabelText: {
        marginBottom: 5,
        fontFamily: "Raleway",
        fontWeight: "bold",
        fontSize: 18,
        color: PreppyOrange,
    },
    profileValueText: {
        marginBottom: 5,
        fontFamily: "Raleway",
        fontWeight: "bold",
        fontSize: 18,
    },
});