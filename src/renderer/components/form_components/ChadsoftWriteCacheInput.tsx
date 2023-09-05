
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";
import { FormInputNotesAutoTTRecArgName } from "../reusable_components/FormInputNotesAutoTTRecArgName";

export function ChadsoftWriteCacheInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="chadsoft-write-cache">Cache Chadsoft files: </label>
      <div className="start-label-contents">
        <TriCheckbox name="chadsoft-write-cache" nameAsId={true}/>
      </div>
      <label className="start-label"></label>
      <div className="start-label-contents">
        <p className="form-input-notes">Cache downloaded Chadsoft files for re-use <FormInputNotesAutoTTRecArgName>chadsoft-write-cache</FormInputNotesAutoTTRecArgName>.</p>
      </div>
    </div>
  );
}
