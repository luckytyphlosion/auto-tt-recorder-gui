
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function HQTexturesInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="hq-textures">HQ Textures: </label>
      <input type="checkbox" {...register("hq-textures")}/>
    </div>
  );
}
