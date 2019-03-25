import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGreen =  "#33CF23";
const PreppyPurple = "#7625A9";
const PreppyRed =    "#F92A34";
const PreppyLight =  "#FFEED1";
const PreppyGray =   "#8D8D8D";
const PreppyLBlue1 = "#AAAAFF";
const PreppyLBlue2 = "#93B1E2";
const PureWhite =    "#FFFFFF";

export const schedulerStyles = StyleSheet.create({

    schedulerMain: {
        backgroundColor: PreppyLBlue2,
        padding: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },

    mealScheduler: {
        padding: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        width: "100%"
    },
});