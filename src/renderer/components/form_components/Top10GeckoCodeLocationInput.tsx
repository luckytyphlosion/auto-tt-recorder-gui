import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

export const TOP_10_GECKO_CODE_LOCATION_REGIONS = makeReadonlyArraySet(["worldwide", "regional"] as const);
export type Top10GeckoCodeLocationRegion = ValidValues<typeof TOP_10_GECKO_CODE_LOCATION_REGIONS>;

export function Top10GeckoCodeLocationInput() {
  const renderCounter = useRenderCounter(true);

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-gecko-code-location-region">Region: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="top-10-gecko-code-location-region" errorBelow={true}>
          <DeselectableRadioButton labelValue="Worldwide:" id="top-10-gecko-code-location-region-ww" value="worldwide"/>
          <DeselectableRadioButton labelValue="Regional (No globe):" id="stop-10-gecko-code-location-region-regional" value="regional"/>
        </DeselectableRadioButtonGroup>
        {renderCounter}
      </div>
    </div>
  );
}
