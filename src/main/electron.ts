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

import { dialog, ipcMain, app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import fsPromises from "fs/promises";

//if (require("electron-squirrel-startup")) {
//  app.quit();
//  process.exit(0);
//}

import { IpcMainInvokeEvent, FileFilter } from "electron";
import { Readable, Transform, TransformCallback } from "stream";

import { Config, loadGlobalConfig, globalConfig } from "./confighandler";
import * as versions from "../versions";
import * as autoTTRecBridge from "./auto-tt-rec-bridge";
import * as gui2 from "./gui2";
import * as confighandler from "./confighandler";

import fs from "fs";

import path from "path";

import contextMenu from "electron-context-menu";

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  contextMenu({showInspectElement: true});
}

export let mainWindow: BrowserWindow;

/*
put dolphin-folder in <..>/Roaming/Auto-TT-Recorder GUI/auto-tt-recorder-gui-working/dolphin
put storage-folder in <..>/Roaming/Auto-TT-Recorder GUI/auto-tt-recorder-gui-working/storage
put temp-folder in <..>/Roaming/Auto-TT-Recorder GUI/auto-tt-recorder-gui-working/temp
wiimm folder stays where it is

*/

async function copyDirectoryRecursively(fromDir: string, toDir: string) {
  await fsPromises.mkdir(toDir, {recursive: true});
  let dirContents: string[] = await fsPromises.readdir(fromDir);
  await Promise.all(dirContents.map(async (file: string) => {
    let fromFileFullPath: string = path.resolve(fromDir, file);
    let toFileFullPath: string = path.resolve(toDir, file);
    if ((await fsPromises.lstat(fromFileFullPath)).isFile()) {
      await fsPromises.copyFile(fromFileFullPath, toFileFullPath);
    } else {
      await copyDirectoryRecursively(fromFileFullPath, toFileFullPath);
    }
  }));
}

async function updateAutoTTRecDirectories() {
  // copy over dolphin directory elsewhere
  // electron-builder auto-update will remove all install files
  // but we want to keep dolphin configs

  // only copy over dolphin directory
  // if the dolphin version was updated or the directory doesn't exist
  if (globalConfig.options.dolphinVersion !== versions.DOLPHIN_VERSION || !fs.existsSync(globalConfig.dolphinPath)) {
    await fsPromises.mkdir(globalConfig.dolphinPath, {recursive: true});
    const workingDolphinDir = await fsPromises.opendir(globalConfig.dolphinPath);

    for await (const dirent of workingDolphinDir) {
      if (!(dirent.isDirectory() && dirent.name === "User")) {
        
        let dolphinItemPath: string = path.resolve(globalConfig.dolphinPath, dirent.name);
        console.log("dirent.name:", dirent.name);
        console.log("dolphinItemPath", dolphinItemPath);
        await fsPromises.rm(dolphinItemPath, {force: false, recursive: true});
      }
    }

    let savedDolphinPath = path.resolve(__dirname, "../..", versions.AUTO_TT_RECORDER_FOLDER_NAME, "dolphin");
    console.log("savedDolphinPath:", savedDolphinPath);

    await copyDirectoryRecursively(savedDolphinPath, globalConfig.dolphinPath);
  }

  await fsPromises.mkdir(globalConfig.tempPath, {recursive: true});
  globalConfig.updateVersions();  
}

async function createWindow() {
  loadGlobalConfig(app, "Auto-TT-Recorder GUI");

  await updateAutoTTRecDirectories();

  let dolphinPathForwardSlashes = globalConfig.dolphinPath.replaceAll("\\", "/");
  console.log("dolphinPathForwardSlashes:", dolphinPathForwardSlashes);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    },
  });
  ipcMain.handle("open-file-dialog", gui2.openFileDialog);
  ipcMain.handle("save-file-dialog", gui2.saveFileDialog);

  ipcMain.handle("spawn-auto-tt-rec", autoTTRecBridge.spawnAutoTTRec);
  ipcMain.handle("wait-auto-tt-rec", autoTTRecBridge.waitAutoTTRec);
  ipcMain.handle("terminate-auto-tt-rec", autoTTRecBridge.terminateAutoTTRec);

  ipcMain.handle("get-global-config", confighandler.getGlobalConfig);
  // and load the index.html of the app.
  // win.loadFile("index.html");
  console.log("isDev:", isDev);
  await mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../renderer/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    console.log("opened dev tools");
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  autoUpdater.checkForUpdates();
  createWindow();
});

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

