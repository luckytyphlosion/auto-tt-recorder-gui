
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

export type AspectRatio16By9 = "auto" | "true" | "false";

export function AspectRatio16By9Input() {
  const {register} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  return (
    <div>
      <label htmlFor="aspect-ratio-16-by-9">Adjust aspect ratio to 16:9: </label>
      <label htmlFor="aspect-ratio-16-by-9-auto">Auto (recommended): </label>
      <input type="radio" id="aspect-ratio-16-by-9-auto" value="auto"
        {...register("aspect-ratio-16-by-9")}
      ></input>
      <label htmlFor="aspect-ratio-16-by-9-true">Yes: </label>
      <input type="radio" id="aspect-ratio-16-by-9-true" value="true"
        {...register("aspect-ratio-16-by-9")}
      ></input>
      <label htmlFor="aspect-ratio-16-by-9-false">No: </label>
      <input type="radio" id="aspect-ratio-16-by-9-false" value="false"
        {...register("aspect-ratio-16-by-9")}
      ></input>
      {renderCounter}
    </div>
  );
}
