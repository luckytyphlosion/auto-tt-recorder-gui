
const { contextBridge, ipcRenderer } = window.require("electron");

contextBridge.exposeInMainWorld("api", {
  openFileDialog: (fileFilters) => ipcRenderer.invoke("open-file-dialog", fileFilters),
  saveFileDialog: (fileFilters) => ipcRenderer.invoke("save-file-dialog", fileFilters)
});

