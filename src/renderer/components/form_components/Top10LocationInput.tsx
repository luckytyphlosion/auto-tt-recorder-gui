import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { Top10LocationCountryInput } from "./Top10LocationCountryInput";

export function Top10LocationInput() {
  const {register, getValues} = useFormContext();
  const [top10LocationRegion, setTop10LocationRegion] = useState(getValues("top-10-location-region"));

  function updateTop10LocationRegion(event: Event) {
    setTop10LocationRegion(getValues("top-10-location-region"));
  }

  return (
    <div>
      <label htmlFor="top-10-location-region">Region: </label>
      <select {...register("top-10-location-region", {
        required: true, onChange: updateTop10LocationRegion})}>
        <option value="top-10-location-region-worldwide">Worldwide</option>
        <option value="top-10-location-region-regional">Regional</option>
        <option value="top-10-location-region-country">Country</option>
      </select>
      {
        top10LocationRegion === "top-10-location-region-regional" ? <Top10LocationRegionalInput/>
        : top10LocationRegion === "top-10-location-region-country" ? <Top10LocationCountryInput/>
        : ""
      }
    </div>
  );
}
