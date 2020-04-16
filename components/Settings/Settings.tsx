import React, { Component } from 'react';
import { AsyncStorage, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface MyState {
    settings: SettingsInterface
}

interface MyProps {

}

export default class Settings extends Component<MyProps, MyState> {
    state: MyState = {
        settings: {
            temperature: true,
            speed: true,
            pressure: true,
            time: true,
        },
    };

    private styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#010101',
            paddingTop: getStatusBarHeight(false) + 40 + 15,
            paddingBottom: 15,
            paddingLeft: 10,
            paddingRight: 10,
        },
        textLabel: {
            color: '#666668',
            textTransform: 'uppercase',
            paddingHorizontal: 15,
            paddingVertical: 5,
        },
        groupContainer: {
            backgroundColor: '#1B1B1E',
            paddingHorizontal: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#232225',
        },
        groupContainerItem: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 5,
            paddingVertical: 7,
            borderBottomWidth: 1,
            borderColor: '#232125',
        },
        itemLabel: {
            color: '#FFF',
            fontSize: 16,
            flexGrow: 1,
        },
        activeOption: {
            color: '#FFF',
            marginRight: 10,
        },
        inactiveOption: {
            color: '#888',
        },
    });

    componentDidMount() {
        AsyncStorage.getItem('@settings').then((data) => {
            if (data !== null) {
                this.setState({settings: JSON.parse(data)});
            }
        });
    }

    render() {
        const trackColor = {false: '#46C75D', true: '#46C75D'};
        const thumbColor = '#FFFFFF';
        const ios_backgroundColor = '#46C75D';

        return (
            <View style={this.styles.container}>
                <StatusBar translucent barStyle="light-content"/>

                <Text style={this.styles.textLabel}>Measurement Units</Text>
                <View style={this.styles.groupContainer}>
                    <View style={this.styles.groupContainerItem}>
                        <Text style={this.styles.itemLabel}>
                            Temperature
                        </Text>

                        <Text style={this.styles.activeOption}>{this.state.settings.temperature ? '˚C' : '˚F'}</Text>

                        <Switch trackColor={trackColor}
                                thumbColor={thumbColor}
                                ios_backgroundColor={ios_backgroundColor}
                                onValueChange={(v: boolean) => {
                                    this.setState((prevState: any) => ({
                                        settings: {
                                            ...prevState.settings,
                                            temperature: v,
                                        },
                                    }), () => {
                                        AsyncStorage.setItem('@settings', JSON.stringify(this.state.settings));
                                    });

                                }}
                                value={this.state.settings.temperature}/>
                    </View>

                    <View style={this.styles.groupContainerItem}>
                        <Text style={this.styles.itemLabel}>{'Wind Speed'}</Text>

                        <Text style={this.styles.activeOption}>{this.state.settings.speed ? 'kmh' : 'mph'}</Text>

                        <Switch trackColor={trackColor}
                                thumbColor={thumbColor}
                                ios_backgroundColor={ios_backgroundColor}
                                onValueChange={(v: boolean) => {
                                    this.setState((prevState: any) => ({
                                        settings: {
                                            ...prevState.settings,
                                            speed: v,
                                        },
                                    }), () => {
                                        AsyncStorage.setItem('@settings', JSON.stringify(this.state.settings));
                                    });
                                }}
                                value={this.state.settings.speed}/>
                    </View>

                    <View style={this.styles.groupContainerItem}>
                        <Text style={this.styles.itemLabel}>{'Pressure'}</Text>

                        <Text style={this.styles.activeOption}>{this.state.settings.pressure ? 'hPa' : 'inHg'}</Text>

                        <Switch trackColor={trackColor}
                                thumbColor={thumbColor}
                                ios_backgroundColor={ios_backgroundColor}
                                onValueChange={(v: boolean) => {
                                    this.setState((prevState: any) => ({
                                        settings: {
                                            ...prevState.settings,
                                            pressure: v,
                                        },
                                    }), () => {
                                        AsyncStorage.setItem('@settings', JSON.stringify(this.state.settings));
                                    });
                                }}
                                value={this.state.settings.pressure}/>
                    </View>

                    <View style={[this.styles.groupContainerItem, {borderBottomWidth: 0}]}>
                        <Text style={this.styles.itemLabel}>{'Hour Format'}</Text>

                        <Text style={this.styles.activeOption}>{this.state.settings.time ? '24h' : '12h'}</Text>

                        <Switch trackColor={trackColor}
                                thumbColor={thumbColor}
                                ios_backgroundColor={ios_backgroundColor}
                                onValueChange={(v: boolean) => {
                                    this.setState((prevState: any) => ({
                                        settings: {
                                            ...prevState.settings,
                                            time: v,
                                        },
                                    }), () => {
                                        AsyncStorage.setItem('@settings', JSON.stringify(this.state.settings));
                                    });
                                }}
                                value={this.state.settings.time}/>
                    </View>
                </View>
            </View>
        );
    }
}
