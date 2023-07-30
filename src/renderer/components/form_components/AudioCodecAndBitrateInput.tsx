
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { AudioBitrateInput } from "./AudioBitrateInput";
import { DeselectableDropdown } from "../DeselectableDropdown";

import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { EncodeType } from "../layout_components/choice_layouts/EncodeSettingsLayout";

export const AUDIO_CODECS = makeReadonlyArraySet(["libopus", "aac"] as const);
export type AudioCodec = ValidValues<typeof AUDIO_CODECS>;

export function AudioCodecAndBitrateInput(props: {encodeType: EncodeType, encodeTypeChanged: boolean}) {
  const {register, getValues} = useFormContextAutoTT();
  const [audioCodec, setAudioCodec] = useState(getValues("audio-codec"));
  const [encodeTypeOrAudioCodecChanged, setEncodeTypeOrAudioCodecChanged] = useState(props.encodeTypeChanged);
  const renderCounter = useRenderCounter(true);

  function updateAudioCodec(event?: Event) {
    setAudioCodec(getValues("audio-codec"));
    setEncodeTypeOrAudioCodecChanged((oldEncodeTypeOrAudioCodecChanged) => (!oldEncodeTypeOrAudioCodecChanged));
  }

  return (
    <div>
      <label htmlFor="audio-codec">Audio codec: </label>
      <DeselectableDropdown name="audio-codec" onChange={updateAudioCodec}>
        <option value="libopus">libopus</option>
        <option value="aac">aac</option>
      </DeselectableDropdown>
      {renderCounter}
      <AudioBitrateInput encodeType={props.encodeType} audioCodec={audioCodec} resetToDefaultAudioBitrate={encodeTypeOrAudioCodecChanged}/>
    </div>
  );
}
