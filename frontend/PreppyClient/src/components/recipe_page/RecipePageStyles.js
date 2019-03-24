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

export const recipePageStyles = StyleSheet.create({
    
    recipeMain: {
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: "column",
    },
    recipeScroll: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderBottomColor: PreppyOrange
    },
    orangeBg: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: PreppyOrange
    },
    recipeTitle: {
        fontFamily: "Raleway",
        fontSize: 36,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        marginHorizontal: -10
    },
    recipeImage: {
        width: "100%",
        height: 250,
    },
    imageContainer: {
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderColor: "#000000",
        marginBottom: 5,
    },
    sectionTitle: {
        fontFamily: "Raleway",
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 5,
    },

    recipeItemMain: {
        backgroundColor: PreppyLight,
        marginVertical: 6,
        borderRadius: 6,
        padding: 7,
    },
    recipeItemText: {
        fontFamily: "Raleway",
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000"
    }
});