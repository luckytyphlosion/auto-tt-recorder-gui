import React, { useCallback } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import useRenderCounter from "../../RenderCounter";

export function PixelFormatInput() {
  const {register} = useFormContextAutoTT();

  const renderCounter = useRenderCounter(false, "PixelFormatInput");

  return (
    <div>
      <label htmlFor="pixel-format">Pixel format: </label>
      <input type="text" {...register("pixel-format", {required: {
          value: true,
          message: "This input is required. (Enter yuv420p if unsure)"
        }})}
      ></input>
      <SimpleErrorMessage name="pixel-format"/>
      {renderCounter}
    </div>
  );
}
