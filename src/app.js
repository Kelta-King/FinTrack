const LOGGER = require("../Logger/logger");
const loadWindow = require("./app-window/electronWindow");

function application(CONFIG) {
    if(CONFIG === undefined) {
        LOGGER.error("Configuration is required for the application.");
        return;
    }

    LOGGER.info("Starting application...");
    const url = "http://" + host + ":" + port + "/"; // App server's URL
    loadWindow(CONFIG.WINDOW_HEIGHT, CONFIG.WINDOW_WIDTH, url);
}

module.exports = application;