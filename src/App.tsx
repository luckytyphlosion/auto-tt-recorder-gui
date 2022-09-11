
import React from "react";
import "./App.css";
import { AutoTTRecResponse } from "./shared/enums";
import { IpcRendererEvent } from "electron";

//type HandleSendStdoutDeclaration = 
declare global {
  interface Window {
    api: {
      openFileDialog: (fileFilters: FileFilter[]) => Promise<string>;
      saveFileDialog: (fileFilters: FileFilter[]) => Promise<string>;
      spawnAutoTTRec: (templateFilename: string, autoTTRecArgs: {[key: string]: string | number | null}) => Promise<boolean>;
      waitAutoTTRec: () => Promise<AutoTTRecResponse>;
      handleSendStdout: (callable: (event: IpcRendererEvent, stdoutData: string) => void) => void;
      handleSendStderr: (callable: (event: IpcRendererEvent, stderrData: string) => void) => void;
      terminateAutoTTRec: () => Promise<void>;
    }
  }
}

interface FileFilter {
  name: string;
  extensions: string[];
}

interface AppState {
  "iso-filename": string;
  "chadsoft-ghost-page": string;
  "track-name": string;
  "output-video-filename": string;
  "high-quality": boolean;
  isAutoTTRecRunning: boolean;
  programStatus: string;
  programStatusDetails: string;
}

interface AppProps {

}

const APP_TEXT_INPUT_KEY_NAMES = ["iso-filename", "chadsoft-ghost-page", "track-name", "output-video-filename"] as const;
type AppTextInputKeys = typeof APP_TEXT_INPUT_KEY_NAMES[number];

const APP_CHECK_INPUT_KEY_NAMES = ["high-quality"] as const;
type AppCheckInputKeys = typeof APP_CHECK_INPUT_KEY_NAMES[number];

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

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    let state = {
      "iso-filename": "",
      "chadsoft-ghost-page": "",
      "track-name": "",
      "output-video-filename": "",
      "high-quality": true,
      isAutoTTRecRunning: false,
      programStatus: "Ready",
      programStatusDetails: ""
    };
    this.state = state;
    this.onInputChange = this.onInputChange.bind(this);
    this.queueOpenDialog = this.queueOpenDialog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  //dynamicSetState<K extends keyof AppState>(key: K, value: AppState[K]) {
  //  this.setState({[key]: value} as Pick<AppState, K>);
  //}

  onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // FIXME need to figure out how to do this type safety better
    this.setState({
      [event.target.id as keyof AppState]: event.target.value as AppState[keyof AppState]
    } as Pick<AppState, keyof AppState>);
  }

  //onInputChange2<K extends keyof AppState>(key: K, value: AppState[K]) {
  //  this.setState((prevState, props) => ({
  //    ...prevState,
  //    [key]: value
  //  }));
  //}

  //dynamicSetState<K extends keyof AppState>(key: K, value: AppState[K]) {
  //  this.setState({[key]: value} as Pick<State, K>);
  //}

  /*onInputChangeArgs(key: AppTextInputKeys, value: string) {
    this.setState({
      [key]: value
    });
  }*/

  onCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    // FIXME need to figure out how to do this type safety better
    //let key: K extends keyof AppState;
    this.setState((prevState, props) => ({
      ...prevState,
      [event.target.id as keyof AppState]: !prevState[event.target.id as keyof AppState]
    }));
  }

  async queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[], targetId: keyof AppState) {
    let response = await window.api.openFileDialog(fileFilters);
    this.setState({
      [targetId]: response as AppState[keyof AppState]
    } as Pick<AppState, keyof AppState>);
  }

  async queueSaveDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[], targetId: keyof AppState) {
    let response = await window.api.saveFileDialog(fileFilters);
    this.setState({
      [targetId]: response as AppState[keyof AppState]
    } as Pick<AppState, keyof AppState>);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      }

      const spawnSuccessful = await window.api.spawnAutoTTRec("public/barebones_personal_ghost_config.yml", autoTTRecArgs)
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

        window.api.handleSendStdout(function (event: IpcRendererEvent, stdoutData: string) {
          appVariable.setState((prevState, props) => ({
            programStatusDetails: appendAccountingForCarriage(prevState.programStatusDetails, stdoutData)
          }));
        });
        window.api.handleSendStderr(function (event, stderrData) {
          appVariable.setState((prevState, props) => ({
            programStatusDetails: appendAccountingForCarriage(prevState.programStatusDetails, stderrData)
          }));
        });

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
      }
    }
    return false;
  }

  async abortAutoTTRec(event: React.MouseEvent<HTMLButtonElement>) {
    await window.api.terminateAutoTTRec();
  }

  render() {
    return (
      <div>
        <div className="auto-tt-rec-notes">
          <h1 className="title-header">Auto-TT-Recorder GUI</h1>
          <ul>
            <li>This only works with NTSC-U ISOs. The program will not work otherwise. Other regions will be supported in the future.</li>
            <li><strong>IT MUST BE A FULL ISO. NKIT OR WBFS WON'T WORK. A FULL ISO IS REQUIRED FOR AUTO-DOWNLOADING CUSTOM TRACKS.</strong></li>
            <li>No complex features, just the bare minimum to produce a recording.</li>
            <li>Individual ISOs differ in loading times. If it looks like Dolphin isn't making any progress recording, abort and for now, get a better ISO (this will be fixed sometime in the future).</li>
            <li>DM luckytyphlosion#1166 for any questions.</li>
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="iso-filename">ISO: </label>
            <input type="text"
              id="iso-filename" name="iso-filename" value={this.state["iso-filename"]}
              /*onChange={(event) => {(this.onInputChange2("iso-filename", false))}}*/
              onChange={this.onInputChange} required={true}
            ></input>
            <button onClick={event => {
              this.queueOpenDialog(event, [
                {name: "ISO files", extensions: ["iso"]}
              ], "iso-filename");
            }} id="iso-filename-btn" type="button">Browse&#8230;</button>
          </div>
          <div>
            <label htmlFor="chadsoft-ghost-page">Chadsoft ghost page link: </label>
            <input type="text"
              id="chadsoft-ghost-page" name="chadsoft-ghost-page" value={this.state["chadsoft-ghost-page"]}
              onChange={this.onInputChange} required={true}
            ></input>
          </div>
          <div>
            <label htmlFor="track-name">Track name: </label>
            <input type="text"
              id="track-name" name="track-name" value={this.state["track-name"]}
              onChange={this.onInputChange} required={true}
            ></input>
          </div>
          <div>
            <label htmlFor="high-quality">High quality (1440p vs 480p): </label>
            <input type="checkbox" id="high-quality" checked={this.state["high-quality"]} onChange={this.onCheckChange}/>
          </div>
          <div>
            <label htmlFor="output-video-filename">Output filename: </label>
            <input
              className="filename-input" type="text"
              id="output-video-filename" name="output-video-filename" value={this.state["output-video-filename"]}
              onChange={this.onInputChange} required={true}
            ></input>
            <button onClick={event => {
              this.queueSaveDialog(event, [
                {name: "mp4 files", extensions: ["mp4"]}
              ], "output-video-filename");
            }} id="iso-filename-btn" type="button">Export as&#8230;</button>
          </div>
          <div>
            <button type="submit" disabled={this.state.isAutoTTRecRunning}>Record!</button>
            <button type="button" disabled={!this.state.isAutoTTRecRunning} onClick={this.abortAutoTTRec}>Abort</button>
          </div>
        </form>
        <h2>Status: {this.state.programStatus}</h2>
        <textarea
          className="status-textarea" id="program-status-details" value={this.state.programStatusDetails}
          rows={10} cols={50} readOnly={true}
        ></textarea>
      </div>
    );
  }
}

export default App;
