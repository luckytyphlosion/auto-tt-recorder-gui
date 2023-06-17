import React from "react";
import { FileFilter } from "electron";

import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

interface OutputVideoFilenameInputProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export function OutputVideoFilenameInput(props: OutputVideoFilenameInputProps) {

  async function queueSaveDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.saveFileDialog(fileFilters);
    props.setValue("output-video-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="output-video-filename">Output filename: </label>
      <input
        className="filename-input" type="text"
        {...props.register("output-video-filename", {required: true})}
      ></input>
      <button onClick={event => {
        queueSaveDialog(event, [
          {name: "mp4 files", extensions: ["mp4"]}
        ]);
      }} type="button">Export as&#8230;</button>
    </div>
  );
}
