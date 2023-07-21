import React, { useState } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { VideoCodecInput } from "../../form_components/VideoCodecInput";
import { H26xPresetInput } from "../../form_components/H26xPresetInput";
import { OutputVideoFileFormatInput } from "../../form_components/OutputVideoFileFormatInput";
import { AudioCodecAndBitrateInput } from "../../form_components/AudioCodecAndBitrateInput";
import { EncodeSizeInput } from "../../form_components/EncodeSizeInput";
import { FormComplexity } from "../FormComplexityLayout";

export function SizeBasedEncodeSettingsLayout(props: {encodeTypeChanged: boolean, formComplexity: FormComplexity}) {
  const {getValues} = useFormContextAutoTT();

  return (
    <div>
      {props.formComplexity === FormComplexity.ALL ? 
        <VideoCodecInput encodeType="size" formComplexity={props.formComplexity}/>
        : <OutputVideoFileFormatInput videoCodec={getValues("video-codec")} formComplexity={props.formComplexity}/>
      }
      
      <EncodeSizeInput/>
      {
        props.formComplexity === FormComplexity.ALL ? 
          <AudioCodecAndBitrateInput encodeType="size" encodeTypeChanged={props.encodeTypeChanged}/>
          : ""
      }
    </div>
  );
}
