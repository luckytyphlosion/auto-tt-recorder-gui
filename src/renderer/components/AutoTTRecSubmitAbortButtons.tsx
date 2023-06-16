import React from "react";

function AutoTTRecSubmitAbortButtons() {
  // disabled={this.state.isAutoTTRecRunning}
  return (
    <div>
      
      <button type="submit" >Record!</button>
      {/*<button type="button" disabled={!this.state.isAutoTTRecRunning} onClick={this.abortAutoTTRec}>Abort</button>*/}
    </div>
  );
}

export default AutoTTRecSubmitAbortButtons;
