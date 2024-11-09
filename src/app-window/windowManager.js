const { BrowserWindow } = require("electron");
const path = require("path");
const LOGGER = require("../../Logger/logger");

const createWindow = (height, width, url) => {
    LOGGER.debug("Creating window...");
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    LOGGER.debug("Loading User Interface...");
    win.loadURL(url);

    win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
        LOGGER.error(`Failed to load. URL: ${url}, ErrorCode: ${errorCode}, ErrorDescription: ${errorDescription}`);
    });

    win.on('closed', () => {
        LOGGER.fatal("Window closed");
    });
};

function loadWindow(app, height, width, url) {
    if(app === undefined) {
        LOGGER.error("Electron application must be specified");
        return;
    }
    if(height === undefined) {
        LOGGER.error("height must be specified");
        return;
    }
    
    if(width === undefined) {
        LOGGER.error("width must be specified");
        return;
    }

    if(url === undefined) {
        LOGGER.error("url must be specified");
        return;
    }
    
    app.whenReady().then(() => {
        createWindow(height, width, url);
    });
}

module.exports = {
    loadWindow
};