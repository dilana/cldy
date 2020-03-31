import * as shape from 'd3-shape';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, DeviceEventEmitter, Dimensions, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Circle, SvgCss, Text as SVGText } from 'react-native-svg';
import { LineChart } from 'react-native-svg-charts';
import { ForecastIcons } from '../../utils/ForecastIcons';
import { DegreesConverter, PressureConverter, SpeedConverter } from '../../utils/UnitsConverter';
import { weatherConditions } from '../../utils/WeatherConditions';
import { WeatherIcons } from '../../utils/WeatherIcons';
import { WindDirectionConvert } from '../../utils/WindDirectionConvert';

interface MyState {
    settings: {
        temperature: boolean
        speed: boolean
        pressure: boolean
        time: boolean
    }
}

interface MyProps {
    weather: any
}

export default class Weather extends React.Component<MyProps, MyState> {
    static propTypes = {
        weather: PropTypes.any.isRequired,
    };

    state: MyState = {
        settings: {
            temperature: true,
            speed: true,
            pressure: true,
            time: true,
        },
    };

    private styles = StyleSheet.create({
        weatherContainer: {
            flex: 1,
            paddingTop: getStatusBarHeight(false) + 40 + 15,
            paddingBottom: 15 + 25,
            paddingLeft: 10,
            paddingRight: 10,
        },
        weatherContainerBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        headerContainer: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        headerContainerImage: {
            marginRight: 10,
        },
        tempContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,
        },
        tempHighLowContainer: {
            flex: 0,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 3,
        },
        tempText: {
            fontSize: 166,
            lineHeight: 154,
            textAlign: 'justify',
            color: '#fff',
            fontFamily: 'Lato-Hairline',
            paddingRight: 30,
        },
        tempHighLowText: {
            fontSize: 20,
            color: '#fff',
            fontFamily: 'Lato-Regular',
        },
        tempHighLowHR: {
            height: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            width: '100%',
            marginTop: 2.5,
            marginBottom: 2.5,
        },
        detailsContainer: {
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 15,
        },
        detailsElement: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            marginLeft: 5,
            marginRight: 5,
            padding: 5,
            borderRadius: 4,
        },
        detailsElementTextView: {
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        detailsElementText: {
            color: '#fff',
            fontFamily: 'Lato-Regular',
        },
        fiveDaysContainer: {
            flex: 0,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            borderTopWidth: 1,
            marginBottom: 10,
            paddingTop: 15,
        },
        fiveDaysElement: {},
        fiveDaysElementText: {
            textAlign: 'center',
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'Lato-Regular',
            marginBottom: 3,
        },
        lineChartView: {
            width: '100%',
            height: Dimensions.get('window').width * 0.314159265359,
            flex: 0,
        },
        lineChartStyle: {
            flex: 1,
            paddingHorizontal: 0,
        },
        lineChartSvg: {},
        lineChartContentInset: {
            top: 30,
            bottom: 30,
            left: 15,
            right: 20,
        },
        title: {
            fontSize: 30,
            color: '#fff',
            fontFamily: 'Lato-Light',
        },
        subTitle: {
            fontSize: 16,
            color: '#fff',
            fontFamily: 'Lato-Light',
        },
        subtitle: {
            fontSize: 24,
            color: '#fff',
            fontFamily: 'Lato-Light',
        },
    });
    private _settingsUpdatedSubscription;

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        if (this._settingsUpdatedSubscription) {
            this._settingsUpdatedSubscription.remove();
        }

        this._settingsUpdatedSubscription = DeviceEventEmitter.addListener('settings.updated', async (event) => await this.fetchSettings());

        await this.fetchSettings();
    }

    componentWillUnmount() {
        this._settingsUpdatedSubscription.remove();
    }

    render() {
        if (this.props.weather) {
            const forecastData = [];
            const width = Dimensions.get('window').width;
            const height = Dimensions.get('window').height;
            const weatherCondition = weatherConditions(this.props.weather);
            const displaySunset: boolean = (moment.now() / 1000) > this.props.weather.sunrise && (moment.now() / 1000) <= this.props.weather.sunset;
            const wideEnough = Dimensions.get('window').width >= 414;

            Object.values(this.props.weather.forecast).forEach((item: any) => {
                forecastData.push((item.tempMax + item.tempMin) / 2);
            });

            const backgroundSVG = `
                <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%" gradientTransform="rotate(20)">
                            <stop offset="0%" style="stop-color:${weatherCondition.gradientColorStart}; stop-opacity:1" />
                            <stop offset="80%" style="stop-color:${weatherCondition.gradientColorEnd}; stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="${width}" height="${height}" fill="url(#grad1)" />
                </svg>
            `;

            const Decorator = ({x, y, data}) => {
                return data.map((value, index) => {
                    const key = index;
                    let cx = x(index);
                    let cy = y(value);
                    const r = 3;

                    return (
                        <Circle
                            key={key}
                            cx={cx}
                            cy={cy}
                            r={r}
                            stroke={'rgb(255, 255, 255)'}
                            fill={'rgb(255, 255, 255)'}
                        />
                    );
                });
            };

            const Decorator2 = ({x, y, data}) => {
                return data.map((value, index) => {
                    const key = index;
                    let xx = x(index);
                    let yy = y(value) - 12;
                    const temp = Object.values(this.props.weather.forecast)[key]['tempMax'];

                    return (
                        <SVGText
                            key={key}
                            fill={'#FFFFFF'}
                            fontSize={'16'}
                            x={xx}
                            y={yy}
                            textAnchor={'middle'}>
                            {DegreesConverter(temp, this.state.settings.temperature) + '˚'}
                        </SVGText>
                    );
                });
            };

            const Decorator3 = ({x, y, data}) => {
                return data.map((value, index) => {
                    const key = index;
                    let xx = x(index);
                    let yy = y(value) + 24;
                    const temp = Object.values(this.props.weather.forecast)[key]['tempMin'];

                    return (
                        <SVGText
                            key={key}
                            fill={'#FFFFFF'}
                            fontSize={'16'}
                            x={xx}
                            y={yy}
                            textAnchor={'middle'}>
                            {DegreesConverter(temp, this.state.settings.temperature) + '˚'}
                        </SVGText>
                    );
                });
            };

            return (
                <View style={[this.styles.weatherContainer]}>
                    <SvgCss xml={backgroundSVG} style={this.styles.weatherContainerBackground}/>

                    <View style={this.styles.headerContainer}>
                        <SvgCss xml={weatherCondition.icon} width={67} height={67} style={this.styles.headerContainerImage}/>
                        <View>
                            <View>
                                <Text style={this.styles.title}>{weatherCondition.name}</Text>
                            </View>
                            <View>
                                <Text style={this.styles.subTitle}>{weatherCondition.description}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={this.styles.tempContainer}>
                        <View style={{height: 120, overflow: 'hidden'}}>
                            <Text style={this.styles.tempText}>{DegreesConverter(this.props.weather.temperature, this.state.settings.temperature) + '˚'}</Text>
                        </View>

                        <View style={this.styles.tempHighLowContainer}>
                            <Text style={this.styles.tempHighLowText}>
                                {DegreesConverter(this.props.weather.tempMax, this.state.settings.temperature) + '˚'}{this.state.settings.temperature ? 'C' : 'F'}
                            </Text>
                            <View style={this.styles.tempHighLowHR}/>
                            <Text style={this.styles.tempHighLowText}>
                                {DegreesConverter(this.props.weather.tempMin, this.state.settings.temperature) + '˚'}{this.state.settings.temperature ? 'C' : 'F'}
                            </Text>
                        </View>
                    </View>

                    <View style={this.styles.detailsContainer}>
                        <View style={[this.styles.detailsElement, {marginLeft: 0}]}>
                            <SvgCss xml={WeatherIcons('temperature').xml} width={38} height={38}/>
                            <View style={this.styles.detailsElementTextView}>
                                <Text style={this.styles.detailsElementText}>{DegreesConverter(this.props.weather.feelsLike, this.state.settings.temperature) + '˚'}</Text>
                                <Text style={this.styles.detailsElementText}>Feels like</Text>
                            </View>
                        </View>
                        <View style={this.styles.detailsElement}>
                            <SvgCss xml={WeatherIcons('humidity').xml} width={38} height={38}/>
                            <View style={this.styles.detailsElementTextView}>
                                <Text style={this.styles.detailsElementText}>{this.props.weather.humidity}%</Text>
                                <Text style={this.styles.detailsElementText}>Humidity</Text>
                            </View>
                        </View>
                        <View style={this.styles.detailsElement}>
                            <SvgCss xml={WeatherIcons('wind').xml} width={38} height={38}/>
                            <View style={this.styles.detailsElementTextView}>
                                <Text style={this.styles.detailsElementText}>
                                    {SpeedConverter(this.props.weather.wind.speed, this.state.settings.speed)}{this.state.settings.speed ? 'km/h' : 'mph'}
                                </Text>
                                <Text style={this.styles.detailsElementText}>{WindDirectionConvert(this.props.weather.wind.deg)}</Text>
                            </View>
                        </View>
                        {wideEnough ?
                            (<View style={this.styles.detailsElement}>
                                <SvgCss xml={WeatherIcons('pressure').xml} width={38} height={38}/>
                                <View style={this.styles.detailsElementTextView}>
                                    <Text style={this.styles.detailsElementText}>
                                        {PressureConverter(this.props.weather.pressure, this.state.settings.pressure)}{this.state.settings.pressure ? 'hPa' : 'inHg'}
                                    </Text>
                                    <Text style={this.styles.detailsElementText}>Pressure</Text>
                                </View>
                            </View>) :
                            (<View></View>)
                        }
                        <View style={[this.styles.detailsElement, {marginRight: 0}]}>
                            <SvgCss xml={WeatherIcons('sunrise').xml} width={38} height={38}/>
                            {displaySunset ?
                                (<View style={this.styles.detailsElementTextView}>
                                    <Text style={this.styles.detailsElementText}>
                                        {this.state.settings.time ?
                                            (moment.unix(this.props.weather.sunset).format('HH:mm')) :
                                            (moment.unix(this.props.weather.sunset).format('hh:mm'))
                                        }
                                    </Text>
                                    <Text style={this.styles.detailsElementText}>Sunset</Text>
                                </View>) :
                                (<View style={this.styles.detailsElementTextView}>
                                    <Text style={this.styles.detailsElementText}>
                                        {this.state.settings.time ?
                                            (moment.unix(this.props.weather.sunrise).format('HH:mm')) :
                                            (moment.unix(this.props.weather.sunrise).format('hh:mm'))
                                        }
                                    </Text>
                                    <Text style={this.styles.detailsElementText}>Sunrise</Text>
                                </View>)
                            }
                        </View>
                    </View>

                    <View style={this.styles.fiveDaysContainer}>
                        {Object.values(this.props.weather.forecast).map((prop: any, key) => {
                            return (
                                <View key={key}>
                                    <Text style={this.styles.fiveDaysElementText}>{prop.day}</Text>
                                    <SvgCss xml={ForecastIcons(prop.code).xml} width={40} height={40}/>
                                </View>
                            );
                        })}
                    </View>

                    <View style={this.styles.lineChartView}>
                        <LineChart
                            style={this.styles.lineChartStyle}
                            data={forecastData}
                            svg={{stroke: 'rgba(255, 255, 255)', strokeWidth: 2}}
                            curve={shape.curveCatmullRom}
                            contentInset={this.styles.lineChartContentInset}>
                            <Decorator/>
                            <Decorator2/>
                            <Decorator3/>
                        </LineChart>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Oh no, something went wrong</Text>
                </View>
            );
        }
    }

    private async fetchSettings() {
        let settings;

        try {
            const value = await AsyncStorage.getItem('@settings');
            if (value !== null) {
                settings = JSON.parse(value);
            }
        } catch (e) {
        }

        if (settings) {
            this.setState({settings: settings});
        }
    }
}
