import React, { useState } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../../use-form-context-auto-tt";
import { VideoCodecInput } from "../../form_components/VideoCodecInput";
import { H26xPresetInput } from "../../form_components/H26xPresetInput";
import { CRFValueInput } from "../../form_components/CRFValueInput";
import { AudioCodecAndBitrateInput } from "../../form_components/AudioCodecAndBitrateInput";
import { YoutubeSettingsInput } from "../../form_components/YoutubeSettingsInput";
import { FormComplexity } from "../FormComplexityLayout";
import { EncodeType } from "../choice_layouts/EncodeSettingsLayout";

import { OutputVideoFileFormatInput } from "../../form_components/OutputVideoFileFormatInput";
import { EncodeSizeInput } from "../../form_components/EncodeSizeInput";

export function EncodeSettingsContentsLayout(props: {formComplexity: FormComplexity, encodeType: EncodeType}) {
  const {getValues} = useFormContextAutoTT();
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  const encodeTypeIsFILLME = props.encodeType === "<FILLME>";
  const encodeTypeIsCRF = isValueOrFILLMEIsValue(props.encodeType, "crf");
  const encodeTypeIsSizeBased = isValueOrFILLMEIsValue(props.encodeType, "size");

  return (
    <div>
      {
        props.formComplexity === FormComplexity.ALL ? <VideoCodecInput encodeType={props.encodeType} formComplexity={props.formComplexity}/> : ""
      }
      {
        props.formComplexity < FormComplexity.ALL && encodeTypeIsSizeBased ? <OutputVideoFileFormatInput videoCodec={getValues("video-codec")} formComplexity={props.formComplexity} addSizeBasedReminderToLabel={encodeTypeIsFILLME}/> : "" 
      }
      {
        encodeTypeIsCRF ? <CRFValueInput addCRFReminderToLabel={encodeTypeIsFILLME}/> : ""
      }
      {
        props.formComplexity === FormComplexity.ALL && encodeTypeIsCRF ? <>
          <H26xPresetInput addCRFReminderToLabel={encodeTypeIsFILLME}/>
          <YoutubeSettingsInput addCRFReminderToLabel={encodeTypeIsFILLME}/>
        </> : ""
      }
      {
        encodeTypeIsSizeBased ? <EncodeSizeInput addSizeBasedReminderToLabel={encodeTypeIsFILLME}/> : ""
      }
      {
        props.formComplexity === FormComplexity.ALL ? <AudioCodecAndBitrateInput encodeType={props.encodeType}/> : ""
      }
    </div>
  );
}
