import React, { useState } from "react";
import { useFormContext, UseFormRegister, FieldValues, UseFormRegisterReturn, Controller } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

import { EncodeType, AudioCodec, AudioBitrateUnit } from "../../helper-types";

const defaultAudioBitrates = {
  crf: {
    libopus: 128,
    aac: 384
  },
  size: {
    libopus: 64,
    aac: 128
  }
}

function getDefaultAudioBitrate(encodeType: EncodeType, audioCodec: AudioCodec): number {
  return defaultAudioBitrates[encodeType][audioCodec];
}

function getDefaultAudioBitrateDisplayed(encodeType: EncodeType, audioCodec: AudioCodec, bitrateUnit: AudioBitrateUnit): number {
  let bitrate = getDefaultAudioBitrate(encodeType, audioCodec);
  if (bitrateUnit === "bps") {
    bitrate *= 1000;
  }
  return bitrate;
}

const MIN_AUDIO_BITRATE = 1;
const MAX_AUDIO_BITRATE = 100000000; // 100000k
const MAX_AUDIO_BITRATE_LENGTH = MAX_AUDIO_BITRATE.toString().length;

export function AudioBitrateInput(props: {encodeType: EncodeType, audioCodec: AudioCodec, audioCodecChanged: boolean}) {
  const {register, setValue, getValues, control} = useFormContext();
  const renderCounter = useRenderCounter();
  const [audioBitrateKbpsEnable, setAudioBitrateKbpsEnable] = useState(getValues("audio-bitrate-unit"));

  function updateAudioBitrateDisplayed(event: Event | null) {
    let audioBitrateDisplayed = getValues("audio-bitrate-displayed");
    let audioBitrateKbpsUnit = getValues("audio-bitrate-unit");
    let audioBitrate;

    if (audioBitrateKbpsUnit === "kbps") {
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
    let useDefaultAudioBitrate = false;
    let audioBitrateDisplayed;

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
      if (Number.isNaN(audioBitrateDisplayed) || audioBitrateDisplayed < MIN_AUDIO_BITRATE || audioBitrateDisplayed > MAX_AUDIO_BITRATE) {
        useDefaultAudioBitrate = true;
      }
    }

    if (useDefaultAudioBitrate) {
      audioBitrateDisplayed = getDefaultAudioBitrateDisplayed(props.encodeType, props.audioCodec, audioBitrateUnit);
    }

    setValue("audio-bitrate-displayed", audioBitrateDisplayed, {shouldTouch: true});
    updateAudioBitrateDisplayed(event);
  }

  console.log("audioCodec:", props.audioCodec);

  if (props.audioCodecChanged) {
    let audioBitrate = getDefaultAudioBitrate(props.encodeType, props.audioCodec);
    let audioBitrateDisplayed = getDefaultAudioBitrateDisplayed(props.encodeType, props.audioCodec, getValues("audio-bitrate-unit")); 
    setValue("audio-bitrate", audioBitrate, {shouldTouch: true});
    setValue("audio-bitrate-displayed", audioBitrateDisplayed, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="audio-bitrate">Audio bitrate:</label>
      <input type="hidden" {...register("audio-bitrate")}/>
      <input type="number" onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.match(/\D/g)) {
          e.preventDefault();
        }
      }} min={MIN_AUDIO_BITRATE} max={MAX_AUDIO_BITRATE}
        {...register("audio-bitrate-displayed", {required: true, onChange: updateAudioBitrateDisplayed, valueAsNumber: true})}
      ></input>
      <label htmlFor="audio-bitrate-unit">kbps</label>
      <input type="radio" id="audio-bitrate-unit-kbps" value="kbps"
        {...register("audio-bitrate-unit", {onChange: updateAudioBitrateUnit})}
      ></input>
      <label htmlFor="audio-bitrate-unit-bps">bps</label>
      <input type="radio" id="audio-bitrate-unit-bps" value="bps"
        {...register("audio-bitrate-unit", {onChange: updateAudioBitrateUnit})}
      ></input>

      {renderCounter}
    </div>
  );
}
