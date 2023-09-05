import React from "react";
import { useFormContextAutoTT, lateValidateNumberInputMaker } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import { ValidateResult } from "react-hook-form";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

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

const MIB_BYTES_SIZE = 1048576;

const MIN_ENCODE_SIZE = 1;
const MIN_ENCODE_SIZE_MIB = MIN_ENCODE_SIZE / MIB_BYTES_SIZE;
const MAX_ENCODE_SIZE = 274877906944; // 256GiB, max that youtube allows
const MAX_ENCODE_SIZE_MIB = MAX_ENCODE_SIZE / MIB_BYTES_SIZE;

export function EncodeSizeInput(props: {addSizeBasedReminderToLabel: boolean}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const onBlur = lateValidateNumberInputMaker("encode-size-displayed", "encode-size");
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
  }

  function updateEncodeSizeUnit(event?: Event) {
    let encodeSizeUnit = getValues("encode-size-unit");
    const unmodifiedEncodeSizeDisplayed = getDefaultEncodeSizeDisplayed(encodeSizeUnit);
    let encodeSizeDisplayed = unmodifiedEncodeSizeDisplayed;

    if (encodeSizeUnit === "<FILLME>") {
      encodeSizeDisplayed = NaN;
    } else {
      let encodeSize = getValues("encode-size");
      //console.log("updateEncodeSizeUnit encodeSizeUnit:", encodeSizeUnit);
      //console.log("updateEncodeSizeUnit encodeSize:", encodeSize);
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
    onBlur();
  }


  function validateEncodeSize(value: number) : ValidateResult {
    let encodeSizeUnit = getValues("encode-size-unit");
    //console.log("encodeSizeUnit: ", encodeSizeUnit);
    if (encodeSizeUnit === "<FILLME>") {
      return "Must select a file size unit."
    } else if (Number.isNaN(value)) {
      return "Output video size is required.";
    } else if (value >= MIN_ENCODE_SIZE && value <= MAX_ENCODE_SIZE) {
      return true;
    } else {
      if (encodeSizeUnit === "mib") {
        return `Output video size must be between ${MIN_ENCODE_SIZE} bytes and ${MAX_ENCODE_SIZE_MIB} MiB.`
      } else {
        return `Output video size must be between ${MIN_ENCODE_SIZE} bytes and ${MAX_ENCODE_SIZE} bytes.`;
      }
    }
  }

  return (
    <div className="grid-contents">
      <div className="grid-contents">
        <label className="start-label" htmlFor="encode-size-displayed">Output video size:</label>
        <div className="start-label-contents">
          <input type="hidden" {...register("encode-size", {required: {
              value: true,
              message: "This input is required."
            }, validate: validateEncodeSize
          })}/>
          <input type="number" id="encode-size-displayed" step="any" onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key.match(/[^\d\.]/g)) {
              e.preventDefault();
            }
          }}
            {...register("encode-size-displayed", {required: false, onChange: updateEncodeSizeDisplayed, onBlur: onBlur, valueAsNumber: true})}
          ></input>
          <DeselectableRadioButtonGroup name="encode-size-unit" noErrorMessage={true} onChange={updateEncodeSizeUnit}>
            <DeselectableRadioButton labelValue="MiB" id="encode-size-unit-mib" value="mib"/>
            <DeselectableRadioButton labelValue="bytes" id="encode-size-unit-bytes" value="bytes"/>
          </DeselectableRadioButtonGroup>
          
          {renderCounter}
        </div>
      </div>
      <div className="grid-contents">
        <label className="start-label form-input-notes--start-label">{props.addSizeBasedReminderToLabel ? "(For size-based)" : ""}</label>
        <div className="start-label-contents">
          <SimpleErrorMessage name="encode-size" marginBlockDisplay={true}/>
        </div>
      </div>
    </div>
  );
}
