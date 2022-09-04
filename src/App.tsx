import React from "react";

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

  async queueOpenDialog(event) {
    const response = await window.api.openFileDialog();
    this.setState({
      [event.target.dataset.input]: response
    });
  }

  render() {
    return (
      <div>
        <form action="" method="get" className="form-example">
          <div>
            <label htmlFor="iso-filename">ISO: </label>
            <input type="text" id="iso-filename" name="iso-filename" value={this.state["iso-filename"]} onChange={this.onInputChange} required={true}></input>
            <button onClick={this.queueOpenDialog} id="iso-filename-btn" data-input="iso-filename" type="button">Browse&#8230;</button>
          </div>
          <div>
            <label htmlFor="chadsoft-ghost-page">Chadsoft ghost page link: </label>
            <input type="text" id="chadsoft-ghost-page" name="chadsoft-ghost-page" required={true}></input>
          </div>
          <div>
            <label htmlFor="output-video-filename">Output filename: </label>
            <input type="text" id="output-video-filename" name="output-video-filename" required={true}></input>
            <button id="iso-filename-btn" type="button">Export as&#8230;</button>
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
