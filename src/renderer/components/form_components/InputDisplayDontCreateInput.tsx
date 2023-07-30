
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function InputDisplayDontCreateInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="input-display-dont-create">Assume input display file already exists (input-display-dont-create): </label>
      <TriCheckbox name="input-display-dont-create"/>
    </div>
  );
}
