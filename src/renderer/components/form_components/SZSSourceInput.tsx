import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

import { SZSFilenameInput } from "./SZSFilenameInput";

export function SZSSourceInput() {
  const {register, getValues} = useFormContext();
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
