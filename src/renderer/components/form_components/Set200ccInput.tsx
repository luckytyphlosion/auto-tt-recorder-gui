import React from "react";
import { useFormContext } from "react-hook-form";

export function Set200ccInput() {
  const {register} = useFormContext();

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
