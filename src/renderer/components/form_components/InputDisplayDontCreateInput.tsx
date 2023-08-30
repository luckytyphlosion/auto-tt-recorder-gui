
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function InputDisplayDontCreateInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="input-display-dont-create">Assume input display file already exists (input-display-dont-create): </label>
      <div className="start-label-contents">
        <TriCheckbox name="input-display-dont-create" nameAsId={true}/>
      </div>
    </div>
  );
}
