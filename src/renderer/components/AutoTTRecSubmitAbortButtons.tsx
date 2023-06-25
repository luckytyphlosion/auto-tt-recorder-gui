import React from "react";
import { useAutoTTRecManager } from "./AutoTTRecManagerContext";

import useRenderCounter from "../RenderCounter";

function AutoTTRecSubmitAbortButtons(props: {
  isAutoTTRecRunning: boolean, onAbortCallback: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
  const renderCounter = useRenderCounter(false, "AutoTTRecSubmitAbortButtons");

  // disabled={this.state.isAutoTTRecRunning}
  return (
    <div>
      <button type="submit" disabled={props.isAutoTTRecRunning}>Record!</button>
      <button type="button" disabled={!props.isAutoTTRecRunning} onClick={props.onAbortCallback}>Abort</button>
      {renderCounter}
    </div>
  );
}

export default AutoTTRecSubmitAbortButtons;
