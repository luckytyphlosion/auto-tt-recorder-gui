import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { OpenFileTextInputWithButton } from "../OpenFileTextInputWithButton";
import { isFileReadable } from "../../util-renderer"

export function MusicFilenameInput() {
  const {getValues} = useFormContextAutoTT();

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
    <OpenFileTextInputWithButton name="music-filename" startLabel=" " dialogId="music" fileFilters={[
      {name: "Music files", extensions: ["*"]}
    ]} validate={validateBackgroundMusicSourceAndCheckIsFileReadable} 
      notInGrid={true}
      noStartLabelClass={true}
      errorMessageOnBottom={true}
      inline={true}
    />
  );
}
