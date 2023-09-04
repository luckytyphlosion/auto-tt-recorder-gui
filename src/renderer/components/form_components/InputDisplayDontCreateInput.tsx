
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";
import { FormInputNotesInlineCode } from "../reusable_components/FormInputNotesInlineCode";

export function InputDisplayDontCreateInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="input-display-dont-create">Skip encoding input display: </label>
      <div className="start-label-contents">
        <TriCheckbox name="input-display-dont-create" nameAsId={true}/>
      </div>
      <div className="start-label"></div>
      <div className="start-label-contents">
        <p className="form-input-notes">Assumes input display file already exists <FormInputNotesInlineCode>input-display-dont-create</FormInputNotesInlineCode>.<br/>For super advanced users only.</p>
      </div>
    </div>
  );
}
