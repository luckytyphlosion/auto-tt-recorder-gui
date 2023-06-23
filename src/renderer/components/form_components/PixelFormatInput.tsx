import React from "react";
import { useFormContext } from "react-hook-form";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function PixelFormatInput() {
  const {register} = useFormContext();

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
