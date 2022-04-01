const { inquirerMenu, pauseMenu } = require("./libs/inquirer");
require("colors")

const main = async () => {
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                console.log(opt)
                break;
    
            case 2:
                console.log(opt)
                break;
        
            case 0:
                console.log(opt)
                break;
            
        }

        if (opt !== 0) await pauseMenu();

    } while (opt !== 0);

};

main();