const { contextBridge, ipcRenderer } = window.require("electron");

contextBridge.exposeInMainWorld("api", {
  openFileDialog: () => ipcRenderer.invoke("open-file-dialog")
  // we can also expose variables, not just functions
});

