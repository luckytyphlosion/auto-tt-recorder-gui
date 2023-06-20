import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import useRenderCounter from "../../RenderCounter";

export function BackgroundMusicInput() {
  const {register, getValues} = useFormContext();
  function isFormBackgroundMusicFromFilename() {
    return getValues("background-music") === "bgm-music-filename";
  }

  const [musicFilenameInputEnable, setMusicFilenameInputEnable] = useState(isFormBackgroundMusicFromFilename());
  const renderCounter = useRenderCounter(true);

  function updateMusicFilenameInputEnable(event: React.MouseEvent<HTMLButtonElement>) {
    setMusicFilenameInputEnable(isFormBackgroundMusicFromFilename());
  }

  return (
    <div>
      <label htmlFor="background-music">Background Music: </label>
      <select {...register("background-music", {
        required: true, onChange: updateMusicFilenameInputEnable})}>
        <option value="bgm-music-filename">Music filename</option>
        <option value="bgm-game-bgm">Game BGM</option>
        <option value="bgm-none">None</option>
      </select>
      {
        musicFilenameInputEnable ? 
         <MusicFilenameInput/> : ""
      }
      {renderCounter}
    </div>    
  );
}
