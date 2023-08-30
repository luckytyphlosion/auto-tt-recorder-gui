import React, { useState, useEffect } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import { TrackNameManualInput } from "./TrackNameManualInput";

import useRenderCounter from "../../RenderCounter";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const TRACK_NAME_TYPES = makeReadonlyArraySet(["auto", "manual", "rkg-slot"] as const);
export type TrackNameType = ValidValues<typeof TRACK_NAME_TYPES>;

export function TrackNameTypeInput(props: {formComplexity: FormComplexity}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  const [trackNameType, setTrackNameType] = useState(getValues("track-name-type"));
  const renderCounter = useRenderCounter(false, "TrackNameTypeInput");
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

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

  function validateTrackName(trackName: string) {
    if (trackNameType === "<FILLME>") {
      return "Track name type (auto vs rkg vs manual) is required.";
    } else if (trackName === "") {
      return "Track name is required.";
    } else {
      return true;
    }
  }

  return (
    <div className="grid-contents">
      <label className="start-label">Track name: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="track-name-type" blockDisplay={true}>
          <DeselectableRadioButton labelValue="Auto-detect (recommended):" id="track-name-type-auto" value="auto" onChange={updateTrackNameType}/>
          {
            props.formComplexity === FormComplexity.ALL ? 
            <>
              <DeselectableRadioButton labelValue="Use rkg slot name:" id="track-name-type-rkg-slot" value="rkg-slot" onChange={updateTrackNameType}/>
            </> : ""
          }
          <DeselectableRadioButton labelValue="Supply manually:" id="track-name-type-manual" value="manual" onChange={updateTrackNameType}/>
        </DeselectableRadioButtonGroup>
        {renderCounter}
      </div>
      {
        isValueOrFILLMEIsValue(trackNameType, "manual") ? <TrackNameManualInput/> : ""
      }
    </div>
  );
}
