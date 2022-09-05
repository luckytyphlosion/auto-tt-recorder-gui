import React from "react";
import "./App.css";

interface FileFilter {
  name: string;
  extensions: string[];
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      "iso-filename": ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.queueOpenDialog = this.queueOpenDialog.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async queueOpenDialog(event, fileFilters: FileFilter[], targetInput: string) {
    let response = await window.api.openFileDialog(fileFilters);
    this.setState({
      [targetInput]: response
    });
  }

  async queueSaveDialog(event, fileFilters: FileFilter[], targetInput: string) {
    let response = await window.api.saveFileDialog(fileFilters);
    this.setState({
      [targetInput]: response
    });
  }

  render() {
    return (
      <div>
        <div className="auto-tt-rec-notes">
          <p>Some notes:</p>
          <p>This only works with NTSC-U ISOs. You will get an error otherwise</p>
          <p>No complex features, just the bare minimum to produce a recording</p>
          <p>DM luckytyphlosion#1166 for any questions.</p>
        </div>
        <form action="" method="get" className="form-example">
          <div>
            <label htmlFor="iso-filename">ISO: </label>
            <input type="text" id="iso-filename" name="iso-filename" value={this.state["iso-filename"]} onChange={this.onInputChange} required={true}></input>
            <button onClick={event => {
              this.queueOpenDialog(event, [
                {name: "ISO files", extensions: ["iso"]}
              ], "iso-filename");
            }} id="iso-filename-btn" type="button">Browse&#8230;</button>
          </div>
          <div>
            <label htmlFor="chadsoft-ghost-page">Chadsoft ghost page link: </label>
            <input type="text" id="chadsoft-ghost-page" name="chadsoft-ghost-page" required={true}></input>
          </div>
          <div>
            <label htmlFor="output-video-filename">Output filename: </label>
            <input type="text" id="output-video-filename" name="output-video-filename" value={this.state["output-video-filename"]} required={true}></input>
            <button onClick={event => {
              this.queueSaveDialog(event, [
                {name: "mp4 files", extensions: ["mp4"]}
              ], "output-video-filename");
            }} id="iso-filename-btn" type="button">Export as&#8230;</button>
          </div>
          <div>
            <button type="submit">Record!</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
