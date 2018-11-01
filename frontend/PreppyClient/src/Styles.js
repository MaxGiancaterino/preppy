import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

export const headerStyles = StyleSheet.create({
    headerMain: {
        backgroundColor: '#FDB52B',
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        minHeight: 75,
    },
    headerRightButton: {
        textAlign: "right",
        width: "20%",
    },
    headerLeftButton: {
        textAlign: "left",
        width: "20%",
    },
    headerTitle: {
        textAlign: "center",
        width: "60%",
        color: "#FFFFFF",
        fontFamily: "raleway"
    }
});