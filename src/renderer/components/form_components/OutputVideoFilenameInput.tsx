import React from "react";
import { FileFilter } from "electron";

import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function OutputVideoFilenameInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();

  async function queueSaveDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.saveFileDialog(fileFilters);
    setValue("output-video-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="output-video-filename">Output filename: </label>
      <input
        className="filename-input" type="text" readOnly
        {...register("output-video-filename", {required: {
          value: true,
          message: "This input is required."
        }})}
      ></input>
      <button onClick={event => {
        let outputVideoFileFormat;
        if (getValues("timeline-category") === "notop10" && getValues("no-top-10-category") === "noencode") {
          outputVideoFileFormat = "mkv";
        } else {
          outputVideoFileFormat = getValues("output-video-file-format");
        }
        queueSaveDialog(event, [
          {name: `${outputVideoFileFormat} files`, extensions: [outputVideoFileFormat]}
        ]);
      }} type="button">Export as&#8230;</button>
      <SimpleErrorMessage name="output-video-filename"/>
    </div>
  );
}
