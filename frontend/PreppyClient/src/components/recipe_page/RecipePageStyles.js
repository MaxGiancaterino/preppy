import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyLight = "#FFEED1";

export const recipePageStyles = StyleSheet.create({
    
    recipeMain: {
        backgroundColor: PreppyOrange,
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: "column",
    },
    recipeScroll: {
        flex: 1,
    },
    recipeTitle: {
        fontFamily: "Raleway",
        fontSize: 36,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
        paddingVertical: 5,
        backgroundColor: "#FFFFFF",
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
        marginHorizontal: 10,
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