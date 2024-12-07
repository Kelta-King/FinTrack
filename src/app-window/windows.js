const WINDOW_MANAGER = require("./windowManager");
const { app, BrowserWindow } = require("electron");
const CONFIG = require("../configuration/config");
const LOGGER = require("../Logger/logger");

function startMainWindow() {
    const URL = "http://" + CONFIG.HOST + ":" + CONFIG.PORT + "/"; // App server's URL
    WINDOW_MANAGER.loadWindow(app, CONFIG.WINDOW_HEIGHT, CONFIG.WINDOW_WIDTH, URL);
}

function startWindows() {
    app.on("ready", () => {
        LOGGER.info("App is ready. Starting Main Window...");
        startMainWindow();
    });

    app.on('before-quit', () => {
        LOGGER.info("Closing application...");
    });
    
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            startMainWindow();
        }
    });
}

module.exports = {
    startWindows
};