import React, { useState } from "react";
import "../styles/AutoTTRecStatus.css";

import useRenderCounter from "../RenderCounter";

export function AutoTTRecStatus(props: {programStatusHeader: string | JSX.Element, programStatusDetails: string}) {
  const renderCounter = useRenderCounter(false, "AutoTTRecStatus");

  return (
    <div>
      <h2>Status: {props.programStatusHeader}</h2>
      <textarea
        className="status-textarea" id="program-status-details" value={props.programStatusDetails}
        rows={10} cols={50} readOnly={true}
      ></textarea>
      {renderCounter}
    </div>
  );
}