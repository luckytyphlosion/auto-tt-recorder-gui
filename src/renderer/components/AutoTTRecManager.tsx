import React, { useState, useCallback, memo } from "react";
import { AutoTTRecConfigForm, areAutoTTRecConfigFormPropsEqual } from "./AutoTTRecConfigForm";
import { AutoTTRecArgs } from "../auto-tt-rec-args-types";
import { AutoTTRecStatus } from "./AutoTTRecStatus";
import { IpcRendererEvent } from "electron";
import { DEFAULT_FORM_VALUES, AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";
import { shallowCopy } from "../../shared/util-shared";

import { AutoTTRecResponse, AutoTTRecResponseStatus, AutoTTRecError, LoadFormInputsType } from "../../shared/shared-types";

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

export function AutoTTRecManager(props: {
  initialLoadFormInputsType: LoadFormInputsType,
  INITIAL_FORM_DATA: AutoTTRecConfigFormFields
}) {
  const [programStatusHeader, setProgramStatusHeader] = useState<string | JSX.Element>("Ready");
  const [programStatusDetails, setProgramStatusDetails] = useState("");
  const [isAutoTTRecRunning, setAutoTTRecRunning] = useState(false);

  console.log("AutoTTRecManager programStatusDetails:", programStatusDetails);
  const renderCounter = useRenderCounter(false, "AutoTTRecManager");

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

  const runAutoTTRec = useCallback(async function (autoTTRecArgs: AutoTTRecArgs, setSubmittedToggle: React.Dispatch<React.SetStateAction<boolean>>) {
    const spawnSuccessful = await window.api.spawnAutoTTRec("data/barebones_personal_ghost_config.yml", autoTTRecArgs)
      .catch((err: Error) => {
        setProgramStatusHeader("Error");
        setProgramStatusDetails(err.message);
        setSubmittedToggle((submittedToggle) => (!submittedToggle));
      });

    if (spawnSuccessful) {
      setAutoTTRecRunning(true);
      setProgramStatusHeader("Running! Don't close dolphin!");
      setProgramStatusDetails("");

      window.api.handleSendStdout(handleSendStdoutListener);
      window.api.handleSendStderr(handleSendStderrListener);

      const autoTTRecResponse = await window.api.waitAutoTTRec();
      if (autoTTRecResponse.status === AutoTTRecResponseStatus.COMPLETED) {
        setAutoTTRecRunning(false);
        setProgramStatusHeader("Done!");
      } else if (autoTTRecResponse.status === AutoTTRecResponseStatus.ABORTED) {
        setAutoTTRecRunning(false);
        setProgramStatusHeader("Aborted");
      } else {
        if (autoTTRecResponse.error.code === 0xc0000135) {
          setProgramStatusHeader(<>
            Error: Please install <a href="https://www.microsoft.com/en-us/download/details.aspx?id=40784">Visual C++ Redistributable Packages for Visual Studio 2013</a> in order to run Dolphin.
          </>);
        } else {
          setProgramStatusHeader("Error");
        }
        setAutoTTRecRunning(false);

        setProgramStatusDetails((programStatusDetails) => (`${programStatusDetails}${autoTTRecResponse.error.message}`));
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
      <AutoTTRecConfigForm_Memo whichUI={true} onSubmitCallback={runAutoTTRec}
        onAbortCallback={abortAutoTTRec} isAutoTTRecRunning={isAutoTTRecRunning} initialLoadFormInputsType={props.initialLoadFormInputsType} INITIAL_FORM_DATA={props.INITIAL_FORM_DATA}/>
      {renderCounter}
      <AutoTTRecStatus programStatusHeader={programStatusHeader}
        programStatusDetails={programStatusDetails}/>
    </div>
  )
}