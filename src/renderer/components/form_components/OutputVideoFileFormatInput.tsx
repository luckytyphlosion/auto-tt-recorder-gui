import React, { useState, useEffect } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import { DeselectableDropdown } from "../generic_components/DeselectableDropdown";

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

  const formComplexityIsAll = props.formComplexity === FormComplexity.ALL;
  let hasWebm, hasMp4, hasMkv;
  let hasWebmNotes, hasMp4Notes, hasMkvNotes;

  if (formComplexityIsAll) {
    hasWebm = isValueOrFILLMEIsValue(props.videoCodec, "libvpx-vp9");
    hasWebmNotes = false;
    hasMp4 = isValueOrFILLMEIsValue(props.videoCodec, "libx264", "libx265");
    hasMp4Notes = hasMp4;
    hasMkv = true;
    hasMkvNotes = true;
  } else {
    hasWebm = true;
    hasWebmNotes = true;
    hasMp4 = true;
    hasMp4Notes = true;
    hasMkv = false;
    hasMkvNotes = false;
  }

  let webmNotesElement = hasWebmNotes ? <><strong>webm</strong> has higher quality than mp4 but encodes 10x slower.<br/></> : "";
  let mp4NotesElement = "";
  let mkvNotesElement = hasMkvNotes ? <><strong>mkv</strong> is more compatible with other programs but can't embed on Discord.<br/></> : "";

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="output-video-file-format" style={{lineHeight: 1.43}}>Video format: <br/>{props.addSizeBasedReminderToLabel ? <span className="form-input-notes--start-label">(For size-based)</span> : ""}</label>
      <div className="start-label-contents">
        <DeselectableDropdown name="output-video-file-format" nameAsId={true} onChange={props.formComplexity === FormComplexity.ADVANCED ? updateVideoCodecForAdvancedForm : () => {}} errorBelow={true} formInputNotesContents={
          formComplexityIsAll ? <>
            {webmNotesElement}
            {mp4NotesElement}
            {mkvNotesElement}
          </> : <>
            {mp4NotesElement}
            {webmNotesElement}
          </>
        }>
          {
            formComplexityIsAll ? 
            (
              <>
                {hasWebm ? <option value="webm">webm</option> : ""}
                {hasMp4 ? <option value="mp4">mp4</option> : ""}
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
    </div>
  );
}
