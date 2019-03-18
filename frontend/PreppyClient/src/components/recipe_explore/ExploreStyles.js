import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGreen =  "#33CF23";
const PreppyPurple = "#7625A9";
const PreppyRed =    "#F92A34";
const PreppyLight =  "#FFEED1";
const PreppyGray =   "#8D8D8D";
const PureWhite =    "#FFFFFF";

export const exploreStyles = StyleSheet.create({

    /* ---------------------------------- *
     *  Explore Common
     * ---------------------------------- */
    exploreMain: {
        backgroundColor: PreppyLight,
        minHeight: Dimensions.get('window').height,
        paddingHorizontal: 10,
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
        width: "100%",
        marginTop: 10
    },
    searchButtonDeactive: {
        backgroundColor: PreppyGray,
        padding: 10,
        borderRadius: 10,
        width: "100%",
        marginTop: 10,
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
        borderColor: PreppyOrange
    },

    searchTabs: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 40,
        marginBottom: 10
    },
    tabSelected: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PreppyOrange,
        width: "50%",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderLeftWidth: 3,
        borderBottomColor: PureWhite,
        borderLeftColor: PureWhite,
        borderRightColor: PureWhite,
    },
    tabSelectedText: {
        fontFamily: "Raleway",
        fontSize: 16,
        fontWeight: "bold",
        color: PureWhite
    },

    tabUnselected: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PreppyLight,
        width: "50%",
        height: 30,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderLeftWidth: 3,
        borderBottomColor: PreppyOrange,
        borderLeftColor: PreppyOrange,
        borderRightColor: PreppyOrange,
    },
    tabUnselectedText: {
        fontFamily: "Raleway",
        fontSize: 16,
        fontWeight: "bold",
        color: PreppyOrange,
    },

    ingredientItem: {
        backgroundColor: "#FFFFAA",
        maxHeight: 50,
        padding: 5,
        margin: 2,
    },

    noRecipeMessage: {
        fontFamily: "Raleway",
        fontSize: 24,
        width: "100%",
        textAlign: "center",
        marginTop: 30
    }
});