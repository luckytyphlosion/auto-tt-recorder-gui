import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { GameVolumeInput } from "./GameVolumeInput";
import { MusicVolumeInput } from "./MusicVolumeInput";
import { MusicPresentationInput } from "./MusicPresentationInput";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import { Timeline } from "../../AutoTTRecFormFieldsAndArgs";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import useRenderCounter from "../../RenderCounter";

export const BACKGROUND_MUSIC_SOURCES = makeReadonlyArraySet(["music-filename", "game-bgm", "none"] as const);
export type BackgroundMusicSource = ValidValues<typeof BACKGROUND_MUSIC_SOURCES>;

export function BackgroundMusicSourceInput(props: {timeline: Timeline, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  function isFormBackgroundMusicFromFilename() {
    return getValues("background-music-source") === "music-filename";
  }

  const [musicFilenameInputEnable, setMusicFilenameInputEnable] = useState(isFormBackgroundMusicFromFilename());
  const renderCounter = useRenderCounter(false, "BackgroundMusicSourceInput");

  function updateMusicFilenameInputEnable(event: React.MouseEvent<HTMLButtonElement>) {
    setMusicFilenameInputEnable(isFormBackgroundMusicFromFilename());
  }

  let isOnMKChannel = props.timeline === "top10" || props.timeline === "mkchannel";
  let enableMusicPresentationInput = isOnMKChannel || (props.timeline === "ghostselect" && musicFilenameInputEnable);

  return (
    <div>
      <label htmlFor="background-music-source">Background Music: </label>
      <select {...register("background-music-source", {
        required: false, onChange: updateMusicFilenameInputEnable})}>
        <option value="music-filename">Music filename</option>
        <option value="game-bgm">Game BGM</option>
        <option value="none">None</option>
      </select>
      {
        musicFilenameInputEnable ? 
         <MusicFilenameInput/> : ""
      }
      {
        enableMusicPresentationInput && props.formComplexity > FormComplexity.SIMPLE ?
          <MusicPresentationInput hasMusic={musicFilenameInputEnable} isOnMKChannel={isOnMKChannel}/> : ""
      }
      {
        musicFilenameInputEnable ?
        <>
          <GameVolumeInput/>
          <MusicVolumeInput/>
        </> : ""
      }
      {renderCounter}

    </div>    
  );
}
