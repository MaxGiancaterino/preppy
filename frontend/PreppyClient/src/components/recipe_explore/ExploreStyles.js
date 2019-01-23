import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGreen =  "#33CF23";
const PreppyPurple = "#7625A9";
const PreppyRed =    "#F92A34";
const PreppyLight =  "#FFEED1";
const PreppyGray =   "#8D8D8D";

export const exploreStyles = StyleSheet.create({

    /* ---------------------------------- *
     *  Explore Common
     * ---------------------------------- */
    exploreMain: {
        backgroundColor: PreppyLight,
        minHeight: Dimensions.get('window').height,
        padding: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    exploreScroll: {
        flex: 1,
    },
    searchButton: {
        backgroundColor: PreppyGreen,
        borderColor: PreppyGreen,
        padding: 10,
        borderRadius: 10,
        width: "100%"
    },
    searchButtonDeactive: {
        backgroundColor: PreppyGray,
        padding: 10,
        borderRadius: 10,
        width: "100%"
    },
    searchButtonText: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center"
    },
    searchBar: {
        fontFamily: "Raleway",
        fontSize: 24,
        width: "100%",
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        marginBottom: 10
    },
    noRecipeMessage: {
        fontFamily: "Raleway",
        fontSize: 24,
        width: "100%",
        textAlign: "center",
        marginTop: 30
    }
});