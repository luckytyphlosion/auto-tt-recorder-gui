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

import { IpcMainInvokeEvent } from "electron";
import { ChildProcess } from "child_process";
import { Readable, Transform, TransformCallback } from "stream";

import { AutoTTRecResponse } from "../enums";
import { Config } from "./confighandler";
import * as versions from "../versions";
import * as autoTTRecBridge from "./auto-tt-rec-bridge";

import fs from "fs";
import fse from "fs-extra";
import YAML from "yaml";
import child_process from "child_process";
import events from "events";

import path from "path";

import contextMenu from "electron-context-menu";

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  contextMenu({showInspectElement: true});
}

var autoTTRecProcess: ChildProcess | null = null;
var terminatedAutoTTRecViaGui = false;
var config: Config;

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

interface ReadStreamResponse {
  hasData: boolean;
  output: string;
}

type OpenDialogProperties = ("openFile" | "openDirectory" | "multiSelections" | "showHiddenFiles" | "createDirectory" | "promptToCreate" | "noResolveAliases" | "treatPackageAsDirectory" | "dontAddToRecent")[];
type SaveDialogProperties = ("showHiddenFiles" | "createDirectory" | "treatPackageAsDirectory" | "dontAddToRecent" | "showOverwriteConfirmation")[];

async function readStream(streamObj : Readable) : Promise<ReadStreamResponse> {
  if (!streamObj.readable) {
    return {hasData: false, output: ""};
  }

  let output = "";
  streamObj.resume();

  function streamObjOnData(buf: string) {
    output += buf.toString();
  }
  
  streamObj.on("data", streamObjOnData);
  
  try {
    await events.once(streamObj, "end");
  } catch (err) {
    throw (err as Error);
  }

  streamObj.removeListener("data", streamObjOnData);
  return {hasData: true, output: output.split("").join("")};
}

/*
put dolphin-folder in <..>/Roaming/Auto-TT-Recorder GUI/auto-tt-recorder-gui-working/dolphin
put storage-folder in <..>/Roaming/Auto-TT-Recorder GUI/auto-tt-recorder-gui-working/storage
put temp-folder in <..>/Roaming/Auto-TT-Recorder GUI/auto-tt-recorder-gui-working/temp
wiimm folder stays where it is

*/

async function updateAutoTTRecDirectories(config: Config) {
  // copy over dolphin directory elsewhere
  // electron-builder auto-update will remove all install files
  // but we want to keep dolphin configs

  // only copy over dolphin directory
  // if the dolphin version was updated or the directory doesn't exist
  if (config.options.dolphinVersion !== versions.DOLPHIN_VERSION || !fs.existsSync(config.dolphinPath)) {
    await fsPromises.mkdir(config.dolphinPath, {recursive: true});
    const workingDolphinDir = await fsPromises.opendir(config.dolphinPath);

    for await (const dirent of workingDolphinDir) {
      if (!(dirent.isDirectory() && dirent.name === "User")) {
        
        let dolphinItemPath: string = path.resolve(config.dolphinPath, dirent.name);
        console.log("dirent.name:", dirent.name);
        console.log("dolphinItemPath", dolphinItemPath);
        await fsPromises.rm(dolphinItemPath, {force: false, recursive: true});
      }
    }

    let savedDolphinPath = path.resolve(__dirname, "../..", versions.AUTO_TT_RECORDER_FOLDER_NAME, "dolphin");
    console.log("savedDolphinPath:", savedDolphinPath);

    await fse.copy(savedDolphinPath, config.dolphinPath);
    config.updateDolphinVersion();
  }
}

async function createWindow() {
  config = new Config(app, "Auto-TT-Recorder GUI");

  await updateAutoTTRecDirectories(config);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    },
  });
  ipcMain.handle("open-file-dialog", async function (event: IpcMainInvokeEvent, fileFilters: FileFilter[]) {
    console.log("open-file-dialog fileFilters:", fileFilters);
    let dialogProperties: OpenDialogProperties = ["openFile"];
    let response = await dialog.showOpenDialog(win, {
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
    let response = await dialog.showSaveDialog(win, {
      properties: dialogProperties,
      filters: fileFilters
    });
    if (!response.canceled) {
      return response.filePath;
    } else {
      return "";
    }
  });

  ipcMain.handle("spawn-auto-tt-rec", async function (event: IpcMainInvokeEvent, templateFilename: string, autoTTRecArgs: object) {
    const templateContents = await fsPromises.readFile(path.resolve(__dirname, "../..", templateFilename), "utf8");
    let autoTTRecTemplate = YAML.parse(templateContents);
    for (const [key, value] of Object.entries(autoTTRecArgs)) {
      autoTTRecTemplate[key] = value;
    }
    const generatedConfigContents = YAML.stringify(autoTTRecTemplate);

    await fsPromises.writeFile(path.resolve(__dirname, "../..", versions.AUTO_TT_RECORDER_FOLDER_NAME, "config.yml"), generatedConfigContents, "utf8");
    console.log("spawn-auto-tt-rec process.cwd():", process.cwd());

    // Run auto-tt-recorder here
    autoTTRecProcess = child_process.spawn(
      path.resolve(__dirname, "../..", versions.AUTO_TT_RECORDER_FOLDER_NAME, "bin/record_ghost/record_ghost.exe"),
      ["-cfg", "config.yml"],
      {
        cwd: path.resolve(__dirname, "../..", versions.AUTO_TT_RECORDER_FOLDER_NAME),
        detached: false
      }
    );

    // https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
    // always returns ChildProcess

    return new Promise(function (resolve, reject) {
      autoTTRecProcess!.on("spawn", function onSpawnAutoTTRec() {
        autoTTRecProcess!.removeListener("spawn", onSpawnAutoTTRec);
        terminatedAutoTTRecViaGui = false;
        resolve(true);
      });
      autoTTRecProcess!.on("error", function onAutoTTRecSpawnError(err) {
        autoTTRecProcess!.removeListener("error", onAutoTTRecSpawnError);
        reject(err);
      });
    });
  });

  ipcMain.handle("wait-auto-tt-rec", async function (event: IpcMainInvokeEvent) {
    if (autoTTRecProcess === null) {
      throw new Error("Internal error: somehow waiting for auto-tt-recorder before spawning it.");
    }

    function onReceiveAutoTTRecStdout(buf: string) {
      const stdoutPretty = buf.toString();
      console.log(stdoutPretty);
      win.webContents.send("send-stdout", stdoutPretty);
    }

    function onReceiveAutoTTRecStderr(buf: string) {
      const stderrPretty = buf.toString();
      console.log(stderrPretty);
      win.webContents.send("send-stderr", stderrPretty);
    }

    autoTTRecProcess!.stdout!.on("data", onReceiveAutoTTRecStdout);
    autoTTRecProcess!.stderr!.on("data", onReceiveAutoTTRecStderr);

    return new Promise(function (resolve, reject) {
      function removeAutoTTRecProcessListeners() {
        autoTTRecProcess!.stdout!.removeListener("data", onReceiveAutoTTRecStdout);
        autoTTRecProcess!.stderr!.removeListener("data", onReceiveAutoTTRecStderr);
        autoTTRecProcess!.removeListener("exit", onAutoTTRecExit);
        autoTTRecProcess!.removeListener("error", onAutoTTRecErrorAfterSpawn);
      }

      async function onAutoTTRecExit(code: number, signal: string) {
        console.log("Process exited!");
        removeAutoTTRecProcessListeners();
        if (signal !== null) {
          if (terminatedAutoTTRecViaGui) {
            terminatedAutoTTRecViaGui = false;
            resolve(AutoTTRecResponse.ABORTED);
          }
          autoTTRecProcess = null;
          reject(new Error(`Auto-TT-Recorder was unexpectedly closed. (signal: ${signal})`));
        } else if (code !== 0) {
          console.log(`error code ${code}`);
          let errorMsg: string;
          try {
            let finalStderr: ReadStreamResponse = await readStream(autoTTRecProcess!.stderr!);
            if (!finalStderr.hasData) {
              errorMsg = "See above.";
            } else {
              errorMsg = finalStderr.output;
            }
          } catch (err) {
            console.log("Error in readStream");
            errorMsg = (err as Error).message;
          }
          autoTTRecProcess = null;
          reject(new Error(`An error occurred in Auto-TT-Recorder (code: ${code}): ${errorMsg}`));
        } else {
          console.log("resolved running auto-tt-rec");
          autoTTRecProcess = null;
          resolve(AutoTTRecResponse.COMPLETED);
        }
      }

      async function onAutoTTRecErrorAfterSpawn(err: Error) {
        removeAutoTTRecProcessListeners();
        autoTTRecProcess = null;
        reject(new Error(`An unknown error occurred: ${err.message}`));
      }

      autoTTRecProcess!.on("exit", onAutoTTRecExit);
      autoTTRecProcess!.on("error", onAutoTTRecErrorAfterSpawn);
    });
  });

  ipcMain.handle("terminate-auto-tt-rec", async function (event: IpcMainInvokeEvent) {
    if (autoTTRecProcess === null) {
      return;
    }

    autoTTRecProcess.kill("SIGTERM");
    terminatedAutoTTRecViaGui = true;
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  console.log("isDev:", isDev);
  await win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../renderer/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
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

