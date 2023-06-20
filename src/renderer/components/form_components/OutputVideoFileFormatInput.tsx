import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { CRFEncodeSettingsLayout } from "../layout_components/CRFEncodeSettingsLayout";
import useRenderCounter from "../../RenderCounter";

export function OutputVideoFileFormatInput(props: {videoCodec: string}) {
  const {register, getValues, setValue} = useFormContext();
  //const [videoCodec, setVideoCodec] = useState(getValues("video-codec"));
  const renderCounter = useRenderCounter(true);

  // libx264: mp4, mkv
  // libx265: mp4, mkv
  // libvpx-vp9: webm, mkv

  let outputVideoFileFormat = getValues("output-video-file-format");
  console.log("OutputVideoFileFormatInput videoCodec:", props.videoCodec);

  // for some reason this doesn't work
  // TODO figure out why

  /*
  if ((props.videoCodec === "libx264" || props.videoCodec === "libx265") && outputVideoFileFormat === "webm") {
    console.log("OutputVideoFileFormatInput set mp4");
    setValue("output-video-file-format", "mp4", {shouldTouch: true});
  } else if (props.videoCodec === "libvpx-vp9" && outputVideoFileFormat === "mp4") {
    console.log("OutputVideoFileFormatInput set webm");
    setValue("output-video-file-format", "webm", {shouldTouch: true});
  } else {
    console.log("OutputVideoFileFormatInput outputVideoFileFormat:", outputVideoFileFormat)
  }*/

  return (
    <div>
      <label htmlFor="output-video-file-format">Video format: </label>
      <select {...register("output-video-file-format", {
        required: false})}>
        {
          props.videoCodec === "libvpx-vp9" ? <option value="webm">webm</option> :
          (props.videoCodec === "libx264" || props.videoCodec === "libx265") ? <option value="mp4">mp4</option> :
          ""
        }
        <option value="mkv">mkv</option>
      </select>
      {renderCounter}
    </div>
  );
}
