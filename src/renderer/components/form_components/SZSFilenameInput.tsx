import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { isFileReadable } from "../../util-renderer"

export function SZSFilenameInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters, getValues("szs-filename"), "szs");
    if (response !== "") {
      setValue("szs-filename", response, {shouldTouch: true});      
    }
  }

  return (
    <div>
      <label htmlFor="szs-filename">SZS Filename: </label>
      <input type="text" readOnly
        {...register("szs-filename", {required: {
          value: true,
          message: "This input is required."
        }, validate: isFileReadable})}
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "SZS files", extensions: ["szs"]}
        ]);
      }} type="button">Browse&#8230;</button>
      <SimpleErrorMessage name="szs-filename"/>
    </div>
  );
}
