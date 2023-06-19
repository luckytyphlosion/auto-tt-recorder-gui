import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { VideoCodecInput } from "./VideoCodecInput";
import { H26xPresetInput } from "./H26xPresetInput";
import { CRFValueInput } from "./CRFValueInput";
import { AudioCodecAndBitrateInput } from "./AudioCodecAndBitrateInput";

export function CRFEncodeSettingsInput() {
  const {register, getValues} = useFormContext();

  return (
    <div>
      <CRFValueInput/>
      <VideoCodecInput encodeType="crf"/>
      <H26xPresetInput/>
      <AudioCodecAndBitrateInput encodeType="crf"/>
    </div>
  );
}
