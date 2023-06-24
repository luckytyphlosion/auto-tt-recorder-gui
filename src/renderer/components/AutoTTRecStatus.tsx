import React from "react";
import "../styles/AutoTTRecStatus.css";

import { useAutoTTRecManager } from "./AutoTTRecManagerContext";
import useRenderCounter from "../RenderCounter";

export function AutoTTRecStatus() {
  const {programStatusHeader, programStatusDetails} = useAutoTTRecManager();
  const renderCounter = useRenderCounter(false, "AutoTTRecStatus");

  return (
    <div>
      <h2>Status: {programStatusHeader}</h2>
      <textarea
        className="status-textarea" id="program-status-details" value={programStatusDetails}
        rows={10} cols={50} readOnly={true}
      ></textarea>
      {renderCounter}
    </div>
  );
}