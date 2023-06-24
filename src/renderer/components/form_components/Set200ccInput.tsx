import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function Set200ccInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="no-200cc">150cc: </label>
      <input type="radio" id="no-200cc" value="no-200cc"
        {...register("set-200cc")}
      ></input>
      <label htmlFor="on-200cc">200cc: </label>
      <input type="radio" id="on-200cc" value="on-200cc"
        {...register("set-200cc")}
      ></input>
    </div>
  );
}
