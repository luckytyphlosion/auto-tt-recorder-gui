import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import useRenderCounter from "../../RenderCounter";

export function BackgroundMusicInput() {
  const {register, getValues} = useFormContext();
  function isFormBackgroundMusicFromFilename() {
    return getValues("background-music") === "music-filename";
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
    </div>    
  );
}
