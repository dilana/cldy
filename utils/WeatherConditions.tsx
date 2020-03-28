import * as moment from 'moment';
import { WeatherIcons } from './WeatherIcons';

export const weatherConditions = (weather: any) => {
    const conditions = [
        {
            code: 200,
            name: 'Thunderstorm',
            description: 'Thunderstorm with light rain',
            description2: '',
            iconDay: '11dr',
            iconNight: '11dr',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 201,
            name: 'Thunderstorm',
            description: 'Thunderstorm with rain',
            description2: '',
            iconDay: '11dr',
            iconNight: '11dr',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 202,
            name: 'Thunderstorm',
            description: 'Thunderstorm with heavy rain',
            description2: '',
            iconDay: '11dr',
            iconNight: '11dr',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 210,
            name: 'Thunderstorm',
            description: 'Light thunderstorm',
            description2: '',
            iconDay: '11d',
            iconNight: '11d',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 211,
            name: 'Thunderstorm',
            description: 'Thunderstorm',
            description2: '',
            iconDay: '11d',
            iconNight: '11d',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 212,
            name: 'Thunderstorm',
            description: 'Heavy thunderstorm',
            description2: '',
            iconDay: '11d',
            iconNight: '11d',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 221,
            name: 'Thunderstorm',
            description: 'Ragged thunderstorm',
            description2: '',
            iconDay: '11d',
            iconNight: '11d',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 230,
            name: 'Thunderstorm',
            description: 'Thunderstorm with light drizzle',
            description2: '',
            iconDay: '11dr',
            iconNight: '11dr',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 231,
            name: 'Thunderstorm',
            description: 'Thunderstorm with drizzle',
            description2: '',
            iconDay: '11dr',
            iconNight: '11dr',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 232,
            name: 'Thunderstorm',
            description: 'Thunderstorm with heavy drizzle',
            description2: '',
            iconDay: '11dr',
            iconNight: '11dr',
            gradientColorStartDay: '#3F65A3',
            gradientColorEndDay: '#CFADA6',
            gradientColorStartNight: '#11031D',
            gradientColorEndNight: '#E3957C',
        },
        {
            code: 300,
            name: 'Drizzle',
            description: 'Light intensity drizzle',
            description2: '',
            iconDay: '09d1',
            iconNight: '09d1',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#101A2A',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 301,
            name: 'Drizzle',
            description: 'Drizzle',
            description2: '',
            iconDay: '09d1',
            iconNight: '09d1',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#101A2A',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 302,
            name: 'Drizzle',
            description: 'Heavy intensity drizzle',
            description2: '',
            iconDay: '09d1',
            iconNight: '09d1',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#101A2A',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 310,
            name: 'Drizzle',
            description: 'Light intensity drizzle rain',
            description2: '',
            iconDay: '09d2',
            iconNight: '09d2',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#101A2A',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 311,
            name: 'Drizzle',
            description: 'Drizzle rain',
            description2: '',
            iconDay: '09d2',
            iconNight: '09d2',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#101A2A',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 312,
            name: 'Drizzle',
            description: 'Heavy intensity drizzle rain',
            description2: '',
            iconDay: '09d2',
            iconNight: '09d2',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#101A2A',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 313,
            name: 'Drizzle',
            description: 'Shower rain and drizzle',
            description2: '',
            iconDay: '09d3',
            iconNight: '09d3',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#101A2A',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 314,
            name: 'Drizzle',
            description: 'Heavy shower rain and drizzle',
            description2: '',
            iconDay: '09d3',
            iconNight: '09d3',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#101A2A',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 321,
            name: 'Drizzle',
            description: 'Shower drizzle',
            description2: '',
            iconDay: '09d3',
            iconNight: '09d3',
            gradientColorStartDay: '#5BAFDE',
            gradientColorEndDay: '#1E4667',
            gradientColorStartNight: '#2C6B9E',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 500,
            name: 'Rain',
            description: 'Light rain',
            description2: '',
            iconDay: '10d1',
            iconNight: '10n1',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 501,
            name: 'Rain',
            description: 'Moderate rain',
            description2: '',
            iconDay: '10d2',
            iconNight: '10d2',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 503,
            name: 'Rain',
            description: 'Very heavy rain',
            description2: '',
            iconDay: '10d3',
            iconNight: '10n3',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 504,
            name: 'Rain',
            description: 'Extreme rain',
            description2: '',
            iconDay: '10n3',
            iconNight: '10n3',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 511,
            name: 'Rain',
            description: 'Freezing rain',
            description2: '',
            iconDay: '10d4',
            iconNight: '10n4',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 520,
            name: 'Rain',
            description: 'Light intensity shower rain',
            description2: '',
            iconDay: '09d1',
            iconNight: '09d1',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 521,
            name: 'Rain',
            description: 'Shower rain',
            description2: '',
            iconDay: '09d2',
            iconNight: '09d2',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 522,
            name: 'Rain',
            description: 'Heavy intensity shower rain',
            description2: '',
            iconDay: '09d3',
            iconNight: '09d3',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 531,
            name: 'Rain',
            description: 'Ragged shower rain',
            description2: '',
            iconDay: '09d3',
            iconNight: '09d3',
            gradientColorStartDay: '#8a6287',
            gradientColorEndDay: '#2A3E6B',
            gradientColorStartNight: '#7F587C',
            gradientColorEndNight: '#101A2A',
        },
        {
            code: 600,
            name: 'Snow',
            description: 'Light snow',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#7D818A',
            gradientColorEndDay: '#ADB7BD',
            gradientColorStartNight: '#7D818A',
            gradientColorEndNight: '#ADB7BD',
        },
        {
            code: 601,
            name: 'Snow',
            description: 'Snow',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#7D818A',
            gradientColorEndDay: '#ADB7BD',
            gradientColorStartNight: '#7D818A',
            gradientColorEndNight: '#ADB7BD',
        },
        {
            code: 602,
            name: 'Snow',
            description: 'Heavy snow',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#7D818A',
            gradientColorEndDay: '#ADB7BD',
            gradientColorStartNight: '#7D818A',
            gradientColorEndNight: '#ADB7BD',
        },
        {
            code: 611,
            name: 'Snow',
            description: 'Sleet',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#636B73',
            gradientColorEndDay: '#141324',
            gradientColorStartNight: '#636B73',
            gradientColorEndNight: '#141324',
        },
        {
            code: 612,
            name: 'Snow',
            description: 'Light shower sleet',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#636B73',
            gradientColorEndDay: '#141324',
            gradientColorStartNight: '#636B73',
            gradientColorEndNight: '#141324',
        },
        {
            code: 613,
            name: 'Snow',
            description: 'Shower sleet',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#636B73',
            gradientColorEndDay: '#141324',
            gradientColorStartNight: '#636B73',
            gradientColorEndNight: '#141324',
        },
        {
            code: 615,
            name: 'Snow',
            description: 'Light rain and snow',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#7D818A',
            gradientColorEndDay: '#ADB7BD',
            gradientColorStartNight: '#7D818A',
            gradientColorEndNight: '#ADB7BD',
        },
        {
            code: 616,
            name: 'Snow',
            description: 'Rain and snow',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#7D818A',
            gradientColorEndDay: '#ADB7BD',
            gradientColorStartNight: '#7D818A',
            gradientColorEndNight: '#ADB7BD',
        },
        {
            code: 620,
            name: 'Snow',
            description: 'Light shower snow',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#7D818A',
            gradientColorEndDay: '#ADB7BD',
            gradientColorStartNight: '#7D818A',
            gradientColorEndNight: '#ADB7BD',
        },
        {
            code: 621,
            name: 'Snow',
            description: 'Shower snow',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#7D818A',
            gradientColorEndDay: '#ADB7BD',
            gradientColorStartNight: '#7D818A',
            gradientColorEndNight: '#ADB7BD',
        },
        {
            code: 622,
            name: 'Snow',
            description: 'Heavy shower snow',
            description2: '',
            iconDay: '13d',
            iconNight: '13d',
            gradientColorStartDay: '#7D818A',
            gradientColorEndDay: '#ADB7BD',
            gradientColorStartNight: '#7D818A',
            gradientColorEndNight: '#ADB7BD',
        },
        {
            code: 701,
            name: 'Mist',
            description: 'Mist',
            description2: '',
            iconDay: '50d',
            iconNight: '50d',
            gradientColorStartDay: '#BB8CB8',
            gradientColorEndDay: '#5E5F91',
            gradientColorStartNight: '#BB8CB8',
            gradientColorEndNight: '#5E5F91',
        },
        {
            code: 711,
            name: 'Smoke',
            description: 'Smoke',
            description2: '',
            iconDay: '50d',
            iconNight: '50d',
            gradientColorStartDay: '#FBE5C8',
            gradientColorEndDay: '#473E41',
            gradientColorStartNight: '#FBE5C8',
            gradientColorEndNight: '#473E41',
        },
        {
            code: 721,
            name: 'Haze',
            description: 'Haze',
            description2: '',
            iconDay: '50d',
            iconNight: '50d',
            gradientColorStartDay: '#BB8CB8',
            gradientColorEndDay: '#5E5F91',
            gradientColorStartNight: '#BB8CB8',
            gradientColorEndNight: '#5E5F91',
        },
        {
            code: 731,
            name: 'Dust',
            description: 'Sand/dust whirls',
            description2: '',
            iconDay: '50d3',
            iconNight: '50d3',
            gradientColorStartDay: '#B3743B',
            gradientColorEndDay: '#DBA660',
            gradientColorStartNight: '#A27F47',
            gradientColorEndNight: '#1B0E09',
        },
        {
            code: 741,
            name: 'Fog',
            description: 'Fog',
            description2: '',
            iconDay: '50d',
            iconNight: '50d',
            gradientColorStartDay: '#BB8CB8',
            gradientColorEndDay: '#5E5F91',
            gradientColorStartNight: '#BB8CB8',
            gradientColorEndNight: '#5E5F91',
        },
        {
            code: 751,
            name: 'Sand',
            description: 'Sand',
            description2: '',
            iconDay: '50d',
            iconNight: '50d',
            gradientColorStartDay: '#B3743B',
            gradientColorEndDay: '#DBA660',
            gradientColorStartNight: '#A27F47',
            gradientColorEndNight: '#1B0E09',
        },
        {
            code: 761,
            name: 'Dust',
            description: 'Dust',
            description2: '',
            iconDay: '50d',
            iconNight: '50d',
            gradientColorStartDay: '#FCE6C9',
            gradientColorEndDay: '#473E41',
            gradientColorStartNight: '#FCE6C9',
            gradientColorEndNight: '#473E41',
        },
        {
            code: 762,
            name: 'Ash',
            description: 'Volcanic ash',
            description2: '',
            iconDay: '50d',
            iconNight: '50d',
            gradientColorStartDay: '#FCE6C9',
            gradientColorEndDay: '#473E41',
            gradientColorStartNight: '#FCE6C9',
            gradientColorEndNight: '#473E41',
        },
        {
            code: 771,
            name: 'Squall',
            description: 'Squalls',
            description2: '',
            iconDay: '50d3',
            iconNight: '50d3',
            gradientColorStartDay: '#34313A',
            gradientColorEndDay: '#B3947F',
            gradientColorStartNight: '#34313A',
            gradientColorEndNight: '#B3947F',
        },
        {
            code: 781,
            name: 'Tornado',
            description: 'Tornado',
            description2: '',
            iconDay: '50d2',
            iconNight: '50d2',
            gradientColorStartDay: '#34313A',
            gradientColorEndDay: '#B3947F',
            gradientColorStartNight: '#34313A',
            gradientColorEndNight: '#B3947F',
        },
        {
            code: 800,
            name: 'Clear',
            description: 'Clear sky',
            description2: '',
            iconDay: '01d',
            iconNight: '01n',
            gradientColorStartDay: (() => {
                const timestamp = moment.now() / 1000;
                const tenMinutes = 10 * 60;
                const sunset = weather.sunset;
                const sunrise = weather.sunrise;
                // const sunset =  moment.now() / 1000;

                if (timestamp > (sunset - tenMinutes) && timestamp < (sunset + tenMinutes)) {
                    return '#FE8963';
                }

                if (timestamp > (sunrise - tenMinutes) && timestamp < (sunrise + tenMinutes)) {
                    return '#FFE18E';
                }

                if (weather.temperature > 35) {
                    return '#8A1360';
                }

                return '#52A5DA';
            })(),
            gradientColorEndDay: (() => {
                const timestamp = moment.now() / 1000;
                const tenMinutes = 10 * 60;
                const sunset = weather.sunset;
                const sunrise = weather.sunrise;
                // const sunset =  moment.now() / 1000;

                if (timestamp > (sunset - tenMinutes) && timestamp < (sunset + tenMinutes)) {
                    return '#D53047';
                }

                if (timestamp > (sunrise - tenMinutes) && timestamp < (sunrise + tenMinutes)) {
                    return '#FF9456';
                }

                if (weather.temperature > 35) {
                    return '#FB5038';
                }

                return '#72BAE0';
            })(),
            gradientColorStartNight: (() => {
                const timestamp = moment.now() / 1000;
                const tenMinutes = 10 * 60;
                const sunset = weather.sunset;
                const sunrise = weather.sunrise;

                if (timestamp > (sunset - tenMinutes) && timestamp < (sunset + tenMinutes)) {
                    return '#FE8963';
                }

                if (timestamp > (sunrise - tenMinutes) && timestamp < (sunrise + tenMinutes)) {
                    return '#FFE18E';
                }

                return '#112259';
            })(),
            gradientColorEndNight: (() => {
                const timestamp = moment.now() / 1000;
                const tenMinutes = 10 * 60;
                const sunset = weather.sunset;
                const sunrise = weather.sunrise;

                if (timestamp > (sunset - tenMinutes) && timestamp < (sunset + tenMinutes)) {
                    return '#D53047';
                }

                if (timestamp > (sunrise - tenMinutes) && timestamp < (sunrise + tenMinutes)) {
                    return '#FF9456';
                }

                return '#90609F';
            })(),
        },
        {
            code: 801,
            name: 'Clouds',
            description: 'Few clouds',
            description2: '',
            iconDay: '02d',
            iconNight: '02n',
            gradientColorStartDay: '#5795B3',
            gradientColorEndDay: '#85A7C3',
            gradientColorStartNight: '#5795B3',
            gradientColorEndNight: '#85A7C3',
        },
        {
            code: 802,
            name: 'Clouds',
            description: 'Scattered clouds',
            description2: '',
            iconDay: '03d',
            iconNight: '03d',
            gradientColorStartDay: '#5795B3',
            gradientColorEndDay: '#85A7C3',
            gradientColorStartNight: '#5795B3',
            gradientColorEndNight: '#85A7C3',
        },
        {
            code: 803,
            name: 'Clouds',
            description: 'Broken clouds',
            description2: '',
            iconDay: '04d',
            iconNight: '04d',
            gradientColorStartDay: '#5795B3',
            gradientColorEndDay: '#85A7C3',
            gradientColorStartNight: '#5795B3',
            gradientColorEndNight: '#85A7C3',
        },
        {
            code: 804,
            name: 'Clouds',
            description: 'Overcast clouds',
            description2: 'Clouds, clouds, everywhere...',
            iconDay: '04d',
            iconNight: '04d',
            gradientColorStartDay: '#414650',
            gradientColorEndDay: '#909090',
            gradientColorStartNight: '#414650',
            gradientColorEndNight: '#909090',
        },
    ];

    const condition = conditions.find((itm: any) => itm.code === weather.weatherCondition.id);
    // const condition = conditions.find((itm: any) => itm.code === 702);

    let data;

    if (!condition) {
        data = {
            name: 'N/A',
            description: '',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1 1"></svg>`,
            gradientColorStart: '#52A5DA',
            gradientColorEnd: '#72BAE0',
        };
    } else {
        let gradientColorStart, gradientColorEnd, icon, now;
        now = moment.now() / 1000;

        if(now > weather.sunrise && now < weather.sunset) {
            gradientColorStart = condition.gradientColorStartDay;
            gradientColorEnd = condition.gradientColorEndDay;
            icon = WeatherIcons(condition.iconDay);
        } else {
            gradientColorStart = condition.gradientColorStartNight;
            gradientColorEnd = condition.gradientColorEndNight;
            icon = WeatherIcons(condition.iconNight);
        }

        // icon = WeatherIcons(condition.iconNight);

        data = {
            name: condition.name,
            description: condition.description2.length > 0 ? condition.description2 : condition.description,
            icon: icon.xml,
            gradientColorStart: gradientColorStart,
            gradientColorEnd: gradientColorEnd,
        };
    }

    return data;

    // Rain: {
    //     color: '#005BEA',
    //     title: 'Raining',
    //     subtitle: 'Get a cup of coffee',
    //     icon: 'weather-rainy',
    // },
    // Clear: {
    //     color: '#f7b733',
    //     title: 'Sunny',
    //     subtitle: 'It is hurting my eyes',
    //     icon: 'weather-sunny',
    // },
    // Thunderstorm: {
    //     color: '#616161',
    //     title: 'A Storm is coming',
    //     subtitle: 'Because Gods are angry',
    //     icon: 'weather-lightning',
    // },
    // Clouds: {
    //     color: '#1F1C2C',
    //     title: 'Облаци',
    //     subtitle: 'Облаци навсякъде',
    //     icon: 'weather-cloudy',
    // },
    //
    // Snow: {
    //     color: '#00d2ff',
    //     title: 'Snow',
    //     subtitle: 'Get out and build a snowman for me',
    //     icon: 'weather-snowy',
    // },
    // Drizzle: {
    //     color: '#076585',
    //     title: 'Drizzle',
    //     subtitle: 'Partially raining...',
    //     icon: 'weather-hail',
    // },
    // Haze: {
    //     color: '#66A6FF',
    //     title: 'Haze',
    //     subtitle: 'Another name for Partial Raining',
    //     icon: 'weather-hail',
    // },
    // Mist: {
    //     color: '#3CD3AD',
    //     title: 'Mist',
    //     subtitle: 'Don\'t roam in forests!',
    //     icon: 'weather-fog',
    // },
};
