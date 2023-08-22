import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { isFileReadable } from "../../util-renderer"

import { ClearableReadonlyTextInput } from "../ClearableReadonlyTextInput";

export function MusicFilenameInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters, getValues("music-filename"), "music");
    if (response !== "") {
      setValue("music-filename", response, {shouldTouch: true});
    }
  }

  async function validateBackgroundMusicSourceAndCheckIsFileReadable(value: string) {
    let backgroundMusicSource = getValues("background-music-source");
    //console.log("validateBackgroundMusicSourceAndCheckIsFileReadable backgroundMusicSource:", backgroundMusicSource);
    if (backgroundMusicSource === "<FILLME>") {
      return "Background music source (dropdown) is required.";
    } else if (value === "") {
      return "This input is required.";
    } else {
      return await isFileReadable(value);
    }
  }

  return (
    <>
      <label htmlFor="music-filename"> </label>
      <ClearableReadonlyTextInput name="music-filename" notRequired={true} validate={validateBackgroundMusicSourceAndCheckIsFileReadable}/>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "Music files", extensions: ["*"]}
        ]);
      }} type="button">Browse&#8230;</button>
      <div className="grid-contents">
        <div className="start-label"></div>
        <div className="start-label-contents">
          <SimpleErrorMessage name="music-filename"/>
        </div>
      </div>
    </>
  );
}
