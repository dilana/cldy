import { WeatherIcons } from './WeatherIcons';

export const ForecastIcons = (code: string) => {
    let icon = icons.find((itm: any) => itm.code === code);

    if(!icon) {
        return {
            code: code,
            xml: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1 1"></svg>`,
        };
    }

    return WeatherIcons(icon.icon);
};

const icons = [
    {
        code: 200,
        icon: '11dr'
    },
    {
        code: 201,
        icon: '11dr'
    },
    {
        code: 202,
        icon: '11dr'
    },
    {
        code: 210,
        icon: '11d'
    },
    {
        code: 211,
        icon: '11d'
    },
    {
        code: 212,
        icon: '11d'
    },
    {
        code: 221,
        icon: '11d'
    },
    {
        code: 230,
        icon: '11dr'
    },
    {
        code: 231,
        icon: '11dr'
    },
    {
        code: 232,
        icon: '11dr'
    },
    {
        code: 300,
        icon: '09d1'
    },
    {
        code: 301,
        icon: '09d1'
    },
    {
        code: 302,
        icon: '09d1'
    },
    {
        code: 310,
        icon: '09d2'
    },
    {
        code: 311,
        icon: '09d2'
    },
    {
        code: 312,
        icon: '09d2'
    },
    {
        code: 313,
        icon: '09d3'
    },
    {
        code: 314,
        icon: '09d3'
    },
    {
        code: 321,
        icon: '09d3'
    },
    {
        code: 500,
        icon: '10d1'
    },
    {
        code: 501,
        icon: '10d2'
    },
    {
        code: 503,
        icon: '10d3'
    },
    {
        code: 504,
        icon: '10d3'
    },
    {
        code: 511,
        icon: '10d4'
    },
    {
        code: 520,
        icon: '09d1'
    },
    {
        code: 521,
        icon: '09d2'
    },
    {
        code: 522,
        icon: '09d3'
    },
    {
        code: 531,
        icon: '09d3'
    },
    {
        code: 600,
        icon: '13d'
    },
    {
        code: 601,
        icon: '13d'
    },
    {
        code: 602,
        icon: '13d'
    },
    {
        code: 611,
        icon: '13d'
    },
    {
        code: 612,
        icon: '13d'
    },
    {
        code: 613,
        icon: '13d'
    },
    {
        code: 615,
        icon: '13d'
    },
    {
        code: 616,
        icon: '13d'
    },
    {
        code: 620,
        icon: '13d'
    },
    {
        code: 621,
        icon: '13d'
    },
    {
        code: 622,
        icon: '13d'
    },
    {
        code: 701,
        icon: '50d'
    },
    {
        code: 711,
        icon: '50d'
    },
    {
        code: 721,
        icon: '50d'
    },
    {
        code: 731,
        icon: '50d3'
    },
    {
        code: 741,
        icon: '50d'
    },
    {
        code: 751,
        icon: '50d'
    },
    {
        code: 761,
        icon: '50d'
    },
    {
        code: 762,
        icon: '50d'
    },
    {
        code: 771,
        icon: '50d3'
    },
    {
        code: 781,
        icon: '50d2'
    },
    {
        code: 800,
        icon: '01d'
    },
    {
        code: 801,
        icon: '02d'
    },
    {
        code: 802,
        icon: '03d'
    },
    {
        code: 803,
        icon: '04d'
    },
    {
        code: 804,
        icon: '04d'
    },
];
