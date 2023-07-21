import React, { useState } from "react";
import { UseFormRegister, FieldValues, UseFormRegisterReturn, Controller } from "react-hook-form";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { AudioCodec } from "./AudioCodecAndBitrateInput";

import { EncodeType } from "../layout_components/choice_layouts/EncodeTypeLayout";

export type EncodeSizeUnit = "mib" | "bytes";

/*
const defaultEncodeSizes = {
  crf: {
    libopus: 128000,
    aac: 384000
  },
  size: {
    libopus: 64000,
    aac: 128000
  }
}

function getDefaultEncodeSize(encodeType: EncodeType, audioCodec: AudioCodec): number {
  return defaultEncodeSizes[encodeType][audioCodec];
}

function getDefaultEncodeSizeDisplayed(encodeType: EncodeType, audioCodec: AudioCodec, bitrateUnit: EncodeSizeUnit): number {
  let bitrate = getDefaultEncodeSize(encodeType, audioCodec);
  if (bitrateUnit === "kbps") {
    bitrate /= 1000;
  }
  return bitrate;
}*/

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

export function EncodeSizeInput() {
  const {register, setValue, getValues, control} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  function updateEncodeSizeDisplayed(event: Event | null) {
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

  function updateEncodeSizeUnit(event: Event | null) {
    let encodeSizeUnit = getValues("encode-size-unit");
    let encodeSize = getValues("encode-size");
    console.log("updateEncodeSizeUnit encodeSizeUnit:", encodeSizeUnit);
    console.log("updateEncodeSizeUnit encodeSize:", encodeSize);
    let useDefaultEncodeSize = false;
    const unmodifiedEncodeSizeDisplayed = getDefaultEncodeSizeDisplayed(encodeSizeUnit);
    let encodeSizeDisplayed = unmodifiedEncodeSizeDisplayed;

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

    setValue("encode-size-displayed", encodeSizeDisplayed, {shouldTouch: true});
    updateEncodeSizeDisplayed(event);
  }

  return (
    <div>
      <label htmlFor="encode-size">Output video size:</label>
      <input type="hidden" {...register("encode-size")}/>
      <input type="number" onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.match(/[^\d\.]/g)) {
          e.preventDefault();
        }
      }} min={MIN_ENCODE_SIZE} max={MAX_ENCODE_SIZE}
        {...register("encode-size-displayed", {required: false, onChange: updateEncodeSizeDisplayed, valueAsNumber: true})}
      ></input>
      <label htmlFor="encode-size-unit-mib">MiB</label>
      <input type="radio" id="encode-size-unit-mib" value="mib"
        {...register("encode-size-unit", {onChange: updateEncodeSizeUnit})}
      ></input>
      <label htmlFor="encode-size-unit-bytes">bytes</label>
      <input type="radio" id="encode-size-unit-bytes" value="bytes"
        {...register("encode-size-unit", {onChange: updateEncodeSizeUnit})}
      ></input>

      {renderCounter}
    </div>
  );
}
