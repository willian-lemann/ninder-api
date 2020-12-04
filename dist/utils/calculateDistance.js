"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deg2Rad = (deg) => {
    return deg * (Math.PI / 180);
};
const GetDistanceFromLatLonInKm = (centerCoordinates, pointCoordinates) => {
    const radius = 6371;
    const { latitude: firstLatitude, longitude: firstLongitude } = centerCoordinates;
    const { latitude: secondLatitude, longitude: secondLongitude } = pointCoordinates;
    const latitudeDistance = Deg2Rad(secondLatitude - firstLatitude);
    const longitudeDistance = Deg2Rad(secondLongitude - firstLongitude);
    const calculatedNumber = Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
        Math.cos(Deg2Rad(firstLatitude)) *
            Math.cos(Deg2Rad(secondLatitude)) *
            Math.sin(longitudeDistance / 2) *
            Math.sin(longitudeDistance / 2);
    const center = 2 * Math.atan2(Math.sqrt(calculatedNumber), Math.sqrt(1 - calculatedNumber));
    const distance = radius * center;
    return distance;
};
exports.default = GetDistanceFromLatLonInKm;
