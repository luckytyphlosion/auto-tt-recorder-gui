import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldValues, UseFormRegisterReturn, Controller, ValidateResult } from "react-hook-form";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { AudioCodec } from "./AudioCodecAndBitrateInput";

import { SimpleErrorMessage } from "../SimpleErrorMessage";

import { EncodeType } from "../layout_components/choice_layouts/EncodeSettingsLayout";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const AUDIO_BITRATE_UNITS = makeReadonlyArraySet(["kbps", "bps"] as const);
export type AudioBitrateUnit = ValidValues<typeof AUDIO_BITRATE_UNITS>;

const defaultAudioBitrates = {
  crf: {
    libopus: 128000,
    aac: 384000,
    "<FILLME>": NaN
  },
  "<FILLME>": {
    libopus: 128000,
    aac: 384000,
    "<FILLME>": NaN
  },
  size: {
    libopus: 64000,
    aac: 128000,
    "<FILLME>": NaN
  }
}

export function getDefaultAudioBitrate(encodeType: EncodeType, audioCodec: AudioCodec): number {
  return defaultAudioBitrates[encodeType][audioCodec];
}

export function getDefaultAudioBitrateDisplayed(encodeType: EncodeType, audioCodec: AudioCodec, bitrateUnit: AudioBitrateUnit): number {
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

export function AudioBitrateInput(props: {encodeType: EncodeType, audioCodec: AudioCodec}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  function updateAudioBitrateDisplayed(event?: Event) {
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

  function updateAudioBitrateUnit(event?: Event) {
    let audioBitrateUnit = getValues("audio-bitrate-unit");
    let audioBitrate = getValues("audio-bitrate");
    console.log("updateAudioBitrateUnit audioBitrateUnit:", audioBitrateUnit);
    console.log("updateAudioBitrateUnit audioBitrate:", audioBitrate);
    let useDefaultAudioBitrate = false;
    const unmodifiedAudioBitrateDisplayed = getDefaultAudioBitrateDisplayed(props.encodeType, props.audioCodec, audioBitrateUnit);
    let audioBitrateDisplayed = unmodifiedAudioBitrateDisplayed;

    if (audioBitrateUnit !== "<FILLME>") {
      if (Number.isNaN(audioBitrate) || audioBitrate < MIN_AUDIO_BITRATE || audioBitrate > MAX_AUDIO_BITRATE) {
        useDefaultAudioBitrate = true;
      } else {
        if (audioBitrateUnit === "kbps") {
          // 64000 -> 64kbps
          audioBitrateDisplayed = Math.floor(Math.floor(audioBitrate) / 1000);
        } else if (audioBitrateUnit === "bps") {
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
    } else {
      audioBitrateDisplayed = NaN;
    }

    setValue("audio-bitrate-displayed", audioBitrateDisplayed, {shouldTouch: true});
    updateAudioBitrateDisplayed(event);
  }

  useEffect(() => {
    let lastEncodeType = getValues("audio-bitrate-last-encode-type");
    let lastAudioCodec = getValues("audio-bitrate-last-audio-codec");
    console.log("lastEncodeType:", lastEncodeType, ", props.encodeType:", props.encodeType, ", lastAudioCodec:", lastAudioCodec, ", props.audioCodec:", props.audioCodec);
    if (lastEncodeType !== props.encodeType || lastAudioCodec !== props.audioCodec) {
      let audioBitrate = getDefaultAudioBitrate(props.encodeType, props.audioCodec);
      let audioBitrateDisplayed = getDefaultAudioBitrateDisplayed(props.encodeType, props.audioCodec, getValues("audio-bitrate-unit"));
      setValue("audio-bitrate", audioBitrate, {shouldTouch: true});
      setValue("audio-bitrate-displayed", audioBitrateDisplayed, {shouldTouch: true});
      setValue("audio-bitrate-last-encode-type", props.encodeType);
      setValue("audio-bitrate-last-audio-codec", props.audioCodec);
    }
  }, [props.encodeType, props.audioCodec]);

  function validateAudioBitrate(value: number) : ValidateResult {
    let audioBitrateUnit = getValues("audio-bitrate-unit");
    if (audioBitrateUnit === "<FILLME>") {
      return "Must select an audio bitrate unit."
    } else if (Number.isNaN(value)) {
      return "Audio bitrate is required.";
    } else if (value >= MIN_AUDIO_BITRATE && value <= MAX_AUDIO_BITRATE) {
      return true;
    } else {
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
      <input type="hidden" {...register("audio-bitrate-last-encode-type")}/>
      <input type="hidden" {...register("audio-bitrate-last-audio-codec")}/>
      <input type="number"
        {...register("audio-bitrate-displayed", {
        onChange: updateAudioBitrateDisplayed, valueAsNumber: true})}
      ></input>
      <DeselectableRadioButtonGroup name="audio-bitrate-unit" noErrorMessage={true}>
        <DeselectableRadioButton labelValue="kbps" id="audio-bitrate-unit-kbps" value="kbps" onChange={updateAudioBitrateUnit}/>
        <DeselectableRadioButton labelValue="bps" id="audio-bitrate-unit-bps" value="bps" onChange={updateAudioBitrateUnit}/>
      </DeselectableRadioButtonGroup>
      <SimpleErrorMessage name="audio-bitrate"/>
      {renderCounter}
    </div>
  );
}
