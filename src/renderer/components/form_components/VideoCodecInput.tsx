import React, { useState } from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { OutputVideoFileFormatInput } from "./OutputVideoFileFormatInput";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import useRenderCounter from "../../RenderCounter";

import { EncodeType } from "../layout_components/choice_layouts/EncodeSettingsLayout";
import { AutoTTRecConfigFormFields } from "../../../main/AutoTTRecFormFieldsAndArgs";

import { makeReadonlyArraySet, ValidValues } from "../../../array-set";

export const VIDEO_CODECS = makeReadonlyArraySet(["libx264", "libx265", "libvpx-vp9"] as const);
export type VideoCodec = ValidValues<typeof VIDEO_CODECS>;

export function VideoCodecInput(props: {encodeType: EncodeType, formComplexity: FormComplexity}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const [videoCodec, setVideoCodec] = useState(getValues("video-codec"))
  const renderCounter = useRenderCounter(false);

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
      <select {...register("video-codec", {
        required: false, onChange: updateVideoCodec})}>
        <option value="libx264">libx264</option>
        {props.encodeType === "crf" ?
          <option value="libx265">libx265</option> : <option value="libvpx-vp9">libvpx-vp9</option>}
      </select>
      {renderCounter}
      <OutputVideoFileFormatInput videoCodec={videoCodec} formComplexity={props.formComplexity}/>
    </div>
  );
}
