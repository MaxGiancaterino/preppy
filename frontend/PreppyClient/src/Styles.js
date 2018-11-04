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
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        maxHeight: 85,
    },
    headerButtonContainer: {
        width: "20%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch"
    },
    headerButton: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    headerTitle: {
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontFamily: "Raleway",
        width: "60%",
        fontSize: 24
    },
    statusBar: {
        backgroundColor: "#000000",
        width: "100%",
        height: 20, // Hardcoded for now. Will find a more robust solution later
    },
});

export const sidebarStyles = StyleSheet.create({
    sidebarMain: {
        position: "absolute",
        width: 100,
        //height: "100%",
        marginTop: 24,
        backgroundColor: "#FFFFFF",
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderColor: PreppyOrange,
        flex: -1,
        flexDirection: "column"
    }
});