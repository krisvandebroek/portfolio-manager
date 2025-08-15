const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addFund: (data) => ipcRenderer.send('add-fund', data),
  getFunds: () => ipcRenderer.invoke('get-funds'),
  addTransaction: (data) => ipcRenderer.send('add-transaction', data)
});
