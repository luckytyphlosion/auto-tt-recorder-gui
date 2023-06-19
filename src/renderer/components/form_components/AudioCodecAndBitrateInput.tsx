
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { AudioBitrateInput } from "./AudioBitrateInput";

export function AudioCodecAndBitrateInput() {
  const {register, getValues} = useFormContext();
  const [audioCodec, setAudioCodec] = useState(getValues("audio-codec"));

  function updateAudioCodec(event: Event) {
    setAudioCodec(getValues("audio-codec"));
  }

  return (
    <div>
      <label htmlFor="audio-codec">Audio codec: </label>
      <select {...register("audio-codec", {
        required: true, onChange: updateAudioCodec})}>
        <option value="libopus">libopus</option>
        <option value="aac">aac</option>
      </select>
      <AudioBitrateInput/>
    </div>
  );
}
