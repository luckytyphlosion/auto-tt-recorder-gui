
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  openFileDialog: (fileFilters, lastFilename, dialogId) => ipcRenderer.invoke("open-file-dialog", fileFilters, lastFilename, dialogId),
  openFolderDialog: (lastFolderName, dialogId) => ipcRenderer.invoke("open-folder-dialog", lastFolderName, dialogId),
  openFileDialogAndRead: (fileFilters, lastFilename, dialogId) => ipcRenderer.invoke("open-file-dialog-and-read", fileFilters, lastFilename, dialogId),
  saveFileDialog: (fileFilters, lastFilename, dialogId) => ipcRenderer.invoke("save-file-dialog", fileFilters, lastFilename, dialogId),
  saveFileDialogAndWriteText: (fileFilters, output, lastFilename, dialogId) => ipcRenderer.invoke("save-file-dialog-and-write-text", fileFilters, output, lastFilename, dialogId),
  overwriteTextFile: (outputFilename, output) => ipcRenderer.invoke("overwrite-text-file", outputFilename, output),
  isFileReadable: (filename) => ipcRenderer.invoke("is-file-readable", filename),
  isFileWritable: (filename) => ipcRenderer.invoke("is-file-writable", filename),
  spawnAutoTTRec: (templateFilename, autoTTRecArgs) => ipcRenderer.invoke("spawn-auto-tt-rec", templateFilename, autoTTRecArgs),
  waitAutoTTRec: () => ipcRenderer.invoke("wait-auto-tt-rec"),
  handleSendStdout: (callable) => ipcRenderer.on("send-stdout", callable),
  handleSendStderr: (callable) => ipcRenderer.on("send-stderr", callable),
  removeHandleSendStdout: (callable) => ipcRenderer.removeAllListeners("send-stdout"),
  removeHandleSendStderr: (callable) => ipcRenderer.removeAllListeners("send-stderr"),
  terminateAutoTTRec: () => ipcRenderer.invoke("terminate-auto-tt-rec"),
  getGlobalConfig: () => ipcRenderer.invoke("get-global-config"),
  importFormTemplate: (filename) => ipcRenderer.invoke("import-form-template", filename),
  convertAutoTTRecConfigToFormData: (autoTTRecConfig) => ipcRenderer.invoke("convert-auto-tt-rec-config-to-form-data", autoTTRecConfig)
});
