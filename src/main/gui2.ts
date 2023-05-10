import { dialog, IpcMainInvokeEvent, FileFilter, OpenDialogOptions, SaveDialogOptions} from "electron";

import { mainWindow } from "./electron";

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
