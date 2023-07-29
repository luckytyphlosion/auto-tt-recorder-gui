import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { makeReadonlyArraySet, ValidValues } from "../../../array-set";

import useRenderCounter from "../../RenderCounter";

export const H26X_PRESETS = makeReadonlyArraySet(["ultrafast", "superfast", "veryfast", "faster", "fast", "medium", "slow", "slower", "veryslow", "placebo"] as const);
export type H26xPreset = ValidValues<typeof H26X_PRESETS>;

export function H26xPresetInput() {
  const {register} = useFormContextAutoTT();
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
