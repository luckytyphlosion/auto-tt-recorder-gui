import React, { useState } from "react";
import "../styles/AutoTTRecStatus.css";

import { useAutoTTRecManager } from "./AutoTTRecManagerContext";
import useRenderCounter from "../RenderCounter";

export function AutoTTRecStatus(props: {programStatusHeader: string, programStatusDetails: string}) {
  const renderCounter = useRenderCounter(false, "AutoTTRecStatus");
  const [stateTest2, setStateTest2] = useState(false);

  function onCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStateTest2((stateTest2) => !stateTest2);
  }

  return (
    <div>
      <h2>Status: {props.programStatusHeader}</h2>
      <textarea
        className="status-textarea" id="program-status-details" value={props.programStatusDetails}
        rows={10} cols={50} readOnly={true}
      ></textarea>
      <input type="checkbox" id="state-test2" checked={stateTest2} onChange={onCheckChange}/>

      {renderCounter}
    </div>
  );
}