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
        alignItems: "center",
        padding: 10,
    },
    searchButton: {
        backgroundColor: PreppyGreen,
        padding: 5,
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
});