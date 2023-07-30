
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function EncodeOnlyInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="encode-only">Assume framedumps already exist (encode-only): </label>
      <TriCheckbox name="encode-only"/>
    </div>
  );
}
