import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Dimensions } from 'react-native';

let window_size = Dimensions.get('window');

export default class BarcodeReader extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View>

                <Text>BarcodeReader</Text>

            </View>
        );
    }

}
