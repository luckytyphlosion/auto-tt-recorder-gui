
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function IgnoreAutoAddMissingFilesInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="ignore-auto-add-missing-files">Ignore missing auto-add files: </label>
      <div className="start-label-contents">
        <TriCheckbox name="ignore-auto-add-missing-files" nameAsId={true}/>
      </div>
    </div>
  );
}
