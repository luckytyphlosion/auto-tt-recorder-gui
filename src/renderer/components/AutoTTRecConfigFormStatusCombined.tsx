import React, { useState, useCallback, memo } from "react";
import { AutoTTRecConfigForm, AutoTTRecArgs } from "./AutoTTRecConfigForm";
import { AutoTTRecStatus } from "./AutoTTRecStatus";
import { IpcRendererEvent } from "electron";

import { AutoTTRecResponse } from "../../enums";

import useRenderCounter from "../RenderCounter";

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

const AutoTTRecConfigForm_Memo = memo(AutoTTRecConfigForm);

export function AutoTTRecConfigFormStatusCombined() {
  const [programStatusHeader, setProgramStatusHeader] = useState("Ready");
  const [programStatusDetails, setProgramStatusDetails] = useState("");
  const [isAutoTTRecRunning, setAutoTTRecRunning] = useState(false);
  console.log("AutoTTRecConfigFormStatusCombined programStatusDetails:", programStatusDetails);
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigFormStatusCombined");
  const randomNum = Math.random();

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

  return (
    <div>
      <h2>Test header {randomNum}</h2>
      <AutoTTRecConfigForm_Memo whichUI={true} onSubmitCallback={runAutoTTRec}
        onAbortCallback={abortAutoTTRec} isAutoTTRecRunning={isAutoTTRecRunning}/>
      {renderCounter}
      <AutoTTRecStatus programStatusHeader={programStatusHeader}
        programStatusDetails={programStatusDetails}/>
    </div>
  )
}