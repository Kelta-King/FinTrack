var log4js = require("log4js");
require('dotenv').config();

const LOGGING_LEVELS = {
    DEBUG: "debug",
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
    FATAL: "fatal"
}

class Logger {
    constructor(level = LOGGING_LEVELS.INFO) {
        this._logger = log4js.getLogger(process.env.APP_NAME);
        this._logger.level = level;
    }

    info(message) {
        this._logger.info(message);
    }

    error(message) {
        this._logger.error(message);
    }

    warn(message) {
        this._logger.warn(message);
    }

    debug(message) {
        this._logger.debug(message);
    }

    fatal(message) {
        this._logger.fatal(message);
    }
}

function getLogger() {
    var logging_level;

    if (process.env.LOGGING_LEVEL) {
        logging_level = process.env.LOGGING_LEVEL;
    }
    else {
        logging_level = LOGGING_LEVELS.INFO;
    }
    
    let validLoggerType = false;
    Object.keys(LOGGING_LEVELS).forEach((key) => {        
        if (logging_level === LOGGING_LEVELS[key]) {
            validLoggerType = true;
        }
    });

    if(!validLoggerType) {
        throw new Error(`Invalid logging level: ${logging_level}. Please use one of the following: ${Object.values(LOGGING_LEVELS).join(", ")}`);
    }

    const LOGGER = new Logger(logging_level);

    return LOGGER;
}

module.exports = getLogger();