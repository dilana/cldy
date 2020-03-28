import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class Add extends React.Component {
    private styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#000000',
            paddingTop: getStatusBarHeight(false) + 40 + 15,
            paddingBottom: 15,
            paddingLeft: 10,
            paddingRight: 10,
        },
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFDE4',
        },
    });

    render() {
        return (
            <View style={this.styles.container}>
                <StatusBar translucent barStyle="light-content"/>
                <View style={{}}>
                    <Text style={{}}>{'Add City'}</Text>
                </View>
            </View>
        );
    }
}
