import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const ENCODE_SIZE_UNITS = makeReadonlyArraySet(["mib", "bytes"] as const);
export type EncodeSizeUnit = ValidValues<typeof ENCODE_SIZE_UNITS>;

function getDefaultEncodeSizeDisplayed(encodeSizeUnit: EncodeSizeUnit) {
  if (encodeSizeUnit === "mib") {
    return 50;
  } else if (encodeSizeUnit === "bytes") {
    return 52428800;
  } else {
    return 50;
  }
}

const MIN_ENCODE_SIZE = 1;
const MAX_ENCODE_SIZE = 274877906944; // 256GiB, max that youtube allows

export function EncodeSizeInput(props: {addSizeBasedReminderToLabel: boolean}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  function updateEncodeSizeDisplayed(event?: Event) {
    let encodeSizeDisplayed = getValues("encode-size-displayed");
    let encodeSizeKbpsUnit = getValues("encode-size-unit");
    let encodeSize;

    if (encodeSizeKbpsUnit === "mib") {
      encodeSize = Math.floor(encodeSizeDisplayed * 1048576);
    } else {
      encodeSize = encodeSizeDisplayed;
    }
    setValue("encode-size", encodeSize, {shouldTouch: true});
    console.log("encodeSize:", encodeSize);
  }

  function updateEncodeSizeUnit(event?: Event) {
    let encodeSizeUnit = getValues("encode-size-unit");
    const unmodifiedEncodeSizeDisplayed = getDefaultEncodeSizeDisplayed(encodeSizeUnit);
    let encodeSizeDisplayed = unmodifiedEncodeSizeDisplayed;

    if (encodeSizeUnit === "<FILLME>") {
      encodeSizeDisplayed = NaN;
    } else {
      let encodeSize = getValues("encode-size");
      console.log("updateEncodeSizeUnit encodeSizeUnit:", encodeSizeUnit);
      console.log("updateEncodeSizeUnit encodeSize:", encodeSize);
      let useDefaultEncodeSize = false;
  
  
      if (Number.isNaN(encodeSize) || encodeSize < MIN_ENCODE_SIZE || encodeSize > MAX_ENCODE_SIZE) {
        useDefaultEncodeSize = true;
      } else {
        if (encodeSizeUnit === "mib") {
          // 50000000 -> 47.68MiB
          encodeSizeDisplayed = Number((Math.floor(encodeSize) / 1048576).toFixed(2));
        } else {
          encodeSizeDisplayed = Math.floor(encodeSize);
        }
        if (Number.isNaN(encodeSizeDisplayed) || encodeSizeDisplayed < MIN_ENCODE_SIZE || encodeSizeDisplayed > MAX_ENCODE_SIZE) {
          useDefaultEncodeSize = true;
        }
      }
  
      if (useDefaultEncodeSize) {
        encodeSizeDisplayed = unmodifiedEncodeSizeDisplayed;
      }
    }

    setValue("encode-size-displayed", encodeSizeDisplayed, {shouldTouch: true});
    updateEncodeSizeDisplayed(event);
  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="encode-size-displayed">Output video size{props.addSizeBasedReminderToLabel ? " (For size-based)" : ""}:</label>
      <div className="start-label-contents">
        <input type="hidden" {...register("encode-size")}/>
        <input type="number" id="encode-size-displayed" onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key.match(/[^\d\.]/g)) {
            e.preventDefault();
          }
        }} min={MIN_ENCODE_SIZE} max={MAX_ENCODE_SIZE}
          {...register("encode-size-displayed", {required: false, onChange: updateEncodeSizeDisplayed, valueAsNumber: true})}
        ></input>
        <DeselectableRadioButtonGroup name="encode-size-unit">
          <DeselectableRadioButton labelValue="MiB" id="encode-size-unit-mib" value="mib" onChange={updateEncodeSizeUnit}/>
          <DeselectableRadioButton labelValue="bytes" id="encode-size-unit-bytes" value="bytes" onChange={updateEncodeSizeUnit}/>
        </DeselectableRadioButtonGroup>
        {renderCounter}
      </div>
    </div>
  );
}
