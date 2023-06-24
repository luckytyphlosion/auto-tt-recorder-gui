import React, { useCallback } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { UseFormRegister } from "react-hook-form";

import { AutoTTRecConfigFormFieldTypes } from "../AutoTTRecConfigForm";

import useRenderCounter from "../../RenderCounter";

export function PixelFormatInput(props: {register: UseFormRegister<AutoTTRecConfigFormFieldTypes>}) {
  //const {register} = useFormContextAutoTT();

  const renderCounter = useRenderCounter(false, "PixelFormatInput");

  return (
    <div>
      <label htmlFor="pixel-format">Pixel format: </label>
      <input type="text" {...props.register("pixel-format", {required: {
          value: true,
          message: "This input is required. (Enter yuv420p if unsure)"
        }})}
      ></input>
      <SimpleErrorMessage name="pixel-format"/>
      {renderCounter}
    </div>
  );
}
