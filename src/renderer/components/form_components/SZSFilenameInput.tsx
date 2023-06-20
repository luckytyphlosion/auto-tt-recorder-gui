import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FileFilter } from "electron";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function SZSFilenameInput() {
  const {register, setValue} = useFormContext();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    setValue("szs-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="szs-filename">SZS Filename: </label>
      <input type="text" readOnly
        {...register("szs-filename", {required: {
          value: true,
          message: "This input is required."
        }})}
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
