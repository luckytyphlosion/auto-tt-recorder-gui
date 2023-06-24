import React from "react";
import "../styles/AutoTTRecStatus.css";

export function AutoTTRecStatus(props: {programStatusHeader: string, programStatusDetails: string}) {
  return (
    <div>
      <h2>Status: {props.programStatusHeader}</h2>
      <textarea
        className="status-textarea" id="program-status-details" value={props.programStatusDetails}
        rows={10} cols={50} readOnly={true}
      ></textarea>
    </div>
  );
}