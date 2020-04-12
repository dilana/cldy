import { SplashScreen } from 'expo';
import React, { Component } from 'react';
import { DeviceEventEmitter, Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import WeatherService from '../../utils/WeatherService';
import Weather from '../Weather/Weather';

interface MyProps {

}

interface MyState {
    locations: Array<string>,
    isLoading: boolean,
    weather: Array<WeatherInterface>,
    error: string,
}

class Main extends Component<MyProps & NavigationInjectedProps, MyState> {
    state: MyState = {
        isLoading: true,
        locations: [],
        weather: undefined,
        error: undefined,
    };

    private styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#000',
        },
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
        },
        flatlist: {
            width: Dimensions.get('window').width,
        },
    });
    private _flatListUpdatedSubscription;

    componentDidMount() {
        this._flatListUpdatedSubscription = DeviceEventEmitter.addListener('flatList.onViewableItemsChanged', (event) => this.onViewableItemsChangedSub(event));

        this.updateWeatherState().then(() => {
            // All good
        }).catch(() => {
            // First time app open
            WeatherService.updateCurrentPositionWeather().then(() => this.updateWeatherState()).catch(() => alert('Error getting weather conditions'));
        });
    }

    componentWillUnmount() {
        if (this._flatListUpdatedSubscription) {
            this._flatListUpdatedSubscription.remove();
        }
    }

    render() {
        const {isLoading, weather, error} = this.state;

        return (
            <View style={this.styles.container}>
                <StatusBar translucent barStyle="light-content"/>
                {error ? (
                    <View style={this.styles.loadingContainer}><Text style={{color: '#FFF'}}>{error}</Text></View>
                ) : (
                    <View style={this.styles.container}>
                        {isLoading ? (
                            <View style={this.styles.loadingContainer}/>
                        ) : (
                            <FlatList
                                horizontal
                                pagingEnabled
                                disableIntervalMomentum
                                data={weather}
                                initialNumToRender={5}
                                windowSize={5}
                                viewabilityConfig={
                                    {
                                        itemVisiblePercentThreshold: 100,
                                    }
                                }
                                style={this.styles.flatlist}
                                keyExtractor={weather => weather.query}
                                showsHorizontalScrollIndicator={true}
                                renderItem={({item, index}) => (
                                    <Weather weather={item}/>
                                )}
                                onViewableItemsChanged={this.onViewableItemsChanged}
                            />
                        )}
                    </View>
                )}
            </View>
        );
    }

    private onViewableItemsChanged({viewableItems, changed}) {
        DeviceEventEmitter.emit('flatList.onViewableItemsChanged', {viewableItems, changed});
    }

    private onViewableItemsChangedSub({viewableItems, changed}) {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            const query = viewableItems[0].item.query;

            // @ts-ignore
            this.props.navigation.setOptions({title: viewableItems[0].item.city});

            if (+new Date() > this.state.weather[index].updatedAt + (1000 * 60 * 30)) {
                if (query === 'geolocation') {
                    WeatherService.updateCurrentPositionWeather().then(() => this.updateWeatherState()).catch(() => alert('Error getting weather conditions'));
                } else {
                    WeatherService.updateWeatherByQuery(query).then(() => this.updateWeatherState()).catch(() => alert('Error getting weather conditions'));
                }
            }
        }
    }

    private updateWeatherState(): Promise<any> {
        return new Promise((resolve, reject) => WeatherService.getSavedWeather().then((data) => this.setState({weather: data}, () => this.setIsLoaded())).catch(() => reject()));
    }

    private setIsLoaded(): Promise<any> {
        return new Promise((resolve) => {
            if (this.state.isLoading) {
                this.setState({isLoading: false}, () => setTimeout(() => SplashScreen.hide(), resolve()));
            } else {
                resolve();
            }
        });
    }
}

export default withNavigation(Main);
