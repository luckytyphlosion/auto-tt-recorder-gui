import React, { useState } from "react";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { OutputVideoFileFormatInput } from "./OutputVideoFileFormatInput";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import useRenderCounter from "../../RenderCounter";
import { DeselectableDropdown } from "../generic_components/DeselectableDropdown";

import { EncodeType } from "../layout_components/choice_layouts/EncodeSettingsLayout";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const VIDEO_CODECS = makeReadonlyArraySet(["libx264", "libx265", "libvpx-vp9"] as const);
export type VideoCodec = ValidValues<typeof VIDEO_CODECS>;

export function VideoCodecInput(props: {encodeType: EncodeType, formComplexity: FormComplexity}) {
  const {setValue, getValues} = useFormContextAutoTT();
  const videoCodec = useWatchAutoTT({name: "video-codec"});
  const renderCounter = useRenderCounter(false);
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  if ((props.encodeType === "crf" && videoCodec === "libvpx-vp9")
    || (props.encodeType === "size" && videoCodec === "libx265")) {
    setValue("video-codec", "libx264", {shouldTouch: true});
  }

  const encodeTypeCRF = isValueOrFILLMEIsValue(props.encodeType, "crf");
  const encodeTypeSize = isValueOrFILLMEIsValue(props.encodeType, "size");

  let libx265NotesElement, libvpxVp9NotesElement;

  libx265NotesElement = encodeTypeCRF ? <><strong>libx265</strong> is ~25% smaller than libx264 but encodes 5-8x longer.<br/></> : "";
  libvpxVp9NotesElement = encodeTypeSize ? <><strong>libvpx-vp9</strong> has higher quality than libx264 but encodes 10x slower.<br/></> : "";

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="video-codec">Video codec: </label>
      <div className="start-label-contents">
        <DeselectableDropdown name="video-codec" nameAsId={true} errorBelow={true} formInputNotesContents={
          <>
            {libx265NotesElement}
            {libvpxVp9NotesElement}
          </>
        }>
          <option value="libx264">libx264</option>
          {encodeTypeCRF ? <option value="libx265">libx265</option> : ""}
          {encodeTypeSize ? <option value="libvpx-vp9">libvpx-vp9</option> : ""}
        </DeselectableDropdown>
        {renderCounter}
      </div>
      <OutputVideoFileFormatInput videoCodec={videoCodec} addSizeBasedReminderToLabel={false} formComplexity={props.formComplexity}/>
   </div>
  );
}
