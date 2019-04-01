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

export const cookStyles = StyleSheet.create({

    /* ---------------------------------- *
     *  Cook Common
     * ---------------------------------- */
    cookMain: {
        backgroundColor: "#FFFFFF",
        minHeight: Dimensions.get('window').height,
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 10,
    },
    cookTitle: {
        fontFamily: "Raleway",
        fontSize: 26,
        fontWeight: "bold",
        color: PreppyGray,
        marginTop: 10,
        textAlign: "center",
    },
    cookSubtitle: {
        fontFamily: "Raleway",
        fontSize: 24,
        fontWeight: "bold",
        color: DarkOrange,
        marginTop: 5,
        paddingHorizontal: 25,
        textAlign: "center",
    },
    cookText: {
        fontFamily: "Raleway",
        fontSize: 16,
        color: PreppyGray,
        marginTop: 5,
        paddingHorizontal: 25,
        textAlign: "auto",
    },
    cookButtonActive: {
        backgroundColor: DarkOrange,
        padding: 20,
        borderRadius: 10,
        width: "100%",
    },
    cookButtonDeactive: {
        backgroundColor: PreppyOrange,
        padding: 20,
        borderRadius: 10,
        width: "100%",
    },
    cookButtonText: {
        //fontFamily: "Raleway",
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
    },

    /* ---------------------------------- *
     *  Recipe Selection
     * ---------------------------------- */

    recipeSelectButton: {
        backgroundColor: PreppyLight,
        padding: 10,
        borderRadius: 5,
        borderColor: PreppyLight,
        borderWidth: 3,
        marginTop: 10,
        width: "100%",
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    recipeButtonUnselected: {
        backgroundColor: PreppyLight,
        padding: 10,
        borderRadius: 5,
        borderColor: PreppyLight,
        borderWidth: 3,
        marginTop: 10,
        width: "100%",
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    recipeButtonText: {
        fontFamily: "Raleway",
        fontSize: 20,
        textAlign: "center",
        color: PreppyOrange,
        fontWeight: "bold",
    },
    recipeButtonTextUnselected: {
        fontFamily: "Raleway",
        fontSize: 20,
        textAlign: "center",
        color: PreppyOrange
    },
    noUpcomingMealsMessage: {
        fontFamily: "Raleway",
        fontSize: 16,
        textAlign: "center",
        color: PreppyGray
    },

    /* ---------------------------------- *
     *  Ingredient Check
     * ---------------------------------- */

    requiredIngredient: {
        width: "100%",
        padding: 6,
        borderRadius: 5,
        backgroundColor: PreppyLight,
        marginVertical: 5,
    },
    requiredIngredientText: {
        fontFamily: "Raleway",
        fontSize: 20,
        //fontWeight: "bold",
        color: PreppyOrange,
    },

    /* ---------------------------------- *
     *  Recipe Text
     * ---------------------------------- */

    recipeStepText: {
        fontFamily: "Raleway",
        fontSize: 20,
        lineHeight: 40,
        color: PreppyGray,
        padding: 10,
        backgroundColor: "#FFFFFF",
        marginVertical: 10,
    },

    /* ---------------------------------- *
     *  Cook Timer
     * ---------------------------------- */

    cookTimer: {
        flex: 1,
        flexDirection: "column",
        marginTop: 10,
        width: "100%",
        borderWidth: 5,
        borderColor: LightBlue,
        // borderRadius: 10,
    },
    cookTimerClock: {
        padding: 10,
        flex: 1,
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        borderBottomWidth: 5,
        borderBottomColor: LightBlue,
    },
    cookTimerText: {
        fontFamily: "Courier",
        fontSize: 44,
        fontWeight: "bold",
        color: PreppyGray,
    },
    // cookTimerTextTiny: {
    //     fontFamily: "Courier",
    //     fontSize: 30,
    //     fontWeight: "bold",
    //     color: LightBlue,
    // },
    cookTimerButtons: {
        flex: 1,
        flexDirection: "row",
    },
    cookTimerStartButton: {
        width: "50%",
        maxHeight: 50,
        backgroundColor: PreppyOrange,
        padding: 7,
        // borderColor: PreppyOrange,
        // borderRadius: 10,
        // borderWidth: 1,
    },
    cookTimerStopButton: {
        width: "50%",
        maxHeight: 50,
        backgroundColor: PreppyOrange,
        padding: 7,
        // borderColor: PreppyOrange,
        // borderRadius: 10,
        // borderWidth: 1,
    },
    cookTimerResetButton: {
        width: "50%",
        maxHeight: 50,
        backgroundColor: DarkOrange,
        padding: 7,
        // borderColor: DarkOrange,
        // borderRadius: 10,
        // borderWidth: 1,
    },
    cookTimerButtonText: {
        fontFamily: "Raleway",
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
        width: "100%",
        textAlign: "center",
    }
});