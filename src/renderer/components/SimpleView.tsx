import React, { useState } from "react";
import { AutoTTRecConfigFormComponents } from "./AutoTTRecConfigFormComponents";
import { AutoTTRecConfigFormComponents2 } from "./AutoTTRecConfigFormComponents2";
import GUIHeader from "./GUIHeader";
import { useForm } from "react-hook-form";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";

function SimpleView() {

  /*async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.state.isAutoTTRecRunning) {
      console.log("Already submitting!");
      return false;
    }

    const chadsoftGhostPageLinkRegex = /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/rkgd\/([0-9A-Fa-f]{2}\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{36})\.html$/;

    let chadsoftGhostPageLink = this.state["chadsoft-ghost-page"];
    if (!chadsoftGhostPageLinkRegex.test(chadsoftGhostPageLink)) {
      this.setState({
        programStatusDetails: "Not a valid chadsoft ghost page link."
      });
    } else {
      let autoTTRecArgs = {
        "iso-filename": this.state["iso-filename"].replaceAll("\\", "/"),
        "chadsoft-ghost-page": this.state["chadsoft-ghost-page"],
        "output-video-filename": this.state["output-video-filename"].replaceAll("\\", "/"),
        "track-name": this.state["track-name"],
        "dolphin-resolution": this.state["high-quality"] ? "1440p" : "480p",
        "output-width": this.state["high-quality"] ? 2560 : null
      };

      const spawnSuccessful = await window.api.spawnAutoTTRec("data/barebones_personal_ghost_config.yml", autoTTRecArgs)
        .catch((err: Error) => {
          this.setState({
            programStatus: "Error",
            programStatusDetails: err.message
          });
        });

      if (spawnSuccessful) {
        this.setState({
          isAutoTTRecRunning: true,
          programStatus: "Running! Don't close dolphin!",
          programStatusDetails: ""
        });

        let appVariable = this;

        function handleSendStdoutListener(event: IpcRendererEvent, stdoutData: string) {
            appVariable.setState((prevState, props) => ({
            programStatusDetails: appendAccountingForCarriage(prevState.programStatusDetails, stdoutData)
          }));
        }

        function handleSendStderrListener(event: IpcRendererEvent, stderrData: string) {
            appVariable.setState((prevState, props) => ({
            programStatusDetails: appendAccountingForCarriage(prevState.programStatusDetails, stderrData)
          }));
        }

        window.api.handleSendStdout(handleSendStdoutListener);
        window.api.handleSendStderr(handleSendStderrListener);

        const autoTTRecResponse = await window.api.waitAutoTTRec()
          .catch((err) => {
            this.setState((prevState, props) => ({
              isAutoTTRecRunning: false,
              programStatus: "Error",
              programStatusDetails: prevState.programStatusDetails + err.message
            }));
          });

        if (autoTTRecResponse === AutoTTRecResponse.COMPLETED) {
          this.setState({
            isAutoTTRecRunning: false,
            programStatus: "Done!"
          });
        } else if (autoTTRecResponse === AutoTTRecResponse.ABORTED) {
          this.setState({
            isAutoTTRecRunning: false,
            programStatus: "Aborted"
          });
        }

        console.log("Removing std handlers!");
        window.api.removeHandleSendStdout(handleSendStdoutListener);
        window.api.removeHandleSendStderr(handleSendStderrListener);
      }
    }
    return false;
  }*/

  const {register, handleSubmit, setValue} = useForm();
  const [whichUI, setWhichUI] = useState(false);

  function onCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    // FIXME need to figure out how to do this type safety better
    //let key: K extends keyof AppState;
    setWhichUI(!whichUI);
  }

  function onSubmit(d: any) {
    console.log(d);
  }

  return (
    <div>
      <GUIHeader/>
      <div>
        <label htmlFor="sandbox-which-gui">Which GUI: </label>
        <input type="checkbox" id="sandbox-which-gui" checked={whichUI} onChange={onCheckChange}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          !whichUI ?
            <AutoTTRecConfigFormComponents register={register} setValue={setValue}/> :
            <AutoTTRecConfigFormComponents2 register={register} setValue={setValue}/>
        }
        <AutoTTRecSubmitAbortButtons/>
      </form>
    </div>
  );
}

export default SimpleView;