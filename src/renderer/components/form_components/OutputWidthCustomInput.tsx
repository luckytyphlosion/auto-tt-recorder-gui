import React from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

export function OutputWidthCustomInput() {
  const {register} = useFormContext();
  const renderCounter = useRenderCounter();

  return (
    <div>
      <label htmlFor="output-width-custom"></label>
      <input type="number" min={2}
        {...register("output-width-custom")}
      ></input>
      {renderCounter}
    </div>
  );
}
