require('dotenv').config();

const config = {
    weatherStackApiKey: process.env.WEATHER_STACK_API_KEY,
    geocodeApiKey: process.env.GEOCODE_API_KEY
}

module.exports = config;