const request = require('postman-request');
const config = require("./config");

const geocode = (address, callback) => {
    const key = config.geocodeApiKey;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${key}`

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another serach.', undefined);
        } else {

            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;

            callback(undefined, {
                latitude,
                longitude, 
                location
            });
        }
    })
}

module.exports = geocode;