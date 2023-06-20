import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { VideoCodecInput } from "../form_components/VideoCodecInput";
import { H26xPresetInput } from "../form_components/H26xPresetInput";
import { CRFValueInput } from "../form_components/CRFValueInput";
import { AudioCodecAndBitrateInput } from "../form_components/AudioCodecAndBitrateInput";

export function CRFEncodeSettingsLayout(props: {encodeTypeChanged: boolean}) {
  const {register, getValues} = useFormContext();

  return (
    <div>
      <VideoCodecInput encodeType="crf"/>
      <CRFValueInput/>
      <H26xPresetInput/>
      <AudioCodecAndBitrateInput encodeType="crf" encodeTypeChanged={props.encodeTypeChanged}/>
    </div>
  );
}
