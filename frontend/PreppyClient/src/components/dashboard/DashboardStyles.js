import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGreen =  "#33CF23";
const PreppyPurple = "#7625A9";
const PreppyRed =    "#F92A34";
const PreppyLight =  "#FFEED1";
const PreppyGray =   "#8D8D8D";
const PreppyLBlue1 = "#AAAAFF";
const DarkOrange = "#F95D45";

export const dashboardStyles = StyleSheet.create({
    
    dashboardMain: {
        backgroundColor: "#FFFFFF",
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    dashboardScroll: {
        flex: 1
    },
    dbButtonsContainer: {
        width: "100%",
        paddingTop: 40,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    dbButtonsRow: {
        width: "80%",
        flex:1,
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
    },

    /* ---------------------------------- *
     *  Budget Display
     * ---------------------------------- */
    budgetMain: {
        paddingVertical: 20,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 2,
        borderBottomColor: "#777777",
    },
    budgetTextSmall: {
        fontFamily: "Raleway",
        fontSize: 20,
        fontWeight: "bold",
    },
    budgetTextMed: {
        fontFamily: "Raleway",
        fontSize: 30,
    },
    budgetTextBig: {
        fontFamily: "Raleway",
        fontSize: 64,
        fontWeight: "bold",
    },
    budgetNumberContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    underline: {
        borderBottomWidth: 3,
        borderBottomColor: "black",
    },

    /* ---------------------------------- *
     *  Dashboard Buttons
     * ---------------------------------- */
    // buttonContainer: {
    //     flex: 1,
    //     flexDirection: "row",
    //     borderColor: "#777777",
    //     borderWidth: 10,
    // },
    buttonContainerRight: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonImageRight: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    // buttonImageLeft: {
    //     height: undefined,
    //     width: undefined,
    //     flex: 1,
    //     // alignSelf: "stretch",
    //     paddingTop: 15,
    //     // flexDirection: "column",
    //     alignItems: "flex-start",
    //     // justifyContent: "flex-end",
    //     // paddingLeft: 15,
    //     // paddingBottom: 15,
    // },
    buttonImageLeft: {
        flex: 1,
    },
    buttonImageBottom: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
    },
    cookButton: {
        width: "48%",
        height: 200,
        backgroundColor: DarkOrange,
    },
    scheduleButton: {
        width: "48%",
        height: 200,
        backgroundColor: "#fff7ab",
    },
    exploreButton: {
        width: "100%",
        height: 220,
        backgroundColor: "#d3ebef",
    },

    // not using pantry

    pantryButton: {
        width: "100%",
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: "#777777",
    },

    // button text 

    buttonTextLeft: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        padding: 10
    },
    buttonTextRight: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: "#ACAEAF",
        padding: 10
    },
    buttonTextBottom: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: DarkOrange,
        padding: 5
    },

    /* ---------------------------------- *
     *  Recipe List
     * ---------------------------------- */
    recipeListMain: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
    },
    recipeListTitleContainer: {
        paddingVertical: 20,
    },
    recipeListTitle: {
        fontFamily: "Raleway",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
});