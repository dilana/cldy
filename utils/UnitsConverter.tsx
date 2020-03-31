export const DegreesConverter = (degree: number, celsius: boolean = true) => {
    if (celsius) {
        return Math.round(degree);
    }

    return Math.round(degree * (9 / 5) + 32);
};

export const SpeedConverter = (speed: number, km: boolean = true) => {
    if (km) {
        return Math.round(speed);
    }

    return Math.round(speed / 1.609344);
};

export const PressureConverter = (pressure: number, hpa: boolean = true) => {
    if (hpa) {
        return Math.round(pressure);
    }

    return Math.round(pressure * 0.03);
};
