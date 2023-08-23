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

import { dialog, shell, ipcMain, app, BrowserWindow, HandlerDetails } from "electron";
import { autoUpdater, UpdateCheckResult, UpdateInfo } from "electron-updater";
import fsPromises from "fs/promises";

//if (require("electron-squirrel-startup")) {
//  app.quit();
//  process.exit(0);
//}

import { IpcMainInvokeEvent, FileFilter } from "electron";
import { Readable, Transform, TransformCallback } from "stream";

import { Config, loadGlobalConfig, globalConfig } from "./confighandler";
import * as versions from "../shared/versions";
import * as autoTTRecBridge from "./auto-tt-rec-bridge";
import * as gui2 from "./gui2";
import * as confighandler from "./confighandler";
import * as formTemplate from "./form-template";

import fs from "fs";

import path from "path";

import contextMenu from "electron-context-menu";

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  contextMenu({showInspectElement: true});
}

export let mainWindow: BrowserWindow;
let mainWindowCreated: boolean = false;

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
  if (mainWindowCreated) {
    console.log("Main window already created!");
    return;
  }

  mainWindowCreated = true;
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
  ipcMain.handle("read-file-enforce-utf8", gui2.ipcReadFileEnforceUTF8);
  ipcMain.handle("get-absolute-path-relative-to-filename", gui2.getAbsolutePathRelativeToFilename);
  ipcMain.handle("open-file-dialog", gui2.openFileDialog);
  ipcMain.handle("open-folder-dialog", gui2.openFolderDialog);
  ipcMain.handle("open-file-dialog-and-read", gui2.openFileDialogAndRead);
  ipcMain.handle("save-file-dialog", gui2.saveFileDialog);
  ipcMain.handle("save-file-dialog-and-write-text", gui2.saveFileDialogAndWriteText);
  ipcMain.handle("overwrite-text-file", gui2.overwriteTextFile);
  ipcMain.handle("is-file-readable", gui2.isFileReadable);
  ipcMain.handle("is-file-readable-and-has-correct-extension", gui2.isFileReadableAndHasCorrectExtension_alsoGetExtension);
  ipcMain.handle("is-file-writable", gui2.isFileWritable_alsoGetExtension);

  ipcMain.handle("spawn-auto-tt-rec", autoTTRecBridge.spawnAutoTTRec);
  ipcMain.handle("wait-auto-tt-rec", autoTTRecBridge.waitAutoTTRec);
  ipcMain.handle("terminate-auto-tt-rec", autoTTRecBridge.terminateAutoTTRec);

  ipcMain.handle("get-global-config", confighandler.getGlobalConfig);

  ipcMain.handle("import-form-template", formTemplate.importFormTemplate);
  ipcMain.handle("write-object-to-yaml", formTemplate.writeObjectToYAML);
  ipcMain.handle("get-load-form-inputs-type", confighandler.getLoadFormInputsType);
  ipcMain.handle("save-load-form-inputs-type", confighandler.saveLoadFormInputsType);
  ipcMain.handle("get-last-recorded-template-filename", confighandler.getLastRecordedTemplateFilename);
  ipcMain.handle("get-last-opened-template-filename", confighandler.getLastOpenedTemplateFilename);
  ipcMain.handle("get-expand-unselected-choice-inputs", confighandler.getExpandUnselectedChoiceInputs);
  ipcMain.handle("set-and-save-expand-unselected-choice-inputs", confighandler.setAndSaveExpandUnselectedChoiceInputs);
  ipcMain.handle("get-validate-form-on-open", confighandler.getValidateFormOnOpen);
  ipcMain.handle("set-and-save-validate-form-on-open", confighandler.setAndSaveValidateFormOnOpen);

  // and load the index.html of the app.
  // win.loadFile("index.html");
  console.log("isDev:", isDev);
  await mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../renderer/index.html')}`
  );

  // mainWindow.webContents.setWindowOpenHandler((details: HandlerDetails) => {
  //   shell.openExternal(details.url);
  //   return {action: "deny"};
  // });
  mainWindow.webContents.on("will-navigate", (details: Electron.Event, url: string) => {
    shell.openExternal(url);
    //console.log("will-navigate details:", details);
    details.preventDefault();
  });

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    console.log("opened dev tools");
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  let updateCheckResult: UpdateCheckResult | null = await autoUpdater.checkForUpdates();
  if (updateCheckResult === null) {
    console.log("updateCheckResult is", updateCheckResult);
    createWindow();
  } else {
    console.log("updateCheckResult:", updateCheckResult);
  }
});

autoUpdater.on("update-not-available", (info) => {
  console.log("update-not-available");
  createWindow();
});

autoUpdater.on("error", (error: Error) => {
  console.log("update error");
  createWindow();
});

autoUpdater.on("update-downloaded", (info: UpdateInfo) => {
  autoUpdater.quitAndInstall(false, true);
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

/*
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
*/
