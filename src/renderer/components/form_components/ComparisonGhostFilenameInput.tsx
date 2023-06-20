import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FileFilter } from "electron";

export function ComparisonGhostFilenameInput() {
  const {register, setValue} = useFormContext();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    setValue("comparison-ghost-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="comparison-ghost-filename">RKG file to compare against: </label>
      <input type="text" readOnly
        {...register("comparison-ghost-filename", {required: false})}
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "RKG files", extensions: ["rkg"]}
        ]);
      }} type="button">Browse&#8230;</button>
    </div>
  );
}
