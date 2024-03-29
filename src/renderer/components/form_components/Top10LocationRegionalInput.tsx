import React, { useState } from "react";
import { isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegion } from "./Top10LocationInput";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableDropdown } from "../generic_components/DeselectableDropdown";

const REGIONAL_LOCATION_NAMES = [
  "Europe",
  "North America",
  "Americas",
  "Latin America",
  "Asia",
  "Oceania"
] as const;

export const REGIONAL_LOCATIONS = makeReadonlyArraySet(REGIONAL_LOCATION_NAMES);

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

export function Top10LocationRegionalInput(props: {top10LocationRegion: Top10LocationRegion}) {
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-location-regional-location">Regional Location: </label>
      <div className="start-label-contents">
        <DeselectableDropdown name="top-10-location-regional-location" nameAsId={true} errorBelow={true}>
          {REGIONAL_LOCATION_NAMES.map((regionalLocation) => (
            <option value={regionalLocation} key={regionalLocation}>{regionalLocation}</option>
          ))}
        </DeselectableDropdown>
      </div>
    </div>
  );
}
