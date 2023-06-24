import { FileFilter, IpcRendererEvent } from "electron";
import { AutoTTRecResponse } from "../enums";
import { AutoTTRecArgs } from "./components/AutoTTRecConfigForm";

declare global {
  interface Window {
    api: {
      openFileDialog: (fileFilters: FileFilter[]) => Promise<string>;
      saveFileDialog: (fileFilters: FileFilter[]) => Promise<string>;
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
