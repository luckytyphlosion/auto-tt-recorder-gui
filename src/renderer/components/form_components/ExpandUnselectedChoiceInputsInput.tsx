
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function ExpandUnselectedChoiceInputsInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="expand-unselected-choice-inputs">Expand unselected choice inputs (advanced): </label>
      <input type="checkbox" {...register("expand-unselected-choice-inputs")}/>
    </div>
  );
}
