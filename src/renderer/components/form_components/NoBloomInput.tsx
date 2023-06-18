
import React from "react";
import { useFormContext } from "react-hook-form";

export function NoBloomInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="no-bloom">No bloom: </label>
      <input type="checkbox" {...register("no-bloom")}/>
    </div>
  );
}
