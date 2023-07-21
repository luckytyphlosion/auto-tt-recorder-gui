
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { AudioBitrateInput } from "./AudioBitrateInput";
import useRenderCounter from "../../RenderCounter";

import { EncodeType } from "../layout_components/choice_layouts/EncodeSettingsLayout";

export type AudioCodec = "libopus" | "aac";

export function AudioCodecAndBitrateInput(props: {encodeType: EncodeType, encodeTypeChanged: boolean}) {
  const {register, getValues} = useFormContextAutoTT();
  const [audioCodec, setAudioCodec] = useState(getValues("audio-codec"));
  const [encodeTypeOrAudioCodecChanged, setEncodeTypeOrAudioCodecChanged] = useState(props.encodeTypeChanged);
  const renderCounter = useRenderCounter(true);

  function updateAudioCodec(event: Event) {
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
