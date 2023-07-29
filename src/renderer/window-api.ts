import { FileFilter, IpcRendererEvent } from "electron";
import { AutoTTRecResponse } from "../enums";
import { AutoTTRecArgs } from "./AutoTTRecFormFieldsAndArgs";
import { FilenameAndContents, ImportTemplateResult } from "../shared-types";
import { DialogId } from "../main/confighandler";

import { AutoTTRecConfig } from "../shared-types";
import { AutoTTRecConfigFormFields } from "./AutoTTRecFormFieldsAndArgs";

declare global {
  interface Window {
    api: {
      openFileDialog: (fileFilters: FileFilter[], lastFilename: string | undefined, dialogId: DialogId) => Promise<string>;
      openFolderDialog: (lastFolderName: string | undefined, dialogId: DialogId) => Promise<string>;
      openFileDialogAndRead: (fileFilters: FileFilter[], lastFilename: string | undefined, dialogId: DialogId) => Promise<FilenameAndContents>;
      saveFileDialog: (fileFilters: FileFilter[], lastFilename: string | undefined, dialogId: DialogId) => Promise<string>;
      saveFileDialogAndWriteText: (fileFilters: FileFilter[], output: string, lastFilename: string | undefined, dialogId: DialogId) => Promise<string>;
      overwriteTextFile: (outputFilename: string, output: string) => Promise<void>;
      isFileReadable: (filename: string) => Promise<boolean>;
      isFileWritable: (filename: string) => Promise<boolean>;
      spawnAutoTTRec: (templateFilename: string, autoTTRecArgs: AutoTTRecArgs) => Promise<boolean>;
      waitAutoTTRec: () => Promise<AutoTTRecResponse>;
      handleSendStdout: (callable: (event: IpcRendererEvent, stdoutData: string) => void) => void;
      handleSendStderr: (callable: (event: IpcRendererEvent, stderrData: string) => void) => void;
      removeHandleSendStdout: (callable: (event: IpcRendererEvent, stdoutData: string) => void) => void;
      removeHandleSendStderr: (callable: (event: IpcRendererEvent, stderrData: string) => void) => void;
      terminateAutoTTRec: () => Promise<void>;
      importFormTemplate: (filename: string) => Promise<ImportTemplateResult>;
      convertAutoTTRecConfigToFormData: (autoTTRecConfig: AutoTTRecConfig) => Promise<AutoTTRecConfigFormFields>;
    }
  }
}
