import { dialog, IpcMainInvokeEvent, FileFilter, OpenDialogOptions, SaveDialogOptions} from "electron";

import { mainWindow } from "./electron";
import { FilenameAndContents } from "../shared-types";
import fsPromises from "fs/promises";

export async function openFileDialog(event: IpcMainInvokeEvent, fileFilters: FileFilter[]) {
  console.log("open-file-dialog fileFilters:", fileFilters);
  let dialogProperties: OpenDialogOptions["properties"] = ["openFile"];
  let response = await dialog.showOpenDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters
  });
  if (!response.canceled) {
    console.log(response.filePaths[0]);
    return response.filePaths[0];
  } else {
    return "";
  }
}

export async function openFileDialogAndRead(event: IpcMainInvokeEvent, fileFilters: FileFilter[]) : Promise<FilenameAndContents> {
  let dialogProperties: OpenDialogOptions["properties"] = ["openFile"];
  let response = await dialog.showOpenDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters
  });
  if (!response.canceled) {
    let filename = response.filePaths[0];
    const contents = await fsPromises.readFile(filename, "utf8");
    return {
      filename: filename,
      contents: contents
    };
  } else {
    return {filename: "", contents: ""};
  }
}

export async function saveFileDialog(event: IpcMainInvokeEvent, fileFilters: FileFilter[]) {
  let dialogProperties: SaveDialogOptions["properties"] = [];
  let response = await dialog.showSaveDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters
  });
  if (!response.canceled) {
    return response.filePath;
  } else {
    return "";
  }
}

export async function saveFileDialogAndWriteText(event: IpcMainInvokeEvent, fileFilters: FileFilter[], output: string, defaultPath: string | undefined) {
  let dialogProperties: SaveDialogOptions["properties"] = [];
  if (defaultPath === "") {
    defaultPath = undefined;
  }
  console.log("saveFileDialogAndWriteText output:", output);
  let response = await dialog.showSaveDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters,
    defaultPath: defaultPath
  });
  if (!response.canceled && response.filePath !== undefined) {
    await fsPromises.writeFile(response.filePath, output, "utf8");
    return response.filePath;
  } else {
    return "";
  }
}

export async function overwriteTextFile(event: IpcMainInvokeEvent, outputFilename: string, output: string) {
  await fsPromises.writeFile(outputFilename, output, "utf8");
}