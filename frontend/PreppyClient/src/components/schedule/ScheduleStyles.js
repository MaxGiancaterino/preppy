import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";
const PreppyGreen =  "#33CF23";
const PreppyPurple = "#7625A9";
const PreppyRed =    "#F92A34";
const PreppyLight =  "#FFEED1";
const PreppyGray =   "#8D8D8D";

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
});