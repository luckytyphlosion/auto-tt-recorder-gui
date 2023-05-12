
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  openFileDialog: (fileFilters) => ipcRenderer.invoke("open-file-dialog", fileFilters),
  saveFileDialog: (fileFilters) => ipcRenderer.invoke("save-file-dialog", fileFilters),
  spawnAutoTTRec: (templateFilename, autoTTRecArgs) => ipcRenderer.invoke("spawn-auto-tt-rec", templateFilename, autoTTRecArgs),
  waitAutoTTRec: () => ipcRenderer.invoke("wait-auto-tt-rec"),
  handleSendStdout: (callable) => ipcRenderer.on("send-stdout", callable),
  handleSendStderr: (callable) => ipcRenderer.on("send-stderr", callable),
  removeHandleSendStdout: (callable) => ipcRenderer.removeAllListeners("send-stdout"),
  removeHandleSendStderr: (callable) => ipcRenderer.removeAllListeners("send-stderr"),
  terminateAutoTTRec: () => ipcRenderer.invoke("terminate-auto-tt-rec"),
  getGlobalConfig: () => ipcRenderer.invoke("get-global-config")
});
