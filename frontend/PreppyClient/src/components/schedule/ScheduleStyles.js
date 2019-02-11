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
        backgroundColor: PreppyLBlue1
    },
    layoutBar: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 20,
        backgroundColor: PreppyGray
    },
    scheduleScroll: {
        flex: 1,
        backgroundColor: PreppyLBlue1
    },

    /* ---------------------------------- *
     *  Schedule Day
     * ---------------------------------- */

    dayContainerEven: {
        backgroundColor: PreppyLBlue1,
        borderBottomWidth: 2,
        borderBottomColor: PreppyGray,
        paddingBottom: 5
    },
    dayContainerOdd: {
        backgroundColor: PreppyLBlue2,
        borderBottomWidth: 2,
        borderBottomColor: PreppyGray,
        paddingBottom: 5
    },
    dateText: {
        color: PureWhite,
        fontFamily: "raleway",
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: 10,
        marginVertical: 10
    },
    scheduleItem: {
        backgroundColor: PreppyLight,
        marginVertical: 5,
        marginHorizontal: 15,
        padding: 5,
        borderRadius: 10
    },
    itemTime: {
        color: PreppyGray,
        fontWeight: "bold",
        fontFamily: "raleway",
        fontSize: 20
    },
    itemText: {
        color: "#000000",
        fontFamily: "raleway",
        fontSize: 18
    },
    removeButton: {
        backgroundColor: PreppyRed,
        marginHorizontal: 10,
        marginTop: 10,
        minHeight: 20,
        padding: 5,
        borderRadius: 5,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    removeButtonText: {
        fontFamily: 'Raleway',
        color: "#FFFFFF",
        fontSize: 18,
    }
});