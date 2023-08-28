import React from "react";
import { OpenFileTextInputWithButton } from "../OpenFileTextInputWithButton";

export function MusicFilenameInput(props: {
  validateBackgroundMusicSourceAndCheckIsFileReadable: (musicFilenameOrBackgroundMusicSource: string) => Promise<string | boolean>
}) {
  return (
    <OpenFileTextInputWithButton name="music-filename" startLabel=" " dialogId="music" fileFilters={[
      {name: "Music files", extensions: ["*"]}
    ]} validate={props.validateBackgroundMusicSourceAndCheckIsFileReadable} 
      notInGrid={true}
      errorMessageOnBottom={true}
      inline={true}
      notRequired={true}
    />
  );
}
