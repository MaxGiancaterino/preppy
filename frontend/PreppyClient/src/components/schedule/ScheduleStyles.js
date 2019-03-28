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

export const scheduleStyles = StyleSheet.create({

    /* ---------------------------------- *
     *  Schedule Common
     * ---------------------------------- */
    scheduleMain: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: PureWhite,
    },
    layoutBar: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 20,
        //backgroundColor: PreppyGray
    },
    scheduleScroll: {
        flex: 1,
        backgroundColor: PreppyLBlue1
    },
    emptySchedule: {
        color: PreppyOrange,
        fontFamily: "raleway",
        fontSize: 20,
        fontWeight: "bold",
        padding: 10
    },

    /* ---------------------------------- *
     *  Schedule Day
     * ---------------------------------- */

    dayContainerEven: {
        backgroundColor: PureWhite,
        paddingBottom: 5
        // borderBottomWidth: 2,
        // borderBottomColor: LightBlue,
    },
    dayContainerOdd: {
        backgroundColor: PureWhite,
        paddingBottom: 5
        // borderBottomWidth: 2,
        // borderBottomColor: LightBlue,
    },
    dateText: {
        color: DarkOrange,
        fontFamily: "raleway",
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: 10,
        marginVertical: 10,
        textAlign: "center",
    },
    scheduleItem: {
        backgroundColor: PreppyLight,
        marginVertical: 5,
        marginHorizontal: 15,
        padding: 5,
        borderRadius: 10
    },
    itemTime: {
        color: PreppyOrange,
        fontWeight: "bold",
        fontFamily: "raleway",
        fontSize: 20,
        padding: 5,
    },
    itemText: {
        color: PreppyGray,
        fontFamily: "raleway",
        fontSize: 18,
        padding: 10,
    },
    removeButton: {
        backgroundColor: DarkOrange,
        margin: 10,
        minHeight: 20,
        padding: 5,
        borderRadius: 5,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    cookButton: {
        backgroundColor: PreppyOrange,
        marginTop: 10,
        marginHorizontal: 10,
        minHeight: 20,
        padding: 5,
        borderRadius: 5,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    removeButtonText: {
        //fontFamily: 'Raleway',
        color: "#FFFFFF",
        fontSize: 18,
    }
});