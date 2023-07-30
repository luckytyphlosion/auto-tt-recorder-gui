
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function FadeInAtStartInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="fade-in-at-start">Fade in at start of video: </label>
      <TriCheckbox name="fade-in-at-start"/>
    </div>
  );
}
