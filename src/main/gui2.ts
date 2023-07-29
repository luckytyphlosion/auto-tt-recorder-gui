import { dialog, IpcMainInvokeEvent, FileFilter, OpenDialogOptions, SaveDialogOptions} from "electron";

import { mainWindow } from "./electron";
import { FilenameAndContents } from "../shared/shared-types";
import fsPromises from "fs/promises";
import fs from "fs";

import path from "path";

import { globalConfig } from "./confighandler";

import { DialogId } from "../shared/shared-types";

function retrieveLastPathname(lastPathname: string | undefined, dialogId: DialogId) {
  if (lastPathname === "") {
    lastPathname = globalConfig.options.savedDialogPathnames[dialogId];
    if (lastPathname === "") {
      lastPathname = undefined;
    }
  }
  return lastPathname;
}

export function getAbsolutePathRelativeToFilename(event: IpcMainInvokeEvent, pathname: string, filenameRelativeFrom: string): string {
  let absolutePathname: string;

  if (path.isAbsolute(pathname)) {
    absolutePathname = pathname;
  } else {
    absolutePathname = path.resolve(path.dirname(filenameRelativeFrom), pathname);
  }

  return absolutePathname;
}

type BadExtensionAndErrorMessage = {
  extension: string,
  errorMessage: string
}

export async function readFileEnforceUTF8(filename: string, badEncodingErrorMessage: string, badExtensionAndErrorMessage?: BadExtensionAndErrorMessage): Promise<string> {
  if (badExtensionAndErrorMessage !== undefined && path.extname(filename) !== badExtensionAndErrorMessage.extension) {
    throw new Error(badExtensionAndErrorMessage.errorMessage);
  
  }
  const buffer = await fsPromises.readFile(filename);
  if (!Buffer.from(buffer.toString(), "utf8").equals(buffer)) {
    throw new Error(badEncodingErrorMessage);
  }
  return buffer.toString();
}

export async function ipcReadFileEnforceUTF8(event: IpcMainInvokeEvent, filename: string, badEncodingErrorMessage: string): Promise<string> {
  return await readFileEnforceUTF8(filename, badEncodingErrorMessage);
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
    let contents: string;

    try {
      contents = await readFileEnforceUTF8(filename, `Provided file ${filename} is not a text file!`);
    } catch (e) {
      contents = `Error: ${(e as Error).message}`;
      filename = "";
    }

    //const contents = await fsPromises.readFile(filename, "utf8");
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

async function fsAccessHelper(filename: string, mode: number): Promise<boolean> {
  try {
    await fsPromises.access(filename, mode);
    return true;
  } catch {
    return false;
  }
}

export async function isFileReadable(event: IpcMainInvokeEvent, filename: string): Promise<boolean> {
  return fsAccessHelper(filename, fs.constants.R_OK);
}

export async function isFileWritable(event: IpcMainInvokeEvent, filename: string): Promise<boolean> {
  return !await fsAccessHelper(filename, fs.constants.X_OK) || await fsAccessHelper(filename, fs.constants.W_OK);
}
