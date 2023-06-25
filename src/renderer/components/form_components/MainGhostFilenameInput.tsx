import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { Set200ccInput } from "./Set200ccInput";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function MainGhostFilenameInput() {
  const {register, setValue} = useFormContextAutoTT();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    setValue("main-ghost-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="main-ghost-filename">RKG file to record:</label>
      <input type="text" readOnly
        {...register("main-ghost-filename", {required: {
          value: true,
          message: "This input is required."
        }})}
      ></input>
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
