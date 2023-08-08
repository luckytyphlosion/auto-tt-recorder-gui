import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { isFileReadable } from "../../util-renderer"

import { ClearableReadonlyTextInput } from "../ClearableReadonlyTextInput";

export function ComparisonGhostFilenameInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters, getValues("comparison-ghost-filename"), "rkgs");
    if (response !== "") {
      setValue("comparison-ghost-filename", response, {shouldTouch: true});
    }
  }

  return (
    <div>
      <div className="start-label-div">
        <label htmlFor="comparison-ghost-filename" className="start-label">RKG file to compare against: </label>
      </div>
      <div className="start-label-contents">
        <ClearableReadonlyTextInput name="comparison-ghost-filename" validate={isFileReadable}/>
        <button onClick={event => {
          queueOpenDialog(event, [
            {name: "RKG files", extensions: ["rkg"]}
          ]);
        }} type="button">Browse&#8230;</button>
        <SimpleErrorMessage name="comparison-ghost-filename"/>
      </div>
    </div>
  );
}
