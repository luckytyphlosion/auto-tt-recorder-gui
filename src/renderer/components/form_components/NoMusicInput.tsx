
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function NoMusicInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="no-music">Disable Game BGM: </label>
      <input type="checkbox" {...register("no-music")}/>
    </div>
  );
}
