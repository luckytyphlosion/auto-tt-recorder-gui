import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";

const regionalLocations = [
  "Europe",
  "North America",
  "Americas",
  "Latin America",
  "Asia",
  "Oceania"
] as const;

export type Top10LocationRegional = typeof regionalLocations[number];

export function Top10LocationRegionalInput() {
  const {register} = useFormContextAutoTT();

  return (
    <>
      <label htmlFor="top-10-location-regional-location">Location: </label>
      <select {...register("top-10-location-regional-location")}>
        {regionalLocations.map((regionalLocation) => (
          <option value={regionalLocation} key={regionalLocation}>{regionalLocation}</option>
        ))}
      </select>
    </>
  );
}
