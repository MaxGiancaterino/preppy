import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyLight = "#FFEED1";

export const pantryStyles = StyleSheet.create({
    
    pantryMain: {
        backgroundColor: PreppyOrange,
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: "column",
    	justifyContent: "flex-start",
    	alignItems: 'center',
    }, 
    pantryScroll: {
        flex: 1,
    },
    addIngredientButton: {
    	margin: 10,
        width: "80%",
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        fontWeight: "bold",
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

    ////////////////////////////////
    // INGREDIENT styling
    ////////////////////////////////

    ingredientItemMain: {
        backgroundColor: PreppyLight,
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 6,
        padding: 7,
    },
    ingredientItemText: {
        fontFamily: "Raleway",
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000"
    },

});