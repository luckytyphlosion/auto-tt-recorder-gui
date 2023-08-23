import { IsFileReadableResult, IsFileReadableResultCode, IsFileWritableResult, IsFileWritableResultCode } from "../shared/shared-types";
import { getIndefiniteArticleForFileExtension } from "../shared/util-shared";

async function isFileOrFolderReadable(filename: string, fileOrFolderStr: string): Promise<string | boolean> {
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

const englishLongConjunctionListFormatter = new Intl.ListFormat("en", {style: "long", type: "disjunction"});

export async function isFileReadableAndHasCorrectExtension(
  filename: string,
  expectedExtensionsMinusDot: string[],
  errorMessagePrefixes?: {
    wrongExtensionErrorMessageSingularPrefix?: string, 
    unreadableErrorMessagePrefix?: string
  }
): Promise<boolean | string> {
  let isFileReadableResult: IsFileReadableResult = await window.api.isFileReadableAndHasCorrectExtension_alsoGetExtension(filename, expectedExtensionsMinusDot);
  if (errorMessagePrefixes === undefined) {
    errorMessagePrefixes = {};
  }

  if (isFileReadableResult.code === IsFileReadableResultCode.WRONG_EXTENSION) {
    if (expectedExtensionsMinusDot.length === 0 || (expectedExtensionsMinusDot.length === 1 && expectedExtensionsMinusDot[0] === "*")) {
      expectedExtensionsMinusDot = ["(this should not happen, please contact the developer)"];
    }

    let fileExtensionIndefiniteParticle = getIndefiniteArticleForFileExtension(isFileReadableResult.fileExtensionMinusDot);

    if (expectedExtensionsMinusDot.length === 1) {
      let expectedExtensionMinusDot = expectedExtensionsMinusDot[0];
      let expectedFileExtensionIndefiniteParticle = getIndefiniteArticleForFileExtension(expectedExtensionMinusDot);
      if (errorMessagePrefixes.wrongExtensionErrorMessageSingularPrefix === undefined) {
        errorMessagePrefixes.wrongExtensionErrorMessageSingularPrefix = "File";
      }

      return `${errorMessagePrefixes.wrongExtensionErrorMessageSingularPrefix} should be ${expectedFileExtensionIndefiniteParticle} ${expectedExtensionMinusDot} but is ${fileExtensionIndefiniteParticle} ${isFileReadableResult.fileExtensionMinusDot}!`
    } else {
      return `File type should be one of ${englishLongConjunctionListFormatter.format(expectedExtensionsMinusDot)}, but is ${fileExtensionIndefiniteParticle} ${isFileReadableResult.fileExtensionMinusDot}!`;
    }
  } else if (isFileReadableResult.code === IsFileReadableResultCode.UNREADABLE) {
    if (errorMessagePrefixes.unreadableErrorMessagePrefix === undefined) {
      errorMessagePrefixes.unreadableErrorMessagePrefix = "File";
    }
    return `${errorMessagePrefixes.unreadableErrorMessagePrefix} does not exist (deleted or renamed outside the program) or cannot be read from.`;
  } else if (isFileReadableResult.code === IsFileReadableResultCode.SUCCESS) {
    return true;
  } else {
    return "Impossible error occurred, please contact the developer!";
  }
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
