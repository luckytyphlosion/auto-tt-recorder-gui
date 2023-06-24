
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function EncodeOnlyInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="encode-only">Assume framedumps already exist (encode-only): </label>
      <input type="checkbox" {...register("encode-only")}/>
    </div>
  );
}
