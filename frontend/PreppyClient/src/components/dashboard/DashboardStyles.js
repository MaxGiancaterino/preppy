import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

export const dashboardStyles = StyleSheet.create({
    dashboardMain: {
        backgroundColor: "#FFFFE0",
    },
    budgetMain: {
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFE0",
    },
    budgetTextSmall: {
        fontFamily: "Raleway",
        fontSize: 14,
        fontWeight: "bold",
    },
    budgetTextMed: {
        fontFamily: "Raleway",
        fontSize: 20,
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
    }
});