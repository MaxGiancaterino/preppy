import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";

export const splashStyles = StyleSheet.create({
    
    splashMain: {
        backgroundColor: PreppyOrange,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    splashText: {
        fontFamily: "Raleway",
        fontSize: 50,
        fontWeight: "bold",
        color: "#FFFFFF",
    }
});