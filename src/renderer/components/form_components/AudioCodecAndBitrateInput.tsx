
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { AudioBitrateInput } from "./AudioBitrateInput";
import { EncodeType } from "../../helper-types";
import useRenderCounter from "../../RenderCounter";

export function AudioCodecAndBitrateInput(props: {encodeType: EncodeType, encodeTypeChanged: boolean}) {
  const {register, getValues} = useFormContext();
  const [audioCodec, setAudioCodec] = useState(getValues("audio-codec"));
  const [encodeTypeOrAudioCodecChanged, setEncodeTypeOrAudioCodecChanged] = useState(props.encodeTypeChanged);
  const renderCounter = useRenderCounter(true);

  function updateAudioCodec(event: Event) {
    let s = getValues("audio-codec");
    setAudioCodec(getValues("audio-codec"));
    setEncodeTypeOrAudioCodecChanged(true);
  }

  return (
    <div>
      <label htmlFor="audio-codec">Audio codec: </label>
      <select {...register("audio-codec", {
        required: false, onChange: updateAudioCodec})}>
        <option value="libopus">libopus</option>
        <option value="aac">aac</option>
      </select>
      {renderCounter}
      <AudioBitrateInput encodeType={props.encodeType} audioCodec={audioCodec} resetToDefaultAudioBitrate={encodeTypeOrAudioCodecChanged}/>
    </div>
  );
}
