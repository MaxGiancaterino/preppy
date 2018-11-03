import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

export const dashboardStyles = StyleSheet.create({
    dashboardMain: {
        backgroundColor: "#FFFFE0",
    },

    /* ---------------------------------- *
     *  Budget Display
     * ---------------------------------- */
    budgetMain: {
        paddingVertical: 20,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFE0",
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
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
    },
    scheduleImage: {
        height: undefined,
        width: undefined,
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingLeft: 15,
        paddingBottom: 15,
    },
    scheduleButton: {
        width: "50%",
        height: 250,
        borderRightWidth: 1,
        borderRightColor: "#777777",
    },
    cookImage: {
        height: undefined,
        width: undefined,
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 15,
        paddingBottom: 15,
    },
    cookButton: {
        width: "50%",
        height: 250,
        borderLeftWidth: 1,
        borderLeftColor: "#777777",
    },
    buttonText: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        textShadowColor: '#000000',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5
    },
});