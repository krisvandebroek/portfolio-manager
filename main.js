const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initializeDatabase, addFund, getAllFunds, addTransaction } = require('./database.js');
const { getConfig } = require('./config.js');

function createWindow() {
  const config = getConfig();
  const mainWindow = new BrowserWindow({
    width: config.window.width,
    height: config.window.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  initializeDatabase();
  createWindow();

  ipcMain.on('add-fund', (event, fundData) => {
    addFund(fundData);
    console.log('Fund added successfully:', fundData);
  });

  ipcMain.handle('get-funds', async () => {
    return getAllFunds();
  });

  ipcMain.on('add-transaction', (event, transactionData) => {
    addTransaction(transactionData);
    console.log('Transaction added successfully:', transactionData);
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
