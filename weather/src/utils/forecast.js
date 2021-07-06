const request = require("postman-request");
const config = require("./config");

const forecast = (latitude, longitude, callback) => {
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        callback('Latitude and Longitude must be numbers. Please Try again.', undefined);
    } else {
        const key = config.weatherStackApiKey;
        const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}&units=f`

        request({ url: url, json: true }, (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather service.', undefined);
            } else if (body.error) {
                callback('Unable to find location.', undefined);
            } else {
                const temp = body.current.temperature;
                const humid = body.current.humidity;
                const feels_like = body.current.feelslike;
                const descriptions = body.current.weather_descriptions[0];

                const output = {
                    temp,
                    humid,
                    feels_like,
                    descriptions
                }

                callback(undefined, output);
            }
        })
    }
}

module.exports = forecast;