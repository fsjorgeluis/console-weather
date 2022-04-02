require('dotenv').config();
require("colors");

const { inquirerMenu, pauseMenu, readInput, checkPlaces } = require("./libs/inquirer");
const Searches = require("./services/Searches");


const main = async () => {
    let opt;

    const searches = new Searches();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // show message
                const place = await readInput('City: ');
                // search places
                const cities = await searches.city(place);
                // select city
                const id = await checkPlaces(cities);
                if (id === 0) continue;

                const selection = cities.find(c => c.id === id);
                // save to history
                searches.createHistory(selection.place);
                // get weather info
                const weather = await searches.weather(selection.longitude, selection.latitude)

                // show results
                console.clear();
                console.log('\nCity information\n'.green);
                console.log('City:', selection.place.green);
                console.log('Latitude:', selection.longitude);
                console.log('Longitude:', selection.latitude);
                console.log('Temperature:', weather.temp);
                console.log('Min Temp:', weather.minTemp);
                console.log('Max Temp:', weather.maxTemp);
                console.log('Humidity:', weather.humidity);
                console.log('Feels Like:', weather.feelsLike);
                console.log('Weather description:', weather.description.green);

                break;
    
            case 2:
                searches.historyCapitalized.forEach((city, index) => {
                    console.log(`${index + 1}.`.green, city)
                })

                break;
        
            case 0:
                console.log('Good Bye!')

                break;
            
        }

        if (opt !== 0) await pauseMenu();

    } while (opt !== 0);

};

main();