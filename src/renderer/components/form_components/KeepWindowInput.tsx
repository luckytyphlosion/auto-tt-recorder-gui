
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function KeepWindowInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="keep-window">Show Dolphin window while running: </label>
      <TriCheckbox name="keep-window"/>
    </div>
  );
}
