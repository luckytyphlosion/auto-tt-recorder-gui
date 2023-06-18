import React, { useState } from "react";
import { AutoTTRecArgs } from "../../../auto-tt-rec-args";
import useRenderCounter from "../../RenderCounter";
import { useFormContext } from "react-hook-form";
import { FileFilter } from "electron";

export function MusicFilenameInput() {
  const {register, setValue} = useFormContext();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    setValue("music-filename", response, {shouldTouch: true});
  }

  return (
    <>
      <label htmlFor="music-filename"> </label>
      <input type="text" readOnly
        {...register("music-filename", {required: true})}
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "Music files", extensions: ["*"]}
        ]);
      }} type="button">Browse&#8230;</button>
    </>
  );
}
