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
        borderBottomWidth: 3,
        borderBottomColor: "#000000",
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

const itemStyle = StyleSheet.create({
    sidebarItem: {
        paddingHorizontal: 10,
        paddingVertical: 25,
    },
});

export const sidebarStyles = StyleSheet.create({
    sidebarMain: {
        position: "absolute",
        width: 150,
        paddingTop: 80,
        backgroundColor: "#FFFFFF",
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        borderColor: PreppyOrange,
        borderBottomLeftRadius: 4,
        flex: -1,
        flexDirection: "column",
    },
    sidebarItemEven: {
        ...itemStyle.sidebarItem,
        backgroundColor: "#FFF3DD"
    },
    sidebarItemOdd: {
        ...itemStyle.sidebarItem,
        backgroundColor: "#FFFFFF"
    },
    sidebarText: {
        fontFamily: "Raleway",
        fontWeight: "bold",
        fontSize: 20,
        color: PreppyOrange,
        textAlign: "center",
    }
});