import React, { SyntheticEvent } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Dialog from 'react-native-dialog';
import { Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface MyState {
    dialogVisible: boolean,
    value: string
}

interface MyProps {
    navigation: any
}

export default class Locations extends React.Component<MyProps, MyState> {
    state: MyState = {
        dialogVisible: false,
        value: '',
    };
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

    componentDidMount(): void {
        this.props.navigation.setOptions({
            headerRight: () => {
                return (
                    <View style={{paddingLeft: 10, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="add" type={'material'} color={'#FFF'} size={30} onPress={() => this.showDialog()} underlayColor={'transparent'} activeOpacity={0.8}/>
                    </View>
                );
            },
        });

        console.log('dsa');
    }

    render() {
        return (
            <View style={this.styles.container}>
                <StatusBar translucent barStyle="light-content"/>

                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Add Location</Dialog.Title>
                    <Dialog.Description>Enter city name</Dialog.Description>
                    <Dialog.Input placeholder="San Francisco, USA" onSubmitEditing={this.handleAddCity} onChange={(event: SyntheticEvent) => {
                        // @ts-ignore
                        this.setState({value: event.nativeEvent.text});
                    }} autoFocus={true}/>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel}/>
                    <Dialog.Button label="OK" onPress={this.handleAddCity}/>
                </Dialog.Container>

                <View style={{}}>
                    <Text style={{}}>{'Add City'}</Text>
                </View>
            </View>
        );
    }

    private showDialog = () => {
        this.setState({dialogVisible: true});
    };

    private handleCancel = () => {
        this.setState({dialogVisible: false});
    };

    private handleAddCity = () => {
        console.log(this.state.value);
        this.setState({dialogVisible: false});
    };
}
