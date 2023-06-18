
import React from "react";
import { useFormContext } from "react-hook-form";

export function UseFFV1Input() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="use-ffv1">Use FFV1 (Lossless dumps): </label>
      <input type="checkbox" {...register("use-ffv1")}/>
    </div>
  );
}
