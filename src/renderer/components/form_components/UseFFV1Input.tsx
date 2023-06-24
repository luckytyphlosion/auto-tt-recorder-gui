
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function UseFFV1Input() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="use-ffv1">Use FFV1 (Lossless dumps): </label>
      <input type="checkbox" {...register("use-ffv1")}/>
    </div>
  );
}
