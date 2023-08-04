import React, { useState, useEffect } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import { DeselectableDropdown } from "../DeselectableDropdown";

import { VideoCodec } from "./VideoCodecInput";

import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const OUTPUT_VIDEO_FILE_FORMATS = makeReadonlyArraySet(["mp4", "webm", "mkv"] as const);
export type OutputVideoFileFormat = ValidValues<typeof OUTPUT_VIDEO_FILE_FORMATS>;

export function OutputVideoFileFormatInput(props: {videoCodec: VideoCodec, formComplexity: FormComplexity, addSizeBasedReminderToLabel: boolean}) {
  const {getValues, setValue} = useFormContextAutoTT();
  const renderCounter = useRenderCounter();
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  useEffect(() => {
    let outputVideoFileFormat = getValues("output-video-file-format");
    if (props.formComplexity === FormComplexity.ALL) {
      if ((props.videoCodec === "libx264" || props.videoCodec === "libx265") && outputVideoFileFormat === "webm") {
        setValue("output-video-file-format", "mp4", {shouldTouch: true});
      } else if (props.videoCodec === "libvpx-vp9" && outputVideoFileFormat === "mp4") {
        setValue("output-video-file-format", "webm", {shouldTouch: true});
      } else {
      }
    } else {
      if (outputVideoFileFormat === "mkv") {
        if (props.videoCodec === "libx264" || props.videoCodec === "libx265") {
          setValue("output-video-file-format", "mp4", {shouldTouch: true});
        } else if (props.videoCodec === "libvpx-vp9") {
          setValue("output-video-file-format", "webm", {shouldTouch: true});
        }
      }
    }
  }, [props.videoCodec]);

  function updateVideoCodecForAdvancedForm() {
    let outputVideoFileFormat = getValues("output-video-file-format");
    // acknowledged <FILLME>
    if (outputVideoFileFormat === "mp4") {
      setValue("video-codec", "libx264", {shouldTouch: true});
    } else if (outputVideoFileFormat === "webm") {
      setValue("video-codec", "libvpx-vp9", {shouldTouch: true});
    }
  }

  return (
    <div> 
      <label htmlFor="output-video-file-format">Video format{props.addSizeBasedReminderToLabel ? " (For size-based)" : ""}: </label>
      <DeselectableDropdown name="output-video-file-format" onChange={props.formComplexity === FormComplexity.ADVANCED ? updateVideoCodecForAdvancedForm : () => {}}>
        {
          props.formComplexity === FormComplexity.ALL ? 
          (
            <>
              {isValueOrFILLMEIsValue(props.videoCodec, "libvpx-vp9") ? <option value="webm">webm</option> : ""}
              {isValueOrFILLMEIsValue(props.videoCodec, "libx264", "libx265") ? <option value="mp4">mp4</option> : ""}
              <option value="mkv">mkv</option>
            </>
          ) : (
            <>
              <option value="mp4">mp4</option>
              <option value="webm">webm</option>
            </>
          )
        }
      </DeselectableDropdown>
      {renderCounter}
    </div>
  );
}
