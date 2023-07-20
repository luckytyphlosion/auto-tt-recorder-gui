
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function FadeInAtStartInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="fade-in-at-start">Fade in at start of video: </label>
      <input type="checkbox" {...register("fade-in-at-start")}/>
    </div>
  );
}
