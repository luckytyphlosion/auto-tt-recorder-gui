import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { CRFEncodeSettingsInput } from "./CRFEncodeSettingsInput";

export function VideoCodecInput(props: {crfEncodeType: boolean}) {
  const {register, getValues} = useFormContext();
  const [videoCodec, setVideoCodec] = useState(getValues("video-codec"));

  function updateVideoCodec(event: Event) {
    setVideoCodec(getValues("video-codec"));
  }

  return (
    <div>
      <label htmlFor="video-codec">Video codec: </label>
      <select {...register("video-codec", {
        required: true, onChange: updateVideoCodec})}>
        <option value="libx264">libx264</option>
        {props.crfEncodeType ?
          <option value="libx265">libx265</option> : <option value="libvpx-vp9">libvpx-vp9</option>}
      </select>
    </div>
  );
}
