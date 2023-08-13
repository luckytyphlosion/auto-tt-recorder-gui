
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const ASPECT_RATIO_16_BY_9_VALUES = makeReadonlyArraySet(["auto", "true", "false"] as const);
export type AspectRatio16By9 = ValidValues<typeof ASPECT_RATIO_16_BY_9_VALUES>;

export function AspectRatio16By9Input() {
  const renderCounter = useRenderCounter(true);

  return (
    <div className="grid-contents">
      <label className="start-label">Adjust aspect ratio to 16:9: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="aspect-ratio-16-by-9">
          <DeselectableRadioButton labelValue="Auto (recommended): " id="aspect-ratio-16-by-9-auto" value="auto"/>
          <DeselectableRadioButton labelValue="Yes: " id="aspect-ratio-16-by-9-true" value="true"/>
          <DeselectableRadioButton labelValue="No: " id="aspect-ratio-16-by-9-false" value="false"/>
        </DeselectableRadioButtonGroup>
        {renderCounter}
      </div>
    </div>
  );
}
