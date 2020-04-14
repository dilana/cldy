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
    activeLocation: number,
    weather: Array<WeatherInterface>,
    error: string,
}

class Main extends Component<MyProps & NavigationInjectedProps, MyState> {
    state: MyState = {
        isLoading: true,
        activeLocation: 0,
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
        dotsContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 25,
            flex: 0,
            height: 10,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        dot: {
            width: 10,
            height: 10,
            borderRadius: 10 / 2,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            marginHorizontal: 2.5,
        },
        flatlist: {
            width: Dimensions.get('window').width,
        },
    });
    private _flatListUpdatedSubscription;
    private _flatListScrollSubscription;

    componentDidMount() {
        this._flatListUpdatedSubscription = DeviceEventEmitter.addListener('flatList.onViewableItemsChanged', (event) => this.onViewableItemsChangedSub(event));
        this._flatListScrollSubscription = DeviceEventEmitter.addListener('flatList.onScroll', (event) => this.onScrollSub(event));

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

        if (this._flatListScrollSubscription) {
            this._flatListScrollSubscription.remove();
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
                            <View style={this.styles.container}>
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
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({item, index}) => (
                                        <Weather weather={item}/>
                                    )}
                                    onViewableItemsChanged={this.onViewableItemsChanged}
                                    onScroll={this.onScroll}
                                />
                                <View style={this.styles.dotsContainer}>
                                    {Array.from({length: weather.length}, (v, k) => k).map((prop: any, key) => {
                                        return (
                                            <View key={key} style={[this.styles.dot, {backgroundColor: this.state.activeLocation === key ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.3)'}]}/>
                                        );
                                    })}
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    }

    private onScroll(event: any) {
        DeviceEventEmitter.emit('flatList.onScroll', event);
    }

    private onScrollSub(event: any) {
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);

        // Set location name on scroll
        // @ts-ignore
        this.props.navigation.setOptions({title: this.state.weather[currentIndex].city});
        this.setState({activeLocation: currentIndex});
    }

    private onViewableItemsChanged({viewableItems, changed}) {
        DeviceEventEmitter.emit('flatList.onViewableItemsChanged', {viewableItems, changed});
    }

    private onViewableItemsChangedSub({viewableItems, changed}) {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            const query = viewableItems[0].item.query;

            this.setState({activeLocation: index});

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
