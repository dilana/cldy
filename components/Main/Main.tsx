import { SplashScreen } from 'expo';
import moment from 'moment';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Countries } from '../../utils/Countries';
import { API_KEY } from '../../utils/WeatherAPIKey';
import Weather from '../Weather/Weather';

class Main extends Component<NavigationInjectedProps> {
    state: {
        isLoading: boolean
        weather: {
            temperature: number,
            feelsLike: number,
            humidity: number,
            pressure: number,
            tempMax: number,
            tempMin: number,
            sunrise: number,
            sunset: number,
            city: string,
            country: string,
            weatherCondition: {
                description: string,
                icon: string,
                id: number,
                main: string,
            },
            wind: {
                speed: number,
                deg: number
            },
            forecast: Array<{
                code: number,
                day: string,
                tempMax: number,
                tempMin: number,
            }>
        }
        error: string
    } = {
        isLoading: true,
        weather: {
            temperature: 0,
            feelsLike: 0,
            humidity: 0,
            pressure: 0,
            tempMax: 0,
            tempMin: 0,
            sunrise: 0,
            sunset: 0,
            city: '',
            country: '',
            weatherCondition: undefined,
            wind: {
                speed: 0,
                deg: 0,
            },
            forecast: [],
        },
        error: undefined,
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
                this.fetchWeather(position.coords.latitude, position.coords.longitude);
            }, error => {
                this.setState({error: 'Error Getting Weather Conditions'});
            },

        );
    }

    fetchWeather(lat, lon) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`).then(res => res.json()).then(json => {
            let tempMax = Math.round(json.main.temp_max);
            let tempMin = Math.round(json.main.temp_min);

            if (tempMax === tempMin) {
                tempMax++;
                tempMin--;
            }

            this.setState({
                weather: {
                    temperature: Math.round(json.main.temp),
                    feelsLike: Math.round(json.main.feels_like),
                    humidity: Math.round(json.main.humidity),
                    pressure: Math.round(json.main.pressure),
                    tempMin: tempMin,
                    tempMax: tempMax,
                    city: json.name,
                    country: Countries.find(c => c.code === json.sys.country).name,
                    sunrise: json.sys.sunrise,
                    sunset: json.sys.sunset,
                    weatherCondition: json.weather[0],
                    wind: {
                        deg: json.wind.deg,
                        speed: Math.floor(json.wind.speed * 3.6),
                    },
                },
                isLoading: true,
            });

            // @TODO setOptions is missing from interface
            this.props.navigation['setOptions']({title: this.state.weather.city});

            // fetch forecast
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`).then(res => res.json()).then(json => {
                //today min/max temp
                let tempMin, tempMax;
                json.list.forEach((item: any) => {
                    if (moment().isSame(moment(item.dt * 1000), 'd')) {
                        if (!tempMin || tempMin > item.main.temp_min) {
                            tempMin = item.main.temp_min;
                        }

                        if (!tempMax || item.main.temp_max > tempMax) {
                            tempMax = item.main.temp_max;
                        }
                    }
                });

                if (tempMin && tempMax) {
                    this.setState((prevState: any) => ({
                        weather: {
                            ...prevState.weather,
                            tempMin: Math.round(tempMin),
                            tempMax: Math.round(tempMax),
                        },
                    }));
                }

                // Forecast
                let forecastData, forecast;
                forecastData = [];
                forecast = [];

                json.list.forEach((item: any) => {
                    // forecast data
                    const f = {
                        date: moment(item.dt * 1000).format('D.MM.Y'),
                        code: item.weather[0].id,
                        tempMin: item.main.temp_min,
                        tempMax: item.main.temp_max,
                    };

                    forecastData.push(f);
                });

                for (let day = 1; day <= 5; day++) {
                    const mday = moment().add(day, 'day').format('D.MM.Y');
                    const mdayF = moment().add(day, 'day').format('ddd');
                    let tempMin;
                    let tempMax;
                    let codes = [];

                    const fc = forecastData.filter((item: any) => item.date === mday);
                    if (fc.length > 0) {
                        fc.forEach((item: any) => {
                            if (!tempMin || tempMin > item.tempMin) {
                                tempMin = item.tempMin;
                            }

                            if (!tempMax || item.tempMax > tempMax) {
                                tempMax = item.tempMax;
                            }

                            codes.push(item.code);
                        });

                        // get most frequent weather code
                        let counts: any = codes.reduce((a, c) => {
                            a[c] = (a[c] || 0) + 1;
                            return a;
                        }, {});
                        let maxCount = Math.max(...Object.values(counts) as any);
                        let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);

                        const fData = {
                            day: mdayF,
                            code: +mostFrequent[0],
                            tempMin: Math.round(tempMin || 0),
                            tempMax: Math.round(tempMax || 0),
                        };

                        forecast.push(fData);
                    }
                }

                this.setState((prevState: any) => ({
                    weather: {
                        ...prevState.weather,
                        forecast: forecast,
                    },
                }));

                this.setState((prevState: any) => ({
                    ...prevState,
                    isLoading: false,
                }));

                setTimeout(() => SplashScreen.hide(), 0);
            });
        });
    }

    render() {
        const {isLoading, weather} = this.state;

        return (
            <View style={styles.container}>
                <StatusBar translucent barStyle="light-content"/>
                {isLoading ? (
                    <View style={styles.loadingContainer}/>
                ) : (
                    <Swiper showsButtons={false} loop={false}>
                        <Weather weather={weather}/>
                        <Weather weather={weather}/>
                        <Weather weather={weather}/>
                    </Swiper>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFDE4',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFDE4',
    },
});

export default withNavigation(Main);
