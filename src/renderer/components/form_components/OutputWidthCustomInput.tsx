import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { OutputWidthPreset } from "./OutputWidthInput";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function OutputWidthCustomInput(props: {outputWidthPreset: OutputWidthPreset}) {
  const {register, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter();
  console.log("output-width-custom:", getValues("output-width-custom"));

  return (
    <div>
      {
        props.outputWidthPreset === "<FILLME>" ? <label htmlFor="output-width-custom">(Custom output width) </label> : ""
      }
      <input type="number"
        {...register("output-width-custom", {valueAsNumber: true, required: {
          value: true,
          message: "This input is required."
        },
        validate: (value) => (value >= 2) || "Custom output width must be equal or greater than 2."
        })}
      ></input>
      <SimpleErrorMessage name="output-width-custom"/>
      {renderCounter}
    </div>
  );
}
