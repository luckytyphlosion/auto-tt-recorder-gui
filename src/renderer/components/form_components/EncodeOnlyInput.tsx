
import React from "react";
import { useFormContext } from "react-hook-form";

export function EncodeOnlyInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="encode-only">Assume framedumps already exist (encode-only): </label>
      <input type="checkbox" {...register("encode-only")}/>
    </div>
  );
}
