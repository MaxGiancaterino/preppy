import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

export const mainStyle = StyleSheet.create({
    main: {
        backgroundColor: "#000000",
    }
})

export const headerStyles = StyleSheet.create({
    headerMain: {
        backgroundColor: '#FDB52B',
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        maxHeight: 75,
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