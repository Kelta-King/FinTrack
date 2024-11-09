const LOGGER = require("../Logger/logger");
const { startServer } = require("./app-core/server");
const { startWindows } = require("./app-window/windows");
const CONFIG = require("./configuration/config");

function application() {
    if(CONFIG === undefined) {
        LOGGER.error("Configuration is required for the application.");
        return;
    }
    LOGGER.debug("Starting application...");
    startServer();
    startWindows();
}

module.exports = application;