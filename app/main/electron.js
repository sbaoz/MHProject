"use strict";
const path = require('path');
const { app, BrowserWindow } = require('electron');
function isDev() {
    return process.env.NODE_ENV === 'development';
}
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1255,
        webPreferences: {
            devTools: true,
            webSecurity: true,
            nodeIntegration: true
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://127.0.0.1:6001');
    }
    else {
        mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    }
}
app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
//# sourceMappingURL=electron.js.map