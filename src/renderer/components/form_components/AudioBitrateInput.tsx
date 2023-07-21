import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldValues, UseFormRegisterReturn, Controller, ValidateResult } from "react-hook-form";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { AudioCodec } from "./AudioCodecAndBitrateInput";

import { SimpleErrorMessage } from "../SimpleErrorMessage";

import { EncodeType } from "../layout_components/choice_layouts/EncodeTypeInput";

export type AudioBitrateUnit = "kbps" | "bps";

const defaultAudioBitrates = {
  crf: {
    libopus: 128000,
    aac: 384000
  },
  size: {
    libopus: 64000,
    aac: 128000
  }
}

function getDefaultAudioBitrate(encodeType: EncodeType, audioCodec: AudioCodec): number {
  return defaultAudioBitrates[encodeType][audioCodec];
}

function getDefaultAudioBitrateDisplayed(encodeType: EncodeType, audioCodec: AudioCodec, bitrateUnit: AudioBitrateUnit): number {
  let bitrate = getDefaultAudioBitrate(encodeType, audioCodec);
  if (bitrateUnit === "kbps") {
    bitrate /= 1000;
  }
  return bitrate;
}

const MIN_AUDIO_BITRATE = 1000;
const MIN_AUDIO_BITRATE_KBPS = Math.floor(MIN_AUDIO_BITRATE / 1000);
const MAX_AUDIO_BITRATE = 100000000; // 100000k
const MAX_AUDIO_BITRATE_KBPS = Math.floor(MAX_AUDIO_BITRATE / 1000);

const MAX_AUDIO_BITRATE_LENGTH = MAX_AUDIO_BITRATE.toString().length;

export function AudioBitrateInput(props: {encodeType: EncodeType, audioCodec: AudioCodec, resetToDefaultAudioBitrate: boolean}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  function updateAudioBitrateDisplayed(event: Event | null) {
    let audioBitrateDisplayed = getValues("audio-bitrate-displayed");
    let audioBitrateUnit = getValues("audio-bitrate-unit");
    let audioBitrate;

    if (audioBitrateUnit === "kbps") {
      audioBitrate = audioBitrateDisplayed * 1000;
    } else {
      audioBitrate = audioBitrateDisplayed;
    }
    setValue("audio-bitrate", audioBitrate, {shouldTouch: true});
    console.log("audioBitrate:", audioBitrate);
  }

  function updateAudioBitrateUnit(event: Event | null) {
    let audioBitrateUnit = getValues("audio-bitrate-unit");
    let audioBitrate = getValues("audio-bitrate");
    console.log("updateAudioBitrateUnit audioBitrateUnit:", audioBitrateUnit);
    console.log("updateAudioBitrateUnit audioBitrate:", audioBitrate);
    let useDefaultAudioBitrate = false;
    const unmodifiedAudioBitrateDisplayed = getDefaultAudioBitrateDisplayed(props.encodeType, props.audioCodec, audioBitrateUnit);
    let audioBitrateDisplayed = unmodifiedAudioBitrateDisplayed;

    if (Number.isNaN(audioBitrate) || audioBitrate < MIN_AUDIO_BITRATE || audioBitrate > MAX_AUDIO_BITRATE) {
      useDefaultAudioBitrate = true;
    } else {
      if (audioBitrateUnit === "kbps") {
        // 64000 -> 64kbps
        audioBitrateDisplayed = Math.floor(Math.floor(audioBitrate) / 1000);
      } else {
        // 64kbps -> 64000
        audioBitrateDisplayed = Math.floor(audioBitrate);
      }
      if (Number.isNaN(audioBitrateDisplayed)) {
        useDefaultAudioBitrate = true;
      } else if (audioBitrateUnit === "kbps"
        && (audioBitrateDisplayed < MIN_AUDIO_BITRATE_KBPS || audioBitrateDisplayed > MAX_AUDIO_BITRATE_KBPS)) {
        useDefaultAudioBitrate = true;
      }
    }

    if (useDefaultAudioBitrate) {
      audioBitrateDisplayed = unmodifiedAudioBitrateDisplayed;
    }

    setValue("audio-bitrate-displayed", audioBitrateDisplayed, {shouldTouch: true});
    updateAudioBitrateDisplayed(event);
  }

  //console.log("audioCodec:", props.audioCodec);

  useEffect(() => {
    if (props.resetToDefaultAudioBitrate) {
      let audioBitrate = getDefaultAudioBitrate(props.encodeType, props.audioCodec);
      let audioBitrateDisplayed = getDefaultAudioBitrateDisplayed(props.encodeType, props.audioCodec, getValues("audio-bitrate-unit")); 
      setValue("audio-bitrate", audioBitrate, {shouldTouch: true});
      setValue("audio-bitrate-displayed", audioBitrateDisplayed, {shouldTouch: true});
    }  
  }, [props.resetToDefaultAudioBitrate]);

  function validateAudioBitrate(value: number) : ValidateResult {
    if (Number.isNaN(value)) {
      return "This input is required.";
    }
    if (value >= MIN_AUDIO_BITRATE && value <= MAX_AUDIO_BITRATE) {
      return true;
    } else {
      let audioBitrateUnit = getValues("audio-bitrate-unit");
      if (audioBitrateUnit === "kbps") {
        return `Audio bitrate must be between ${MIN_AUDIO_BITRATE_KBPS}kbps and ${MAX_AUDIO_BITRATE_KBPS}kbps.`
      } else {
        return `Audio bitrate must be between ${MIN_AUDIO_BITRATE}bps and ${MAX_AUDIO_BITRATE}bps.`;
      }
    }
  }

  return (
    <div>
      <label htmlFor="audio-bitrate">Audio bitrate: </label>
      <input type="hidden" {...register("audio-bitrate", {required: {
          value: true,
          message: "This input is required."
        }, validate: validateAudioBitrate})}/>
      <input type="number" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        //console.log("e.key:", e.key);
        //if (e.key.match(/\D/g)) {
        //  e.preventDefault();
        //}
      }}
        {...register("audio-bitrate-displayed", {
        onChange: updateAudioBitrateDisplayed, valueAsNumber: true})}
      ></input>
      <label htmlFor="audio-bitrate-unit">kbps</label>
      <input type="radio" id="audio-bitrate-unit-kbps" value="kbps"
        {...register("audio-bitrate-unit", {onChange: updateAudioBitrateUnit})}
      ></input>
      <label htmlFor="audio-bitrate-unit-bps">bps</label>
      <input type="radio" id="audio-bitrate-unit-bps" value="bps"
        {...register("audio-bitrate-unit", {onChange: updateAudioBitrateUnit})}
      ></input>
      <SimpleErrorMessage name="audio-bitrate"/>
      {renderCounter}
    </div>
  );
}
