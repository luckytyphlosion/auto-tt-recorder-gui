
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function NoBackgroundBlurInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="no-background-blur">No background blur: </label>
      <TriCheckbox name="no-background-blur"/>
    </div>
  );
}
