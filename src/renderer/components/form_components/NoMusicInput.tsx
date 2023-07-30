
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function NoMusicInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="no-music">Disable Game BGM: </label>
      <TriCheckbox name="no-music"/>
    </div>
  );
}
