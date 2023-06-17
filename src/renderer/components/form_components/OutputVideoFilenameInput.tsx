import React from "react";
import { FileFilter } from "electron";

import { useFormContext } from "react-hook-form";

export function OutputVideoFilenameInput() {
  const {register, setValue} = useFormContext();

  async function queueSaveDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.saveFileDialog(fileFilters);
    setValue("output-video-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="output-video-filename">Output filename: </label>
      <input
        className="filename-input" type="text"
        {...register("output-video-filename", {required: true})}
      ></input>
      <button onClick={event => {
        queueSaveDialog(event, [
          {name: "mp4 files", extensions: ["mp4"]}
        ]);
      }} type="button">Export as&#8230;</button>
    </div>
  );
}
