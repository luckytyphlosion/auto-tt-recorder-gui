import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";

import { makeReadonlyArraySet, ValidValues } from "../../array-set";

export const REGIONAL_LOCATIONS = makeReadonlyArraySet([
  "Europe",
  "North America",
  "Americas",
  "Latin America",
  "Asia",
  "Oceania"
] as const);

export type Top10LocationRegional = ValidValues<typeof REGIONAL_LOCATIONS>;

export const TOP_10_LOCATION_REGIONAL_TO_FULL_NAME: {[key: string]: Top10LocationRegional} = {
  "eu": "Europe",
  "europe": "Europe",
  "na": "North America",
  "north america": "North America",
  "northamerica": "North America",
  "ame": "Americas",
  "americas": "Americas",
  "la": "Latin America",
  "latin": "Latin America",
  "latinamerica": "Latin America",
  "latin america": "Latin America",
  "asia": "Asia",
  "oc": "Oceania",
  "oceania": "Oceania"
}

export function Top10LocationRegionalInput() {
  const {register} = useFormContextAutoTT();

  return (
    <>
      <label htmlFor="top-10-location-regional-location">Location: </label>
      <select {...register("top-10-location-regional-location")}>
        {REGIONAL_LOCATIONS.map((regionalLocation) => (
          <option value={regionalLocation} key={regionalLocation}>{regionalLocation}</option>
        ))}
      </select>
    </>
  );
}
