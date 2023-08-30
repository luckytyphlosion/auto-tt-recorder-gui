
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function NoBackgroundBlurInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="no-background-blur">No background blur: </label>
      <div className="start-label-contents">
        <TriCheckbox name="no-background-blur" nameAsId={true}/>
      </div>
    </div>
  );
}
