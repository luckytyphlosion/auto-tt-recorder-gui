import { dialog, IpcMainInvokeEvent, FileFilter, OpenDialogOptions, SaveDialogOptions} from "electron";

import { mainWindow } from "./electron";
import { FilenameAndContents, StringOrError, DialogId, ExpectedExtensionAndErrorMessage, IsFileReadableResult, IsFileReadableResultCode, IsFileWritableResult, IsFileWritableResultCode } from "../shared/shared-types";
import fsPromises from "fs/promises";
import fs from "fs";

import path from "path";

import { globalConfig } from "./confighandler";

function retrieveLastPathname(lastPathname: string | undefined, dialogId: DialogId) {
  if (lastPathname === "") {
    lastPathname = globalConfig.options.savedDialogPathnames[dialogId];
    if (lastPathname === "") {
      lastPathname = undefined;
    }
  }
  return lastPathname;
}

export async function getAbsolutePathRelativeToFilename(event: IpcMainInvokeEvent, pathname: string, filenameRelativeFrom: string): Promise<string> {
  let absolutePathname: string;

  if (path.isAbsolute(pathname)) {
    absolutePathname = pathname;
  } else {
    absolutePathname = path.resolve(path.dirname(filenameRelativeFrom), pathname);
  }

  return absolutePathname;
}

async function readFileEnforceUTF8(filename: string, badEncodingErrorMessage: string, expectedExtensionAndErrorMessage?: ExpectedExtensionAndErrorMessage): Promise<string> {
  if (expectedExtensionAndErrorMessage !== undefined && path.extname(filename) !== expectedExtensionAndErrorMessage.extension) {
    throw new Error(expectedExtensionAndErrorMessage.errorMessage);
    
  }
  const buffer = await fsPromises.readFile(filename);
  if (!Buffer.from(buffer.toString(), "utf8").equals(buffer)) {
    throw new Error(badEncodingErrorMessage);
  }
  return buffer.toString();
}

function cloneError(oldError: NodeJS.ErrnoException): NodeJS.ErrnoException {
  let newError: NodeJS.ErrnoException;
  newError = oldError.constructor(oldError.message);
  if (oldError.errno) {
    newError.errno = oldError.errno;
  } if (oldError.code) {
    newError.code = oldError.code
  } if (oldError.path) {
    newError.path = oldError.path;
  } if (oldError.syscall) {
    newError.syscall = oldError.syscall;
  }

  return newError;
}

function setStringOrErrorFromUnknown(eAsUnknown: unknown, stringOrError: StringOrError) {
  stringOrError.hasError = true;

  if (eAsUnknown instanceof Error) {
    let e: NodeJS.ErrnoException = (eAsUnknown as NodeJS.ErrnoException);
    stringOrError.errorCode = e.code !== undefined ? e.code : "";
    stringOrError.errorMessage = e.message;
  } else {
    stringOrError.errorCode = "UNKNOWN";
    stringOrError.errorMessage = `Unknown error occured (error object: ${eAsUnknown})`;
  }
}

export async function readFileEnforceUTF8_returnError(filename: string, badEncodingErrorMessage: string, maxFileSize?: number, expectedExtensionAndErrorMessage?: ExpectedExtensionAndErrorMessage): Promise<StringOrError> {
  let stringOrError: StringOrError = {
    result: "",
    hasError: false,
    errorCode: "",
    errorMessage: ""
  };

  let fileSize: number = Infinity;
  maxFileSize = maxFileSize === undefined ? Infinity : maxFileSize;

  try {
    fileSize = (await fsPromises.stat(filename)).size;
  } catch (eAsUnknown: unknown) {
    setStringOrErrorFromUnknown(eAsUnknown, stringOrError);
  }

  if (!stringOrError.hasError) {
    if (fileSize > maxFileSize) {
      stringOrError.hasError = true;
      stringOrError.errorCode = "SIZE";
      stringOrError.errorMessage = "File is greater than 10MiB (should not require a file greater than that).";
    } else {
      try {
        stringOrError.result = await readFileEnforceUTF8(filename, badEncodingErrorMessage, expectedExtensionAndErrorMessage);
      } catch (eAsUnknown: unknown) {
        setStringOrErrorFromUnknown(eAsUnknown, stringOrError);
      }
    }
  }

  return stringOrError;
}

export async function ipcReadFileEnforceUTF8(event: IpcMainInvokeEvent, filename: string, badEncodingErrorMessage: string, expectedExtensionAndErrorMessage?: ExpectedExtensionAndErrorMessage): Promise<StringOrError> {
  return await readFileEnforceUTF8_returnError(filename, badEncodingErrorMessage, 10485760, expectedExtensionAndErrorMessage);
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

export async function saveFileDialog(
  event: IpcMainInvokeEvent, fileFilters: FileFilter[],
  lastFilename: string | undefined, dialogId: DialogId
): Promise<string> {
  let dialogProperties: SaveDialogOptions["properties"] = [];
  lastFilename = retrieveLastPathname(lastFilename, dialogId);
  if (lastFilename !== undefined) {
    let parsedPath = path.parse(lastFilename);
    parsedPath.ext = `.${fileFilters[0].extensions[0]}`;
    parsedPath.base = "";
    lastFilename = path.format(parsedPath);
  }
  let response = await dialog.showSaveDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters,
    defaultPath: lastFilename
  });
  if (!response.canceled && response.filePath !== undefined) {
    globalConfig.setNewDialogPathnameAndSave(dialogId, response.filePath);
    console.log("saveFileDialog response.filePath:", response.filePath);
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

export async function isFileReadableAndHasCorrectExtension_alsoGetExtension(event: IpcMainInvokeEvent, filename: string, expectedExtensionsMinusDot: string[]): Promise<IsFileReadableResult> {
  let filenameExt = path.extname(filename);
  let result: IsFileReadableResult = {
    code: IsFileReadableResultCode.SUCCESS,
    fileExtensionMinusDot: filenameExt.charAt(0) === "." ? filenameExt.substring(1) : filenameExt
  };

  if (!(expectedExtensionsMinusDot.length === 0 || (expectedExtensionsMinusDot.length === 1 && expectedExtensionsMinusDot[0] === "*"))) {
    const hasCorrectExtension: boolean = expectedExtensionsMinusDot.some((expectedExtensionMinusDot) => {
      let expectedExtension = `.${expectedExtensionMinusDot}`;
      //console.log("expectedExtension:", expectedExtension, ", filenameExt:", filenameExt);
      return filenameExt === expectedExtension;
    });
    if (!hasCorrectExtension) {
      result.code = IsFileReadableResultCode.WRONG_EXTENSION;
      return result;
    }
  }

  let isReadableAnswer = await fsAccessHelper(filename, fs.constants.R_OK);
  if (isReadableAnswer) {
    result.code = IsFileReadableResultCode.SUCCESS;
  } else {
    result.code = IsFileReadableResultCode.UNREADABLE;
  }
  return result;
}

export async function isFileReadable(event: IpcMainInvokeEvent, filename: string): Promise<boolean> {
  return fsAccessHelper(filename, fs.constants.R_OK);
}

export async function isFileWritable_alsoGetExtension(event: IpcMainInvokeEvent, filename: string, expectedExtensionMinusDot?: string): Promise<IsFileWritableResult> {
  let filenameExt = path.extname(filename);
  let result: IsFileWritableResult = {
    code: IsFileWritableResultCode.SUCCESS,
    fileExtensionMinusDot: filenameExt.charAt(0) === "." ? filenameExt.substring(1) : filenameExt
  };

  if (expectedExtensionMinusDot !== undefined) {
    let expectedExtension = `.${expectedExtensionMinusDot}`;
    if (filenameExt !== expectedExtension) {
      result.code = IsFileWritableResultCode.WRONG_EXTENSION;
      return result;
    }
  }

  let isWritableAnswer =  !await fsAccessHelper(filename, fs.constants.X_OK) || await fsAccessHelper(filename, fs.constants.W_OK);
  if (isWritableAnswer) {
    result.code = IsFileWritableResultCode.SUCCESS;
  } else {
    result.code = IsFileWritableResultCode.UNWRITABLE;
  }

  return result;
}
