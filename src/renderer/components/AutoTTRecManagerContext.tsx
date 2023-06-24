import React, { createContext, useContext, useState, useCallback } from "react";

import { AutoTTRecConfigForm, AutoTTRecArgs } from "./AutoTTRecConfigForm";
import { AutoTTRecStatus } from "./AutoTTRecStatus";
import { IpcRendererEvent } from "electron";

import { AutoTTRecResponse } from "../../enums";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecState {
  programStatusHeader: string,
  programStatusDetails: string,
  isAutoTTRecRunning: boolean,
  runAutoTTRec: (autoTTRecArgs: AutoTTRecArgs) => Promise<void>,
  abortAutoTTRec: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

const AutoTTRecManagerContext = createContext<AutoTTRecState>({
  programStatusHeader: "Ready",
  programStatusDetails: "",
  isAutoTTRecRunning: false,
  runAutoTTRec: async (autoTTRecArgs: AutoTTRecArgs) => {},
  abortAutoTTRec: async (event: React.MouseEvent<HTMLButtonElement>) => {}
});

function appendAccountingForCarriage(base: string, line: string) {
  let output;

  if (base.endsWith("\r")) {
    let baseAsLines = base.split("\n");
    console.log(baseAsLines.pop());
    output = baseAsLines.join("\n") + "\n" + line;
  } else {
    output = base + line;
  }

  return output;
}

export function AutoTTRecManagerProvider(props: {children?: React.ReactNode}) {
  const [programStatusHeader, setProgramStatusHeader] = useState("Ready");
  const [programStatusDetails, setProgramStatusDetails] = useState("");
  const [isAutoTTRecRunning, setAutoTTRecRunning] = useState(false);

  const renderCounter = useRenderCounter(false, "AutoTTRecManagerProvider");

  const handleSendStdoutListener = useCallback(function (event: IpcRendererEvent, stdoutData: string) {
    console.log("stdoutData:", stdoutData);
    console.log("old programStatusDetails:", programStatusDetails);
    //let newProgramStatusDetails = appendAccountingForCarriage(programStatusDetails, stdoutData);
    //console.log("newProgramStatusDetails:", newProgramStatusDetails);
    setProgramStatusDetails((programStatusDetails) => appendAccountingForCarriage(programStatusDetails, stdoutData));
  }, []);

  const handleSendStderrListener = useCallback(function (event: IpcRendererEvent, stderrData: string) {
    console.log("stderrData:", stderrData);
    console.log("old programStatusDetails:", programStatusDetails);
    //let newProgramStatusDetails = appendAccountingForCarriage(programStatusDetails, stderrData);
    //console.log("newProgramStatusDetails:", newProgramStatusDetails);
    setProgramStatusDetails((programStatusDetails) => appendAccountingForCarriage(programStatusDetails, stderrData));
  }, []);

  const runAutoTTRec = useCallback(async function (autoTTRecArgs: AutoTTRecArgs) {
    const spawnSuccessful = await window.api.spawnAutoTTRec("data/barebones_personal_ghost_config.yml", autoTTRecArgs)
      .catch((err: Error) => {
        setProgramStatusHeader("Error");
        setProgramStatusDetails(err.message);
      });

    if (spawnSuccessful) {
      setAutoTTRecRunning(true);
      setProgramStatusHeader("Running! Don't close dolphin!");
      setProgramStatusDetails("");

      //let appVariable = this;

      window.api.handleSendStdout(handleSendStdoutListener);
      window.api.handleSendStderr(handleSendStderrListener);

      const autoTTRecResponse = await window.api.waitAutoTTRec()
        .catch((err) => {
          setAutoTTRecRunning(false);
          setProgramStatusHeader("Error");
          setProgramStatusDetails((programStatusDetails) => (programStatusDetails + err.message));
        });

      if (autoTTRecResponse === AutoTTRecResponse.COMPLETED) {
        setAutoTTRecRunning(false);
        setProgramStatusHeader("Done!");
      } else if (autoTTRecResponse === AutoTTRecResponse.ABORTED) {
        setAutoTTRecRunning(false);
        setProgramStatusHeader("Aborted");
      }

      console.log("Removing std handlers!");
      window.api.removeHandleSendStdout(handleSendStdoutListener);
      window.api.removeHandleSendStderr(handleSendStderrListener);
    }
  }, []);

  const abortAutoTTRec = useCallback(async function (event: React.MouseEvent<HTMLButtonElement>) {
    await window.api.terminateAutoTTRec();
  }, []);

  return <AutoTTRecManagerContext.Provider value={{
    programStatusHeader: programStatusHeader,
    programStatusDetails: programStatusDetails,
    isAutoTTRecRunning: isAutoTTRecRunning,
    runAutoTTRec: runAutoTTRec,
    abortAutoTTRec: abortAutoTTRec
  }}>
    {props.children}
    {renderCounter}
  </AutoTTRecManagerContext.Provider>
}

export function useAutoTTRecManager() {
  return useContext(AutoTTRecManagerContext);
}