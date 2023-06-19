import React from "react";
import { useFormContext } from "react-hook-form";

export function H26xPresetInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="h26x-preset">Encode speed (faster &#8594; larger filesize, slightly less quality): </label>
      <select {...register("h26x-preset", {
        required: true})}>
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
    </div>
  );
}
