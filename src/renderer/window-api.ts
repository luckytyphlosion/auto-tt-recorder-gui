import { FileFilter, IpcRendererEvent } from "electron";
import { AutoTTRecResponse } from "../shared/shared-types";
import { AutoTTRecArgs } from "./auto-tt-rec-args-types";
import { FilenameAndContents, ReadTemplateResult, ExpectedExtensionAndErrorMessage, DialogId, StringOrError, IsFileWritableResult, AutoTTRecConfig, LoadFormInputsType } from "../shared/shared-types";

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
      isFileWritable_alsoGetExtension: (filename: string, expectedExtensionMinusDot?: string) => Promise<IsFileWritableResult>;
      // this is insecure as hell but making this secure would require every single constant and type from form/layout_components
      // separately from the component file
      // I mean some of the other ipc calls I have are possibly not secure either
      // ugh
      ipcReadFileEnforceUTF8: (filename: string, badEncodingErrorMessage: string, expectedExtensionAndErrorMessage?: ExpectedExtensionAndErrorMessage) => Promise<StringOrError>;
      getAbsolutePathRelativeToFilename: (pathname: string, filenameRelativeFrom: string) => Promise<string>;
      spawnAutoTTRec: (templateFilename: string, autoTTRecArgs: AutoTTRecArgs) => Promise<boolean>;
      waitAutoTTRec: () => Promise<AutoTTRecResponse>;
      handleSendStdout: (callable: (event: IpcRendererEvent, stdoutData: string) => void) => void;
      handleSendStderr: (callable: (event: IpcRendererEvent, stderrData: string) => void) => void;
      removeHandleSendStdout: (callable: (event: IpcRendererEvent, stdoutData: string) => void) => void;
      removeHandleSendStderr: (callable: (event: IpcRendererEvent, stderrData: string) => void) => void;
      terminateAutoTTRec: () => Promise<void>;
      importFormTemplate: (filename: string) => Promise<ReadTemplateResult>;
      writeObjectToYAML: (autoTTRecConfig: AutoTTRecConfig, filename: string) => Promise<void>;
      getLoadFormInputsType: () => Promise<LoadFormInputsType>;
      saveLoadFormInputsType: (loadFormInputsType: LoadFormInputsType) => Promise<void>;
      getLastRecordedTemplateFilename: () => Promise<string>;
      getLastOpenedTemplateFilename: () => Promise<string>;
    }
  }
}
