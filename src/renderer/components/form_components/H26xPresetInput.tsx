import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableDropdown } from "../generic_components/DeselectableDropdown";

import useRenderCounter from "../../RenderCounter";

export const H26X_PRESETS = makeReadonlyArraySet(["ultrafast", "superfast", "veryfast", "faster", "fast", "medium", "slow", "slower", "veryslow", "placebo"] as const);
export type H26xPreset = ValidValues<typeof H26X_PRESETS>;

export function H26xPresetInput(props: {addCRFReminderToLabel: boolean}) {
  const renderCounter = useRenderCounter(true);

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="h26x-preset">Encode speed: </label>
      <div className="start-label-contents">
        <DeselectableDropdown name="h26x-preset" nameAsId={true}>
          <option value="ultrafast">ultrafast</option>
          <option value="superfast">superfast</option>
          <option value="veryfast">veryfast</option>
          <option value="faster">faster</option>
          <option value="fast">fast</option>
          <option value="medium">medium</option>
          <option value="slow">slow</option>
          <option value="slower">slower</option>
          <option value="veryslow">veryslow</option>
          <option value="placebo">placebo</option>
        </DeselectableDropdown>
      </div>
      <label className="start-label form-input-notes--start-label">{props.addCRFReminderToLabel ? "(For CRF)" : ""}</label>
      <div className="start-label-contents">
        <p className="form-input-notes">Faster option &#8594; larger filesize.<br/>Ultrafast/superfast have slightly less quality.</p>
      </div>
      {renderCounter}
    </div>
  );
}
