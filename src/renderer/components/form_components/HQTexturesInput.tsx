
import React from "react";
import { useFormContext } from "react-hook-form";

export function HQTexturesInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="hq-textures">HQ Textures: </label>
      <input type="checkbox" {...register("hq-textures")}/>
    </div>
  );
}
