
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function KeepWindowInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="keep-window">Show Dolphin window while running: </label>
      <input type="checkbox" {...register("keep-window")}/>
    </div>
  );
}
