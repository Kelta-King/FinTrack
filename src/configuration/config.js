function getEnvConfig() {
    const { parsed } = require('dotenv').config();
    return parsed;
}

function getLocalConfig() {
    const config = {
        PORT: 3000,
        HOST: "localhost",
        LOGGING_LEVEL: "debug",
        WINDOW_WIDTH: 800,
        WINDOW_HEIGHT: 600,
        APP_NAME: "FinTrack",
        APP_VERSION: "1.0.0",
    }
    return config;
}

module.exports = getLocalConfig();