import React, { useEffect, useState } from "react";
import { FileFilter } from "electron";

import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { isFileWritable } from "../../util-renderer"

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
    if (getValues("timeline-category") === "notop10" && getValues("no-top-10-category") === "noencode") {
      outputVideoFileFormat = "mkv";
    } else {
      outputVideoFileFormat = getValues("output-video-file-format");
    }

    return outputVideoFileFormat;
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
      <label htmlFor="output-video-filename">Output filename: </label>
      <input
        className="filename-input" type="text" readOnly
        {...register("output-video-filename", {required: {
          value: true,
          message: "This input is required."
        }, validate: isFileWritable})}
      ></input>
      <button onClick={event => {
        let outputVideoFileFormat = getAllowedOutputVideoFileFormat();
        queueSaveDialog(event, [
          {name: `${outputVideoFileFormat} files`, extensions: [outputVideoFileFormat]}
        ]);
      }} type="button">Export as&#8230;</button>
      <SimpleErrorMessage name="output-video-filename"/>
      {renderCounter}
    </div>
  );
}
