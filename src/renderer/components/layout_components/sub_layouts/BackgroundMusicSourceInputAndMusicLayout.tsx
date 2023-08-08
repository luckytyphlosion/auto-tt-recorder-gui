import React, { useState, useEffect } from "react";
import { useFormContextAutoTT, useWatchExpandUnselectedChoiceInputs, isValueOrFILLMEIsValueMaker, useWatchAutoTT } from "../../../use-form-context-auto-tt";
import { MusicFilenameInput } from "../../form_components/MusicFilenameInput";
import { GameVolumeInput } from "../../form_components/GameVolumeInput";
import { MusicVolumeInput } from "../../form_components/MusicVolumeInput";
import { MusicPresentationInput } from "../../form_components/MusicPresentationInput";
import { FormComplexity } from "../FormComplexityLayout";
import { Timeline } from "../choice_layouts/NoTop10CategoryLayout";
import { DeselectableDropdown } from "../../DeselectableDropdown";
import { makeReadonlyArraySet, ValidValues } from "../../../../shared/array-set";
import { SimpleErrorMessage } from "../../SimpleErrorMessage";
import { FieldsetOr } from "../../FieldsetOr";

import useRenderCounter from "../../../RenderCounter";

export const BACKGROUND_MUSIC_SOURCES = makeReadonlyArraySet(["music-filename", "game-bgm", "none"] as const);
export type BackgroundMusicSource = ValidValues<typeof BACKGROUND_MUSIC_SOURCES>;

export function BackgroundMusicSourceInputAndMusicLayout(props: {timeline: Timeline, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  const backgroundMusicSource = useWatchAutoTT({name: "background-music-source"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();
  const musicFilenameInputEnable = isValueOrFILLMEIsValue(backgroundMusicSource, "music-filename");

  const renderCounter = useRenderCounter(false, "BackgroundMusicSourceInputAndMusicLayout");

  let isOnMKChannel = props.timeline === "top10" || props.timeline === "mkchannel";
  let enableMusicPresentationInput = isOnMKChannel || (props.timeline === "ghostselect" && musicFilenameInputEnable);

  return (
    <div>
      <FieldsetOr>
        <legend>Music</legend>
        <label htmlFor="background-music-source">Background Music: </label>
        <DeselectableDropdown name="background-music-source" noErrorMessage={true}>
          <option value="music-filename">Music filename</option>
          <option value="game-bgm">Game BGM</option>
          <option value="none">None</option>
        </DeselectableDropdown>
        {
          musicFilenameInputEnable ? 
          <MusicFilenameInput/> : <SimpleErrorMessage name="background-music-source"/>
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
      </FieldsetOr>
    </div>    
  );
}
