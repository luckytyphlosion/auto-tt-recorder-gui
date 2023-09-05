
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";
import { FormInputNotesAutoTTRecArgName } from "../reusable_components/FormInputNotesAutoTTRecArgName";

export function EncodeOnlyInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="encode-only">Skip dumping frames: </label>
      <div className="start-label-contents">
        <TriCheckbox name="encode-only" nameAsId={true}/>
      </div>
      <div className="start-label"></div>
      <div className="start-label-contents">
        <p className="form-input-notes">Assumes framedumps already exist <FormInputNotesAutoTTRecArgName>encode-only</FormInputNotesAutoTTRecArgName>.<br/>For super advanced users only.</p>
      </div>

    </div>
  );
}
