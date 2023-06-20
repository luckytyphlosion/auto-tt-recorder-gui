import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { VideoCodecInput } from "./VideoCodecInput";
import { H26xPresetInput } from "./H26xPresetInput";
import { CRFValueInput } from "./CRFValueInput";
import { AudioCodecAndBitrateInput } from "./AudioCodecAndBitrateInput";
import { EncodeSizeInput } from "./EncodeSizeInput";

export function SizeBasedEncodeSettingsInput(props: {encodeTypeChanged: boolean}) {
  const {register, getValues} = useFormContext();

  return (
    <div>
      <VideoCodecInput encodeType="size"/>
      <EncodeSizeInput/>
      <AudioCodecAndBitrateInput encodeType="size" encodeTypeChanged={props.encodeTypeChanged}/>
    </div>
  );
}
