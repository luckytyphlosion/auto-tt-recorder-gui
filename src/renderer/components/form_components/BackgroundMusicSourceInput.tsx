import React, { useState } from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { useWatch } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { GameVolumeInput } from "./GameVolumeInput";
import { MusicVolumeInput } from "./MusicVolumeInput";

import useRenderCounter from "../../RenderCounter";
import { AutoTTRecConfigFormFieldTypes } from "../AutoTTRecConfigForm";

export type BackgroundMusicSource = "music-filename" | "game-bgm" | "none";

export function BackgroundMusicSourceInput() {
  const {register, getValues} = useFormContextAutoTT();

  //const backgroundMusicSource = useWatch<AutoTTRecConfigFormFieldTypes>({name: "background-music-source"});
  const backgroundMusicSource = useWatchAutoTT({name: "background-music-source"});
  const renderCounter = useRenderCounter();

  return (
    <div>
      <label htmlFor="background-music-source">Background Music: </label>
      <select {...register("background-music-source", {
        required: true})}>
        <option value="music-filename">Music filename</option>
        <option value="game-bgm">Game BGM</option>
        <option value="none">None</option>
      </select>
      {
        backgroundMusicSource === "music-filename" ? 
         <MusicFilenameInput/> : ""
      }
      {renderCounter}
      {
        backgroundMusicSource === "music-filename" ?
        <>
          <GameVolumeInput/>
          <MusicVolumeInput/>
        </> : ""
      }
    </div>    
  );
}
