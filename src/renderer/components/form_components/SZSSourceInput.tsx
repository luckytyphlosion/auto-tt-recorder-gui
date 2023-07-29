import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { SZSFilenameInput } from "./SZSFilenameInput";
import { makeReadonlyArraySet, ValidValues } from "../../array-set";

export const SZS_SOURCES = makeReadonlyArraySet(["automatic", "fromfile"] as const);
export type SZSSource = ValidValues<typeof SZS_SOURCES>;

export function SZSSourceInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [szsSource, setSZSSource] = useState(getValues("szs-source"));
  const renderCounter = useRenderCounter(true);

  function updateSZSSource(event: Event) {
    setSZSSource(getValues("szs-source"));
  }

  return (
    <div>
      <label htmlFor="szs-source">Track SZS: </label>
      <label htmlFor="szs-source-automatic">Download automatically OR vanilla track:</label>
      <input type="radio" id="szs-source-automatic" value="automatic"
        {...register("szs-source", {onChange: updateSZSSource})}
      ></input>
      <label htmlFor="szs-source-from-file">Supply from SZS:</label>
      <input type="radio" id="szs-source-from-file" value="fromfile"
        {...register("szs-source", {onChange: updateSZSSource})}
      ></input>
      {renderCounter}
      {
        szsSource === "fromfile" ? <SZSFilenameInput/> : ''
      }
    </div>
  );
}
