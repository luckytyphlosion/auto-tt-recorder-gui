
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function NoBloomInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="no-bloom">No bloom: </label>
      <div className="start-label-contents">
        <TriCheckbox name="no-bloom" nameAsId={true}/>
      </div>
    </div>
  );
}
