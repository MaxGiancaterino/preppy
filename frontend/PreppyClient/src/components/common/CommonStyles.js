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

export const mainStyle = StyleSheet.create({
    main: {
        backgroundColor: "#000000",
    }
})

export const headerStyles = StyleSheet.create({
    headerMain: {
        // backgroundColor: PreppyOrange,
        backgroundColor: "#FFFFFF",
        height: 60,
    },
    headerButton: {
        height: 50,
        width: 50,
    },
    headerTitle: {
        fontWeight: "bold",
        fontFamily: "Raleway",
        fontSize: 24,
        color: PreppyOrange
    },
    logout: {
        fontFamily: "Raleway",
        fontSize: 16,
        marginRight: 10,
        color: PreppyGray
    },
    back: {
        fontFamily: "Raleway",
        fontSize: 16,
        marginLeft: 10,
        color: PreppyGray
    }
});

export const itemStyle = StyleSheet.create({
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

export const recipeButtonStyles = StyleSheet.create({
    recipeButtonItem: {
        backgroundColor: PreppyLight,
        marginHorizontal: 10,
        marginTop: 10,
        minHeight: 60,
        padding: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: PreppyLight,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    recipeButtonTitle: {
        fontFamily: 'Raleway',
        color: DarkOrange,
        fontSize: 18,
        //fontWeight: "bold",
    }, 
    recipeButtonTitleAlt: {
        color: PureWhite,
        fontSize: 18,
    },
    recipeButtonItemAlt: {
        backgroundColor: PreppyOrange,
        marginHorizontal: 10,
        marginTop: 10,
        minHeight: 20,
        padding: 5,
        borderRadius: 5,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

})

export const buttonStyles = StyleSheet.create({
    buttonOrange: {
        backgroundColor: PreppyOrange,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },

    buttonGray: {
        backgroundColor: PreppyGray,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },

    buttonRed: {
        backgroundColor: DarkOrange,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    buttonRed2: {
        backgroundColor: DarkOrange,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        height: 30,
        // flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
        // marginVertical: 5,
    },
    buttonBlue: {
        backgroundColor: PreppyLBlue1,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    buttonGreen: {
        backgroundColor: PreppyGreen,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    buttonTextNormal: {
        fontFamily: 'Raleway',
        color: "#FFFFFF",
        fontSize: 24,
    },
    buttonTextBold: {
        fontFamily: 'Raleway',
        fontWeight: "bold",
        color: "#FFFFFF",
        fontSize: 24,
    },
    normalText: {
        fontFamily: "Raleway",
        fontSize: 16,
        color: PreppyGray,
        marginTop: 5,
        paddingHorizontal: 25,
        textAlign: "auto",
        paddingTop: 10,
    },
})