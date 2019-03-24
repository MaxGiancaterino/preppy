import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGreen =  "#33CF23";
const PreppyPurple = "#7625A9";
const PreppyRed =    "#F92A34";
const PreppyLight =  "#FFEED1";
const PreppyGray =   "#8D8D8D";
const PreppyLBlue1 = "#AAAAFF";
const PureWhite = "#FFFFFF";
const DarkOrange = "#F95D45";
const LightBlue = "#d3ebef";

export const loginStyles = StyleSheet.create({
    
    loginMain: {
        backgroundColor: PureWhite,
        height: Dimensions.get('window').height,
        borderTopWidth: 3,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    }, 
    formContainer: {
        width: "100%",
        paddingTop: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    appName: {
        textAlign: 'center',
        fontFamily: "Raleway",
        fontSize: 48,
        fontWeight: "bold",
        color: PreppyOrange
    },
    input: {
        fontFamily: "Raleway",
        margin: 10,
        fontSize: 18,
    }, 
    inputBox: {
        width: "60%",
        margin: 5,
        borderColor: PreppyOrange,
        borderRadius: 10, 
        borderWidth: 1
    },
    signInButton: {
        justifyContent: "center",
        margin: 5,
        borderRadius: 10, 
        width: "60%",
        backgroundColor: DarkOrange
    },
    createAccountButton: {
        margin: 10,
        fontSize: 20,
    }, 
    forgotPasswordButton: {
        margin: 2,
        fontSize: 12,
    },
    emptyBox: {
        height: 45,
        marginBottom: 10,
    },
    errorBox: {
        backgroundColor: PreppyRed,
        width: 300,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 30,
        marginBottom: 10,
        minHeight: 45
    },
    errorText: {
        fontFamily: "Raleway",
        fontSize: 18,
        fontWeight: "bold",
        color: PureWhite,
    }
});