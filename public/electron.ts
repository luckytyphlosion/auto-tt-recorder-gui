//
//Object.defineProperty(process, 'stdout', {
//  configurable: true,
//  enumerable: true,
//  get: () => require('fs').createWriteStream('stdout'),
//});
//
//Object.defineProperty(process, 'stderr', {
//  configurable: true,
//  enumerable: true,
//  get: () => require('fs').createWriteStream('stderr')
//});
//
//const Console = global.console.Console;
//var console = global.console = new Console(process.stdout, process.stderr);
//console.log("console");

import { IpcMainInvokeEvent } from "electron";

const path = require("path");
const { dialog, ipcMain, app, BrowserWindow } = require("electron");

const isDev = require("electron-is-dev");

const contextMenu = require("electron-context-menu");

contextMenu({showInspectElement: true});

interface FileFilter {
  name: string;
  extensions: string[];
}

interface OpenDialogResponse {
  canceled: boolean;
  filePaths: string[];
  bookmarks?: string[];
}

interface SaveDialogResponse {
  canceled: boolean;
  filePath?: string;
  bookmarks?: string[];
}

type OpenDialogProperties = ("openFile" | "openDirectory" | "multiSelections" | "showHiddenFiles" | "createDirectory" | "promptToCreate" | "noResolveAliases" | "treatPackageAsDirectory" | "dontAddToRecent")[];
type SaveDialogProperties = ("showHiddenFiles" | "createDirectory" | "treatPackageAsDirectory" | "dontAddToRecent" | "showOverwriteConfirmation")[];

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    },
  });
  ipcMain.handle("open-file-dialog", async function (event: IpcMainInvokeEvent, fileFilters: FileFilter[]) {
    console.log("open-file-dialog fileFilters:", fileFilters);
    let dialogProperties: OpenDialogProperties = ["openFile"];
    let response = await dialog.showOpenDialog({
      properties: dialogProperties,
      filters: fileFilters
    });
    if (!response.canceled) {
      console.log(response.filePaths[0]);
      return response.filePaths[0];
    } else {
      return "";
    }
  });

  ipcMain.handle("save-file-dialog", async function (event: IpcMainInvokeEvent, fileFilters: FileFilter[]) {
    let dialogProperties: SaveDialogProperties = [];
    let response = await dialog.showSaveDialog({
      properties: dialogProperties,
      filters: fileFilters
    });
    if (!response.canceled) {
      return response.filePath;
    } else {
      return "";
    }
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  await win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
    console.log("opened dev tools");
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

//app.on("ready", () => {
//  BrowserWindow.getFocusedWindow().webContents.openDevTools();
//});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

