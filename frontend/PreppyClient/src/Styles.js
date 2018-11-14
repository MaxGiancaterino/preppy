import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const PreppyOrange = "#FDB52B";


export const mainStyle = StyleSheet.create({
    main: {
        backgroundColor: "#000000",
    }
})

export const headerStyles = StyleSheet.create({
    headerMain: {
        backgroundColor: PreppyOrange,
        height: 60,
    },
    headerButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginHorizontal: 10
    },
    headerTitle: {
        fontWeight: "bold",
        fontFamily: "Raleway",
        fontSize: 24
    },
});

export const sidebarStyles = StyleSheet.create({
    sidebarMain: {
        position: "absolute",
        width: 100,
        paddingTop: 24,
        backgroundColor: "#FFFFFF",
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        borderColor: PreppyOrange,
        borderRadius: 4,
        flex: -1,
        flexDirection: "column",
    }
});