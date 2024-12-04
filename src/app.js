const LOGGER = require("../Logger/logger");
const { startServer } = require("./app-core/server");
const { startWindows } = require("./app-window/windows");

function application() {
    LOGGER.info("Starting application...");
    startServer();
    startWindows();
}

module.exports = application;