import { IsFileWritableResult, IsFileWritableResultCode } from "../shared/shared-types";
import { getIndefiniteArticleForFileExtension } from "../shared/util-shared";

async function isFileOrFolderReadable(filename: string, fileOrFolderStr: string): Promise<string | boolean> {
  console.log("isFileOrFolderReadable:", filename);
  let isReadable = await window.api.isFileReadable(filename);
  if (isReadable) {
    return true;
  } else {
    return `${fileOrFolderStr} does not exist (deleted or renamed outside the program) or cannot be read from.`;
  }
}

export async function isFileReadable(filename: string): Promise<string | boolean> {
  return isFileOrFolderReadable(filename, "File")
}

export async function isFolderReadable(filename: string): Promise<string | boolean> {
  return isFileOrFolderReadable(filename, "Folder");
}

export async function isFileWritableAndHasCorrectExtension(filename: string, expectedExtensionMinusDot?: string): Promise<boolean | string> {
  let isFileWritableResult: IsFileWritableResult = await window.api.isFileWritable_alsoGetExtension(filename, expectedExtensionMinusDot);
  if (isFileWritableResult.code === IsFileWritableResultCode.WRONG_EXTENSION) {
    if (expectedExtensionMinusDot === undefined) {
      expectedExtensionMinusDot = "(this should not happen, please contact the developer)";
    }

    let fileExtensionIndefiniteParticle = getIndefiniteArticleForFileExtension(isFileWritableResult.fileExtensionMinusDot);
    let expectedFileExtensionIndefiniteParticle = getIndefiniteArticleForFileExtension(expectedExtensionMinusDot);
    return `File should be ${expectedFileExtensionIndefiniteParticle} ${expectedExtensionMinusDot} but is ${fileExtensionIndefiniteParticle} ${isFileWritableResult.fileExtensionMinusDot}!`
  } else if (isFileWritableResult.code === IsFileWritableResultCode.UNWRITABLE) {
    return "File cannot be written to (try closing any programs using it).";
  } else if (isFileWritableResult.code === IsFileWritableResultCode.SUCCESS) {
    return true;
  } else {
    return "Impossible error occurred, please contact the developer!";
  }
}
