
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function UseFFV1Input() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="use-ffv1">Use FFV1 (Lossless dumps): </label>
      <div className="start-label-contents">
        <TriCheckbox name="use-ffv1" nameAsId={true}/>
      </div>
    </div>
  );
}
