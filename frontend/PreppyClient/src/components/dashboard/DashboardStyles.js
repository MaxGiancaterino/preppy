import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";

export const dashboardStyles = StyleSheet.create({
    
    dashboardMain: {
        backgroundColor: "#FFFFFF",
        height: Dimensions.get('window').height,
        borderTopWidth: 3,
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
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        borderBottomColor: "#777777",
        borderBottomWidth: 2,
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
     recommendedRecipeItem: {
         backgroundColor: PreppyOrange,
         marginHorizontal: 10,
         marginTop: 10,
         height: 60,
         padding: 10,
         borderRadius: 3,
         borderBottomWidth: 5,
         borderRightWidth: 5,
         borderColor: '#DDA51B',
         flex: 1,
         flexDirection: "row",
         justifyContent: "flex-start",
         alignItems: "center"
     },
     recommendedRecipeTitle: {
         fontFamily: 'Raleway',
         color: "#FFFFFF",
         fontSize: 24,
     }
});