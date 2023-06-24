import React from "react";
import { useAutoTTRecManager } from "./AutoTTRecManagerContext";

function AutoTTRecSubmitAbortButtons() {
  const {isAutoTTRecRunning, abortAutoTTRec} = useAutoTTRecManager();

  // disabled={this.state.isAutoTTRecRunning}
  return (
    <div>
      <button type="submit" disabled={isAutoTTRecRunning}>Record!</button>
      <button type="button" disabled={!isAutoTTRecRunning} onClick={abortAutoTTRec}>Abort</button>
    </div>
  );
}

export default AutoTTRecSubmitAbortButtons;
