
interface FileFilter {
  name: string;
  extensions: string[];
}

const { contextBridge, ipcRenderer } = window.require("electron");

contextBridge.exposeInMainWorld("api", {
  openFileDialog: (fileFilters: FileFilter[]) => ipcRenderer.invoke("open-file-dialog", fileFilters)
  // we can also expose variables, not just functions
});

