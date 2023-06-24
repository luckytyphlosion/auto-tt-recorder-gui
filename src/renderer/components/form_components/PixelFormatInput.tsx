import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function PixelFormatInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="pixel-format">Pixel format: </label>
      <input type="text" {...register("pixel-format", {required: {
          value: true,
          message: "This input is required. (Enter yuv420p if unsure)"
        }})}
      ></input>
      <SimpleErrorMessage name="pixel-format"/>
    </div>
  );
}
