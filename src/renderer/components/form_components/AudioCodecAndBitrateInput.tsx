
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { AudioBitrateInput } from "./AudioBitrateInput";
import { EncodeType } from "../../helper-types";

export function AudioCodecAndBitrateInput(props: {encodeType: EncodeType}) {
  const {register, getValues} = useFormContext();
  const [audioCodec, setAudioCodec] = useState(getValues("audio-codec"));
  const [audioCodecChanged, setAudioCodecChanged] = useState(false);

  function updateAudioCodec(event: Event) {
    let s = getValues("audio-codec");
    setAudioCodec(getValues("audio-codec"));
    setAudioCodecChanged(true);
  }

  return (
    <div>
      <label htmlFor="audio-codec">Audio codec: </label>
      <select {...register("audio-codec", {
        required: true, onChange: updateAudioCodec})}>
        <option value="libopus">libopus</option>
        <option value="aac">aac</option>
      </select>
      <AudioBitrateInput encodeType={props.encodeType} audioCodec={audioCodec} audioCodecChanged={audioCodecChanged}/>
    </div>
  );
}
