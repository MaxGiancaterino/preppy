import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";

export const loginStyles = StyleSheet.create({
    
    loginMain: {
        backgroundColor: "#FFFFFF",
        height: Dimensions.get('window').height,
        borderTopWidth: 3,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    }, 
    formContainer: {
        width: "100%",
        paddingTop: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        fontFamily: "Raleway",
        margin: 10,
        fontSize: 18
    }, 
    inputBox: {
        width: "50%",
        margin: 5,
        borderColor: "lightgray",
        borderRadius: 10, 
        borderWidth: 1
    },
    signInButton: {
        justifyContent: "center",
        margin: 5,
        width: "50%",
        backgroundColor: "#FDB52B"
    },
    createAccountButton: {
        fontFamily: "Raleway",
        margin: 10,
        fontSize: 18
    }, 
    forgotPasswordButton: {
        fontFamily: "Raleway",
        margin: 2,
    }
});