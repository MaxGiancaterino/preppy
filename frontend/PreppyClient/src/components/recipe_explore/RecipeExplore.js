import React, {Component} from 'react';
import {Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import {exploreStyles} from './ExploreStyles';

export default class RecipeExplore extends Component {

    static navigationOptions = {
        title: "Recipe Explorer",
    };

    constructor() {
        super();
    }

    render() {
        return(
            <View style={exploreStyles.exploreMain}>
                <TextInput
                    style={exploreStyles.searchBar}
                    placeholder="Search for Recipes..."
                />
                <TouchableOpacity style={exploreStyles.searchButton}>
                    <View style={exploreStyles.searchButton}>
                        <Text style={exploreStyles.searchButtonText}>
                            Search
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
