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

export const schedulerStyles = StyleSheet.create({

    schedulerContainer: {
        height: Dimensions.get('window').height,
        flex: 1,
        flexDirection: "column",
    },
    schedulerMain: {
        backgroundColor: PureWhite,
        padding: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start"
    },

    mealScheduler: {
        padding: 10,
        flex: 1,
        flexDirection: "column",
    },

    schedulerTitle: {
        fontFamily: 'Raleway',
        color: PreppyOrange,
        fontSize: 24,
        textAlign: "center",
    },
    recipeName: {
        fontFamily: 'Raleway',
        color: DarkOrange,
        fontSize: 24,
        textAlign: "center",
    },

    valueBar: {
        padding: 10,
    },


});