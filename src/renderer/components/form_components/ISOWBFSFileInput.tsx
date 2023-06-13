
function ISOWBFSFileInput() {
  return (
    <div>
      <label htmlFor="iso-filename">ISO or WBFS: </label>
      <input type="text"
        id="iso-filename" name="iso-filename" value={this.state["iso-filename"]}
        /*onChange={(event) => {(this.onInputChange2("iso-filename", false))}}*/
        onChange={this.onInputChange} required={true}
      ></input>
      <button onClick={event => {
        this.queueOpenDialog(event, [
          {name: "ISO/WBFS files", extensions: ["iso", "wbfs"]}
        ], "iso-filename");
      }} id="iso-filename-btn" type="button">Browse&#8230;</button>
    </div>
  );
}