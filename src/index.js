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
                const selection = cities.find(c => c.id === id);
                
                
                // get weather info

                // show results
                console.log('\nCity information\n'.green);
                console.log('City:', selection.place);
                console.log('Latitude:', selection.longitude);
                console.log('Longitude:', selection.latitude);
                console.log('Temperature:',);
                console.log('Min Temp:',);
                console.log('Max Temp:',);

                break;
    
            case 2:
                console.log(searches.history);
                break;
        
            case 0:
                console.log(opt)
                break;
            
        }

        if (opt !== 0) await pauseMenu();

    } while (opt !== 0);

};

main();