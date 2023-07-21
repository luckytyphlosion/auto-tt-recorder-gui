import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export type TrackNameType = "auto" | "manual";

export function TrackNameInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [trackNameType, setTrackNameType] = useState(getValues("track-name-type"));

  function updateTrackNameType(event: Event) {
    setTrackNameType(getValues("track-name-type"));
  }


  return (
    <div>
      <label htmlFor="track-name-type">Track name: </label>
      <label htmlFor="track-name-type-auto">Auto-detect (recommended):</label>
      <input type="radio" id="track-name-type-auto" value="auto"
        {...register("track-name-type", {onChange: updateTrackNameType})}
      ></input>
      <label htmlFor="track-name-type-manual">Supply manually:</label>
      <input type="radio" id="track-name-type-manual" value="manual"
        {...register("track-name-type", {onChange: updateTrackNameType})}
      ></input>
      {
        trackNameType === "manual" ? <>
          <input type="text" {...register("track-name", {required: {
            value: true,
            message: "This input is required."
          }})}
          ></input>
          <SimpleErrorMessage name="track-name"/>
        </> : ""
      }
    </div>
  );
}
