import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";

import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function ISOWBFSFileInput() {
  const {register, setValue} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "ISOWBFSFileInput");

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    setValue("iso-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="iso-filename">ISO or WBFS: </label>
      <input type="text" readOnly
        {...register("iso-filename", {required: {
          value: true,
          message: "This input is required."
        }})}
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "ISO/WBFS files", extensions: ["iso", "wbfs"]}
        ]);
      }} type="button">Browse&#8230;</button>
      <SimpleErrorMessage name="iso-filename"/>
      {renderCounter}
    </div>
  );
}
