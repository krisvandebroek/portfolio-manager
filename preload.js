const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addFund: (data) => ipcRenderer.send('add-fund', data)
});
