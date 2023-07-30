
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function UseFFV1Input() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="use-ffv1">Use FFV1 (Lossless dumps): </label>
      <TriCheckbox name="use-ffv1"/>
    </div>
  );
}
