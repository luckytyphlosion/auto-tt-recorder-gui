
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function KeepWindowInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="keep-window">Show Dolphin window: </label>
      <div className="start-label-contents">
        <TriCheckbox name="keep-window" nameAsId={true}/>
      </div>
    </div>
  );
}
