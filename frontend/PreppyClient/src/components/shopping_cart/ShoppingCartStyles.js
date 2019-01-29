import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyLight = "#FFEED1";

export const shoppingCartStyles = StyleSheet.create({
    
    shoppingCartMain: {
        backgroundColor: PreppyOrange,
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: 'center',
    }, 
    shoppingCartScroll: {
        flex: 1,
    },
    addIngredientButton: {
        margin: 10,
        width: "80%",
        backgroundColor: "#FFFFFF",
        borderRadius: 3,
        fontWeight: "bold",
    }, 
    inputBox: {
        width: "80%",
        fontSize: 12,
        margin: 5,
        borderColor: "#FFFFFF",
        borderRadius: 3, 
        borderWidth: 1
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
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 6,
        padding: 7,
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    ingredientNameContainer: {
        borderRadius: 6,
        padding: 7,
        backgroundColor: PreppyLight,
        width: "40%",
    },
    ingredientItemText: {
        fontFamily: "Raleway",
        fontSize: 18,
        flexDirection: "row",
        fontWeight: "bold",
        color: "#000000",
    },
    amountContainer: {
        borderRadius: 6,
        width: "10%",
        padding: 7,
        backgroundColor: PreppyLight,
        fontFamily: "Raleway",
    },
    // changeAmountButtonContainer: {
    //  borderRadius: 6,
    //     padding: 7,
    //     backgroundColor: PreppyLight,
    //     width: "12%",
    // },
    changeAmountButton: {
        borderRadius: 100,
        padding: 7,
        backgroundColor: PreppyLight,
        width: "15%",
        fontWeight: "bold",
    }

});