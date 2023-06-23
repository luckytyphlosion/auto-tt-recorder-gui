import React from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function OutputWidthCustomInput() {
  const {register} = useFormContext();
  const renderCounter = useRenderCounter();

  return (
    <div>
      <label htmlFor="output-width-custom"></label>
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
