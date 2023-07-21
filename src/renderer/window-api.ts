import { FileFilter, IpcRendererEvent } from "electron";
import { AutoTTRecResponse } from "../enums";
import { AutoTTRecArgs } from "./AutoTTRecFormFieldsAndArgs";
import { FilenameAndContents } from "../shared-types";

declare global {
  interface Window {
    api: {
      openFileDialog: (fileFilters: FileFilter[]) => Promise<string>;
      openFolderDialog: () => Promise<string>;
      openFileDialogAndRead: (fileFilters: FileFilter[]) => Promise<FilenameAndContents>;
      saveFileDialog: (fileFilters: FileFilter[]) => Promise<string>;
      saveFileDialogAndWriteText: (fileFilters: FileFilter[], output: string, defaultPath: string | undefined) => Promise<string>;
      overwriteTextFile: (outputFilename: string, output: string) => Promise<void>;
      spawnAutoTTRec: (templateFilename: string, autoTTRecArgs: AutoTTRecArgs) => Promise<boolean>;
      waitAutoTTRec: () => Promise<AutoTTRecResponse>;
      handleSendStdout: (callable: (event: IpcRendererEvent, stdoutData: string) => void) => void;
      handleSendStderr: (callable: (event: IpcRendererEvent, stderrData: string) => void) => void;
      removeHandleSendStdout: (callable: (event: IpcRendererEvent, stdoutData: string) => void) => void;
      removeHandleSendStderr: (callable: (event: IpcRendererEvent, stderrData: string) => void) => void;
      terminateAutoTTRec: () => Promise<void>;
    }
  }
}
