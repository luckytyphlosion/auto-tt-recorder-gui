import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function MusicFilenameInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters, getValues("music-filename"), "music");
    if (response !== "") {
      setValue("music-filename", response, {shouldTouch: true});
    }
  }

  return (
    <>
      <label htmlFor="music-filename"> </label>
      <input type="text" readOnly
        {...register("music-filename", {required: {
          value: true,
          message: "This input is required."
        }})}
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "Music files", extensions: ["*"]}
        ]);
      }} type="button">Browse&#8230;</button>
      <SimpleErrorMessage name="music-filename"/>
    </>
  );
}
