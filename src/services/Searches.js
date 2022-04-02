const fs = require('fs');
const axios = require('axios');

class Searches {

    history = [];
    dbPath = 'src/data/database.json';

    constructor() {
        this.readFromDb();
    }

    get historyCapitalized() {
        return this.history.map(place => {
            return place.replace(/(\b[a-z])/g, (firstChar) => firstChar.toLocaleUpperCase());
        });
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
                latitude: city.center[1],
            }));

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
            });

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

    createHistory(place = '') {
        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }

        this.history = this.history.splice(0, 5);

        this.history.unshift(place.toLocaleLowerCase());

        this.saveToDb();
    }

    saveToDb() {
        const payload = {
            record: this.history,
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readFromDb() {
        if (fs.existsSync(this.dbPath)) {
            const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
            const data = JSON.parse(info);
            this.history = data.record;
        }

        return;
    }
}

module.exports = Searches;
