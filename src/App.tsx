import React from "react";
import "./App.css";
import { AutoTTRecResponse } from "./enums.ts";

interface FileFilter {
  name: string;
  extensions: string[];
}

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAutoTTRecRunning: false,
      "iso-filename": "",
      "chadsoft-ghost-page": "",
      "track-name": "",
      "high-quality": true,
      "output-video-filename": "",
      "program-status": "Ready",
      "program-status-details": "",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.queueOpenDialog = this.queueOpenDialog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onCheckChange(event) {
    this.setState({
      [event.target.id]: !this.state[event.target.id]
    });
  }

  async queueOpenDialog(event, fileFilters: FileFilter[], targetId: string) {
    let response = await window.api.openFileDialog(fileFilters);
    this.setState({
      [targetId]: response
    });
  }

  async queueSaveDialog(event, fileFilters: FileFilter[], targetId: string) {
    let response = await window.api.saveFileDialog(fileFilters);
    this.setState({
      [targetId]: response
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.isAutoTTRecRunning) {
      console.log("Already submitting!");
      return false;
    }

    const chadsoftGhostPageLinkRegex = /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/rkgd\/([0-9A-Fa-f]{2}\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{36})\.html$/;

    let chadsoftGhostPageLink = this.state["chadsoft-ghost-page"];
    if (!chadsoftGhostPageLinkRegex.test(chadsoftGhostPageLink)) {
      this.setState({
        "program-status-details": "Not a valid chadsoft ghost page link."
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
        .catch((err) => {
          this.setState({
            "program-status": "Error",
            "program-status-details": err.message
          });
        });

      if (spawnSuccessful) {
        this.setState({
          isAutoTTRecRunning: true,
          "program-status": "Running! Don't close dolphin!",
          "program-status-details": ""
        });

        let appVariable = this;

        window.api.handleSendStdout(function (event, stdoutData) {
          appVariable.setState({
            "program-status-details": appendAccountingForCarriage(appVariable.state["program-status-details"], stdoutData)
          });
        });
        window.api.handleSendStderr(function (event, stderrData) {
          appVariable.setState({
            "program-status-details": appendAccountingForCarriage(appVariable.state["program-status-details"], stderrData)
          });
        });

        const autoTTRecResponse = await window.api.waitAutoTTRec()
          .catch((err) => {
            this.setState({
              isAutoTTRecRunning: false,
              "program-status": "Error",
              "program-status-details": this.state["program-status-details"] + err.message
            });
          });

        if (autoTTRecResponse === AutoTTRecResponse.COMPLETED) {
          this.setState({
            isAutoTTRecRunning: false,
            "program-status": "Done!"
          });
        } else if (autoTTRecResponse === AutoTTRecResponse.ABORTED) {
          this.setState({
            isAutoTTRecRunning: false,
            "program-status": "Aborted"
          });
        }
      }
    }
    return false;
  }

  async abortAutoTTRec(event) {
    await window.api.terminateAutoTTRec();
  }

  render() {
    return (
      <div>
        <div className="auto-tt-rec-notes">
          <h1 className="title-header">Auto-TT-Recorder GUI</h1>
          <ul>
            <li>This only works with NTSC-U ISOs. The program will not work otherwise.</li>
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
        <h2>Status: {this.state["program-status"]}</h2>
        <textarea
          className="status-textarea" id="program-status-details" value={this.state["program-status-details"]}
          rows="10" cols="50" readOnly={true}
        ></textarea>
      </div>
    );
  }
}

export default App;
