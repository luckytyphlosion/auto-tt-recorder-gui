import React, { useState } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { SZSFilenameInput } from "./SZSFilenameInput";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const SZS_SOURCES = makeReadonlyArraySet(["automatic", "fromfile"] as const);
export type SZSSource = ValidValues<typeof SZS_SOURCES>;

import { DeselectableRadioButton, DeselectableRadioButtonGroupInGrid } from "../DeselectableRadioButton";

export function SZSSourceInput() {
  const {getValues} = useFormContextAutoTT();
  const [szsSource, setSZSSource] = useState(getValues("szs-source"));
  const renderCounter = useRenderCounter(true);
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  function updateSZSSource(event?: Event) {
    setSZSSource(getValues("szs-source"));
  }

  return (
    <div className="grid-contents">
      <DeselectableRadioButtonGroupInGrid name="szs-source" startLabel="Track SZS:" blockDisplay={true} extraThirdColElements={renderCounter}>
        <DeselectableRadioButton labelValue="Auto-download OR vanilla track:" id="szs-source-automatic" value="automatic" onChange={updateSZSSource}/>
        <DeselectableRadioButton labelValue="Supply from SZS:" id="szs-source-from-file" value="fromfile" onChange={updateSZSSource}/>
      </DeselectableRadioButtonGroupInGrid>
      {
        isValueOrFILLMEIsValue(szsSource, "fromfile") ? <SZSFilenameInput/> : ''
      }
    </div>
  );
}
