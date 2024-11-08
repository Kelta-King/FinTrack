const { parsed } = require('dotenv').config();
const application = require("./src/app");
const LOGGER = require("./Logger/logger");
const CONFIG = parsed;

function main() {
    LOGGER.info("Starting application");
    application(CONFIG);
}

main();