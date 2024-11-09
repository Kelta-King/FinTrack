const { parsed } = require('dotenv').config();
const application = require("./src/app");
const LOGGER = require("./Logger/logger");
const CONFIG = parsed;

function main() {
    try {
        application(CONFIG);   
    } 
    catch (error) {
        LOGGER.error("Error in application: ", error);
    }
}

main();