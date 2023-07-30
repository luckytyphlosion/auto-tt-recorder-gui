import React, { useState, useEffect } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import useRenderCounter from "../../RenderCounter";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

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

  function updateTrackNameType(event?: Event) {
    setTrackNameType(getValues("track-name-type"));
  }

  return (
    <div>
      <label htmlFor="track-name-type">Track name: </label>
      <DeselectableRadioButtonGroup name="track-name-type" noErrorMessage={true}>
        <DeselectableRadioButton labelValue="Auto-detect (recommended):" id="track-name-type-auto" value="auto" onChange={updateTrackNameType}/>
        {
          props.formComplexity === FormComplexity.ALL ? 
          <>
            <DeselectableRadioButton labelValue="Use rkg slot name:" id="track-name-type-rkg-slot" value="rkg-slot" onChange={updateTrackNameType}/>
          </> : ""
        }
        <DeselectableRadioButton labelValue="Supply manually:" id="track-name-type-manual" value="manual" onChange={updateTrackNameType}/>
      </DeselectableRadioButtonGroup>
      {
        trackNameType === "manual" ? <>
          <input type="text" {...register("track-name", {required: {
            value: true,
            message: "This input is required."
          }})}
          ></input>
          <SimpleErrorMessage name="track-name"/>
        </> : trackNameType === "<FILLME>" ? <>
          <SimpleErrorMessage name="track-name-type"/>
        </> : ""
      }
      {renderCounter}
    </div>
  );
}
