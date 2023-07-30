import React, { useState } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { VideoCodecInput } from "../../form_components/VideoCodecInput";
import { H26xPresetInput } from "../../form_components/H26xPresetInput";
import { CRFValueInput } from "../../form_components/CRFValueInput";
import { AudioCodecAndBitrateInput } from "../../form_components/AudioCodecAndBitrateInput";
import { YoutubeSettingsInput } from "../../form_components/YoutubeSettingsInput";
import { FormComplexity } from "../FormComplexityLayout";

export function CRFEncodeSettingsLayout(props: {formComplexity: FormComplexity}) {
  return (
    <div>
      {
        props.formComplexity === FormComplexity.ALL ? <>
          <VideoCodecInput encodeType="crf" formComplexity={props.formComplexity}/>
          <CRFValueInput/>
          <H26xPresetInput/>
          <YoutubeSettingsInput/>
          <AudioCodecAndBitrateInput encodeType="crf"/>
        </> : <CRFValueInput/>
      }
    </div>
  );
}
