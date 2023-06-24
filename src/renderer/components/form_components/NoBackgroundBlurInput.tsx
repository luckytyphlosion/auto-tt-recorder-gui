
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function NoBackgroundBlurInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="no-background-blur">No background blur: </label>
      <input type="checkbox" {...register("no-background-blur")}/>
    </div>
  );
}
