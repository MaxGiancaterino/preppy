import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";

export const recipePageStyles = StyleSheet.create({
    
    recipeMain: {
        backgroundColor: "#FFFFFF",
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
});