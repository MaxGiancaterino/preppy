import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyLight = "#FFEED1";

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
     // We should have a discussion about how these should be laid out,
     // but for now I'll just keep it simple
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        borderBottomColor: "#777777",
        borderBottomWidth: 2,
    },
    buttonImageRight: {
        height: undefined,
        width: undefined,
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingLeft: 15,
        paddingBottom: 15,
    },
    buttonImageLeft: {
        height: undefined,
        width: undefined,
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        paddingLeft: 15,
        paddingBottom: 15,
    },
    scheduleButton: {
        width: "100%",
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: "#777777",
    },
    exploreButton: {
        width: "100%",
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: "#777777",
    },
    cookButton: {
        width: "100%",
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: "#777777",
    },
    pantryButton: {
        width: "100%",
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: "#777777",
    },
    buttonText: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: PreppyOrange,
        textShadowColor: '#000000',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 3,
        padding: 2
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