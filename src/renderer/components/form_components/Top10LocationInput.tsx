import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { Top10LocationCountryInput } from "./Top10LocationCountryInput";

import { makeReadonlyArraySet, ValidValues } from "../../array-set";

export const TOP_10_LOCATION_REGIONS = makeReadonlyArraySet(["worldwide", "regional", "country"] as const);
export type Top10LocationRegion = ValidValues<typeof TOP_10_LOCATION_REGIONS>;

export function Top10LocationInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [top10LocationRegion, setTop10LocationRegion] = useState(getValues("top-10-location-region"));

  function updateTop10LocationRegion(event: Event) {
    setTop10LocationRegion(getValues("top-10-location-region"));
  }

  return (
    <div>
      <label htmlFor="top-10-location-region">Region: </label>
      <select {...register("top-10-location-region", {
        required: false, onChange: updateTop10LocationRegion})}>
        <option value="worldwide">Worldwide</option>
        <option value="regional">Regional</option>
        <option value="country">Country</option>
      </select>
      {
        top10LocationRegion === "regional" ? <Top10LocationRegionalInput/>
        : top10LocationRegion === "country" ? <Top10LocationCountryInput/>
        : ""
      }
    </div>
  );
}
