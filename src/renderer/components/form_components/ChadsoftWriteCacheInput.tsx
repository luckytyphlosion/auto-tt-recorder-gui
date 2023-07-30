
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function ChadsoftWriteCacheInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="chadsoft-write-cache">Cache downloaded Chadsoft files (chadsoft-write-cache): </label>
      <TriCheckbox name="chadsoft-write-cache"/>
    </div>
  );
}
