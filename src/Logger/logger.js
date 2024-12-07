var log4js = require("log4js");
const CONFIG = require("../configuration/config");

const LOGGING_LEVELS = {
    DEBUG: "debug",
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
    FATAL: "fatal"
}

class Logger {
    constructor(level = LOGGING_LEVELS.INFO) {
        log4js.configure({
            appenders: {
                file: {
                    type: 'file',
                    filename: CONFIG.LOGFILE_PATH,
                    maxLogSize: CONFIG.MAX_LOGFILE_SIZE,
                    backups: CONFIG.MAX_LOGFILE_BACKUP,
                    compress: true
                },
                console: { type: 'console' }
            },
            categories: {
                default: { appenders: ['file', 'console'], level: LOGGING_LEVELS.INFO }
            }
        });
        this._logger = log4js.getLogger(CONFIG.APP_NAME);
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

    if (CONFIG.LOGGING_LEVEL) {
        logging_level = CONFIG.LOGGING_LEVEL;
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

    if (!validLoggerType) {
        throw new Error(`Invalid logging level: ${logging_level}. Please use one of the following: ${Object.values(LOGGING_LEVELS).join(", ")}`);
    }

    const LOGGER = new Logger(logging_level);

    return LOGGER;
}

module.exports = getLogger();