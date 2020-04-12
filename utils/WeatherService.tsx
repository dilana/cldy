import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { Countries } from './Countries';
import { API_KEY } from './WeatherAPIKey';

export default class WeatherService {
    static getCurrentPosition(): Promise<{ latitude: number, longitude: number }> {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(position => {
                return resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
            }, () => {
                return resolve({latitude: 37.754149, longitude: -122.447126});
            });
        });
    }

    static updateCurrentPositionWeather(): Promise<WeatherInterface> {
        return this.getCurrentPosition()
            .then((position) => this.fetchWeather(position.latitude, position.longitude))
            .then((weather) => this.updateWeather(weather));
    }

    static updateWeatherByQuery(query: string): Promise<WeatherInterface> {
        return this.fetchWeather(query).then((weather) => this.updateWeather(weather));
    }

    static getSavedWeather(): Promise<Array<WeatherInterface>> {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('@weather').then((weather: any) => {
                return weather !== null ? resolve(JSON.parse(weather)) : reject();
            }).catch(() => {
                return reject();
            });
        });
    }

    static getLocations(): Promise<Array<string>> {
        return new Promise((resolve) => {
            AsyncStorage.getItem('@locations').then((locations: any) => {
                if (locations === null) {
                    locations = ['geolocation'];
                    AsyncStorage.setItem('@locations', JSON.stringify(locations)).then();
                } else {
                    locations = JSON.parse(locations);
                }

                resolve(locations);
            });
        });
    }

    static addLocation(location: string): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.fetchWeather(location)
                .then((weather) => this.updateWeather(weather))
                .then(() => this.getLocations())
                .then((locations) => AsyncStorage.setItem('@locations', JSON.stringify([...locations, location]), (err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(true);
                }));
        });
    }

    private static updateWeather(weather: WeatherInterface): Promise<any> {
        return AsyncStorage.getItem('@weather').then((data: any) => {
            let newData;
            if (data === null) {
                newData = [weather];
            } else {
                newData = JSON.parse(data) as Array<WeatherInterface>;

                let index = newData.findIndex((itm) => itm.query === weather.query);

                if (index !== -1) {
                    newData[index] = weather;
                } else {
                    newData.push(weather);
                }
            }

            return AsyncStorage.setItem('@weather', JSON.stringify(newData));
        }).catch(() => Promise.reject('error'));
    }

    private static fetchWeather(lat: number | string, lon?: number): Promise<WeatherInterface> {
        return new Promise((resolve, reject) => {
            let weatherURL, forecastURL;
            if (lat && lon) {
                weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;
                forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;
            } else {
                weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(lat)}&APPID=${API_KEY}&units=metric`;
                forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(lat)}&APPID=${API_KEY}&units=metric`;
            }

            Promise.all([fetch(weatherURL), fetch(forecastURL)])
                .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
                .then(([data1, data2]) => {
                    // Weather data
                    //today min/max temp
                    let tempMin, tempMax;
                    data2.list.forEach((item: any) => {
                        if (moment().isSame(moment(item.dt * 1000), 'd')) {
                            if (typeof tempMin === 'undefined' || tempMin > item.main.temp_min) {
                                tempMin = item.main.temp_min;
                            }

                            if (typeof tempMax === 'undefined' || item.main.temp_max > tempMax) {
                                tempMax = item.main.temp_max;
                            }
                        }
                    });

                    // Forecast data
                    let forecastData, forecast;
                    forecastData = [];
                    forecast = [];

                    data2.list.forEach((item: any) => {
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
                                if (typeof tempMin === 'undefined' || tempMin > item.tempMin) {
                                    tempMin = item.tempMin;
                                }

                                if (typeof tempMax === 'undefined' || item.tempMax > tempMax) {
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
                                tempMin: typeof tempMin !== 'undefined' ? tempMin : 0,
                                tempMax: typeof tempMax !== 'undefined' ? tempMax : 0,
                            };

                            forecast.push(fData);
                        }
                    }

                    const weather: WeatherInterface = {
                        query: lat && lon ? 'geolocation' : lat.toString(),
                        updatedAt: +new Date(),
                        temperature: data1.main.temp,
                        feelsLike: data1.main.feels_like,
                        humidity: data1.main.humidity,
                        pressure: data1.main.pressure,
                        tempMin: typeof tempMin !== 'undefined' ? tempMin : data1.main.temp_min,
                        tempMax: typeof tempMax !== 'undefined' ? tempMax : data1.main.temp_max,
                        city: data1.name,
                        country: Countries.find(c => c.code === data1.sys.country).name,
                        sunrise: data1.sys.sunrise,
                        sunset: data1.sys.sunset,
                        weatherCondition: data1.weather[0],
                        wind: {
                            deg: data1.wind.deg,
                            speed: data1.wind.speed * 3.6,
                        },
                        forecast: forecast,
                    };

                    return resolve(weather);
                }).catch(() => reject('error'));
        });
    }
};
