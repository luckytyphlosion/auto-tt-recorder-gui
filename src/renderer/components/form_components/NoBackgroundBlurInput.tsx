
import React from "react";
import { useFormContext } from "react-hook-form";

export function NoBackgroundBlurInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="no-background-blur">No background blur: </label>
      <input type="checkbox" {...register("no-background-blur")}/>
    </div>
  );
}
