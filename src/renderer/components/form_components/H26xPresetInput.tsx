import React from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

export function H26xPresetInput() {
  const {register} = useFormContext();
  const renderCounter = useRenderCounter(true);

  return (
    <div>
      <label htmlFor="h26x-preset">Encode speed (faster &#8594; larger filesize, slightly less quality): </label>
      <select {...register("h26x-preset", {
        required: false})}>
        <option value="ultrafast">ultrafast</option>
        <option value="superfast">superfast</option>
        <option value="veryfast">veryfast</option>
        <option value="faster">faster</option>
        <option value="fast">fast</option>
        <option value="medium">medium</option>
        <option value="slow">slow</option>
        <option value="slower">slower</option>
        <option value="veryslow">veryslow</option>
        <option value="placebo">placebo</option>
      </select>
      {renderCounter}
    </div>
  );
}
