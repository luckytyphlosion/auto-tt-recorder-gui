import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { VideoCodecInput } from "../form_components/VideoCodecInput";
import { H26xPresetInput } from "../form_components/H26xPresetInput";
import { CRFValueInput } from "../form_components/CRFValueInput";
import { AudioCodecAndBitrateInput } from "../form_components/AudioCodecAndBitrateInput";
import { EncodeSizeInput } from "../form_components/EncodeSizeInput";

export function SizeBasedEncodeSettingsLayout(props: {encodeTypeChanged: boolean}) {
  const {register, getValues} = useFormContextAutoTT();

  return (
    <div>
      <VideoCodecInput encodeType="size"/>
      <EncodeSizeInput/>
      <AudioCodecAndBitrateInput encodeType="size" encodeTypeChanged={props.encodeTypeChanged}/>
    </div>
  );
}
