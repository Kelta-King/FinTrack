const LOGGER = require("./Logger/logger")
const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    
    // win.loadFile("./View/build/index.html");
    win.loadURL("http://localhost:3000/dashboard");
};

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

function application(CONFIG) {
    if(CONFIG === undefined) {
        LOGGER.error("Configuration is required for the application.");
        return;
    }
}

module.exports = application;