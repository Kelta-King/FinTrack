const LOGGER = require("../../Logger/logger");
const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = (height, width, url) => {
    LOGGER.info("Creating window...");
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    
    LOGGER.info("Loading User Interface...");
    win.loadURL(url);
};

function loadWindow(height, width, url) {
    app.whenReady().then(() => {
        createWindow(height, width, url);
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        })
    });
    
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

module.exports = loadWindow;