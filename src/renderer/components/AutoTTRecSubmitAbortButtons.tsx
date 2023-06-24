import React from "react";
import { useAutoTTRecManager } from "./AutoTTRecManagerContext";

import useRenderCounter from "../RenderCounter";

function AutoTTRecSubmitAbortButtons() {
  const {isAutoTTRecRunning, abortAutoTTRec} = useAutoTTRecManager();
  const renderCounter = useRenderCounter(false, "AutoTTRecSubmitAbortButtons");

  // disabled={this.state.isAutoTTRecRunning}
  return (
    <div>
      <button type="submit" disabled={isAutoTTRecRunning}>Record!</button>
      <button type="button" disabled={!isAutoTTRecRunning} onClick={abortAutoTTRec}>Abort</button>
      {renderCounter}
    </div>
  );
}

export default AutoTTRecSubmitAbortButtons;
