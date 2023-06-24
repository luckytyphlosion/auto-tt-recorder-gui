import React from "react";
import "../styles/AutoTTRecStatus.css";

import { useAutoTTRecManager } from "./AutoTTRecManagerContext";

export function AutoTTRecStatus() {
  const {programStatusHeader, programStatusDetails} = useAutoTTRecManager();
  return (
    <div>
      <h2>Status: {programStatusHeader}</h2>
      <textarea
        className="status-textarea" id="program-status-details" value={programStatusDetails}
        rows={10} cols={50} readOnly={true}
      ></textarea>
    </div>
  );
}