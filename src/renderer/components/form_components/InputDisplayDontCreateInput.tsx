
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";
import { FormInputNotesAutoTTRecArgName } from "../reusable_components/FormInputNotesAutoTTRecArgName";

export function InputDisplayDontCreateInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="input-display-dont-create">Skip encoding input display: </label>
      <div className="start-label-contents">
        <TriCheckbox name="input-display-dont-create" nameAsId={true}/>
      </div>
      <div className="start-label"></div>
      <div className="start-label-contents">
        <p className="form-input-notes">Assumes input display file already exists <FormInputNotesAutoTTRecArgName>input-display-dont-create</FormInputNotesAutoTTRecArgName>.<br/>For super advanced users only.</p>
      </div>
    </div>
  );
}
