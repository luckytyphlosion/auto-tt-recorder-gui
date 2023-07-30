
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function NoBloomInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="no-bloom">No bloom: </label>
      <TriCheckbox name="no-bloom"/>
    </div>
  );
}
