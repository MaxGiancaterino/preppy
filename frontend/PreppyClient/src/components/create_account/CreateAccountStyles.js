import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";

export const createAccountStyles = StyleSheet.create({
    
    createAccountMain: {
        backgroundColor: "#FFFFFF",
        height: Dimensions.get('window').height,
        //borderTopWidth: 3,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    }, 
    appName: {
        textAlign: 'center',
        fontFamily: "Raleway",
        fontSize: 48,
        fontWeight: "bold",
        color: PreppyOrange
    },
    backButton: {
        fontFamily: "Raleway",
        margin: 10,
        fontSize: 18,
    },
    description: {
        fontFamily: "Raleway",
        margin: 2,
        fontSize: 18,
        fontWeight: "normal",
        color: "lightgray"
    },
    formContainer: {
        width: "100%",
       //paddingTop: 10,
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
        width: "80%",
        margin: 5,
        borderColor: "lightgray",
        borderRadius: 10, 
        borderWidth: 1
    },
    createAccountButton: {
        justifyContent: "center",
        margin: 5,
        width: "80%",
        backgroundColor: "#FDB52B"
    },
});