import React, { useState, useEffect } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const TRACK_NAME_TYPES = makeReadonlyArraySet(["auto", "manual", "rkg-slot"] as const);
export type TrackNameType = ValidValues<typeof TRACK_NAME_TYPES>;

export function TrackNameInput(props: {formComplexity: FormComplexity}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  const [trackNameType, setTrackNameType] = useState(getValues("track-name-type"));
  const renderCounter = useRenderCounter(false, "TrackNameInput");

  useEffect(() => {
    let trackNameType = getValues("track-name-type");
    if (props.formComplexity < FormComplexity.ALL && trackNameType === "rkg-slot") {
      setValue("track-name-type", "auto");
      setTrackNameType("auto");
    }
  }, [props.formComplexity]);

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
      {
        props.formComplexity === FormComplexity.ALL ? 
        <>
          <label htmlFor="track-name-type-rkg-slot">Use rkg slot name:</label>
          <input type="radio" id="track-name-type-rkg-slot" value="rkg-slot"
            {...register("track-name-type", {onChange: updateTrackNameType})}
          ></input>
        </> : ""
      }
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
      {renderCounter}
    </div>
  );
}
