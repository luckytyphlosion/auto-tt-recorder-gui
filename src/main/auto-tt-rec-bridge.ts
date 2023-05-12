import { IpcMainInvokeEvent } from "electron";
import child_process, { ChildProcessWithoutNullStreams } from "child_process";
import { Readable } from "stream";
import fsPromises from "fs/promises";
import YAML from "yaml";
import path from "path";
import events from "events";

import * as versions from "../versions";
import { mainWindow } from "./electron";
import { AutoTTRecResponse } from "../enums";
import { globalConfig } from "./confighandler";

interface ReadStreamResponse {
  hasData: boolean;
  output: string;
}

let autoTTRecProcess: ChildProcessWithoutNullStreams | null = null;
let terminatedAutoTTRecViaGui = false;

async function readStream(streamObj : Readable) : Promise<ReadStreamResponse> {
  if (!streamObj.readable) {
    return {hasData: false, output: ""};
  }

  let output = "";
  streamObj.resume();

  function streamObjOnData(buf: string) {
    output += buf.toString();
  }
  
  streamObj.on("data", streamObjOnData);
  
  try {
    await events.once(streamObj, "end");
  } catch (err) {
    throw (err as Error);
  }

  streamObj.removeListener("data", streamObjOnData);
  return {hasData: true, output: output.split("").join("")};
}

interface AutoTTRecConfig {
  [key: string]: string | number | boolean
}

function writeFixedDynamicAutoTTRecArgs(autoTTRecTemplate: AutoTTRecConfig) {
  autoTTRecTemplate["dolphin-folder"] = globalConfig.dolphinPath.replaceAll("\\", "/");
  autoTTRecTemplate["storage-folder"] = globalConfig.storagePath.replaceAll("\\", "/");
  autoTTRecTemplate["chadsoft-cache-folder"] = globalConfig.chadsoftCachePath.replaceAll("\\", "/");
  autoTTRecTemplate["temp-folder"] = globalConfig.tempPath.replaceAll("\\", "/");
}

export async function spawnAutoTTRec(event: IpcMainInvokeEvent, templateFilename: string, autoTTRecArgs: object) {
  const templateContents = await fsPromises.readFile(path.resolve(__dirname, "../..", templateFilename), "utf8");
  let autoTTRecTemplate: AutoTTRecConfig = YAML.parse(templateContents);
  for (const [key, value] of Object.entries(autoTTRecArgs)) {
    autoTTRecTemplate[key] = value;
  }

  writeFixedDynamicAutoTTRecArgs(autoTTRecTemplate);

  const generatedConfigContents = YAML.stringify(autoTTRecTemplate);

  await fsPromises.writeFile(path.resolve(__dirname, "../..", versions.AUTO_TT_RECORDER_FOLDER_NAME, "config.yml"), generatedConfigContents, "utf8");
  console.log("spawn-auto-tt-rec process.cwd():", process.cwd());

  // Run auto-tt-recorder here
  let autoTTRecProcessNonNull = child_process.spawn(
    path.resolve(__dirname, "../..", versions.AUTO_TT_RECORDER_FOLDER_NAME, "bin/record_ghost/record_ghost.exe"),
    ["-cfg", "config.yml"],
    {
      cwd: path.resolve(__dirname, "../..", versions.AUTO_TT_RECORDER_FOLDER_NAME),
      detached: false
    }
  );

  // https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
  // always returns ChildProcess

  autoTTRecProcess = autoTTRecProcessNonNull;

  return new Promise(function (resolve, reject) {
    autoTTRecProcessNonNull.on("spawn", function onSpawnAutoTTRec() {
      autoTTRecProcessNonNull.removeListener("spawn", onSpawnAutoTTRec);
      terminatedAutoTTRecViaGui = false;
      resolve(true);
    });
    autoTTRecProcessNonNull.on("error", function onAutoTTRecSpawnError(err) {
      autoTTRecProcessNonNull.removeListener("error", onAutoTTRecSpawnError);
      reject(err);
    });
  });
}

export async function waitAutoTTRec(event: IpcMainInvokeEvent) {
  if (autoTTRecProcess === null) {
    throw new Error("Internal error: somehow waiting for auto-tt-recorder before spawning it.");
  }

  const autoTTRecProcessNonNull = autoTTRecProcess;

  function onReceiveAutoTTRecStdout(buf: string) {
    const stdoutPretty = buf.toString();
    console.log(stdoutPretty);
    mainWindow.webContents.send("send-stdout", stdoutPretty);
  }

  function onReceiveAutoTTRecStderr(buf: string) {
    const stderrPretty = buf.toString();
    console.log(stderrPretty);
    mainWindow.webContents.send("send-stderr", stderrPretty);
  }

  autoTTRecProcess.stdout.on("data", onReceiveAutoTTRecStdout);
  autoTTRecProcess.stderr.on("data", onReceiveAutoTTRecStderr);

  return new Promise(function (resolve, reject) {
    function removeAutoTTRecProcessListeners() {
      autoTTRecProcessNonNull.stdout.removeListener("data", onReceiveAutoTTRecStdout);
      autoTTRecProcessNonNull.stderr.removeListener("data", onReceiveAutoTTRecStderr);
      autoTTRecProcessNonNull.removeListener("exit", onAutoTTRecExit);
      autoTTRecProcessNonNull.removeListener("error", onAutoTTRecErrorAfterSpawn);
    }

    async function onAutoTTRecExit(code: number, signal: string) {
      console.log("Process exited!");
      removeAutoTTRecProcessListeners();
      if (signal !== null) {
        if (terminatedAutoTTRecViaGui) {
          terminatedAutoTTRecViaGui = false;
          resolve(AutoTTRecResponse.ABORTED);
        }
        autoTTRecProcess = null;
        reject(new Error(`Auto-TT-Recorder was unexpectedly closed. (signal: ${signal})`));
      } else if (code !== 0) {
        console.log(`error code ${code}`);
        let errorMsg: string;
        try {
          let finalStderr: ReadStreamResponse = await readStream(autoTTRecProcess!.stderr!);
          if (!finalStderr.hasData) {
            errorMsg = "See above.";
          } else {
            errorMsg = finalStderr.output;
          }
        } catch (err) {
          console.log("Error in readStream");
          errorMsg = (err as Error).message;
        }
        autoTTRecProcess = null;
        reject(new Error(`An error occurred in Auto-TT-Recorder (code: ${code}): ${errorMsg}`));
      } else {
        console.log("resolved running auto-tt-rec");
        autoTTRecProcess = null;
        resolve(AutoTTRecResponse.COMPLETED);
      }
    }

    async function onAutoTTRecErrorAfterSpawn(err: Error) {
      removeAutoTTRecProcessListeners();
      autoTTRecProcess = null;
      reject(new Error(`An unknown error occurred: ${err.message}`));
    }

    autoTTRecProcessNonNull.on("exit", onAutoTTRecExit);
    autoTTRecProcessNonNull.on("error", onAutoTTRecErrorAfterSpawn);
  });
}

export async function terminateAutoTTRec(event: IpcMainInvokeEvent) {
  if (autoTTRecProcess === null) {
    return;
  }

  autoTTRecProcess.kill("SIGTERM");
  terminatedAutoTTRecViaGui = true;
}
