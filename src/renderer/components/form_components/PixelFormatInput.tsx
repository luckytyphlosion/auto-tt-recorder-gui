import React from "react";
import { useFormContext } from "react-hook-form";

export function PixelFormatInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="pixel-format">Pixel format: </label>
      <input type="text" {...register("pixel-format")}
      ></input>
    </div>
  );
}
