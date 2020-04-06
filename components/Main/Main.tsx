import { SplashScreen } from 'expo';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
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
    });
    private currentWeatherIndex: number = 0;

    componentDidMount() {
        this.updateWeatherState();
        WeatherService.updateCurrentPositionWeather().then(() => this.updateWeatherState()).catch(() => alert('Error getting weather conditions'));
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
                            <Swiper showsButtons={false} loop={false} autoplay={false} dotColor={'rgba(255, 255, 255, 0.3)'} activeDotColor={'rgba(255, 255, 255, 0.9)'} onIndexChanged={(index) => this.onIndexChanged(index)}>
                                {weather.map((prop, key) => (<Weather weather={prop} key={key}/>))}
                            </Swiper>
                        )}
                    </View>
                )}
            </View>
        );
    }

    private onIndexChanged(index: number) {
        this.currentWeatherIndex = index;
        const query = this.state.weather[index].query;

        if (query === 'geolocation') {
            WeatherService.updateCurrentPositionWeather().then(() => this.updateWeatherState()).catch(() => alert('Error getting weather conditions'));
        } else {
            WeatherService.updateWeatherByQuery(query).then(() => this.updateWeatherState()).catch(() => alert('Error getting weather conditions'));
        }
    }

    private updateWeatherState() {
        WeatherService.getSavedWeather().then((data) => this.setState({weather: data}, () => this.setIsLoaded()));
    }

    private setIsLoaded() {
        this.setState({isLoading: false});
        setTimeout(() => SplashScreen.hide(), 222);

        // @ts-ignore
        this.props.navigation.setOptions({title: this.state.weather[this.currentWeatherIndex].city});
    }
}

export default withNavigation(Main);
