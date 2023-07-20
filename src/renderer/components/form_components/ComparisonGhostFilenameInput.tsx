import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function ComparisonGhostFilenameInput() {
  const {register, setValue} = useFormContextAutoTT();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    if (response !== "") {
      setValue("comparison-ghost-filename", response, {shouldTouch: true});
    }
  }

  return (
    <div>
      <label htmlFor="comparison-ghost-filename">RKG file to compare against: </label>
      <input type="text" readOnly
        {...register("comparison-ghost-filename", {required: {
          value: true,
          message: "This input is required."
        }})}
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "RKG files", extensions: ["rkg"]}
        ]);
      }} type="button">Browse&#8230;</button>
      <SimpleErrorMessage name="comparison-ghost-filename"/>
    </div>
  );
}
