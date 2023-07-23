import { dialog, IpcMainInvokeEvent, FileFilter, OpenDialogOptions, SaveDialogOptions} from "electron";

import { mainWindow } from "./electron";
import { FilenameAndContents } from "../shared-types";
import fsPromises from "fs/promises";
import { DialogId, globalConfig } from "./confighandler";

function retrieveLastPathname(lastPathname: string | undefined, dialogId: DialogId) {
  if (lastPathname === "") {
    lastPathname = globalConfig.options.savedDialogPathnames[dialogId];
    if (lastPathname === "") {
      lastPathname = undefined;
    }
  }
  return lastPathname;
}
export async function openFileDialog(event: IpcMainInvokeEvent, fileFilters: FileFilter[],
    lastFilename: string | undefined, dialogId: DialogId): Promise<string> {
  console.log("open-file-dialog fileFilters:", fileFilters);
  let dialogProperties: OpenDialogOptions["properties"] = ["openFile"];
  lastFilename = retrieveLastPathname(lastFilename, dialogId);

  let response = await dialog.showOpenDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters,
    defaultPath: lastFilename
  });
  if (!response.canceled) {
    let responseFilepath = response.filePaths[0];
    console.log(responseFilepath);
    globalConfig.setNewDialogPathnameAndSave(dialogId, responseFilepath);
    return responseFilepath;
  } else {
    return "";
  }
}

export async function openFolderDialog(event: IpcMainInvokeEvent,
    lastFolderName: string | undefined, dialogId: DialogId): Promise<string> {
  let dialogProperties: OpenDialogOptions["properties"] = ["openDirectory"];
  lastFolderName = retrieveLastPathname(lastFolderName, dialogId);

  let response = await dialog.showOpenDialog(mainWindow, {
    properties: dialogProperties,
    defaultPath: lastFolderName
  });
  if (!response.canceled) {
    let responseFilepath = response.filePaths[0];
    console.log(responseFilepath);
    globalConfig.setNewDialogPathnameAndSave(dialogId, responseFilepath);
    return responseFilepath;
  } else {
    return "";
  }
}

export async function openFileDialogAndRead(event: IpcMainInvokeEvent, fileFilters: FileFilter[],
    lastFilename: string | undefined, dialogId: DialogId) : Promise<FilenameAndContents> {
  let dialogProperties: OpenDialogOptions["properties"] = ["openFile"];
  lastFilename = retrieveLastPathname(lastFilename, dialogId);
  let response = await dialog.showOpenDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters,
    defaultPath: lastFilename
  });
  if (!response.canceled) {
    let filename = response.filePaths[0];
    const contents = await fsPromises.readFile(filename, "utf8");
    globalConfig.setNewDialogPathnameAndSave(dialogId, filename);
    return {
      filename: filename,
      contents: contents
    };
  } else {
    return {filename: "", contents: ""};
  }
}

export async function saveFileDialog(event: IpcMainInvokeEvent, fileFilters: FileFilter[],
    lastFilename: string | undefined, dialogId: DialogId): Promise<string> {
  let dialogProperties: SaveDialogOptions["properties"] = [];
  lastFilename = retrieveLastPathname(lastFilename, dialogId);
  let response = await dialog.showSaveDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters,
    defaultPath: lastFilename
  });
  if (!response.canceled && response.filePath !== undefined) {
    globalConfig.setNewDialogPathnameAndSave(dialogId, response.filePath);
    return response.filePath;
  } else {
    return "";
  }
}

export async function saveFileDialogAndWriteText(event: IpcMainInvokeEvent, fileFilters: FileFilter[],
    output: string, lastFilename: string | undefined, dialogId: DialogId): Promise<string> {
  let dialogProperties: SaveDialogOptions["properties"] = [];
  lastFilename = retrieveLastPathname(lastFilename, dialogId);
  console.log("saveFileDialogAndWriteText output:", output);
  let response = await dialog.showSaveDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters,
    defaultPath: lastFilename
  });
  if (!response.canceled && response.filePath !== undefined) {
    await fsPromises.writeFile(response.filePath, output, "utf8");
    globalConfig.setNewDialogPathnameAndSave(dialogId, response.filePath);
    return response.filePath;
  } else {
    return "";
  }
}

export async function overwriteTextFile(event: IpcMainInvokeEvent, outputFilename: string, output: string) {
  await fsPromises.writeFile(outputFilename, output, "utf8");
}