import React from "react";
import { FileFilter } from "electron";

import { useFormContext } from "react-hook-form";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function OutputVideoFilenameInput() {
  const {register, setValue, getValues} = useFormContext();

  async function queueSaveDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.saveFileDialog(fileFilters);
    setValue("output-video-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="output-video-filename">Output filename: </label>
      <input
        className="filename-input" type="text"
        {...register("output-video-filename", {required: {
          value: true,
          message: "This input is required."
        }})}
      ></input>
      <button onClick={event => {
        let outputVideoFileFormat = getValues("output-video-file-format");
        queueSaveDialog(event, [
          {name: `${outputVideoFileFormat} files`, extensions: [outputVideoFileFormat]}
        ]);
      }} type="button">Export as&#8230;</button>
      <SimpleErrorMessage name="output-video-filename"/>
    </div>
  );
}
