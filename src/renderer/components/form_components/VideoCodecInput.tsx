import React, { useState } from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { OutputVideoFileFormatInput } from "./OutputVideoFileFormatInput";
import { CRFEncodeSettingsLayout } from "../layout_components/CRFEncodeSettingsLayout";
import useRenderCounter from "../../RenderCounter";

import { EncodeType } from "./EncodeTypeInput";
import { AutoTTRecConfigFormFieldTypes } from "../AutoTTRecConfigForm";

export type VideoCodec = "libx264" | "libx265" | "libvpx-vp9";

export function VideoCodecInput(props: {encodeType: EncodeType}) {
  const {register, setValue} = useFormContextAutoTT();
  const videoCodec = useWatchAutoTT({name: "video-codec"});
  const renderCounter = useRenderCounter(false);

  if ((props.encodeType === "crf" && videoCodec === "libvpx-vp9")
    || (props.encodeType === "size" && videoCodec === "libx265")) {
    setValue("video-codec", "libx264", {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="video-codec">Video codec: </label>
      <select {...register("video-codec", {
        required: false})}>
        <option value="libx264">libx264</option>
        {props.encodeType === "crf" ?
          <option value="libx265">libx265</option> : <option value="libvpx-vp9">libvpx-vp9</option>}
      </select>
      {renderCounter}
      <OutputVideoFileFormatInput videoCodec={videoCodec}/>
    </div>
  );
}
