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

export const scheduleStyles = StyleSheet.create({

    /* ---------------------------------- *
     *  Schedule Common
     * ---------------------------------- */
    scheduleMain: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: PreppyLight
    },
    layoutBar: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 20,
        backgroundColor: PreppyGray
    },
    scheduleScroll: {
        flex: 1,
        backgroundColor: PreppyLight
    },

    /* ---------------------------------- *
     *  Schedule Day
     * ---------------------------------- */

    dayContainerEven: {
        backgroundColor: PreppyLBlue1
    },
    dayContainerOdd: {
        backgroundColor: PreppyLBlue2
    },
    dateText: {
        color: PureWhite,
        fontFamily: "raleway",
        fontSize: 24
    },
});