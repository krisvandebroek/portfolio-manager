const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addFund: (data) => ipcRenderer.send('add-fund', data),
  getFunds: () => ipcRenderer.invoke('get-funds'),
  refreshPrices: () => ipcRenderer.send('refresh-prices')
});

// Polyfill for File object
global.File = class File {
  constructor(parts, filename, options = {}) {
    this.parts = parts;
    this.filename = filename;
    this.options = options;
    this.lastModified = options.lastModified || Date.now();
    this.size = parts.reduce((size, part) => size + part.length, 0);
    this.type = options.type || '';
  }
};
