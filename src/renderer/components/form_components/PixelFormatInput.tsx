import React, { useCallback } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import useRenderCounter from "../../RenderCounter";

//props: {register: UseFormRegister<AutoTTRecConfigFormFields>}
export function PixelFormatInput() {
  const {register} = useFormContextAutoTT();

  const renderCounter = useRenderCounter(false, "PixelFormatInput");

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="pixel-format">Pixel format: </label>
      <div className="start-label-contents">
        <input type="text" id="pixel-format" {...register("pixel-format", {required: {
            value: true,
            message: "This input is required. (Enter yuv420p if unsure)"
          }})}
        ></input>
        <SimpleErrorMessage name="pixel-format"/>
      </div>
      {renderCounter}
    </div>
  );
}
