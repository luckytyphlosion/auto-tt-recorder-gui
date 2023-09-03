import React from "react";
import { useFormContextAutoTT, lateValidateNumberInputMaker } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { OutputWidthPreset } from "./OutputWidthInput";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";

export function OutputWidthCustomInput(props: {outputWidthPreset: OutputWidthPreset}) {
  const {register} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "OutputWidthCustomInput");
  const onBlur = lateValidateNumberInputMaker("output-width-custom");

  //console.log("output-width-custom:", getValues("output-width-custom"));

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="output-width-custom">Custom output width:</label>
      <div className="start-label-contents">
        <input type="number" id="output-width-custom"
          {...register("output-width-custom", {
            valueAsNumber: true, required: {
              value: true,
              message: "This input is required."
            },
            validate: (value) => (value >= 2) || "Custom output width must be equal or greater than 2.",
            onBlur: onBlur
          })}
        ></input>
        <SimpleErrorMessage name="output-width-custom"/>
        {renderCounter}
      </div>
    </div>
  );
}
