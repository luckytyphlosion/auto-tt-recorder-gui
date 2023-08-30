
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function FadeInAtStartInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="fade-in-at-start">Fade in at start of video: </label>
      <div className="start-label-contents">
        <TriCheckbox name="fade-in-at-start" nameAsId={true}/>
      </div>

    </div>
  );
}
