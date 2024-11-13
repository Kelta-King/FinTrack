const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const LOGGER = require("../../Logger/logger");

function logConsoleMessage(message, level = "0") {
    switch (level) {
        case "-1":
            LOGGER.debug(message);
            break;
        case "0":
            LOGGER.info(message);
            break;
        case "1":
            LOGGER.warn(message);
            break;
        case "2":
            LOGGER.error(message);
            break;
        case "3":
            LOGGER.fatal(message);
            break;

        // Add more cases as needed for different log levels
        default:
            LOGGER.info(message);
            break;
    }
}

function createWindow(height, width, url) {
    LOGGER.debug("Creating window...");
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, 
            enableRemoteModule: false, 
            nodeIntegration: false, 
            sandbox: true, 
        },
    });

    LOGGER.info("Loading User Interface...");
    win.loadURL(url);

    win.on('closed', () => {
        LOGGER.info("Window closed");
    });
};

function loadWindow(app, height, width, url) {
    if(app === undefined) {
        LOGGER.fatal("Electron application must be specified");
        return;
    }
    if(height === undefined) {
        LOGGER.fatal("height must be specified");
        return;
    }
    
    if(width === undefined) {
        LOGGER.fatal("width must be specified");
        return;
    }

    if(url === undefined) {
        LOGGER.fatal("url must be specified");
        return;
    }
    
    app.whenReady().then(() => {
        createWindow(height, width, url);
    });
}

module.exports = {
    loadWindow
};