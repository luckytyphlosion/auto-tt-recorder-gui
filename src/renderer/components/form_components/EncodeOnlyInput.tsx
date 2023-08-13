
import React from "react";
import { TriCheckbox } from "../TriCheckbox";

export function EncodeOnlyInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="encode-only">Assume framedumps already exist (encode-only): </label>
      <div className="start-label-contents">
        <TriCheckbox name="encode-only" nameAsId={true}/>
      </div>
    </div>
  );
}
