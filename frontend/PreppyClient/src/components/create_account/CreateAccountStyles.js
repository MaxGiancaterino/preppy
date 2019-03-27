import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGray =   "#8D8D8D";
const PreppyRed =    "#F92A34";
const PureWhite =    "#FFFFFF";
const DarkOrange = "#F95D45";

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
        color: PreppyOrange
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
        borderColor: PreppyOrange,
        borderRadius: 10, 
        borderWidth: 1
    },
    createAccountButton: {
        justifyContent: "center",
        margin: 5,
        width: "80%",
        borderRadius: 10, 
        backgroundColor: DarkOrange
    },
    disabledButton: {
        justifyContent: "center",
        margin: 5,
        width: "80%",
        borderRadius: 10, 
        backgroundColor: DarkOrange
    },
    emptyBox: {
        width: 300,
        padding: 10,
        marginVertical: 10,
        height: 45
    },
    errorBox: {
        backgroundColor: PreppyRed,
        width: 300,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        minHeight: 45
    },
    errorText: {
        fontFamily: "Raleway",
        fontSize: 18,
        fontWeight: "bold",
        color: PureWhite,
    }
});