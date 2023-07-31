import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { SZSFilenameInput } from "./SZSFilenameInput";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const SZS_SOURCES = makeReadonlyArraySet(["automatic", "fromfile"] as const);
export type SZSSource = ValidValues<typeof SZS_SOURCES>;

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export function SZSSourceInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [szsSource, setSZSSource] = useState(getValues("szs-source"));
  const renderCounter = useRenderCounter(true);

  function updateSZSSource(event?: Event) {
    setSZSSource(getValues("szs-source"));
  }

  return (
    <div>
      <label htmlFor="szs-source">Track SZS: </label>
      <DeselectableRadioButtonGroup name="szs-source">
        <DeselectableRadioButton labelValue="Download automatically OR vanilla track:" id="szs-source-automatic" value="automatic" onChange={updateSZSSource}/>
        <DeselectableRadioButton labelValue="Supply from SZS:" id="szs-source-from-file" value="fromfile" onChange={updateSZSSource}/>
      </DeselectableRadioButtonGroup>
      {renderCounter}
      {
        szsSource === "fromfile" || szsSource === "<FILLME>" ? <SZSFilenameInput/> : ''
      }
    </div>
  );
}
