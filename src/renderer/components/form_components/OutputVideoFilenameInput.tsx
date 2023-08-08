import React, { useEffect, useState } from "react";
import { FileFilter } from "electron";

import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { isFileWritableAndHasCorrectExtension } from "../../util-renderer"

import { FormComplexity } from "../layout_components/FormComplexityLayout";
import { ClearableReadonlyTextInput } from "../ClearableReadonlyTextInput";

import useRenderCounter from "../../RenderCounter";

export function OutputVideoFilenameInput(props: {noTop10CategoryIsNoEncode: boolean}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const [prevNoTop10CategoryIsNoEncode, setPrevNoTop10CategoryIsNoEncode] = useState(getValues("no-top-10-category") === "noencode");
  const renderCounter = useRenderCounter(false, "OutputVideoFilenameInput");

  async function queueSaveDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.saveFileDialog(fileFilters, getValues("output-video-filename"), "output-video");
    if (response !== "") {
      setValue("output-video-filename", response, {shouldTouch: true});
    }
  }

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
  
    console.log("getAllowedOutputVideoFileFormat outputVideoFileFormat: ", outputVideoFileFormat);
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

  return (
    <div>
      <fieldset>
        <legend>Output filename:</legend>
        <ClearableReadonlyTextInput className="filename-input" name="output-video-filename" validate={validateOutputVideoFilename}/>
        <button onClick={async (event) => {
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
          await queueSaveDialog(event, fileFilters);  
        }} type="button">Export as&#8230;</button>
        <SimpleErrorMessage name="output-video-filename"/>
        {renderCounter}
      </fieldset>
    </div>
  );
}
