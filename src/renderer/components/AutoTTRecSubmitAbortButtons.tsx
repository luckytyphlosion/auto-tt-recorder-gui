import React from "react";

function AutoTTRecSubmitAbortButtons(props: {
  isAutoTTRecRunning: boolean, onAbortCallback: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
  // disabled={this.state.isAutoTTRecRunning}
  return (
    <div>
      <button type="submit">Record!</button>
      <button type="button" disabled={!props.isAutoTTRecRunning} onClick={props.onAbortCallback}>Abort</button>
    </div>
  );
}

export default AutoTTRecSubmitAbortButtons;
