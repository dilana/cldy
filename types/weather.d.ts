declare interface WeatherInterface {
    query: string,
    updatedAt: any,
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
    forecast?: Array<{
        code: number,
        day: string,
        tempMax: number,
        tempMin: number,
    }>
}
