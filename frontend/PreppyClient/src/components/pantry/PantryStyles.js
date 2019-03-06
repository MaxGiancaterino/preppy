import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGreen =  "#33CF23";
const PreppyPurple = "#7625A9";
const PreppyRed =    "#F92A34";
const PreppyLight =  "#FFEED1";
const PreppyGray =   "#8D8D8D";
const PureWhite =    "#FFFFFF";

export const pantryStyles = StyleSheet.create({
    
    pantryMain: {
        backgroundColor: PreppyLight,
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
        backgroundColor: PreppyOrange,
        borderRadius: 3,
        fontWeight: "bold",
    }, 
    inputBox: {
        width: "80%",
        fontFamily: "Raleway",
        fontSize: 16,
        margin: 5,
        padding: 5,
        borderColor: PreppyGray,
        backgroundColor: '#FFFFFF',
        borderRadius: 3, 
        borderWidth: 1
    },
    sectionTitle: {
        fontFamily: "Raleway",
        fontSize: 28,
        fontWeight: "bold",
        color: PreppyOrange,
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
        backgroundColor: PureWhite,
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
        backgroundColor: PureWhite,
        fontFamily: "Raleway",
    },
    // changeAmountButtonContainer: {
    // 	borderRadius: 6,
    //     padding: 7,
    //     backgroundColor: PreppyLight,
    //     width: "12%",
    // },
    changeAmountButton: {
    	borderRadius: 100,
        padding: 7,
        backgroundColor: PureWhite,
        width: "15%",
    	fontWeight: "bold",
    }

});