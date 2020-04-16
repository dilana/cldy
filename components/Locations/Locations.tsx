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
        flatListContainer: {
            flex: 1,
            backgroundColor: '#000000',
        },
        flatListItemContainer: {
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 15,
            borderBottomColor: 'rgba(255, 255, 255, 0.1)',
            borderBottomWidth: 1,
        },
        flatListItemCityContainer: {
            flex: 1,
            flexDirection: 'column',
            paddingLeft: 10,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        flatListItemCityName: {
            color: '#FFF',
            fontSize: 24,
            lineHeight: 28,
            fontFamily: 'Lato-Regular',
        },
        flatListItemCountryName: {
            color: '#FFF',
            fontSize: 14,
            lineHeight: 18,
            fontFamily: 'Lato-Regular',
        },
        flatListItemIconContainer: {
            flex: 0,
            justifyContent: 'center',
            paddingHorizontal: 10,
        },
        flatListItemTemperature: {
            color: '#FFF',
            fontSize: 44,
            flex: 0,
            textAlign: 'right',
            paddingRight: 10,
            width: 90,
            fontFamily: 'Lato-Light',
        },
        svgBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
    });
    private width = Dimensions.get('window').width;
    private navigationListenerUnsubscribe;

    componentDidMount(): void {
        if (__DEV__) {
            this.updateState();
        }

        this.navigationListenerUnsubscribe = this.props.navigation.addListener('focus', () => {
            this.updateState();
        });

        this.props.navigation.setOptions({
            headerRight: () => {
                return (
                    <View style={{paddingLeft: 10, flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="add" type={'material'} color={'#FFF'} size={30} onPress={() => this.showDialog()} underlayColor={'transparent'} activeOpacity={0.8}/>
                    </View>
                );
            },
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

                <View style={this.styles.flatListContainer}>
                    <FlatList
                        style={this.styles.flatListContainer}
                        data={this.state.weather}
                        renderItem={({item}) => {
                            return (
                                <View style={[this.styles.flatListContainer, {overflow: 'hidden'}]}>
                                    <SvgCss xml={
                                        `
                                         <svg width="${this.width}" height="90" viewBox="0 0 ${this.width} 90">
                                            <defs>
                                                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style="stop-color:${weatherConditions(item).gradientColorStart}; stop-opacity:1" />
                                                    <stop offset="80%" style="stop-color:${weatherConditions(item).gradientColorEnd}; stop-opacity:1" />
                                                </linearGradient>
                                            </defs>
                                            <rect width="${this.width}" height="90" fill="url(#grad2)" />
                                        </svg>
                                        `
                                    } style={this.styles.svgBackground}/>

                                    <View style={this.styles.flatListItemContainer}>
                                        <View style={this.styles.flatListItemCityContainer}>
                                            <Text style={this.styles.flatListItemCityName}>
                                                {item.city}
                                            </Text>
                                            <Text style={this.styles.flatListItemCountryName}>
                                                {item.country}
                                            </Text>
                                        </View>
                                        <View style={this.styles.flatListItemIconContainer}>
                                            <SvgCss xml={weatherConditions(item).icon} width={40} height={40}/>
                                        </View>
                                        <Text style={this.styles.flatListItemTemperature}>
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
        AsyncStorage.multiGet(['@settings', '@weather', '@locations']).then((data) => {
            if (data[0][1] !== null) {
                this.setState({settings: JSON.parse(data[0][1])});
            }

            if (data[1][1] !== null) {
                this.setState({weather: JSON.parse(data[1][1])});
            }

            if (data[2][1] !== null) {
                this.setState({locations: JSON.parse(data[2][1])});
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
            this.updateState();
        }).catch(() => {
            alert('Location can\'t be found!');
        });
    };
}
