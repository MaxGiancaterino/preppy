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

export const exploreStyles = StyleSheet.create({

    /* ---------------------------------- *
     *  Explore Common
     * ---------------------------------- */
    exploreMain: {
        backgroundColor: "#FFFFFF",
        minHeight: Dimensions.get('window').height,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    exploreScroll: {
        flex: 1,
    },
    searchButton: {
        backgroundColor: DarkOrange,
        borderColor: DarkOrange,
        padding: 10,
        borderRadius: 10,
        width: "100%",
        marginTop: 10,
        padding: 10,
    },
    searchButtonDeactive: {
        backgroundColor: DarkOrange,
        padding: 10,
        borderRadius: 10,
        width: "100%",
        marginTop: 10,
        padding: 10,
    },
    searchButtonText: {
        fontSize: 20,
        //fontFamily: "Raleway",
        color: "#FFFFFF",
        textAlign: "center"
    },
    searchBar: {
        fontFamily: "Raleway",
        fontSize: 20,
        width: "100%",
        padding: 5,
        backgroundColor: "#FFFFFF",
        borderColor: DarkOrange,
        borderRadius: 10, 
        borderWidth: 1,
        marginTop: 10,
    },

    searchTabs: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 40,
        marginBottom: 10,
    },
    tabSelected: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        //backgroundColor: PreppyOrange,
        backgroundColor: LightBlue,
        width: "50%",
        height: 40,
        //borderBottomWidth: 1,
        borderWidth: 1,
        borderColor: LightBlue,
        borderRadius: 10,
        marginTop: 10, 
    },
    tabSelectedText: {
        //fontFamily: "Raleway",
        fontSize: 18,
        fontWeight: "bold",
        color: PreppyOrange,
    },

    tabUnselected: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PureWhite,
        width: "50%",
        height: 40,
        //borderWidth: 1,
        borderColor: PreppyOrange,
        borderRadius: 10,
        marginTop: 10, 
    },
    tabUnselectedText: {
        //fontFamily: "Raleway",
        fontSize: 18,
        color: PreppyOrange,
    },

    ingredientItem: {
        backgroundColor: "#FFFFAA",
        maxHeight: 50,
        padding: 5,
        margin: 2,
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
    },
    ingredientText: {
        fontFamily: "Raleway",
        fontWeight: "bold",
        fontSize: 14,
    },
    ingredientListItem: {
        padding: 10,
        backgroundColor: "#FFFFAA",
        borderBottomWidth: 1,
        borderBottomColor: PreppyOrange
    },
    ingredientListText: {
        fontFamily: "Raleway",
        fontSize: 18,
    },

    noRecipeMessage: {
        fontFamily: "Raleway",
        fontSize: 24,
        width: "100%",
        textAlign: "center",
        marginTop: 30
    }
});