import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../array-set";

export const TOP_10_GECKO_CODE_LOCATION_REGIONS = makeReadonlyArraySet(["worldwide", "regional"] as const);
export type Top10GeckoCodeLocationRegion = ValidValues<typeof TOP_10_GECKO_CODE_LOCATION_REGIONS>;

export function Top10GeckoCodeLocationInput() {
  const {register} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  return (
    <div>
      <label htmlFor="top-10-gecko-code-location-region">Region: </label>
      <label htmlFor="top-10-gecko-code-location-region-ww">Worldwide:</label>
      <input type="radio" id="top-10-gecko-code-location-region-ww" value="worldwide"
        {...register("top-10-gecko-code-location-region")}
      ></input>
      <label htmlFor="top-10-gecko-code-location-region-regional">Regional (No globe):</label>
      <input type="radio" id="stop-10-gecko-code-location-region-regional" value="regional"
        {...register("top-10-gecko-code-location-region")}
      ></input>
      {renderCounter}
    </div>
  );
}
