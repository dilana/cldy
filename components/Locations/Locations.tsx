import React, { SyntheticEvent } from 'react';
import { AsyncStorage, Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import Dialog from 'react-native-dialog';
import { Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SvgCss } from 'react-native-svg';
import { DegreesConverter } from '../../utils/UnitsConverter';
import { weatherConditions } from '../../utils/WeatherConditions';
import WeatherService from '../../utils/WeatherService';

interface MyState {
    dialogVisible: boolean,
    value: string
    locations: Array<string>,
    weather: Array<WeatherInterface>,
    settings: SettingsInterface
}

interface MyProps {
    navigation: any
}

export default class Locations extends React.Component<MyProps, MyState> {
    state: MyState = {
        dialogVisible: false,
        value: '',
        locations: [],
        weather: [],
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
            backgroundColor: '#000000',
            paddingTop: getStatusBarHeight(false) + 40 + 15,
        },
    });
    private width = Dimensions.get('window').width;
    private navigationListenerUnsubscribe;

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

        this.navigationListenerUnsubscribe = this.props.navigation.addListener('focus', () => {
            this.updateState();
        });
    }

    componentWillUnmount() {
        this.navigationListenerUnsubscribe();
    }

    render() {
        return (
            <View style={this.styles.container}>
                <StatusBar translucent barStyle="light-content"/>

                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Add Location</Dialog.Title>
                    <Dialog.Description>Enter city name</Dialog.Description>
                    <Dialog.Input placeholder="San Francisco, USA" onSubmitEditing={this.handleAddLocation} onChange={(event: SyntheticEvent) => {
                        // @ts-ignore
                        this.setState({value: event.nativeEvent.text});
                    }} autoFocus={true}/>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel}/>
                    <Dialog.Button label="OK" onPress={this.handleAddLocation}/>
                </Dialog.Container>

                <View style={{flex: 1}}>
                    <FlatList
                        style={{flex: 1}}
                        data={this.state.weather}
                        renderItem={({item}) => {
                            return (
                                <View style={{flex: 1, overflow: 'hidden'}}>
                                    <SvgCss xml={
                                        `
                                         <svg width="${this.width}" height="80" viewBox="0 0 ${this.width} 80">
                                            <defs>
                                                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style="stop-color:${weatherConditions(item).gradientColorStart}; stop-opacity:1" />
                                                    <stop offset="80%" style="stop-color:${weatherConditions(item).gradientColorEnd}; stop-opacity:1" />
                                                </linearGradient>
                                            </defs>
                                            <rect width="${this.width}" height="80" fill="url(#grad2)" />
                                        </svg>
                                        `
                                    } style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}/>

                                    <View style={{flex: 1, flexDirection: 'row', paddingVertical: 10, borderBottomColor: 'rgba(255, 255, 255, 0.1)', borderBottomWidth: 1}}>
                                        <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10, alignItems: 'flex-start', justifyContent: 'center'}}>
                                            <Text style={{color: '#FFF', fontSize: 24, lineHeight: 26, fontFamily: 'Lato-Regular'}}>
                                                {item.city}
                                            </Text>
                                            <Text style={{color: '#FFF', fontSize: 12, lineHeight: 14, fontFamily: 'Lato-Regular'}}>
                                                {item.country}
                                            </Text>
                                        </View>
                                        <View style={{flex: 0, justifyContent: 'center', paddingHorizontal: 10}}>
                                            <SvgCss xml={weatherConditions(item).icon} width={40} height={40}/>
                                        </View>
                                        <Text style={{color: '#FFF', fontSize: 40, flex: 0, textAlign: 'right', paddingRight: 10, width: 90, fontFamily: 'Lato-Light'}}>
                                            {DegreesConverter(item.temperature, this.state.settings.temperature) + '˚'}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={item => item.query}
                    />
                </View>
            </View>
        );
    }

    private updateState() {
        AsyncStorage.getItem('@settings').then((data) => {
            if (data !== null) {
                this.setState({settings: JSON.parse(data)});
            }
        });

        AsyncStorage.getItem('@locations').then((data) => {
            if (data !== null) {
                this.setState({locations: JSON.parse(data)});
            }
        });

        AsyncStorage.getItem('@weather').then((data) => {
            if (data !== null) {
                this.setState({weather: JSON.parse(data)});
            }
        });
    }

    private showDialog = () => {
        this.setState({dialogVisible: true});
    };

    private handleCancel = () => {
        this.setState({dialogVisible: false});
    };

    private handleAddLocation = () => {
        WeatherService.addLocation(this.state.value).then(() => {
            this.setState({dialogVisible: false});
        }).catch(() => {
            alert('Location can\'t be found!');
        });
    };
}
