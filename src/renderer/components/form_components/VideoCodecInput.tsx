import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { OutputVideoFileFormatInput } from "./OutputVideoFileFormatInput";
import { CRFEncodeSettingsLayout } from "../layout_components/CRFEncodeSettingsLayout";
import useRenderCounter from "../../RenderCounter";
import { EncodeType } from "../../helper-types";

export function VideoCodecInput(props: {encodeType: EncodeType}) {
  const {register, setValue} = useFormContext();
  const videoCodec = useWatch({name: "video-codec"});
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
