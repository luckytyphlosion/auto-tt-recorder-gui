import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";

const regionalLocations = [
  "Europe",
  "North America",
  "Americas",
  "Latin America",
  "Asia",
  "Oceania"
]

export function Top10LocationRegionalInput() {
  const {register} = useFormContext();

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
