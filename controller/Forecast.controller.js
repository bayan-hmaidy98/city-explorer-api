const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_URL;
const axios = require('axios');
const Weather = require('../weather')

const getWeather = async (req, res) => {
    const { lon, lat } = req.query;
    const queryParameters = {
        query: {
            key: WEATHERBIT_KEY,
            lon: lon,
            lat: lat,
        }
    }
    const weather = await axios.get(WEATHERBIT_URL, queryParameters);
    const weatherDataArr = weather.data.map(item =>

        new Weather(item));
    res.send(weatherDataArr);
};

module.exports = getWeather;