
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { AudioBitrateInput } from "./AudioBitrateInput";
import { DeselectableDropdown } from "../generic_components/DeselectableDropdown";

import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { EncodeType } from "../layout_components/choice_layouts/EncodeSettingsLayout";

export const AUDIO_CODECS = makeReadonlyArraySet(["libopus", "aac"] as const);
export type AudioCodec = ValidValues<typeof AUDIO_CODECS>;

export function AudioCodecAndBitrateInput(props: {encodeType: EncodeType}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  const [audioCodec, setAudioCodec] = useState(getValues("audio-codec"));
  const renderCounter = useRenderCounter(true);

  function updateAudioCodec(event?: Event) {
    setAudioCodec(getValues("audio-codec"));
  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="audio-codec">Audio codec: </label>
      <div className="start-label-contents">
        <DeselectableDropdown name="audio-codec" nameAsId={true} onChange={updateAudioCodec} errorBelow={true}>
          <option value="libopus">libopus</option>
          <option value="aac">aac</option>
        </DeselectableDropdown>
        {renderCounter}
      </div>
      <AudioBitrateInput encodeType={props.encodeType} audioCodec={audioCodec}/>
    </div>
  );
}
