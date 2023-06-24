
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function NoBloomInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="no-bloom">No bloom: </label>
      <input type="checkbox" {...register("no-bloom")}/>
    </div>
  );
}
