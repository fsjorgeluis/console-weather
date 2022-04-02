const axios = require('axios');

class Searches {

    history = ['Madrid', 'Nueva Esparta', 'Ottawa', 'Newark'];

    constructor() {
        // TODO: read data from db
    }

    get mapBoxParams() {
        return {
            'access_token': '',
            'limit': 5,
            'language': 'en'
        }
    }

    async city(place = '') {
        
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.mapBoxParams
            });

            const response = await instance.get();

            console.log(response.data);
            return [];    
        } catch (error) {
            return [];
        }
    }
}

module.exports = Searches;