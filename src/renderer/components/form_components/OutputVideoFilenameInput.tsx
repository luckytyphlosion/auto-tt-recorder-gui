import React, { useEffect, useState } from "react";
import { FileFilter } from "electron";

import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { OpenFileTextInputWithButton } from "../generic_components/OpenFileTextInputWithButton";
import { isFileWritableAndHasCorrectExtension } from "../../util-renderer"

import { FormComplexity } from "../layout_components/FormComplexityLayout";
import { FieldsetOr } from "../FieldsetOr";

import useRenderCounter from "../../RenderCounter";

export function OutputVideoFilenameInput(props: {noTop10CategoryIsNoEncode: boolean}) {
  const {setValue, getValues} = useFormContextAutoTT();
  const [prevNoTop10CategoryIsNoEncode, setPrevNoTop10CategoryIsNoEncode] = useState(getValues("no-top-10-category") === "noencode");
  const renderCounter = useRenderCounter(false, "OutputVideoFilenameInput");

  function getAllowedOutputVideoFileFormat() {
    let outputVideoFileFormat;
    let formComplexity: FormComplexity = getValues("form-complexity");
    if (formComplexity === FormComplexity.SIMPLE) {
      outputVideoFileFormat = "mp4";
    } else if (formComplexity === FormComplexity.ADVANCED && getValues("encode-type") === "crf") {
      outputVideoFileFormat = "mp4";
    } else if (getValues("timeline-category") === "notop10" && getValues("no-top-10-category") === "noencode") {
      outputVideoFileFormat = "mkv";
    } else {
      outputVideoFileFormat = getValues("output-video-file-format");
    }
  
    //console.log("getAllowedOutputVideoFileFormat outputVideoFileFormat: ", outputVideoFileFormat);
    return outputVideoFileFormat;
  }

  async function validateOutputVideoFilename(outputVideoFilename: string) {
    let outputVideoFileFormat = getAllowedOutputVideoFileFormat();
    if (outputVideoFileFormat === "<FILLME>") {
      return "Please specify the video format."
    } else {
      return isFileWritableAndHasCorrectExtension(outputVideoFilename, outputVideoFileFormat);
    }
  }

  useEffect(() => {
    if (props.noTop10CategoryIsNoEncode !== prevNoTop10CategoryIsNoEncode) {
      let outputVideoFileFormat = getAllowedOutputVideoFileFormat();
      let outputVideoFilename = getValues("output-video-filename");
      console.log("outputVideoFileFormat:", outputVideoFileFormat, ", outputVideoFilename:", outputVideoFilename);
      if (!outputVideoFilename.endsWith(`.${outputVideoFileFormat}`)) {
        setValue("output-video-filename", "");
      }
      setPrevNoTop10CategoryIsNoEncode(props.noTop10CategoryIsNoEncode);
    }
  }, [props.noTop10CategoryIsNoEncode]);

  function getOutputVideoFileFilters() {
    let outputVideoFileFormat = getAllowedOutputVideoFileFormat();
    let fileFilters: FileFilter[];
    if (outputVideoFileFormat === "<FILLME>") {
      fileFilters = [
        {name: "All video files", extensions: ["mkv", "mp4", "webm"]}
      ];
    } else {
      fileFilters = [
        {name: `${outputVideoFileFormat} files`, extensions: [outputVideoFileFormat]}
      ];
    }
    return fileFilters;
  }

  return (
    <div>
      <FieldsetOr>
        <legend>Output filename</legend>
        <div className="like-input-group">
          <OpenFileTextInputWithButton name="output-video-filename" startLabel="Output video filename: " dialogId="output-video" dialogType="save-file" fileFilters={getOutputVideoFileFilters} validate={validateOutputVideoFilename}/>
        </div>
        {renderCounter}
      </FieldsetOr>
    </div>
  );
}
