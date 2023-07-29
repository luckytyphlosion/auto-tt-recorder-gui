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

export async function isFileWritable(filename: string): Promise<boolean | string> {
  let isWritable = await window.api.isFileWritable(filename);
  if (isWritable) {
    return true;
  } else {
    return "File cannot be written to (try closing any programs using it).";
  }
}

export function shallowCopy<T>(obj: T): T {
  return Object.assign({}, obj);
}
