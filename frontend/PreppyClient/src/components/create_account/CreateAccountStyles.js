import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";

export const createAccountStyles = StyleSheet.create({
    
    createAccountMain: {
        backgroundColor: "#FFFFFF",
        height: Dimensions.get('window').height,
        borderTopWidth: 3,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    }, 
});