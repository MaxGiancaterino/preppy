import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGreen = "#33CF23"
const PreppyLight = "#FFEED1";
const PreppyGray = "#8D8D8D"

export const cookStyles = StyleSheet.create({
    
    cookMain: {
        backgroundColor: PreppyLight,
        height: Dimensions.get('window').height,
        alignItems: "center",
        padding: 10,
    },
    cookTitle: {
        fontFamily: "Raleway",
        fontSize: 26,
        fontWeight: "bold",
        color: "#000000",
        marginTop: 10,
    },
    cookSubtitle: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
        marginTop: 5,
        paddingHorizontal: 25,
        textAlign: "center",
    },
    cookButtonActive: {
        backgroundColor: PreppyGreen,
        padding: 20,
        borderRadius: 10,
    },
    cookButtonDeactive: {
        backgroundColor: PreppyGray,
        padding: 20,
        borderRadius: 10,
    },
    cookButtonText: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },

    recipeSelectButton: {
        backgroundColor: PreppyOrange,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    recipeSelectButtonText: {
        fontFamily: "Raleway",
        fontSize: 20,
        color: "#FFFFFF"
    },

    requiredIngredient: {
        width: "90%",
        padding: 6,
        borderRadius: 5,
        backgroundColor: PreppyOrange,
        marginVertical: 5,
    },
    requiredIngredientText: {
        fontFamily: "Raleway",
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF"
    }
});