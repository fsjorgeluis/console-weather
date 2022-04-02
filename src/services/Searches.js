const axios = require('axios');

class Searches {

    history = ['Madrid', 'Nueva Esparta', 'Ottawa', 'Newark'];

    constructor() {
        // TODO: read data from db
    }

    get mapBoxParams() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en'
        }
    }

    get openWeatherParams() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }

    async city(place = '') {
        
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.mapBoxParams
            });

            const { data } = await instance.get();

            return data.features.map(city => ({
                id: city.id,
                place: city.place_name,
                longitude: city.center[0],
                latitude: city.center[1]
            }))

        } catch (error) {
            return [];
        }
    }

    async weather(lat = 0, lon = 0) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                   ...this.openWeatherParams,
                   lat,
                   lon 
                }
            })

            const { data: { weather, main } } = await instance.get();

            return {
                description: weather[0].description,
                temp: main.temp,
                minTemp: main.temp_min,
                maxTemp: main.temp_max,
                humidity: main.humidity,
                feelsLike: main.feels_like
            }
        } catch (error) {
            return [];
        }
    }
}

module.exports = Searches;