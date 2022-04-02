require("colors")

const { inquirerMenu, pauseMenu, readInput } = require("./libs/inquirer");
const Searches = require("./services/Searches");


const main = async () => {
    let opt;

    const searches = new Searches();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // show message
                const city = await readInput('City: ');
                await searches.city(city);

                // search places

                // select city

                // get weather info

                // show results
                console.log('\nCity information\n'.green);
                console.log('City:',);
                console.log('Latitude:',);
                console.log('Longitude:',);
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