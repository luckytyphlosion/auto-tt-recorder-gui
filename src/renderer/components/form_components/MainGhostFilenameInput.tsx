import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { Set200ccInput } from "./Set200ccInput";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import { ClearableReadonlyTextInput } from "../ClearableReadonlyTextInput";

import { isFileReadable } from "../../util-renderer"

export function MainGhostFilenameInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters, getValues("main-ghost-filename"), "rkgs");
    if (response !== "") {
      setValue("main-ghost-filename", response, {shouldTouch: true});
    }
  }

  return (
    <div>
      <label htmlFor="main-ghost-filename">RKG file to record:</label>
      <ClearableReadonlyTextInput name="main-ghost-filename" validate={isFileReadable}/>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "RKG files", extensions: ["rkg"]}
        ]);
      }} type="button">Browse&#8230;</button>
      <SimpleErrorMessage name="main-ghost-filename"/>
      <Set200ccInput/>
    </div>
  );
}
