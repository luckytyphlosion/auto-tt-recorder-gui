
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

export const PURGE_AUTO_ADD_VALUES = makeReadonlyArraySet(["never", "onerror", "always"] as const);
export type PurgeAutoAdd = ValidValues<typeof PURGE_AUTO_ADD_VALUES>;

export function PurgeAutoAddInput() {
  const renderCounter = useRenderCounter(false, "PurgeAutoAddInput");

  return (
    <div className="grid-contents">
      <label className="start-label">Purge auto-add directory: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="purge-auto-add" errorBelow={true}>
          <DeselectableRadioButton labelValue="On WBZ patch error: " id="purge-auto-add-onerror" value="onerror"/>
          <DeselectableRadioButton labelValue="Never: " id="purge-auto-add-never" value="never"/>
          <DeselectableRadioButton labelValue="Always: " id="purge-auto-add-always" value="always"/>
        </DeselectableRadioButtonGroup>
        {renderCounter}
      </div>
    </div>
  );
}
