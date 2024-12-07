function getEnvConfig() {
    const { parsed } = require('dotenv').config();
    return parsed;
}

function getDevelopmentConfig() {
    const config = {
        PORT: 3000,
        HOST: "localhost",
        LOGGING_LEVEL: "debug",
        LOGFILE_PATH: "logs/app.log", 
        MAX_LOGFILE_SIZE: 10485760, // 10 MB
        MAX_LOGFILE_BACKUP: 3,
        WINDOW_WIDTH: 800,
        WINDOW_HEIGHT: 600,
        APP_NAME: "FinTrack",
        APP_VERSION: "1.0.0",
    }
    return config;
}

function getProductionConfig() {
    const config = {
        PORT: 3000,
        HOST: "localhost",
        LOGGING_LEVEL: "info",
        LOGFILE_PATH: "logs/app.log", 
        MAX_LOGFILE_SIZE: 10485760, // 10 MB
        MAX_LOGFILE_BACKUP: 3,
        WINDOW_WIDTH: 800,
        WINDOW_HEIGHT: 600,
        APP_NAME: "FinTrack",
        APP_VERSION: "1.0.0",
    }
    return config;
}

function getConfig() {
    if(process.env.NODE_ENV === 'production') {
        return getProductionConfig();
    }
    else {
        return getDevelopmentConfig();
    }
}

module.exports = getConfig();