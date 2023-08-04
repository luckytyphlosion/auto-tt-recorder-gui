import React, { useState } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { OutputVideoFileFormatInput } from "./OutputVideoFileFormatInput";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import useRenderCounter from "../../RenderCounter";
import { DeselectableDropdown } from "../DeselectableDropdown";

import { EncodeType } from "../layout_components/choice_layouts/EncodeSettingsLayout";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const VIDEO_CODECS = makeReadonlyArraySet(["libx264", "libx265", "libvpx-vp9"] as const);
export type VideoCodec = ValidValues<typeof VIDEO_CODECS>;

export function VideoCodecInput(props: {encodeType: EncodeType, formComplexity: FormComplexity}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const [videoCodec, setVideoCodec] = useState(getValues("video-codec"))
  const renderCounter = useRenderCounter(false);
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  if ((props.encodeType === "crf" && videoCodec === "libvpx-vp9")
    || (props.encodeType === "size" && videoCodec === "libx265")) {
    setValue("video-codec", "libx264", {shouldTouch: true});
  }

  function updateVideoCodec() {
    setVideoCodec(getValues("video-codec"));
  }

  return (
    <div>
      <label htmlFor="video-codec">Video codec: </label>
      <DeselectableDropdown name="video-codec" onChange={updateVideoCodec}>
        <option value="libx264">libx264</option>
        {isValueOrFILLMEIsValue(props.encodeType, "crf") ? <option value="libx265">libx265</option> : ""}
        {isValueOrFILLMEIsValue(props.encodeType, "size") ? <option value="libvpx-vp9">libvpx-vp9</option> : ""}
      </DeselectableDropdown>
      {renderCounter}
      <OutputVideoFileFormatInput videoCodec={videoCodec} addSizeBasedReminderToLabel={false} formComplexity={props.formComplexity}/>
    </div>
  );
}
