import { dialog, IpcMainInvokeEvent, FileFilter, OpenDialogOptions, SaveDialogOptions} from "electron";

import { mainWindow } from "./electron";
import { FilenameAndContents, StringOrError, DialogId, ExpectedExtensionAndErrorMessage, IsFileReadableResult, IsFileReadableResultCode, IsFileWritableResult, IsFileWritableResultCode } from "../shared/shared-types";
import { getIndefiniteArticleForFileExtension } from "../shared/util-shared";

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

enum ReadFileEnforceUTF8ResultCode {
  SUCCESS = 0,
  ERROR_THROWN,
  WRONG_EXTENSION
}

interface ReadFileEnforceUTF8Result {
  code: ReadFileEnforceUTF8ResultCode,
  contents: string,
  errorMessage: string,
}

async function readFileEnforceUTF8(filename: string, badEncodingErrorMessage: string, expectedExtensionAndErrorMessage?: ExpectedExtensionAndErrorMessage, readFileEvenOnWrongExtension?: boolean): Promise<ReadFileEnforceUTF8Result> {
  let result: ReadFileEnforceUTF8Result = {
    code: ReadFileEnforceUTF8ResultCode.ERROR_THROWN,
    contents: "",
    errorMessage: "This should not occur! Please contact the developer"
  }

  let wrongExtension: boolean = false;
  let wrongExtensionErrorMessage: string = "";

  if (expectedExtensionAndErrorMessage !== undefined && path.extname(filename) !== expectedExtensionAndErrorMessage.extension) {
    if (readFileEvenOnWrongExtension) {
      wrongExtension = true;
      wrongExtensionErrorMessage = expectedExtensionAndErrorMessage.errorMessage;
    } else {
      throw new Error(expectedExtensionAndErrorMessage.errorMessage);
    }
  }
  const buffer = await fsPromises.readFile(filename);
  if (!Buffer.from(buffer.toString(), "utf8").equals(buffer)) {
    if (wrongExtension) {
      throw new Error(wrongExtensionErrorMessage);
    } else {
      throw new Error(badEncodingErrorMessage);
    }
  }

  result.contents = buffer.toString();
  if (wrongExtension) {
    result.code = ReadFileEnforceUTF8ResultCode.WRONG_EXTENSION;
    result.errorMessage = wrongExtensionErrorMessage;
  } else {
    result.code = ReadFileEnforceUTF8ResultCode.SUCCESS;
    result.errorMessage = "";
  }
  return result
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

export async function readFileEnforceUTF8_returnError(filename: string, badEncodingErrorMessage: string, limitFileSizeTo10MB?: boolean, expectedExtensionAndErrorMessage?: ExpectedExtensionAndErrorMessage, readFileEvenOnWrongExtension?: boolean): Promise<StringOrError> {
  let stringOrError: StringOrError = {
    result: "",
    hasError: false,
    errorCode: "",
    errorMessage: ""
  };

  let fileSize: number = Infinity;
  let maxFileSize: number;
  if (limitFileSizeTo10MB) {
    maxFileSize = 10485760;
  } else {
    maxFileSize = Infinity;
  }

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
        let readFileEnforceUTF8Result = await readFileEnforceUTF8(filename, badEncodingErrorMessage, expectedExtensionAndErrorMessage, readFileEvenOnWrongExtension);
        stringOrError.result = readFileEnforceUTF8Result.contents;
        stringOrError.errorMessage = readFileEnforceUTF8Result.errorMessage;
        if (readFileEnforceUTF8Result.code !== ReadFileEnforceUTF8ResultCode.SUCCESS) {
          stringOrError.hasError = true;
          if (readFileEnforceUTF8Result.code === ReadFileEnforceUTF8ResultCode.WRONG_EXTENSION) {
            stringOrError.errorCode = "BADEXT";
          } else {
            stringOrError.errorCode = "IMPOSSIBLE";
          }
        }
      } catch (eAsUnknown: unknown) {
        setStringOrErrorFromUnknown(eAsUnknown, stringOrError);
      }
    }
  }

  return stringOrError;
}

export async function ipcReadFileEnforceUTF8(event: IpcMainInvokeEvent, filename: string, badEncodingErrorMessage: string, expectedExtensionAndErrorMessage?: ExpectedExtensionAndErrorMessage): Promise<StringOrError> {
  return await readFileEnforceUTF8_returnError(filename, badEncodingErrorMessage, true, expectedExtensionAndErrorMessage);
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
    lastFilename: string | undefined, dialogId: DialogId, errorMessageFilePrefix?: string) : Promise<FilenameAndContents> {
  let dialogProperties: OpenDialogOptions["properties"] = ["openFile"];
  lastFilename = retrieveLastPathname(lastFilename, dialogId);
  let response = await dialog.showOpenDialog(mainWindow, {
    properties: dialogProperties,
    filters: fileFilters,
    defaultPath: lastFilename
  });

  let filenameAndContents: FilenameAndContents = {
    filename: "",
    contents: "",
    errorMessage: ""
  };

  if (!response.canceled) {
    let filename = response.filePaths[0];

    try {
      let expectedExtensionMinusDot = fileFilters[0].extensions[0];
      let expectedExtension = `.${expectedExtensionMinusDot}`;
      let expectedFileExtensionIndefiniteParticle = getIndefiniteArticleForFileExtension(expectedExtensionMinusDot);
      if (errorMessageFilePrefix === undefined) {
        errorMessageFilePrefix = "file";
      }

      let stringOrError: StringOrError = await readFileEnforceUTF8_returnError(
        filename,
        `Provided ${errorMessageFilePrefix} ${filename} is not a text file!`,
        true,
        {
          extension: expectedExtension,
          errorMessage: `Provided ${errorMessageFilePrefix} ${path.basename(filename)} should be ${expectedFileExtensionIndefiniteParticle} ${expectedExtensionMinusDot}!`
        },
        true
      );
      if (stringOrError.hasError) {
        if (stringOrError.errorCode === "BADEXT") {
          filenameAndContents.filename = filename;
          filenameAndContents.contents = stringOrError.result;
          filenameAndContents.errorMessage = stringOrError.errorMessage;
        } else {
          filenameAndContents.filename = "";
          filenameAndContents.contents = "";
          filenameAndContents.errorMessage = stringOrError.errorMessage;
        }
      } else {
        filenameAndContents.filename = filename;
        filenameAndContents.contents = stringOrError.result;
        filenameAndContents.errorMessage = "";
      }
    } catch (e) {
      filenameAndContents.filename = "";
      filenameAndContents.contents = "";
      filenameAndContents.errorMessage = (e as Error).message;
    }

    //const contents = await fsPromises.readFile(filename, "utf8");
    if (filenameAndContents.filename !== "") {
      globalConfig.setNewDialogPathnameAndSave(dialogId, filenameAndContents.filename);
    }
  }

  return filenameAndContents;
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
  if (lastFilename !== undefined) {
    let parsedPath = path.parse(lastFilename);
    parsedPath.ext = `.${fileFilters[0].extensions[0]}`;
    parsedPath.base = "";
    lastFilename = path.format(parsedPath);
  }
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
