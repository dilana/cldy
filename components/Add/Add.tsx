import React from 'react';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';

export default class Add extends React.Component {

    render() {
        return (
            <View style={{backgroundColor: '#000'}}>
                <Text style={{color: '#000'}}>{'Add City'}</Text>
            </View>
        );
    }
}
