import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { GameVolumeInput } from "./GameVolumeInput";
import { MusicVolumeInput } from "./MusicVolumeInput";

import useRenderCounter from "../../RenderCounter";

export type BackgroundMusicSource = "music-filename" | "game-bgm" | "none";

export function BackgroundMusicSourceInput() {
  const {register, getValues} = useFormContextAutoTT();
  function isFormBackgroundMusicFromFilename() {
    return getValues("background-music-source") === "music-filename";
  }

  const [musicFilenameInputEnable, setMusicFilenameInputEnable] = useState(isFormBackgroundMusicFromFilename());
  const renderCounter = useRenderCounter();

  function updateMusicFilenameInputEnable(event: React.MouseEvent<HTMLButtonElement>) {
    setMusicFilenameInputEnable(isFormBackgroundMusicFromFilename());
  }

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
      {renderCounter}
      {
        musicFilenameInputEnable ?
        <>
          <GameVolumeInput/>
          <MusicVolumeInput/>
        </> : ""
      }
    </div>    
  );
}
